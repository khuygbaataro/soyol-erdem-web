/**
 * Resend email helper.
 *
 * Unlike lib/telegram.ts (fire-and-forget), the caller needs the send
 * result to log it in EmailMessage, so this returns a structured result
 * instead of swallowing errors.
 *
 * Env:
 *   RESEND_API_KEY — Resend API key
 *   EMAIL_FROM     — "Соёл Эрдэм Элсэлт <elselt@soyolerdem.edu.mn>"
 */

export { renderTemplate } from '@/lib/template';

const RESEND_API = 'https://api.resend.com/emails';

export interface SendEmailResult {
  ok: boolean;
  id?: string;
  error?: string;
}

export async function sendEmail(opts: {
  to: string;
  toName?: string | null;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    return {
      ok: false,
      error:
        'Имэйл үйлчилгээ тохируулаагүй байна. Vercel дээр RESEND_API_KEY болон EMAIL_FROM нэмнэ үү.',
    };
  }

  // Resend accepts "Name <email>" in the `to` field.
  const to = opts.toName ? `${opts.toName} <${opts.to}>` : opts.to;

  try {
    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        subject: opts.subject,
        text: opts.text,
        ...(opts.html ? { html: opts.html } : {}),
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    const data = (await res.json().catch(() => null)) as
      | { id?: string; message?: string; name?: string }
      | null;
    if (!res.ok) {
      const msg = data?.message || data?.name || `Resend error ${res.status}`;
      return { ok: false, error: String(msg) };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Имэйл илгээхэд алдаа гарлаа',
    };
  }
}
