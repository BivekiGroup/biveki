import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, verifySession } from "@/lib/auth";
import bcrypt from "bcryptjs";

const typeDefs = /* GraphQL */ `#graphql
  type User { id: ID!, name: String!, email: String!, createdAt: String!, isAdmin: Boolean! }
  type Me { id: ID!, name: String!, email: String!, isAdmin: Boolean! }
  type AuthPayload { ok: Boolean!, token: String }
  type Contact { id: ID!, name: String!, email: String!, message: String!, reason: String, createdAt: String! }
  type Project { id: ID!, name: String!, description: String, createdAt: String! }

  enum ServiceCategory { web account shop integrations apps support }
  enum MediaType { image video }

  type CaseMedia { id: ID!, type: MediaType!, src: String!, alt: String, poster: String }
  type Case {
    id: ID!
    slug: String!
    title: String!
    service: ServiceCategory!
    summary: String!
    problem: String!
    solution: String!
    result: String!
    metrics: [String!]!
    client: String
    tags: [String!]!
    tech: [String!]!
    year: Int
    externalUrl: String
    published: Boolean!
    media: [CaseMedia!]!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    me: Me
    user(id: ID!): User
    users(limit: Int = 50, offset: Int = 0, search: String): [User!]!
    contacts(reason: String, limit: Int = 20, offset: Int = 0): [Contact!]!
    myProjects(limit: Int = 50, offset: Int = 0): [Project!]!
    cases(service: ServiceCategory, limit: Int = 100, offset: Int = 0, search: String): [Case!]!
    case(slug: String!): Case
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: Boolean!
    submitContact(name: String!, email: String!, message: String!, reason: String): Boolean!
    updateProfile(name: String!): Boolean!
    changePassword(current: String!, next: String!): Boolean!
    setUserAdmin(id: ID!, isAdmin: Boolean!): Boolean!
    updateUser(id: ID!, name: String!, email: String!): Boolean!
    deleteUser(id: ID!): Boolean!
    createProject(name: String!, description: String): Boolean!

    createCase(
      slug: String!, title: String!, service: ServiceCategory!,
      summary: String!, problem: String!, solution: String!, result: String!, metrics: [String!],
      client: String, tags: [String!], tech: [String!], year: Int, externalUrl: String, published: Boolean
    ): Boolean!
    updateCase(
      id: ID!, slug: String!, title: String!, service: ServiceCategory!,
      summary: String!, problem: String!, solution: String!, result: String!, metrics: [String!],
      client: String, tags: [String!], tech: [String!], year: Int, externalUrl: String, published: Boolean
    ): Boolean!
    deleteCase(id: ID!): Boolean!
    setCaseMedia(caseId: ID!, media: [CaseMediaInput!]!): Boolean!
  }

  input CaseMediaInput { type: MediaType!, src: String!, alt: String, poster: String }
`;

import { z } from "zod";

const emailSchema = z.string().email().max(200);
const nameSchema = z.string().min(1).max(200);
const passwordSchema = z.string().min(6).max(200);
const messageSchema = z.string().min(3).max(4000);
const reasonSchema = z.string().min(0).max(120).optional();
const projectNameSchema = z.string().min(1).max(200);
const projectDescSchema = z.string().min(0).max(2000).optional();
const slugSchema = z.string().min(1).max(200).regex(/^[a-z0-9-]+$/);
const serviceSchema = z.enum(["web","account","shop","integrations","apps","support"] as const);
const longText = z.string().min(1).max(8000);
const metricsSchema = z.array(z.string().min(1).max(200)).max(12).optional();
const optionalStringArray = z.array(z.string().min(1).max(100)).max(20).optional();
const optionalInt = z.number().int().min(1900).max(3000).optional();
const optionalUrl = z.string().url().max(500).optional();
const mediaInputSchema = z.array(z.object({
  type: z.enum(["image","video"] as const),
  src: z.string().min(1).max(500),
  alt: z.string().min(0).max(300).optional(),
  poster: z.string().min(0).max(500).optional(),
})).max(20);

