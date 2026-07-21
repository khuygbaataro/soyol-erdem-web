import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { contractCreateSchema } from '@/lib/validation';
import { requireApiUser } from '@/lib/auth-helpers';
import { generateContractToken, parseAnketFields } from '@/lib/contract-helpers';
import { DEFAULT_ACADEMIC_YEAR, DEFAULT_SCHOOL_REP } from '@/lib/contract';

/**
 * Оюутны гэрээ үүсгэх (админ). Элсэлтийн анкетаас
 * (`contactSubmissionId`) талбаруудыг урьдчилан бөглөж, эсвэл гараар
 * үүсгэнэ. Нэг анкетад давхар гэрээ үүсгэхээс сэргийлж, аль хэдийн
 * үүссэн бол түүнийг буцаана.
 */
export async function POST(req: Request) {
  const { user, error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const json = await req.json().catch(() => null);
  const parsed = contractCreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid payload', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const b = parsed.data;

  // Анкетаас урьдчилан бөглөх утгууд.
  let prefill = {
    lastName: b.lastName ?? '',
    firstName: b.firstName ?? '',
    programName: b.programName ?? '',
    phone: b.phone ?? '',
    email: b.email ?? '',
  };

  if (b.contactSubmissionId) {
    // Аль хэдийн энэ анкетад гэрээ үүссэн бол дахин үүсгэхгүй.
    const existing = await prisma.studentContract.findFirst({
      where: { contactSubmissionId: b.contactSubmissionId },
      orderBy: { createdAt: 'desc' },
    });
    if (existing) {
      return NextResponse.json(
        { token: existing.token, path: `/geree/${existing.token}`, reused: true },
        { status: 200 },
      );
    }

    const sub = await prisma.contactSubmission.findUnique({
      where: { id: b.contactSubmissionId },
    });
    if (!sub) {
      return NextResponse.json({ error: 'Анкет олдсонгүй' }, { status: 404 });
    }
    const fromAnket = parseAnketFields(sub.message);
    prefill = {
      lastName: b.lastName ?? fromAnket.lastName,
      firstName: b.firstName ?? fromAnket.firstName,
      programName: b.programName ?? fromAnket.programName,
      phone: b.phone ?? sub.phone ?? '',
      email: b.email ?? sub.email ?? '',
    };
  }

  const contract = await prisma.studentContract.create({
    data: {
      token: generateContractToken(),
      academicYear: b.academicYear || DEFAULT_ACADEMIC_YEAR,
      contractNo: b.contractNo || null,
      lastName: prefill.lastName,
      firstName: prefill.firstName,
      regNumber: b.regNumber ?? '',
      programName: prefill.programName,
      classYear: b.classYear || '1',
      phone: prefill.phone,
      email: prefill.email,
      schoolRep: b.schoolRep || user.name || DEFAULT_SCHOOL_REP,
      contactSubmissionId: b.contactSubmissionId ?? null,
    },
  });

  return NextResponse.json(
    { token: contract.token, path: `/geree/${contract.token}` },
    { status: 201 },
  );
}
