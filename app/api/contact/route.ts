import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/validation';
import { sendTelegram } from '@/lib/telegram';

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
  }
  const d = parsed.data;
  await prisma.contactSubmission.create({
    data: {
      name: d.name,
      email: d.email,
      phone: d.phone || null,
      subject: d.subject,
      message: d.message,
    },
  });

  await sendTelegram(
    `📩 Шинэ зурвас\n` +
    `👤 ${d.name}\n` +
    `📌 ${d.subject}\n` +
    `📞 ${d.phone || '—'}\n` +
    `✉️ ${d.email}\n\n` +
    `${d.message}`,
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}
