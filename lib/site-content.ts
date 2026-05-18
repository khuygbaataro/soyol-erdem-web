import { prisma } from '@/lib/prisma';
import type { Language } from '@/lib/constants';
import { getServerLocale } from '@/lib/i18n/server';

/**
 * Map of key → resolved value for every SiteContent row in the given
 * group. Use `.get(key) ?? fallback` (or the `content()` helper) in
 * pages so missing keys gracefully fall back to the static text in
 * `lib/content.ts` / `lib/i18n/content.ts`.
 *
 * Locale-aware:
 *   - For IMAGE-type rows we always return `value` (the upload URL).
 *     Admins upload a single image that's used for every locale.
 *   - For TEXT-type rows:
 *       MN visitor → returns the canonical `value`.
 *       EN visitor → returns `valueEn` when non-empty; otherwise
 *                    returns an EMPTY STRING (NOT the MN value) so
 *                    the page falls through to its translation
 *                    bundle. This prevents MN-language admin
 *                    overrides from leaking onto EN / JP pages.
 *       JP visitor → same as EN with `valueJa`.
 *
 * Resilient: if the SiteContent table doesn't exist yet (e.g. before
 * `prisma db push` is run after deploying a new schema), returns an
 * empty Map and the caller falls back to the static defaults.
 */
export async function getSiteContentMap(
  group: string,
  locale?: Language,
): Promise<Map<string, string>> {
  try {
    const effectiveLocale = locale ?? (await getServerLocale());
    const items = await prisma.siteContent.findMany({
      where: { group },
      select: {
        key: true,
        value: true,
        valueEn: true,
        valueJa: true,
        type: true,
      },
    });
    return new Map(
      items.map((i) => {
        // Images are language-agnostic — always return the upload URL.
        if (i.type === 'IMAGE') return [i.key, i.value];
        if (effectiveLocale === 'EN') {
          return [i.key, i.valueEn && i.valueEn.length > 0 ? i.valueEn : ''];
        }
        if (effectiveLocale === 'JP') {
          return [i.key, i.valueJa && i.valueJa.length > 0 ? i.valueJa : ''];
        }
        return [i.key, i.value];
      }),
    );
  } catch (err) {
    console.warn('[site-content] query failed, using static fallback:', err);
    return new Map();
  }
}

/** Convenience reader: returns `value` if non-empty, otherwise `fallback`. */
export function content(
  map: Map<string, string>,
  key: string,
  fallback: string,
): string {
  const v = map.get(key);
  return v && v.length > 0 ? v : fallback;
}

/**
 * Read all active stats in display order. Resilient to the table not
 * existing yet — returns empty array and the caller falls back.
 */
export async function getActiveStats() {
  try {
    return await prisma.stat.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
  } catch (err) {
    console.warn('[site-content] stat query failed, using static fallback:', err);
    return [];
  }
}
