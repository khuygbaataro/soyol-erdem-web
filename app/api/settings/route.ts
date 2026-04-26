import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { settingsSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'main' } });
  return NextResponse.json({ data: settings });
}

export async function PUT(req: Request) {
  const { error } = await requireApiUser(['ADMIN']);
  if (error) return error;
  const json = await req.json().catch(() => null);
  const parsed = settingsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
  }
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {
      schoolName: parsed.data.schoolName,
      email: parsed.data.email,
      phonePrimary: parsed.data.phonePrimary,
      phoneSecondary: parsed.data.phoneSecondary || null,
      address: parsed.data.address,
      facebookUrl: parsed.data.facebookUrl || null,
      workingHours: parsed.data.workingHours,
    },
    create: {
      id: 'main',
      schoolName: parsed.data.schoolName,
      email: parsed.data.email,
      phonePrimary: parsed.data.phonePrimary,
      phoneSecondary: parsed.data.phoneSecondary || null,
      address: parsed.data.address,
      facebookUrl: parsed.data.facebookUrl || null,
      workingHours: parsed.data.workingHours,
    },
  });
  return NextResponse.json({ data: settings });
}
