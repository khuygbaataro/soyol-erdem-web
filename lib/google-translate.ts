import type { Language } from '@/lib/constants';

/**
 * Map our three-letter Language code (MN / JP / EN) onto Google
 * Translate's BCP-47 codes. MN is the source/original; selecting it
 * removes any translation.
 */
const GOOGLE_CODE: Record<Language, string> = {
  MN: 'mn',
  JP: 'ja',
  EN: 'en',
};

/**
 * Read the user's current translation preference from the `googtrans`
 * cookie that Google Translate sets. Returns 'MN' (the source language)
 * when no translation is active.
 *
 * Safe to call on the server — returns 'MN' in that case.
 */
export function readGoogleTranslateLang(): Language {
  if (typeof document === 'undefined') return 'MN';
  const match = document.cookie
    .split('; ')
    .find((c) => c.startsWith('googtrans='));
  if (!match) return 'MN';
  // Cookie shape: `googtrans=/mn/ja` or `googtrans=/mn/en`. The second
  // segment is the target language.
  const value = decodeURIComponent(match.split('=')[1] ?? '');
  const target = value.split('/')[2];
  if (target === 'ja') return 'JP';
  if (target === 'en') return 'EN';
  return 'MN';
}

/**
 * Switch Google Translate's target language and reload the page so the
 * translation is applied across the whole document on first paint.
 *
 * - MN: clears the `googtrans` cookie (back to source)
 * - JP / EN: writes `googtrans=/mn/<code>` for the current host plus
 *   the parent domain so subdomains keep the choice.
 */
export function setGoogleTranslateLang(lang: Language) {
  if (typeof document === 'undefined') return;
  const target = GOOGLE_CODE[lang];
  const host = window.location.hostname;
  // The Google cookie has to live on the apex domain to apply across
  // subdomains (e.g. www.* and bare). For localhost we skip the domain
  // attribute since cookies with explicit domains break on `localhost`.
  const isLocal = host === 'localhost' || host === '127.0.0.1';
  const apex = (() => {
    const parts = host.split('.');
    if (parts.length <= 2) return host;
    return parts.slice(-2).join('.');
  })();

  const clear = `googtrans=; path=/; max-age=0`;
  const clearDomain = isLocal
    ? null
    : `googtrans=; path=/; domain=.${apex}; max-age=0`;

  if (lang === 'MN') {
    document.cookie = clear;
    if (clearDomain) document.cookie = clearDomain;
  } else {
    const value = `googtrans=/mn/${target}; path=/`;
    const valueDomain = isLocal
      ? null
      : `googtrans=/mn/${target}; path=/; domain=.${apex}`;
    document.cookie = value;
    if (valueDomain) document.cookie = valueDomain;
  }

  // Reload so Google Translate re-runs against the new cookie. Without
  // this the page stays in the previous language until the next nav.
  window.location.reload();
}
