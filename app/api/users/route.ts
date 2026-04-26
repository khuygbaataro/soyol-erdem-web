import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { userSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export async function GET() {
  const { error } = await requireApiUser(['ADMIN']);
  if (error) return error;
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
  });
  return NextResponse.json({ data: users });
}

export async function POST(req: Request) {
  const { error } = await requireApiUser(['ADMIN']);
  if (error) return error;
  const json = await req.json().catch(() => null);
  const parsed = userSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
  }
  const exists = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) {
    return NextResponse.json({ error: 'Энэ имэйл аль хэдийн бүртгэлтэй' }, { status: 409 });
  }
  const hash = await bcrypt.hash(parsed.data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: hash,
      role: parsed.data.role,
      active: parsed.data.active ?? true,
    },
    select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
  });
  return NextResponse.json({ data: user }, { status: 201 });
}
