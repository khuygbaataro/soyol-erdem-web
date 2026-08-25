/**
 * Элсэлтийн анкетын босго үнэлгээ — дэлгэц (/admin/admissions) ба Word
 * тайлан (/api/admissions/report) хоёул ЯГ ижил дүрэм ашиглана.
 *
 * "Босго давсан" гэж үзэх нөхцөл (аль нэг нь хангагдвал):
 *   1. Боловсрол = "бакалавр" — аль хэдийн бакалавр зэрэгтэй тул ЭЕШ шаардахгүй.
 *   2. ЭЕШ-ийг дор хаяж 3 хичээлээр өгсөн бөгөөд нэг нь Монгол хэл байх
 *      (үлдсэн 2 нь мэргэжлийн хичээл).
 */

export const MIN_EXAM_SUBJECTS = 3;

export function parseAnketField(message: string, label: string): string {
  return message.match(new RegExp(`${label}:\\s*(.+)`))?.[1]?.trim() ?? '';
}

/** Анкетын биетээс ЭЕШ-ийн оноог задална. Мөрүүд `  • Монгол хэл: 620`. */
export function parseAnketExams(
  message: string,
): { subject: string; score: number }[] {
  const out: { subject: string; score: number }[] = [];
  for (const m of message.matchAll(/^\s*•\s*(.+?):\s*([\d]+(?:[.,]\d+)?)\s*$/gm)) {
    const score = Number(m[2].replace(',', '.'));
    if (!Number.isNaN(score)) out.push({ subject: m[1].trim(), score });
  }
  return out;
}

export interface AnketEval {
  education: string;
  /** Боловсрол = "бакалавр". */
  isBachelor: boolean;
  exams: { subject: string; score: number }[];
  /** "Монгол хэл: 620 · Математик: 540" — hover / тайланд харуулна. */
  examSummary: string;
  /** ЭЕШ-ийн хичээлүүдийн дунд Монгол хэл байгаа эсэх. */
  hasMongolian: boolean;
  /** 3+ хичээл өгсөн бөгөөд нэг нь Монгол хэл. */
  passedByExam: boolean;
  /** Босго давсан эсэх — бакалавр ЭСВЭЛ ЭЕШ-ийн нөхцөл. */
  passedThreshold: boolean;
  /** Элсэгч "ЭЕШ өгөөгүй" гэж сонгосон. */
  noExam: boolean;
}

export function evaluateAnket(message: string): AnketEval {
  const education = parseAnketField(message, 'Боловсрол');
  const isBachelor = /бакалавр/i.test(education);
  const exams = parseAnketExams(message);
  const hasMongolian = exams.some((e) => /монгол\s*хэл/i.test(e.subject));
  const passedByExam = exams.length >= MIN_EXAM_SUBJECTS && hasMongolian;
  const noExam = /ЭЕШ өгөөгүй/.test(message);
  return {
    education,
    isBachelor,
    exams,
    examSummary: exams.map((e) => `${e.subject}: ${e.score}`).join(' · '),
    hasMongolian,
    passedByExam,
    passedThreshold: isBachelor || passedByExam,
    noExam,
  };
}
