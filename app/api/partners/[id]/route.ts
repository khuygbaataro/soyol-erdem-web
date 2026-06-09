import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await requireRole(['ADMIN']);
  const data = await req.json();
  const item = await prisma.partner.update({
    where: { id: params.id },
    data: {
      type:         data.type,
      name:         data.name,
      nameJp:       data.nameJp       || null,
      logo:         data.logo         || null,
      headline:     data.headline     || null,
      location:     data.location     || null,
      partnerSince: data.partnerSince || null,
      detail:       data.detail       || null,
      url:          data.url          || null,
      activities:   data.activities   || null,
      active:       data.active       ?? true,
      order:        Number(data.order) || 0,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await requireRole(['ADMIN']);
  await prisma.partner.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
