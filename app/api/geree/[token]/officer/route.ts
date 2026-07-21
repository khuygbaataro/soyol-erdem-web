import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { prisma } from '@/lib/prisma';
import { contractOfficerSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

/**
 * Элсэлтийн албаны ажилтан гэрээнд гарын үсгээ зурна (админ). Оюутанд
 * холбоос илгээхээс өмнө хийгдэнэ. Ажилтны нэр + гарын үсгийн PNG-г
 * хадгална; статус PENDING хэвээр (оюутан хараахан зураагүй).
 */
export async function POST(
  req: Request,
  { params }: { params: { token: string } },
) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const contract = await prisma.studentContract
    .findUnique({ where: { token: params.token } })
    .catch(() => null);
  if (!contract) {
    return NextResponse.json({ error: 'Гэрээ олдсонгүй' }, { status: 404 });
  }
  if (contract.status === 'SIGNED') {
    return NextResponse.json(
      { error: 'Гэрээ аль хэдийн баталгаажсан тул засах боломжгүй.' },
      { status: 409 },
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = contractOfficerSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Мэдээлэл дутуу байна', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const d = parsed.data;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('[geree/officer] BLOB_READ_WRITE_TOKEN missing');
    return NextResponse.json(
      { error: 'Файл хадгалах тохиргоо дутуу байна.' },
      { status: 500 },
    );
  }

  const buf = Buffer.from(d.schoolSignature.split(',')[1] ?? '', 'base64');
  if (buf.length === 0) {
    return NextResponse.json({ error: 'Гарын үсэг хоосон байна' }, { status: 400 });
  }

  let schoolSignatureUrl: string;
  try {
    const blob = await put(`contracts/${contract.token}-officer.png`, buf, {
      access: 'public',
      contentType: 'image/png',
      addRandomSuffix: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    schoolSignatureUrl = blob.url;
  } catch (err) {
    console.error('[geree/officer] blob upload failed', err);
    return NextResponse.json(
      { error: 'Гарын үсэг хадгалахад алдаа гарлаа. Дахин оролдоно уу.' },
      { status: 500 },
    );
  }

  await prisma.studentContract.update({
    where: { token: contract.token },
    data: { schoolRep: d.schoolRep, schoolSignatureUrl },
  });

  return NextResponse.json({ ok: true });
}
