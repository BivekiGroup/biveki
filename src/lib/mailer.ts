import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.timeweb.ru";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const NOTIFY_TO = process.env.NOTIFY_TO || process.env.SMTP_USER || "";

const disabled = !SMTP_USER || !SMTP_PASS;

export async function sendMail(opts: { subject: string; text?: string; html?: string; to?: string }) {
  if (disabled) return { ok: false, skipped: true } as const;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  const info = await transporter.sendMail({
    from: SMTP_USER,
    to: opts.to || NOTIFY_TO,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
  return { ok: true, messageId: info.messageId } as const;
}

