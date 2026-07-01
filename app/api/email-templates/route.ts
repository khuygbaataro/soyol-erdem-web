import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { emailTemplateSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const activeOnly = url.searchParams.get('active') === '1';
  const templates = await prisma.emailTemplate.findMany({
    where: activeOnly ? { active: true } : undefined,
    orderBy: [{ category: 'asc' }, { order: 'asc' }, { name: 'asc' }],
  });
  return NextResponse.json({ data: templates });
}

export async function POST(req: Request) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const json = await req.json().catch(() => null);
  const parsed = emailTemplateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const t = parsed.data;
  const created = await prisma.emailTemplate.create({
    data: {
      name: t.name,
      category: t.category,
      subject: t.subject,
      body: t.body,
      locale: t.locale ?? 'MN',
      active: t.active ?? true,
      order: t.order ?? 0,
    },
  });
  return NextResponse.json({ data: created }, { status: 201 });
}
