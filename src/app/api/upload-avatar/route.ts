import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { verifySession } from "@/lib/auth";
import { uploadToS3 } from "@/lib/s3";

export const runtime = 'nodejs';

function randomId(len = 16) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export async function POST(req: NextRequest) {
  try {
    // Require authenticated user (not admin)
    const cookie = req.headers.get('cookie') || '';
    const m = /(?:^|; )session=([^;]+)/.exec(cookie);
    if (!m) return new Response('Unauthorized', { status: 401 });
    let user: any = null;
    try { user = await verifySession(decodeURIComponent(m[1])); } catch {}
    if (!user) return new Response('Unauthorized', { status: 401 });

    const form = await req.formData();
    const file = form.get('file');
    if (!file || !(file instanceof Blob)) return new Response('No file', { status: 400 });

    const origName = (file as any).name || 'avatar';
    const buf = Buffer.from(await file.arrayBuffer());

    // Validate file size (max 5MB)
    if (buf.length > 5 * 1024 * 1024) {
      return new Response('File too large (max 5MB)', { status: 400 });
    }

    // Validate file type
    const fileType = (file as any).type || '';
    if (!fileType.startsWith('image/')) {
      return new Response('Only images allowed', { status: 400 });
    }

    const ext = path.extname(origName || '').slice(1).toLowerCase();
    const safeExt = ext && /^[a-z0-9]+$/.test(ext) ? ext : 'jpg';
    const id = randomId(18);

    const s3Bucket = process.env.S3_BUCKET;
    const s3Endpoint = process.env.S3_ENDPOINT;

    if (s3Bucket && s3Endpoint) {
      const key = `avatars/${id}.${safeExt}`;
      const up = await uploadToS3({
        bucket: s3Bucket,
        key,
        body: buf,
        contentType: fileType || 'image/jpeg'
      });
      if (!up.ok) return new Response('Upload failed', { status: 500 });
      return Response.json({ ok: true, url: up.url });
    }

    // Fallback to local storage
    const relDir = path.join('public', 'uploads', 'avatars');
    const absDir = path.join(process.cwd(), relDir);
    await fs.mkdir(absDir, { recursive: true });
    const basename = `${id}.${safeExt}`;
    const absPath = path.join(absDir, basename);
    await fs.writeFile(absPath, buf);
    const publicPath = `/uploads/avatars/${basename}`;

    return Response.json({ ok: true, url: publicPath });
  } catch (e) {
    console.error('Avatar upload error:', e);
    return new Response('Upload failed', { status: 500 });
  }
}
