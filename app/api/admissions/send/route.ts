import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireApiUser } from '@/lib/auth-helpers';
import { sendEmail, renderTemplate } from '@/lib/email';
import { categoryForProgram } from '@/lib/program-email';

export const dynamic = 'force-dynamic';

/**
 * Quick-send the program's info template to an admission anket, straight
 * from the /admin/admissions list. Finds the template by the applicant's
 * program, renders placeholders, sends, and logs to EmailMessage.
 */
export async function POST(req: Request) {
  const { user, error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const json = await req.json().catch(() => null);
  const submissionId = typeof json?.submissionId === 'string' ? json.submissionId : '';
  if (!submissionId) {
    return NextResponse.json({ error: 'submissionId шаардлагатай' }, { status: 400 });
  }

  const sub = await prisma.contactSubmission.findUnique({ where: { id: submissionId } });
  if (!sub) {
    return NextResponse.json({ error: 'Бүртгэл олдсонгүй' }, { status: 404 });
  }

  const programName = sub.message.match(/Хөтөлбөр:\s*(.+)/)?.[1]?.trim() ?? '';
  if (!programName) {
    return NextResponse.json({ error: 'Энэ бүртгэлд хөтөлбөр алга' }, { status: 400 });
  }

  const prog = await prisma.program.findFirst({
    where: { name: programName },
    select: { slug: true, department: true },
  });
  const category = prog ? categoryForProgram(prog) : null;
  const template = category
    ? await prisma.emailTemplate.findFirst({
        where: { category, active: true },
        orderBy: { order: 'asc' },
      })
    : null;
  if (!template) {
    return NextResponse.json(
      {
        error: `"${programName}" хөтөлбөрт имэйл загвар алга. Эхлээд "Хөтөлбөр бүрээр загвар үүсгэх" дарна уу.`,
      },
      { status: 400 },
    );
  }

  // "Овог Нэр" → best-effort split for {{firstName}} / {{lastName}}.
  const parts = sub.name.trim().split(/\s+/).filter(Boolean);
  const vars = {
    fullName: sub.name,
    lastName: parts[0] ?? sub.name,
    firstName: parts.length > 1 ? parts.slice(1).join(' ') : (parts[0] ?? sub.name),
    programName,
  };
  const subject = renderTemplate(template.subject, vars);
  const body = renderTemplate(template.body, vars);

  const result = await sendEmail({
    to: sub.email,
    toName: sub.name,
    subject,
    text: body,
  });

  const logged = await prisma.emailMessage.create({
    data: {
      contactSubmissionId: sub.id,
      toEmail: sub.email,
      toName: sub.name,
      subject,
      body,
      status: result.ok ? 'SENT' : 'FAILED',
      providerId: result.id || null,
      errorText: result.ok ? null : result.error || 'Тодорхойгүй алдаа',
      templateId: template.id,
      aiAssisted: false,
      sentByUserId: user.id,
    },
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? 'Имэйл илгээхэд алдаа гарлаа', data: logged },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, data: logged }, { status: 201 });
}
