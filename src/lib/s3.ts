import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

let s3Client: S3Client | null = null;

function getClient() {
  if (s3Client) return s3Client;
  const endpoint = process.env.S3_ENDPOINT;
  const region = process.env.S3_REGION || "us-east-1";
  const accessKeyId = process.env.S3_ACCESS_KEY;
  const secretAccessKey = process.env.S3_SECRET_KEY;
  if (!endpoint || !accessKeyId || !secretAccessKey) return null;
  s3Client = new S3Client({
    region,
    endpoint,
    forcePathStyle: true,
    credentials: { accessKeyId, secretAccessKey },
  });
  return s3Client;
}

export async function uploadToS3(opts: {
  bucket: string;
  key: string;
  body: Buffer | Uint8Array | string;
  contentType?: string;
}): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const client = getClient();
  if (!client) return { ok: false, error: "S3_NOT_CONFIGURED" };
  try {
    await client.send(new PutObjectCommand({
      Bucket: opts.bucket,
      Key: opts.key,
      Body: opts.body,
      ContentType: opts.contentType,
      ACL: "public-read" as any,
    }));
    const base = process.env.S3_PUBLIC_URL?.replace(/\/$/, "");
    const url = base ? `${base}/${opts.key}` : `${String(process.env.S3_ENDPOINT).replace(/\/$/, "")}/${opts.bucket}/${opts.key}`;
    return { ok: true, url };
  } catch (e: any) {
    return { ok: false, error: e?.message || "S3_UPLOAD_FAILED" };
  }
}

