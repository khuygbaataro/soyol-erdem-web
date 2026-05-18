import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { programSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

interface Ctx { params: { id: string } }

export async function PUT(req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN']);
  if (error) return error;
  const json = await req.json().catch(() => null);
  const parsed = programSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
  }
  const item = await prisma.program.update({
    where: { id: params.id },
    data: {
      name: parsed.data.name,
      slug: parsed.data.slug,
      code: parsed.data.code || null,
      degree: parsed.data.degree,
      duration: parsed.data.duration,
      shortDescription: parsed.data.shortDescription,
      fullDescription: parsed.data.fullDescription,
      skills: parsed.data.skills,
      curriculum: parsed.data.curriculum || null,
      careerOutlook: parsed.data.careerOutlook || null,
      nameEn: parsed.data.nameEn || null,
      nameJa: parsed.data.nameJa || null,
      shortDescriptionEn: parsed.data.shortDescriptionEn || null,
      shortDescriptionJa: parsed.data.shortDescriptionJa || null,
      fullDescriptionEn: parsed.data.fullDescriptionEn || null,
      fullDescriptionJa: parsed.data.fullDescriptionJa || null,
      skillsEn: parsed.data.skillsEn || null,
      skillsJa: parsed.data.skillsJa || null,
      careerOutlookEn: parsed.data.careerOutlookEn || null,
      careerOutlookJa: parsed.data.careerOutlookJa || null,
      language: parsed.data.language,
      admissionScore: parsed.data.admissionScore,
      active: parsed.data.active ?? true,
      icon: parsed.data.icon,
      order: parsed.data.order,
    },
  });
  return NextResponse.json({ data: item });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN']);
  if (error) return error;
  await prisma.program.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