const resolvers = {
  Query: {
    me: async (_: any, __: any, ctx: any) => {
      if (!ctx.user) return null;
      const u = await prisma.user.findUnique({ where: { id: Number(ctx.user.uid) } });
      if (!u) return null;
      return { id: u.id, name: u.name, email: u.email, isAdmin: u.isAdmin };
    },
    user: async (_: any, { id }: any) => {
      const u = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!u) return null;
      return { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt.toISOString(), isAdmin: u.isAdmin };
    },
    users: async (_: any, { limit, offset, search }: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      const me = await prisma.user.findUnique({ where: { id: Number(ctx.user.uid) } });
      if (!me?.isAdmin) throw new Error("forbidden");
      const where = search ? { OR: [ { email: { contains: search, mode: 'insensitive' as any } }, { name: { contains: search, mode: 'insensitive' as any } } ] } : undefined;
      const list = await prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: Math.min(Math.max(Number(limit) || 50, 1), 200),
        skip: Math.max(Number(offset) || 0, 0),
      });
      return list.map(u => ({ id: u.id, name: u.name, email: u.email, createdAt: u.createdAt.toISOString(), isAdmin: u.isAdmin }));
    },
    contacts: async (_: any, { reason, limit, offset }: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      const u = await prisma.user.findUnique({ where: { id: Number(ctx.user.uid) } });
      if (!u?.isAdmin) throw new Error("forbidden");
      const list = await prisma.contact.findMany({
        where: reason ? { reason } : undefined,
        orderBy: { createdAt: "desc" },
        take: Math.min(Math.max(Number(limit) || 20, 1), 100),
        skip: Math.max(Number(offset) || 0, 0),
      });
      return list.map((c) => ({ ...c, createdAt: c.createdAt.toISOString() }));
    },
    myProjects: async (_: any, { limit, offset }: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      const list = await prisma.project.findMany({
        where: { userId: Number(ctx.user.uid) },
        orderBy: { createdAt: "desc" },
        take: Math.min(Math.max(Number(limit) || 50, 1), 200),
        skip: Math.max(Number(offset) || 0, 0),
      });
      return list.map(p => ({ id: p.id, name: p.name, description: p.description, createdAt: p.createdAt.toISOString() }));
    },
    cases: async (_: any, { service, limit, offset, search }: any, ctx: any) => {
      const where: any = {};
      // Only show published on public, all for admins
      if (ctx.user) {
        const me = await prisma.user.findUnique({ where: { id: Number(ctx.user.uid) } });
        if (!me?.isAdmin) where.published = true;
      } else {
        where.published = true;
      }
      if (service) where.service = service;
      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' as any } },
          { summary: { contains: search, mode: 'insensitive' as any } },
        ];
      }
      const list = await prisma.case.findMany({
        where,
        take: Math.min(Math.max(Number(limit) || 100, 1), 200),
        skip: Math.max(Number(offset) || 0, 0),
        orderBy: { createdAt: 'desc' },
        include: { media: { orderBy: { order: 'asc' } } },
      });
      return list.map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        service: c.service,
        summary: c.summary,
        problem: c.problem,
        solution: c.solution,
        result: c.result,
        metrics: c.metrics,
        client: c.client,
        tags: c.tags,
        tech: c.tech,
        year: c.year,
        externalUrl: c.externalUrl,
        published: c.published,
        media: c.media.map(m => ({ id: m.id, type: m.type, src: m.src, alt: m.alt, poster: m.poster })),
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      }));
    },
    case: async (_: any, { slug }: any) => {
      const c = await prisma.case.findUnique({ where: { slug }, include: { media: { orderBy: { order: 'asc' } } } });
      if (!c) return null;
      return {
        id: c.id,
        slug: c.slug,
        title: c.title,
        service: c.service,
        summary: c.summary,
        problem: c.problem,
        solution: c.solution,
        result: c.result,
        metrics: c.metrics,
        client: c.client,
        tags: c.tags,
        tech: c.tech,
        year: c.year,
        externalUrl: c.externalUrl,
        published: c.published,
        media: c.media.map(m => ({ id: m.id, type: m.type, src: m.src, alt: m.alt, poster: m.poster })),
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      };
    },
  },
  Mutation: {
    register: async (_: any, { name, email, password }: any) => {
      nameSchema.parse(name);
      emailSchema.parse(email);
      passwordSchema.parse(password);
      const norm = email.toLowerCase();
      const exists = await prisma.user.findUnique({ where: { email: norm } });
      if (exists) return { ok: false };
      const hash = await bcrypt.hash(password, 10);
      const autoAdmin = (process.env.ADMIN_EMAILS || "").split(",").map(s=>s.trim().toLowerCase()).filter(Boolean);
      const isAdmin = autoAdmin.includes(norm);
      const u = await prisma.user.create({ data: { name, email: norm, passwordHash: hash, isAdmin } });
      const token = await createSession({ uid: u.id, email: u.email, name: u.name });
      return { ok: true, token };
    },
    login: async (_: any, { email, password }: any) => {
      emailSchema.parse(email);
      passwordSchema.parse(password);
      const norm = email.toLowerCase();
      const u = await prisma.user.findUnique({ where: { email: norm } });
      if (!u) return { ok: false };
      const ok = await bcrypt.compare(password, u.passwordHash);
      if (!ok) return { ok: false };
      const token = await createSession({ uid: u.id, email: u.email, name: u.name });
      return { ok: true, token };
    },
    logout: async () => true,
    submitContact: async (_: any, { name, email, message, reason }: any) => {
      nameSchema.parse(name);
      emailSchema.parse(email);
      messageSchema.parse(message);
      if (reason !== undefined) reasonSchema.parse(reason);
      await prisma.contact.create({
        data: {
          name,
          email: String(email).toLowerCase(),
          message,
          reason: reason || null,
        },
      });
      // Notify by email
      try {
        const { sendMail } = await import("@/lib/mailer");
        await sendMail({
          subject: `Заявка (${reason || 'contact'}) — ${name}`,
          text: `Имя: ${name}\nEmail: ${email}\nПричина: ${reason || '-'}\n\nСообщение:\n${message}`,
        });
      } catch {}
      return true;
    },
    updateProfile: async (_: any, { name }: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      nameSchema.parse(name);
      await prisma.user.update({ where: { id: Number(ctx.user.uid) }, data: { name } });
      return true;
    },
    changePassword: async (_: any, { current, next }: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      passwordSchema.parse(current);
      passwordSchema.parse(next);
      const u = await prisma.user.findUnique({ where: { id: Number(ctx.user.uid) } });
      if (!u) throw new Error("user_not_found");
      const ok = await bcrypt.compare(current, u.passwordHash);
      if (!ok) throw new Error("wrong_password");
      const hash = await bcrypt.hash(next, 10);
      await prisma.user.update({ where: { id: u.id }, data: { passwordHash: hash } });
      return true;
    },
    setUserAdmin: async (_: any, { id, isAdmin }: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      const me = await prisma.user.findUnique({ where: { id: Number(ctx.user.uid) } });
      if (!me?.isAdmin) throw new Error("forbidden");
      await prisma.user.update({ where: { id: Number(id) }, data: { isAdmin: Boolean(isAdmin) } });
      return true;
    },
    updateUser: async (_: any, { id, name, email }: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      const me = await prisma.user.findUnique({ where: { id: Number(ctx.user.uid) } });
      if (!me?.isAdmin) throw new Error("forbidden");
      nameSchema.parse(name);
      emailSchema.parse(email);
      const norm = String(email).toLowerCase();
      try {
        await prisma.user.update({ where: { id: Number(id) }, data: { name, email: norm } });
        return true;
      } catch (e: any) {
        throw new Error("update_failed");
      }
    },
    deleteUser: async (_: any, { id }: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      const me = await prisma.user.findUnique({ where: { id: Number(ctx.user.uid) } });
      if (!me?.isAdmin) throw new Error("forbidden");
      const targetId = Number(id);
      if (targetId === Number(ctx.user.uid)) throw new Error("forbidden_self_delete");
      await prisma.user.delete({ where: { id: targetId } });
      return true;
    },
    createProject: async (_: any, { name, description }: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      projectNameSchema.parse(name);
      if (description !== undefined) projectDescSchema.parse(description);
      await prisma.project.create({ data: { userId: Number(ctx.user.uid), name, description: description || null } });
      return true;
    },
    createCase: async (_: any, args: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      const me = await prisma.user.findUnique({ where: { id: Number(ctx.user.uid) } });
      if (!me?.isAdmin) throw new Error("forbidden");
      slugSchema.parse(args.slug);
      serviceSchema.parse(args.service);
      longText.parse(args.summary);
      longText.parse(args.problem);
      longText.parse(args.solution);
      longText.parse(args.result);
      if (args.metrics !== undefined) metricsSchema.parse(args.metrics);
      if (args.tags !== undefined) optionalStringArray.parse(args.tags);
      if (args.tech !== undefined) optionalStringArray.parse(args.tech);
      if (args.year !== undefined) optionalInt.parse(args.year);
      if (args.externalUrl !== undefined) optionalUrl.parse(args.externalUrl);
      await prisma.case.create({
        data: {
          authorId: me.id,
          slug: args.slug,
          title: args.title,
          service: args.service,
          summary: args.summary,
          problem: args.problem,
          solution: args.solution,
          result: args.result,
          metrics: args.metrics || [],
          client: args.client || null,
          tags: args.tags || [],
          tech: args.tech || [],
          year: args.year || null,
          externalUrl: args.externalUrl || null,
          published: Boolean(args.published) || false,
        },
      });
      return true;
    },
    updateCase: async (_: any, args: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      const me = await prisma.user.findUnique({ where: { id: Number(ctx.user.uid) } });
      if (!me?.isAdmin) throw new Error("forbidden");
      const id = Number(args.id);
      slugSchema.parse(args.slug);
      serviceSchema.parse(args.service);
      longText.parse(args.summary);
      longText.parse(args.problem);
      longText.parse(args.solution);
      longText.parse(args.result);
      if (args.metrics !== undefined) metricsSchema.parse(args.metrics);
      if (args.tags !== undefined) optionalStringArray.parse(args.tags);
      if (args.tech !== undefined) optionalStringArray.parse(args.tech);
      if (args.year !== undefined) optionalInt.parse(args.year);
      if (args.externalUrl !== undefined) optionalUrl.parse(args.externalUrl);
      await prisma.case.update({
        where: { id },
        data: {
          slug: args.slug,
          title: args.title,
          service: args.service,
          summary: args.summary,
          problem: args.problem,
          solution: args.solution,
          result: args.result,
          metrics: args.metrics || [],
          client: args.client || null,
          tags: args.tags || [],
          tech: args.tech || [],
          year: args.year || null,
          externalUrl: args.externalUrl || null,
          published: Boolean(args.published) || false,
        },
      });
      return true;
    },
    deleteCase: async (_: any, { id }: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      const me = await prisma.user.findUnique({ where: { id: Number(ctx.user.uid) } });
      if (!me?.isAdmin) throw new Error("forbidden");
      await prisma.case.delete({ where: { id: Number(id) } });
      return true;
    },
    setCaseMedia: async (_: any, { caseId, media }: any, ctx: any) => {
      if (!ctx.user) throw new Error("unauthorized");
      const me = await prisma.user.findUnique({ where: { id: Number(ctx.user.uid) } });
      if (!me?.isAdmin) throw new Error("forbidden");
      const cid = Number(caseId);
      const inputs = mediaInputSchema.parse(media);
      await prisma.$transaction(async (tx) => {
        await tx.caseMedia.deleteMany({ where: { caseId: cid } });
        for (let i = 0; i < inputs.length; i++) {
          const m = inputs[i];
          await tx.caseMedia.create({ data: { caseId: cid, type: m.type as any, src: m.src, alt: m.alt || null, poster: m.poster || null, order: i } });
        }
      });
      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const baseHandler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const cookie = req.headers.get("cookie") || "";
    const m = /(?:^|; )session=([^;]+)/.exec(cookie);
    if (m) {
      try {
        const token = decodeURIComponent(m[1]);
        const payload = await verifySession(token);
        return { user: payload };
      } catch {}
    }
    return { user: null };
  },
});

