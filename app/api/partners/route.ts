import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const items = await prisma.partner.findMany({ orderBy: [{ type: 'asc' }, { order: 'asc' }] });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  await requireRole(['ADMIN']);
  const data = await req.json();
  const item = await prisma.partner.create({
    data: {
      site:         data.site === 'HIGH_SCHOOL' ? 'HIGH_SCHOOL' : 'UNIVERSITY',
      type:         data.type         ?? 'japan-university',
      name:         data.name         ?? '',
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
  return NextResponse.json(item, { status: 201 });
}
