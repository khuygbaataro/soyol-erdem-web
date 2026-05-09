import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jobApplicationSchema } from '@/lib/validation';

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

  return NextResponse.json({ ok: true }, { status: 201 });
}
