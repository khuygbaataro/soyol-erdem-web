import { prisma } from '@/lib/prisma';
import { evaluateAnket, parseAnketField } from '@/lib/admission-eval';

/**
 * Элсэлтийн тайлангийн өгөгдлийг ачаалж, задлаж, хөтөлбөрөөр бүлэглэнэ.
 * Word (.docx) ба Excel (.xlsx) экспорт хоёул үүнийг ашиглана — босгын
 * үнэлгээ болон бүлэглэл нэг эх сурвалжтай.
 */
export const SUBJECT_PREFIX = 'Элсэлтийн анкет';
export const NO_PROGRAM = 'Бусад';

export interface ReportRow {
  name: string;
  email: string;
  phone: string;
  program: string;
  degree: string;
  age: string;
  examSummary: string;
  passed: boolean;
  isBachelor: boolean;
  noExam: boolean;
}

export async function loadAdmissionReport(activeProgram: string): Promise<{
  filtered: ReportRow[];
  groupList: [string, ReportRow[]][];
}> {
  const rows = await prisma.contactSubmission.findMany({
    where: { subject: { startsWith: SUBJECT_PREFIX } },
    orderBy: { createdAt: 'desc' },
  });

  const ankets: ReportRow[] = rows.map((r) => {
    const ev = evaluateAnket(r.message);
    return {
      name: r.name,
      email: r.email,
      phone: r.phone ?? '',
      program: parseAnketField(r.message, 'Хөтөлбөр') || NO_PROGRAM,
      degree: parseAnketField(r.message, 'Зэрэг'),
      age: parseAnketField(r.message, 'Нас'),
      examSummary: ev.examSummary,
      passed: ev.passedThreshold,
      isBachelor: ev.isBachelor,
      noExam: ev.noExam,
    };
  });

  const filtered = activeProgram
    ? ankets.filter((a) => a.program === activeProgram)
    : ankets;

  const groups = new Map<string, ReportRow[]>();
  for (const a of filtered) {
    const arr = groups.get(a.program) ?? [];
    arr.push(a);
    groups.set(a.program, arr);
  }
  const groupList: [string, ReportRow[]][] = Array.from(groups.entries()).sort(
    (a, b) =>
      a[0] === NO_PROGRAM ? 1 : b[0] === NO_PROGRAM ? -1 : b[1].length - a[1].length,
  );

  return { filtered, groupList };
}
