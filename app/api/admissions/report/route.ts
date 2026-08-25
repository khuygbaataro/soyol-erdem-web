import { prisma } from '@/lib/prisma';
import { requireApiUser } from '@/lib/auth-helpers';

export const dynamic = 'force-dynamic';

/**
 * Захиралд зориулсан элсэлтийн анкетын тайланг Word (.doc) файлаар татах.
 * Хөтөлбөрөөр бүлэглэж, оюутан бүрийн нэр / утас / и-мэйл / ЭЕШ оноо /
 * босго давсан эсэхийг харуулна + нэгдсэн статистик. Word-д нээгдэж,
 * шууд хэвлэгддэг HTML-based .doc.
 *
 * Босгын шалгуур нь /admin/admissions хуудастай ижил: ЭЕШ-ийн оноо 490-с
 * дээш хичээл 2-оос олон бол "босго давсан" гэж үзнэ.
 */
const SUBJECT_PREFIX = 'Элсэлтийн анкет';
const NO_PROGRAM = 'Бусад';
const PASS_SCORE = 490;
const PASS_SUBJECTS = 2;

function field(message: string, label: string): string {
  return message.match(new RegExp(`${label}:\\s*(.+)`))?.[1]?.trim() ?? '';
}

function parseExamScores(message: string): { subject: string; score: number }[] {
  const out: { subject: string; score: number }[] = [];
  for (const m of message.matchAll(/^\s*•\s*(.+?):\s*([\d]+(?:[.,]\d+)?)\s*$/gm)) {
    const score = Number(m[2].replace(',', '.'));
    if (!Number.isNaN(score)) out.push({ subject: m[1].trim(), score });
  }
  return out;
}

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function GET(req: Request) {
  const { error } = await requireApiUser(['ADMIN', 'EDITOR']);
  if (error) return error;

  const activeProgram = new URL(req.url).searchParams.get('program') || '';

  const rows = await prisma.contactSubmission.findMany({
    where: { subject: { startsWith: SUBJECT_PREFIX } },
    orderBy: { createdAt: 'desc' },
  });

  type Row = {
    name: string;
    email: string;
    phone: string;
    program: string;
    degree: string;
    age: string;
    examSummary: string;
    passed: boolean;
    noExam: boolean;
  };

  const ankets: Row[] = rows.map((r) => {
    const scores = parseExamScores(r.message);
    const highScoreCount = scores.filter((s) => s.score >= PASS_SCORE).length;
    return {
      name: r.name,
      email: r.email,
      phone: r.phone ?? '',
      program: field(r.message, 'Хөтөлбөр') || NO_PROGRAM,
      degree: field(r.message, 'Зэрэг'),
      age: field(r.message, 'Нас'),
      examSummary: scores.map((s) => `${s.subject}: ${s.score}`).join(', '),
      passed: highScoreCount >= PASS_SUBJECTS,
      noExam: /ЭЕШ өгөөгүй/.test(r.message),
    };
  });

  const filtered = activeProgram
    ? ankets.filter((a) => a.program === activeProgram)
    : ankets;

  const groups = new Map<string, Row[]>();
  for (const a of filtered) {
    const arr = groups.get(a.program) ?? [];
    arr.push(a);
    groups.set(a.program, arr);
  }
  const groupList = Array.from(groups.entries()).sort((a, b) =>
    a[0] === NO_PROGRAM ? 1 : b[0] === NO_PROGRAM ? -1 : b[1].length - a[1].length,
  );

  const totalPassed = filtered.filter((a) => a.passed).length;
  const totalNoExam = filtered.filter((a) => a.noExam).length;
  const today = new Date().toLocaleDateString('mn-MN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // ── Summary statistics table ──────────────────────────────────
  const summaryRows = groupList
    .map(([program, list]) => {
      const passed = list.filter((a) => a.passed).length;
      const noExam = list.filter((a) => a.noExam).length;
      return `<tr>
        <td>${esc(program)}</td>
        <td class="c">${list.length}</td>
        <td class="c pass">${passed}</td>
        <td class="c">${noExam}</td>
      </tr>`;
    })
    .join('');

  const summaryTable = `
    <table class="tbl">
      <tr class="head">
        <th>Хөтөлбөр</th><th>Нийт анкет</th><th>Босго давсан</th><th>ЭЕШ өгөөгүй</th>
      </tr>
      ${summaryRows}
      <tr class="total">
        <td>Нийт</td>
        <td class="c">${filtered.length}</td>
        <td class="c pass">${totalPassed}</td>
        <td class="c">${totalNoExam}</td>
      </tr>
    </table>`;

  // ── Per-program student tables ────────────────────────────────
  const sections = groupList
    .map(([program, list]) => {
      const body = list
        .map((a, i) => {
          const status = a.passed
            ? '<span class="pass">Тэнцсэн ✓</span>'
            : a.noExam
              ? 'ЭЕШ өгөөгүй'
              : '—';
          return `<tr${a.passed ? ' class="passrow"' : ''}>
            <td class="c">${i + 1}</td>
            <td>${esc(a.name)}</td>
            <td class="c">${esc(a.age)}</td>
            <td>${esc(a.phone)}</td>
            <td>${esc(a.email)}</td>
            <td>${esc(a.examSummary)}</td>
            <td class="c">${status}</td>
          </tr>`;
        })
        .join('');
      const passed = list.filter((a) => a.passed).length;
      return `
        <h2>${esc(program)} <span class="muted">(нийт ${list.length}, босго давсан ${passed})</span></h2>
        <table class="tbl">
          <tr class="head">
            <th style="width:34px">№</th><th>Овог нэр</th><th style="width:40px">Нас</th>
            <th style="width:90px">Утас</th><th>И-мэйл</th><th>ЭЕШ оноо</th><th style="width:90px">Босго</th>
          </tr>
          ${body}
        </table>`;
    })
    .join('');

  const heading = activeProgram
    ? `Элсэлтийн анкетын тайлан — ${esc(activeProgram)}`
    : 'Элсэлтийн анкетын тайлан';

  const html = `﻿<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
<meta charset="utf-8">
<title>${esc(heading)}</title>
<style>
@page Section1 { size: 841.9pt 595.3pt; mso-page-orientation: landscape; margin: 1.2cm; }
div.Section1 { page: Section1; }
body { font-family: Arial, sans-serif; font-size: 10.5pt; color: #111; }
h1 { font-size: 16pt; margin: 0 0 2pt; }
h2 { font-size: 12.5pt; margin: 16pt 0 4pt; border-bottom: 1px solid #999; padding-bottom: 2pt; }
.sub { color: #555; font-size: 10pt; margin: 0 0 10pt; }
.tbl { border-collapse: collapse; width: 100%; }
.tbl th, .tbl td { border: 0.5pt solid #999; padding: 3pt 5pt; vertical-align: top; }
.tbl .head th { background: #1e2a44; color: #fff; text-align: left; font-size: 9.5pt; }
.tbl .c { text-align: center; }
.tbl .total td { font-weight: bold; background: #f0efe9; }
.pass { color: #1a7a3c; font-weight: bold; }
.passrow td { background: #eaf7ee; }
.muted { color: #777; font-weight: normal; font-size: 10pt; }
.note { color: #666; font-size: 9pt; margin-top: 14pt; }
</style>
</head>
<body><div class="Section1">
  <h1>${esc(heading)}</h1>
  <p class="sub">Соёл Эрдэм Дээд Сургууль · ${esc(today)} · Нийт ${filtered.length} анкет</p>

  <h2>Нэгдсэн статистик</h2>
  ${summaryTable}

  ${sections}

  <p class="note">Тайлбар: ЭЕШ-ийн оноо ${PASS_SCORE}-с дээш хичээл ${PASS_SUBJECTS}-оос олон байвал "босго давсан" гэж тооцов. Босго хараахан хангаагүй ч дараа нь ЭЕШ дахин өгч болзошгүй.</p>
</div></body>
</html>`;

  const filename = `elselt-tailan-${new Date().toISOString().slice(0, 10)}.doc`;
  return new Response(html, {
    headers: {
      'Content-Type': 'application/msword; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
