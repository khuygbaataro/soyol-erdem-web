import { randomBytes } from 'crypto';

/**
 * Оюутны гэрээтэй холбоотой сервер талын туслахууд.
 */

/** URL-д тохирсон нууц token үүсгэнэ (`/geree/<token>`). */
export function generateContractToken(): string {
  return randomBytes(15).toString('base64url'); // 20 тэмдэгт, зөвхөн [A-Za-z0-9_-]
}

/**
 * Элсэлтийн анкетаас (ContactSubmission.message доторх Markdown блок)
 * гэрээнд урьдчилан бөглөх талбаруудыг задлана. Анкетын форматыг
 * `app/api/admission-applications/route.ts` тодорхойлдог.
 */
export function parseAnketFields(message: string): {
  programName: string;
  lastName: string;
  firstName: string;
} {
  const field = (label: string) =>
    message.match(new RegExp(`${label}:\\s*(.+)`))?.[1]?.trim() ?? '';
  return {
    programName: field('Хөтөлбөр'),
    lastName: field('Овог'),
    firstName: field('Нэр'),
  };
}
