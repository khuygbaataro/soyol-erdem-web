import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  PageOrientation,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import { requireApiUser } from '@/lib/auth-helpers';
import { MIN_EXAM_SUBJECTS, PASS_SCORE } from '@/lib/admission-eval';
import { loadAdmissionReport, NO_PROGRAM } from '@/lib/admission-report-data';

export const dynamic = 'force-dynamic';

/**
 * Захиралд зориулсан элсэлтийн анкетын тайланг жинхэнэ Word (.docx) файлаар
 * татах. Хөтөлбөрөөр бүлэглэж, оюутан бүрийн нэр / нас / утас / и-мэйл /
 * ЭЕШ оноо / босго давсан эсэхийг харуулна + нэгдсэн статистик.
 *
 * ?layout=portrait → босоо A4, бусад тохиолдолд хэвтээ A4.
 * Босгын шалгуур lib/admission-eval.ts-тэй ижил.
 */
const HDR_FILL = '1E2A44';
const PASS_FILL = 'EAF7EE';
const TOTAL_FILL = 'F0EFE9';
const GREEN = '1A7A3C';
const FONT = 18; // half-points → 9pt

const BORDER = { style: BorderStyle.SINGLE, size: 4, color: '999999' };
const CELL_BORDERS = { top: BORDER, bottom: BORDER, left: BORDER, right: BORDER };

function headerCell(text: string, widthPct: number): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: HDR_FILL },
    borders: CELL_BORDERS,
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: true, color: 'FFFFFF', size: FONT })],
      }),
    ],
  });
}

function textCell(
  text: string,
  widthPct: number,
  opts?: { center?: boolean; fill?: string; bold?: boolean; color?: string },
): TableCell {
  return new TableCell({
    width: { size: widthPct, type: WidthType.PERCENTAGE },
    borders: CELL_BORDERS,
    shading: opts?.fill
      ? { type: ShadingType.CLEAR, color: 'auto', fill: opts.fill }
      : undefined,
    children: [
      new Paragraph({
        alignment: opts?.center ? AlignmentType.CENTER : AlignmentType.LEFT,
        children: [
          new TextRun({ text: text || '—', size: FONT, bold: opts?.bold, color: opts?.color }),
        ],
      }),
    ],
  });
}

export async function GET(req: Request) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const sp = new URL(req.url).searchParams;
  const activeProgram = sp.get('program') || '';
  const isPortrait = sp.get('layout') === 'portrait';

  const { filtered, groupList } = await loadAdmissionReport(activeProgram);

  const totalPassed = filtered.filter((a) => a.passed).length;
  const totalNoExam = filtered.filter((a) => a.noExam).length;
  const today = new Date().toLocaleDateString('mn-MN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const heading = activeProgram
    ? `Элсэлтийн анкетын тайлан — ${activeProgram}`
    : 'Элсэлтийн анкетын тайлан';

  const children: (Paragraph | Table)[] = [];

  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: heading, bold: true, size: 30 })],
    }),
    new Paragraph({
      spacing: { after: 160 },
      children: [
        new TextRun({
          text: `Соёл Эрдэм Дээд Сургууль · ${today} · Нийт ${filtered.length} анкет`,
          size: FONT,
          color: '555555',
        }),
      ],
    }),
  );

  // ── Summary statistics ────────────────────────────────────────
  children.push(
    new Paragraph({
      spacing: { before: 120, after: 80 },
      children: [new TextRun({ text: 'Нэгдсэн статистик', bold: true, size: 24 })],
    }),
  );

  const summaryHeader = new TableRow({
    tableHeader: true,
    children: [
      headerCell('Хөтөлбөр', 46),
      headerCell('Нийт анкет', 18),
      headerCell('Босго давсан', 18),
      headerCell('ЭЕШ өгөөгүй', 18),
    ],
  });
  const summaryBody = groupList.map(([program, list]) => {
    const passed = list.filter((a) => a.passed).length;
    const noExam = list.filter((a) => a.noExam).length;
    return new TableRow({
      children: [
        textCell(program, 46),
        textCell(String(list.length), 18, { center: true }),
        textCell(String(passed), 18, { center: true, color: GREEN, bold: true }),
        textCell(String(noExam), 18, { center: true }),
      ],
    });
  });
  const summaryTotal = new TableRow({
    children: [
      textCell('Нийт', 46, { bold: true, fill: TOTAL_FILL }),
      textCell(String(filtered.length), 18, { center: true, bold: true, fill: TOTAL_FILL }),
      textCell(String(totalPassed), 18, { center: true, bold: true, color: GREEN, fill: TOTAL_FILL }),
      textCell(String(totalNoExam), 18, { center: true, bold: true, fill: TOTAL_FILL }),
    ],
  });
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [summaryHeader, ...summaryBody, summaryTotal],
    }),
  );

  // ── Per-program student tables ────────────────────────────────
  for (const [program, list] of groupList) {
    const passed = list.filter((a) => a.passed).length;
    children.push(
      new Paragraph({
        spacing: { before: 260, after: 80 },
        children: [
          new TextRun({ text: program, bold: true, size: 24 }),
          new TextRun({
            text: `   (нийт ${list.length}, босго давсан ${passed})`,
            size: FONT,
            color: '777777',
          }),
        ],
      }),
    );

    const header = new TableRow({
      tableHeader: true,
      children: [
        headerCell('№', 4),
        headerCell('Овог нэр', 20),
        headerCell('Нас', 6),
        headerCell('Утас', 12),
        headerCell('И-мэйл', 22),
        headerCell('ЭЕШ оноо', 24),
        headerCell('Босго', 12),
      ],
    });
    const body = list.map((a, i) => {
      const fill = a.passed ? PASS_FILL : undefined;
      const statusText = a.isBachelor
        ? 'Тэнцсэн (бакалавр)'
        : a.passed
          ? 'Тэнцсэн ✓'
          : a.noExam
            ? 'ЭЕШ өгөөгүй'
            : '—';
      const exams = a.examSummary || (a.isBachelor ? 'Бакалавр зэрэгтэй' : '—');
      return new TableRow({
        children: [
          textCell(String(i + 1), 4, { center: true, fill }),
          textCell(a.name, 20, { fill }),
          textCell(a.age, 6, { center: true, fill }),
          textCell(a.phone, 12, { fill }),
          textCell(a.email, 22, { fill }),
          textCell(exams, 24, { fill }),
          textCell(statusText, 12, {
            center: true,
            fill,
            bold: a.passed,
            color: a.passed ? GREEN : undefined,
          }),
        ],
      });
    });
    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [header, ...body],
      }),
    );
  }

  children.push(
    new Paragraph({
      spacing: { before: 240 },
      children: [
        new TextRun({
          text: `Тайлбар: "Босго давсан" гэж боловсрол нь бакалавр (аль хэдийн зэрэгтэй) ЭСВЭЛ ЭЕШ-ийн ${MIN_EXAM_SUBJECTS} хичээл (нэг нь Монгол хэл) БҮГД ${PASS_SCORE}-с дээш оноотой байхыг хэлнэ.`,
          size: 16,
          color: '666666',
          italics: true,
        }),
      ],
    }),
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: isPortrait
              ? { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT }
              : { width: 16838, height: 11906, orientation: PageOrientation.LANDSCAPE },
            margin: { top: 680, bottom: 680, left: 680, right: 680 },
          },
        },
        children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const filename = `elselt-tailan${isPortrait ? '-a4' : ''}-${new Date()
    .toISOString()
    .slice(0, 10)}.docx`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
