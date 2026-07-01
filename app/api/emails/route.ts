import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { emailSendSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';
import { sendEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

/** List sent emails for one submission (compose UI history panel). */
export async function GET(req: Request) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;
  const url = new URL(req.url);
  const submissionId = url.searchParams.get('submissionId');
  const messages = await prisma.emailMessage.findMany({
    where: submissionId ? { contactSubmissionId: submissionId } : undefined,
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return NextResponse.json({ data: messages });
}

export async function POST(req: Request) {
  const { user, error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const json = await req.json().catch(() => null);
  const parsed = emailSendSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const d = parsed.data;
  const result = await sendEmail({
    to: d.to,
    toName: d.toName || null,
    subject: d.subject,
    text: d.body,
  });

  // Log every attempt — success or failure — so staff can always see what
  // was sent, to which address, and whether it went through.
  const logged = await prisma.emailMessage.create({
    data: {
      contactSubmissionId: d.contactSubmissionId || null,
      toEmail: d.to,
      toName: d.toName || null,
      subject: d.subject,
      body: d.body,
      status: result.ok ? 'SENT' : 'FAILED',
      providerId: result.id || null,
      errorText: result.ok ? null : result.error || 'Тодорхойгүй алдаа',
      templateId: d.templateId || null,
      aiAssisted: d.aiAssisted ?? false,
      sentByUserId: user.id,
    },
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? 'Имэйл илгээхэд алдаа гарлаа', data: logged },
      { status: 502 },
    );
  }
  return NextResponse.json({ data: logged }, { status: 201 });
}
