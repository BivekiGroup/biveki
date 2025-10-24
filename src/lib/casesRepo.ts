import { prisma } from '@/lib/prisma';
import type { ServiceCategory } from '@/lib/cases';

export async function listCases(opts?: { service?: ServiceCategory; limit?: number; offset?: number }) {
  const take = Math.min(Math.max(opts?.limit ?? 100, 1), 200);
  const skip = Math.max(opts?.offset ?? 0, 0);
  const where: any = {};
  if (opts?.service) where.service = opts.service as any;
  where.published = true;
  const list = await prisma.case.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { media: { orderBy: { order: 'asc' } } },
    take,
    skip,
  });
  return list.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    service: c.service as ServiceCategory,
    summary: c.summary,
    problem: c.problem,
    solution: c.solution,
    result: c.result,
    metrics: c.metrics,
    client: c.client || undefined,
    tags: c.tags,
    tech: c.tech,
    year: c.year || undefined,
    externalUrl: c.externalUrl || undefined,
    media: c.media.map((m) => ({ id: m.id, type: m.type, src: m.src, alt: m.alt || undefined, poster: m.poster || undefined })),
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
  }));
}

export async function getCaseBySlug(slug: string) {
  const c = await prisma.case.findFirst({ where: { slug, published: true } as any, include: { media: { orderBy: { order: 'asc' } } } });
  if (!c) return null;
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    service: c.service as ServiceCategory,
    summary: c.summary,
    problem: c.problem,
    solution: c.solution,
    result: c.result,
    metrics: c.metrics,
    client: c.client || undefined,
    tags: c.tags,
    tech: c.tech,
    year: c.year || undefined,
    externalUrl: c.externalUrl || undefined,
    media: c.media.map((m) => ({ id: m.id, type: m.type, src: m.src, alt: m.alt || undefined, poster: m.poster || undefined })),
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
  };
}
