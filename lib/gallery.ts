/**
 * Decode a `gallery` column (News) or a `.gallery.images` SiteContent
 * value (e.g. Шилийн булаг). Both store a JSON-encoded array of image
 * URLs (or null/empty for "no gallery"). Returns a clean `string[]` —
 * empty when null/invalid so callers can use a single
 * `images.length > 0` check.
 */
export function parseGallery(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((u): u is string => typeof u === 'string' && u.trim().length > 0)
      .slice(0, 20);
  } catch {
    return [];
  }
}
