import { LANGUAGES, type Language } from '@/lib/constants';

/**
 * Cookie name we use to persist the user's locale choice across pages
 * and visits. Read on the server in app/layout.tsx and on the client
 * in LocaleProvider.
 */
export const LOCALE_COOKIE = 'soyol_locale';

/**
 * Coerce an arbitrary string (cookie value, URL param, …) into one of
 * our supported language codes. Falls back to Mongolian for unknown
 * input.
 */
export function normaliseLocale(input: string | undefined | null): Language {
  if (!input) return 'MN';
  const upper = input.toUpperCase();
  return (LANGUAGES as readonly string[]).includes(upper)
    ? (upper as Language)
    : 'MN';
}