// Basic in-memory rate limiter (per-IP per 60s)
const rateMap = new Map<string, { count: number; ts: number }>();
function rateLimit(ip: string, limit = 120, windowMs = 60_000) {
  const now = Date.now();
  const rec = rateMap.get(ip);
  if (!rec || now - rec.ts > windowMs) {
    rateMap.set(ip, { count: 1, ts: now });
    return true;
  }
  rec.count += 1;
  if (rec.count > limit) return false;
  return true;
}

async function withCookies(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.ip || "unknown";
  if (!rateLimit(ip)) return new Response("Too Many Requests", { status: 429 });
  const res = await baseHandler(request);
  // Try to set/clear cookie based on operation result or requested mutation
  try {
    const cloned = res.clone();
    const data = await cloned.json();
    let setCookie: string | null = null;
    if (data?.data?.login?.token || data?.data?.register?.token) {
      const token = data.data.login?.token || data.data.register?.token;
      const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
      setCookie = `session=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${secure}`;
    } else {
      // Detect logout by checking request body (if available)
      const body = await request.clone().text().catch(() => '');
      if (body.includes('logout')) {
        const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
        setCookie = `session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${secure}`;
      }
    }
    if (setCookie) {
      const headers = new Headers(res.headers);
      headers.append('Set-Cookie', setCookie);
      const text = JSON.stringify(data);
      return new Response(text, { status: res.status, headers });
    }
    return res;
  } catch {
    return res;
  }
}

export async function GET(request: NextRequest) { return withCookies(request); }
export async function POST(request: NextRequest) { return withCookies(request); }
