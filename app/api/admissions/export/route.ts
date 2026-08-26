import ExcelJS from 'exceljs';
import { requireApiUser } from '@/lib/auth-helpers';
import { loadAdmissionReport } from '@/lib/admission-report-data';

export const dynamic = 'force-dynamic';

/**
 * Элсэлтийн анкетуудыг Excel (.xlsx) файлаар татах. Нэг хуудсанд бүх
 * оюутан (шүүх/эрэмбэлэхэд бэлэн, AutoFilter-тэй), нөгөө хуудсанд
 * хөтөлбөрөөрх статистик. ?program=… шүүлтүүрийг дагана.
 * Босгын шалгуур lib/admission-eval.ts-тэй ижил.
 */
const HDR_ARGB = 'FF1E2A44';
const PASS_ARGB = 'FFEAF7EE';

export async function GET(req: Request) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const activeProgram = new URL(req.url).searchParams.get('program') || '';
  const { filtered, groupList } = await loadAdmissionReport(activeProgram);

  const wb = new ExcelJS.Workbook();

  // ── Sheet 1: анкетууд ─────────────────────────────────────────
  const ws = wb.addWorksheet('Анкетууд');
  ws.columns = [
    { header: '№', key: 'no', width: 5 },
    { header: 'Хөтөлбөр', key: 'program', width: 22 },
    { header: 'Овог нэр', key: 'name', width: 24 },
    { header: 'Зэрэг', key: 'degree', width: 12 },
    { header: 'Нас', key: 'age', width: 6 },
    { header: 'Утас', key: 'phone', width: 14 },
    { header: 'И-мэйл', key: 'email', width: 28 },
    { header: 'ЭЕШ оноо', key: 'exams', width: 42 },
    { header: 'Босго давсан', key: 'passed', width: 16 },
  ];

  const head = ws.getRow(1);
  head.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  head.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HDR_ARGB } };
  head.alignment = { vertical: 'middle' };
  ws.views = [{ state: 'frozen', ySplit: 1 }];

  let n = 0;
  for (const [program, list] of groupList) {
    for (const a of list) {
      n++;
      const passedText = a.isBachelor
        ? 'Тийм (бакалавр)'
        : a.passed
          ? 'Тийм'
          : a.noExam
            ? 'ЭЕШ өгөөгүй'
            : 'Үгүй';
      const row = ws.addRow({
        no: n,
        program,
        name: a.name,
        degree: a.degree,
        age: a.age,
        phone: a.phone,
        email: a.email,
        exams: a.examSummary || (a.isBachelor ? 'Бакалавр зэрэгтэй' : ''),
        passed: passedText,
      });
      if (a.passed) {
        row.eachCell((c) => {
          c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PASS_ARGB } };
        });
      }
    }
  }
  ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: 9 } };

  // ── Sheet 2: статистик ────────────────────────────────────────
  const ws2 = wb.addWorksheet('Статистик');
  ws2.columns = [
    { header: 'Хөтөлбөр', key: 'program', width: 26 },
    { header: 'Нийт', key: 'total', width: 10 },
    { header: 'Босго давсан', key: 'passed', width: 14 },
    { header: 'ЭЕШ өгөөгүй', key: 'noexam', width: 14 },
  ];
  const head2 = ws2.getRow(1);
  head2.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  head2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HDR_ARGB } };
  for (const [program, list] of groupList) {
    ws2.addRow({
      program,
      total: list.length,
      passed: list.filter((a) => a.passed).length,
      noexam: list.filter((a) => a.noExam).length,
    });
  }
  const totalRow = ws2.addRow({
    program: 'Нийт',
    total: filtered.length,
    passed: filtered.filter((a) => a.passed).length,
    noexam: filtered.filter((a) => a.noExam).length,
  });
  totalRow.font = { bold: true };

  const buf = await wb.xlsx.writeBuffer();
  const filename = `elselt-anket-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new Response(new Uint8Array(buf as ArrayBuffer), {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
