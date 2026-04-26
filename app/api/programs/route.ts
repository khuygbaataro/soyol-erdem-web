import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { programSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export async function GET() {
  const items = await prisma.program.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] });
  return NextResponse.json({ data: items });
}

export async function POST(req: Request) {
  const { error } = await requireApiUser(['ADMIN']);
  if (error) return error;
  const json = await req.json().catch(() => null);
  const parsed = programSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
  }
  const exists = await prisma.program.findUnique({ where: { slug: parsed.data.slug } });
  if (exists) {
    return NextResponse.json({ error: 'Энэ slug аль хэдийн байна' }, { status: 409 });
  }
  const item = await prisma.program.create({
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
      language: parsed.data.language,
      admissionScore: parsed.data.admissionScore,
      active: parsed.data.active ?? true,
      icon: parsed.data.icon,
      order: parsed.data.order,
    },
  });
  return NextResponse.json({ data: item }, { status: 201 });
}
