import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { verifySession } from "@/lib/auth";

export const runtime = 'nodejs';

function randomId(len = 16) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export async function POST(req: NextRequest) {
  try {
    // Require authenticated admin
    const cookie = req.headers.get('cookie') || '';
    const m = /(?:^|; )session=([^;]+)/.exec(cookie);
    if (!m) return new Response('Unauthorized', { status: 401 });
    let user: any = null;
    try { user = await verifySession(decodeURIComponent(m[1])); } catch {}
    if (!user) return new Response('Unauthorized', { status: 401 });
    // Optionally we could check admin in DB, but GraphQL enforces for mutations
    const form = await req.formData();
    const file = form.get('file');
    const folder = String(form.get('folder') || 'cases');
    if (!file || !(file instanceof Blob)) return new Response('No file', { status: 400 });
    const origName = (file as any).name || 'upload';
    const buf = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(origName || '').slice(1).toLowerCase();
    const safeExt = ext && /^[a-z0-9]+$/.test(ext) ? ext : 'bin';
    const id = randomId(18);
    const relDir = path.join('public', 'uploads', folder);
    const absDir = path.join(process.cwd(), relDir);
    await fs.mkdir(absDir, { recursive: true });
    const basename = `${id}.${safeExt}`;
    const absPath = path.join(absDir, basename);
    await fs.writeFile(absPath, buf);
    const publicPath = `/uploads/${folder}/${basename}`;
    return Response.json({ ok: true, path: publicPath, name: basename });
  } catch (e) {
    return new Response('Upload failed', { status: 500 });
  }
}
