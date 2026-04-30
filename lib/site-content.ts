import { prisma } from '@/lib/prisma';

/**
 * Map of key → value for every SiteContent row in the given group.
 * Use `.get(key) ?? fallback` in pages so missing keys gracefully fall back
 * to the static text in `lib/content.ts`.
 *
 * Cached by Prisma + Next's force-dynamic per-request fetch.
 */
export async function getSiteContentMap(group: string): Promise<Map<string, string>> {
  const items = await prisma.siteContent.findMany({
    where: { group },
    select: { key: true, value: true },
  });
  return new Map(items.map((i) => [i.key, i.value]));
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
