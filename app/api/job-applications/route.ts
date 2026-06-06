import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jobApplicationSchema } from '@/lib/validation';
import { sendTelegram } from '@/lib/telegram';

/**
 * Public — receives a finished 7-section job-application form and stores
 * it in the JobApplication table. Top-level columns mirror what the
 * admin needs to skim (position, name, contact, dates); the bulky free
 * text lives in `payload` as JSON.
 */
export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = jobApplicationSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const a = parsed.data;
  await prisma.jobApplication.create({
    data: {
      position: a.position,
      fullName: a.fullName,
      birthDate: a.birthDate || null,
      phone: a.phone,
      email: a.email,
      address: a.address || null,
      payload: JSON.stringify(a.payload),
      cvUrl: a.cvUrl || null,
      diplomaUrl: a.diplomaUrl || null,
    },
  });

  await sendTelegram(
    `💼 Шинэ ажлын анкет\n` +
    `👤 ${a.fullName}\n` +
    `📋 Албан тушаал: ${a.position}\n` +
    `📞 Утас: ${a.phone}\n` +
    `✉️ И-мэйл: ${a.email}\n` +
    (a.address ? `📍 Хаяг: ${a.address}` : ''),
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}
