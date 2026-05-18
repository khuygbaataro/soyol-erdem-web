import { cookies } from 'next/headers';
import { normaliseLocale, LOCALE_COOKIE } from '@/lib/i18n/locale';
import { MESSAGES, type TranslationKey } from '@/lib/i18n/messages';
import type { Language } from '@/lib/constants';

/**
 * Read the active locale on the server. Use this in server components
 * that don't have access to the client-side LocaleProvider context.
 *
 * Mirrors what LocaleProvider initialises from on the client, so server
 * and client both read the same cookie source.
 */
export async function getServerLocale(): Promise<Language> {
  const store = await cookies();
  return normaliseLocale(store.get(LOCALE_COOKIE)?.value);
}

/**
 * Server-side translator. Returns a `t(key)` function bound to the
 * locale fetched from the cookie. Usage:
 *
 *   const t = await getServerTranslator();
 *   return <h2>{t('footer.contact')}</h2>;
 */
export async function getServerTranslator() {
  const locale = await getServerLocale();
  const bundle = MESSAGES[locale];
  return (key: TranslationKey): string =>
    bundle?.[key] ?? MESSAGES.MN[key] ?? key;
}
