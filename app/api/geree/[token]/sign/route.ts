import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { prisma } from '@/lib/prisma';
import { contractSignSchema } from '@/lib/validation';
import { sendTelegram } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

/**
 * Оюутан гэрээндээ гарын үсэг зурж баталгаажуулна (нийтийн — token-оор
 * хамгаалагдсан). Гарын үсгийн PNG-г Vercel Blob-д хадгалж, талбаруудыг
 * шинэчилж, статусыг SIGNED болгоно.
 */
export async function POST(
  req: Request,
  { params }: { params: { token: string } },
) {
  const contract = await prisma.studentContract
    .findUnique({ where: { token: params.token } })
    .catch(() => null);
  if (!contract) {
    return NextResponse.json({ error: 'Гэрээ олдсонгүй' }, { status: 404 });
  }
  if (contract.status === 'SIGNED') {
    return NextResponse.json(
      { error: 'Энэ гэрээ аль хэдийн баталгаажсан байна.' },
      { status: 409 },
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = contractSignSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Мэдээлэл дутуу байна', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const d = parsed.data;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('[geree/sign] BLOB_READ_WRITE_TOKEN missing');
    return NextResponse.json(
      { error: 'Файл хадгалах тохиргоо дутуу байна. Сургуультай холбогдоно уу.' },
      { status: 500 },
    );
  }

  // data:image/png;base64,XXXX → Buffer
  const toBuffer = (dataUrl: string) => Buffer.from(dataUrl.split(',')[1] ?? '', 'base64');
  const studentBuf = toBuffer(d.signature);
  const schoolBuf = toBuffer(d.schoolSignature);
  if (studentBuf.length === 0 || schoolBuf.length === 0) {
    return NextResponse.json({ error: 'Гарын үсэг хоосон байна' }, { status: 400 });
  }

  let signatureUrl: string;
  let schoolSignatureUrl: string;
  try {
    const [studentBlob, schoolBlob] = await Promise.all([
      put(`contracts/${contract.token}-student.png`, studentBuf, {
        access: 'public',
        contentType: 'image/png',
        addRandomSuffix: true,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
      put(`contracts/${contract.token}-officer.png`, schoolBuf, {
        access: 'public',
        contentType: 'image/png',
        addRandomSuffix: true,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
    ]);
    signatureUrl = studentBlob.url;
    schoolSignatureUrl = schoolBlob.url;
  } catch (err) {
    console.error('[geree/sign] blob upload failed', err);
    return NextResponse.json(
      { error: 'Гарын үсэг хадгалахад алдаа гарлаа. Дахин оролдоно уу.' },
      { status: 500 },
    );
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    null;

  // Зөвхөн хараахан баталгаажаагүй байгаа тохиолдолд шинэчилнэ (давхар
  // илгээлтээс сэргийлэх).
  const result = await prisma.studentContract.updateMany({
    where: { token: contract.token, status: 'PENDING' },
    data: {
      schoolRep: d.schoolRep,
      schoolSignatureUrl,
      lastName: d.lastName,
      firstName: d.firstName,
      regNumber: d.regNumber,
      programName: d.programName,
      classYear: d.classYear,
      phone: d.phone,
      email: d.email,
      signatureUrl,
      signedName: d.signedName,
      signedAt: new Date(),
      signerIp: ip,
      status: 'SIGNED',
    },
  });

  if (result.count === 0) {
    return NextResponse.json(
      { error: 'Энэ гэрээ аль хэдийн баталгаажсан байна.' },
      { status: 409 },
    );
  }

  const fullName = `${d.lastName} ${d.firstName}`.trim();
  await sendTelegram(
    `✍️ Оюутны гэрээ баталгаажлаа\n` +
      `👤 ${fullName}\n` +
      `🎓 ${d.programName || '—'} · ${d.classYear}-р анги\n` +
      `📞 ${d.phone || '—'}\n` +
      `🆔 РД: ${d.regNumber}`,
  );

  return NextResponse.json({ ok: true, path: `/geree/${contract.token}` }, { status: 200 });
}
