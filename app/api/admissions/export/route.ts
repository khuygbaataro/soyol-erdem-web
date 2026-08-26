import ExcelJS from 'exceljs';
import { requireApiUser } from '@/lib/auth-helpers';
import { loadAdmissionReport } from '@/lib/admission-report-data';

export const dynamic = 'force-dynamic';

/**
 * Элсэлтийн анкетуудыг сургуулийн албан ёсны бүртгэлийн загвараар (16
 * багана) Excel (.xlsx) файлд буулгана. Бидний цуглуулсан талбарууд
 * (Овог, Нэр, ЭЕШ оноо, мэргэжил, утас, и-мэйл) урьдчилан бөглөгдөж,
 * үлдсэн баганууд (регистр, гэрийн хаяг, бичиг баримт г.м) элсэлтийн үед
 * гараар бөглөхөд зориулж хоосон үлдэнэ. ?program=… шүүлтүүрийг дагана.
 */
const HDR_ARGB = 'FF1E2A44';
const PASS_ARGB = 'FFEAF7EE';
const THIN = { style: 'thin' as const, color: { argb: 'FFBFBFBF' } };
const BORDERS = { top: THIN, bottom: THIN, left: THIN, right: THIN };

const HEADERS = [
  '№',
  'Овог',
  'Нэр',
  'Төгссөн сургууль',
  'Төгссөн он',
  'ЭЕШ-ийн оноо',
  'Элсэн суралцах мэргэжил',
  'Регистр',
  'Гэрийн хаяг',
  'Утасны дугаар',
  'mail хаяг',
  'Элсэн суралцах нөхцөл',
  'Хураалгасан бичиг баримтууд',
  'Элсэлтийн хураамж',
  'Тайлбар',
  'facebook',
];
const WIDTHS = [5, 16, 16, 24, 10, 40, 24, 15, 24, 15, 26, 18, 22, 12, 20, 18];

export async function GET(req: Request) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const activeProgram = new URL(req.url).searchParams.get('program') || '';
  const { filtered, groupList } = await loadAdmissionReport(activeProgram);

  const now = new Date();
  const y = now.getMonth() + 1 >= 6 ? now.getFullYear() : now.getFullYear() - 1;
  const title = `${y}-${y + 1} оны элсэлтийн бүртгэл${activeProgram ? ` — ${activeProgram}` : ''}`;

  const wb = new ExcelJS.Workbook();

  // ── Sheet 1: бүртгэл (албан ёсны загвар) ──────────────────────
  const ws = wb.addWorksheet('Элсэлт');
  ws.columns = WIDTHS.map((w) => ({ width: w }));

  // Title (row 1, merged across all 16 columns)
  ws.mergeCells(1, 1, 1, HEADERS.length);
  const titleCell = ws.getCell(1, 1);
  titleCell.value = title;
  titleCell.font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HDR_ARGB } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(1).height = 26;

  // Header (row 2)
  const headerRow = ws.getRow(2);
  HEADERS.forEach((h, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = h;
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HDR_ARGB } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = BORDERS;
  });
  headerRow.height = 34;

  // Data (row 3+)
  let n = 0;
  for (const [program, list] of groupList) {
    for (const a of list) {
      n++;
      const tailbar = a.isBachelor
        ? 'Босго давсан (бакалавр)'
        : a.passed
          ? 'Босго давсан'
          : a.noExam
            ? 'ЭЕШ өгөөгүй'
            : 'Босго хүрээгүй';
      const row = ws.addRow([
        n,
        a.lastName,
        a.firstName,
        '', // Төгссөн сургууль
        '', // Төгссөн он
        a.examSummary,
        program,
        '', // Регистр
        '', // Гэрийн хаяг
        a.phone,
        a.email,
        '', // Элсэн суралцах нөхцөл
        '', // Хураалгасан бичиг баримтууд
        '', // Элсэлтийн хураамж
        tailbar,
        '', // facebook
      ]);
      row.eachCell({ includeEmpty: true }, (cell, col) => {
        cell.border = BORDERS;
        cell.alignment = {
          vertical: 'top',
          wrapText: true,
          horizontal: col === 1 ? 'center' : 'left',
        };
        if (a.passed) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: PASS_ARGB } };
        }
      });
    }
  }

  ws.autoFilter = { from: { row: 2, column: 1 }, to: { row: 2, column: HEADERS.length } };
  ws.views = [{ state: 'frozen', ySplit: 2 }];

  // ── Sheet 2: статистик ────────────────────────────────────────
  const ws2 = wb.addWorksheet('Статистик');
  ws2.columns = [
    { header: 'Хөтөлбөр', key: 'program', width: 26 },
    { header: 'Нийт', key: 'total', width: 10 },
    { header: 'Босго давсан', key: 'passed', width: 14 },
    { header: 'ЭЕШ өгөөгүй', key: 'noexam', width: 14 },
  ];
  const h2 = ws2.getRow(1);
  h2.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  h2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HDR_ARGB } };
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
  const filename = `elselt-burtgel-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new Response(new Uint8Array(buf as ArrayBuffer), {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
