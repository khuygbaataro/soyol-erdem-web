import type { Language } from '@/lib/constants';

/**
 * Read a localised field off a DB row. The convention across the
 * schema is:
 *
 *   - The canonical Mongolian value lives in `<field>`
 *   - English in `<field>En`
 *   - Japanese in `<field>Ja`
 *
 * Empty / null EN/JA columns fall back to the Mongolian source so a
 * partly-translated article still reads cleanly.
 */
export function localisedField<T extends Record<string, unknown>>(
  row: T,
  field: keyof T & string,
  locale: Language,
): string {
  const base = row[field];
  if (locale === 'EN') {
    const en = row[`${field}En` as keyof T];
    if (typeof en === 'string' && en.trim().length > 0) return en;
  }
  if (locale === 'JP') {
    const ja = row[`${field}Ja` as keyof T];
    if (typeof ja === 'string' && ja.trim().length > 0) return ja;
  }
  return typeof base === 'string' ? base : '';
}

/**
 * Same idea as `localisedField` but tolerates a nullable canonical
 * value (e.g. Staff.bio is optional). Returns `null` when all three
 * locale slots are empty.
 */
export function localisedFieldOptional<T extends Record<string, unknown>>(
  row: T,
  field: keyof T & string,
  locale: Language,
): string | null {
  if (locale === 'EN') {
    const en = row[`${field}En` as keyof T];
    if (typeof en === 'string' && en.trim().length > 0) return en;
  }
  if (locale === 'JP') {
    const ja = row[`${field}Ja` as keyof T];
    if (typeof ja === 'string' && ja.trim().length > 0) return ja;
  }
  const base = row[field];
  if (typeof base === 'string' && base.trim().length > 0) return base;
  return null;
}
