/**
 * SMTP email helper (nodemailer).
 *
 * Sends through the school's own mail.mn mailbox so admission emails come
 * from a real @soyolerdem.edu.mn address and replies land back in the
 * normal webmail inbox — no third-party provider needed.
 *
 * Unlike lib/telegram.ts (fire-and-forget), the caller needs the send
 * result to log it in EmailMessage, so this returns a structured result.
 *
 * Env:
 *   SMTP_HOST   — e.g. smtp.mail.mn
 *   SMTP_PORT   — 465 (SSL) эсвэл 587 (STARTTLS). Default 465.
 *   SMTP_SECURE — "true" | "false" (default: true when port 465)
 *   SMTP_USER   — үндсэн имэйл хаяг (нэвтрэх нэр), ж: info@soyolerdem.edu.mn
 *   SMTP_PASS   — тухайн хаягийн нууц үг
 *   EMAIL_FROM  — "Соёл Эрдэм <info@soyolerdem.edu.mn>" (ихэвчлэн SMTP_USER-тэй ижил хаягтай)
 */
import nodemailer, { type Transporter } from 'nodemailer';

export { renderTemplate } from '@/lib/template';

export interface SendEmailResult {
  ok: boolean;
  id?: string;
  error?: string;
}

let cached: Transporter | null = null;

function getTransport(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  if (cached) return cached;

  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === 'true'
      : port === 465;

  cached = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // Serverless-д удаан хариу өгдөг mail.mn сервер тодорхойгүй хугацаагаар
    // өлгөгдөхөөс сэргийлж тодорхой timeout тавина — алдаа гарвал хурдан,
    // ойлгомжтой болно.
    connectionTimeout: 20000,
    greetingTimeout: 15000,
    socketTimeout: 25000,
  });
  return cached;
}

export async function sendEmail(opts: {
  to: string;
  toName?: string | null;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}): Promise<SendEmailResult> {
  // Яг аль env дутуу байгааг нэрлэж алдаанд буцаана — Vercel дээр юу
  // нэмээгүйг таамаглалгүйгээр харна.
  const missing: string[] = [];
  if (!process.env.SMTP_HOST) missing.push('SMTP_HOST');
  if (!process.env.SMTP_USER) missing.push('SMTP_USER');
  if (!process.env.SMTP_PASS) missing.push('SMTP_PASS');

  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const transport = getTransport();
  if (!transport || !from || missing.length > 0) {
    return {
      ok: false,
      error:
        missing.length > 0
          ? `Имэйл тохиргоо дутуу: ${missing.join(', ')} байхгүй. Vercel → Settings → Environment Variables дээр Production-д нэмээд дахин Redeploy хийнэ үү.`
          : 'Имэйл үйлчилгээ тохируулаагүй байна.',
    };
  }

  const to = opts.toName ? `"${opts.toName}" <${opts.to}>` : opts.to;

  try {
    const info = await transport.sendMail({
      from,
      to,
      subject: opts.subject,
      text: opts.text,
      ...(opts.html ? { html: opts.html } : {}),
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    });
    return { ok: true, id: info.messageId };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Имэйл илгээхэд алдаа гарлаа',
    };
  }
}
