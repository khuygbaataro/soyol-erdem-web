import { prisma } from '@/lib/prisma';

/**
 * Map of key → value for every SiteContent row in the given group.
 * Use `.get(key) ?? fallback` in pages so missing keys gracefully fall back
 * to the static text in `lib/content.ts`.
 *
 * Resilient: if the SiteContent table doesn't exist yet (e.g. before `prisma
 * db push` is run after deploying a new schema), returns an empty Map and
 * the caller falls back to the static defaults.
 */
export async function getSiteContentMap(group: string): Promise<Map<string, string>> {
  try {
    const items = await prisma.siteContent.findMany({
      where: { group },
      select: { key: true, value: true },
    });
    return new Map(items.map((i) => [i.key, i.value]));
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
