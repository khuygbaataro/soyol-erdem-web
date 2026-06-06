import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { highSchoolApplicationSchema } from '@/lib/validation';
import { sendTelegram } from '@/lib/telegram';

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = highSchoolApplicationSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const d = parsed.data;
  try {
    await prisma.highSchoolApplication.create({
      data: {
        studentName: d.studentName,
        studentBirth: d.studentBirth || null,
        currentSchool: d.currentSchool || null,
        currentGpa: d.currentGpa || null,
        track: d.track || null,
        guardianName: d.guardianName,
        guardianRel: d.guardianRel || null,
        phone: d.phone,
        email: d.email || null,
        message: d.message || null,
      },
    });
  } catch (err) {
    console.error('[high-school applications POST]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  const trackLabel: Record<string, string> = {
    japan: 'Япон хэл, соёл',
    it: 'Мэдээллийн технологи',
    other: 'Бусад / Хосолсон',
  };

  await sendTelegram(
    `🎓 Шинэ элсэлтийн хүсэлт\n` +
    `👤 Сурагч: ${d.studentName}\n` +
    `🏫 Сургууль: ${d.currentSchool || '—'}\n` +
    `📚 Чиглэл: ${d.track ? (trackLabel[d.track] ?? d.track) : '—'}\n` +
    `👨‍👩‍👧 Эцэг эх: ${d.guardianName}\n` +
    `📞 Утас: ${d.phone}\n` +
    (d.email ? `✉️ И-мэйл: ${d.email}\n` : '') +
    (d.message ? `\n💬 ${d.message}` : ''),
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}
