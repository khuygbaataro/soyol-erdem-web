import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireApiUser } from '@/lib/auth-helpers';
import { admissionStatusSchema } from '@/lib/validation';

export const dynamic = 'force-dynamic';

/**
 * Update an admission anket's follow-up status from the /admin/admissions
 * list — "утсаар ярьсан" flag and/or the enrollment-likelihood rating.
 * Saved inline (no form) so it stays quick for staff.
 */
export async function PATCH(req: Request) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const json = await req.json().catch(() => null);
  const parsed = admissionStatusSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { submissionId, called, enrollLikelihood } = parsed.data;
  const data: {
    called?: boolean;
    calledAt?: Date | null;
    enrollLikelihood?: string | null;
  } = {};
  if (called !== undefined) {
    data.called = called;
    data.calledAt = called ? new Date() : null;
  }
  if (enrollLikelihood !== undefined) {
    data.enrollLikelihood = enrollLikelihood === '' ? null : enrollLikelihood;
  }

  try {
    const updated = await prisma.contactSubmission.update({
      where: { id: submissionId },
      data,
      select: { id: true, called: true, enrollLikelihood: true },
    });
    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json({ error: 'Бүртгэл олдсонгүй' }, { status: 404 });
  }
}
