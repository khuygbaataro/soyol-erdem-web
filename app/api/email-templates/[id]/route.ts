import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { emailTemplateSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

interface Ctx {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Ctx) {
  const t = await prisma.emailTemplate.findUnique({ where: { id: params.id } });
  if (!t) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: t });
}

export async function PUT(req: Request, { params }: Ctx) {
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
  const updated = await prisma.emailTemplate.update({
    where: { id: params.id },
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
  return NextResponse.json({ data: updated });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;
  await prisma.emailTemplate.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
