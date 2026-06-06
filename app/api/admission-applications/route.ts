import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { admissionApplicationSchema } from '@/lib/validation';
import { sendTelegram } from '@/lib/telegram';

const CITIZENSHIP_LABEL: Record<string, string> = {
  MN: 'Монгол',
  FOREIGN: 'Гадаад',
};

const DEGREE_LABEL: Record<string, string> = {
  BACHELOR: 'Бакалавр',
  MASTER: 'Магистр',
};

/**
 * Receives an admission registration submission. We don't yet have a
 * dedicated `AdmissionApplication` table — applications land in the
 * existing `ContactSubmission` panel with the structured fields rendered
 * as a readable Markdown block, and the subject prefixed so the admin
 * can sort applicants out of the general contact stream.
 */
export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = admissionApplicationSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const a = parsed.data;
  const fullName = `${a.lastName} ${a.firstName}`.trim();

  const examLines = a.examScores
    .filter((s) => s.subject || s.score)
    .map((s) => `  • ${s.subject}: ${s.score}`)
    .join('\n');
  const phoneLines = a.phones
    .map((p, i) => `  ${i + 1}. ${p}`)
    .join('\n');

  const message = [
    '== ЭЛСЭЛТИЙН АНКЕТ ==',
    '',
    `Иргэншил: ${CITIZENSHIP_LABEL[a.citizenship] ?? a.citizenship}`,
    `Зэрэг: ${DEGREE_LABEL[a.degree] ?? a.degree}`,
    `Хөтөлбөр: ${a.programName}`,
    `Овог: ${a.lastName}`,
    `Нэр: ${a.firstName}`,
    `Боловсрол: ${a.education}`,
    '',
    'ЭЕШ-ын оноо:',
    examLines || '  —',
    '',
    'Холбоо барих утас:',
    phoneLines,
    '',
    `И-мэйл: ${a.email}`,
  ].join('\n');

  await prisma.contactSubmission.create({
    data: {
      name: fullName,
      email: a.email,
      phone: a.phones[0] ?? null,
      subject: `Элсэлтийн анкет — ${fullName}`,
      message,
    },
  });

  await sendTelegram(
    `📋 Шинэ элсэлтийн анкет\n` +
    `👤 ${fullName}\n` +
    `🎓 ${DEGREE_LABEL[a.degree] ?? a.degree} — ${a.programName}\n` +
    `🌐 ${CITIZENSHIP_LABEL[a.citizenship] ?? a.citizenship}\n` +
    `📞 ${a.phones[0] ?? '—'}\n` +
    `✉️ ${a.email}`,
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}
