/**
 * Decode the `gallery` column on a News row. The DB stores a JSON-encoded
 * array of image URLs (or null for "no slideshow"). Returns a clean
 * `string[]` — empty when null/invalid so the public page can use a
 * single `images.length > 0` check.
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
