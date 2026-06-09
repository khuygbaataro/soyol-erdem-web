import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth-helpers';
export const dynamic = 'force-dynamic';
export async function GET() {
  const items = await prisma.timelineItem.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json(items);
}
export async function POST(req: Request) {
  await requireRole(['ADMIN']);
  const d = await req.json();
  const item = await prisma.timelineItem.create({ data: { year: Number(d.year), title: d.title, description: d.description, active: d.active ?? true, order: Number(d.order) || 0 } });
  return NextResponse.json(item, { status: 201 });
}
