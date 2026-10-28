/**
 * News body content model.
 *
 * The `News.body` column historically held plain text (rendered on the
 * public page by splitting on blank lines into paragraphs). To let editors
 * place images — QR codes, posters, inline photos — *inside* the article and
 * size them freely, the body can now instead hold a JSON "blocks" document:
 * an ordered list of text and image blocks, each image carrying its own
 * display width and alignment.
 *
 * Storage stays backward compatible: the column is still a string. A blocks
 * document is JSON with a `kind: 'news-blocks'` marker; anything else (legacy
 * articles, EN/JA translation text) is treated as plain text. `parseNewsBlocks`
 * returns `null` for the legacy case so callers can fall back cleanly.
 *
 * This module is isomorphic (pure functions, no server/client imports) so the
 * admin editor, the public renderer and the card teaser can all share it.
 */

export type NewsImageAlign = 'left' | 'center' | 'right';

export interface NewsTextBlock {
  type: 'text';
  text: string;
}

export interface NewsImageBlock {
  type: 'image';
  url: string;
  /** Display width as a percentage of the content column (10–100). */
  width: number;
  align: NewsImageAlign;
  /** Optional caption shown under the image. */
  caption?: string;
}

export type NewsBlock = NewsTextBlock | NewsImageBlock;

interface NewsBlocksDoc {
  v: 1;
  kind: typeof BLOCKS_MARKER;
  blocks: NewsBlock[];
}

const BLOCKS_MARKER = 'news-blocks';

export const MIN_IMAGE_WIDTH = 10;
export const MAX_IMAGE_WIDTH = 100;
export const DEFAULT_IMAGE_WIDTH = 60;

function clampWidth(raw: unknown): number {
  const n = Math.round(Number(raw));
  if (!Number.isFinite(n)) return DEFAULT_IMAGE_WIDTH;
  return Math.min(MAX_IMAGE_WIDTH, Math.max(MIN_IMAGE_WIDTH, n));
}

function normaliseBlock(raw: unknown): NewsBlock | null {
  if (!raw || typeof raw !== 'object') return null;
  const b = raw as Record<string, unknown>;

  if (b.type === 'text') {
    return { type: 'text', text: typeof b.text === 'string' ? b.text : '' };
  }

  if (b.type === 'image' && typeof b.url === 'string' && b.url.trim()) {
    const align: NewsImageAlign =
      b.align === 'left' || b.align === 'right' ? b.align : 'center';
    const caption =
      typeof b.caption === 'string' && b.caption.trim().length > 0
        ? b.caption
        : undefined;
    return {
      type: 'image',
      url: b.url,
      width: clampWidth(b.width),
      align,
      ...(caption ? { caption } : {}),
    };
  }

  return null;
}

/**
 * Parse a `News.body` string into editor blocks. Returns `null` when the body
 * is legacy plain text (or empty / malformed), so callers fall back to the
 * paragraph-split rendering.
 */
export function parseNewsBlocks(
  body: string | null | undefined,
): NewsBlock[] | null {
  if (!body) return null;
  const trimmed = body.trim();
  // Fast path: legacy text never starts with `{`.
  if (!trimmed.startsWith('{')) return null;
  try {
    const doc = JSON.parse(trimmed) as Partial<NewsBlocksDoc>;
    if (doc && doc.kind === BLOCKS_MARKER && Array.isArray(doc.blocks)) {
      return doc.blocks
        .map(normaliseBlock)
        .filter((b): b is NewsBlock => b !== null);
    }
  } catch {
    // Not JSON → legacy plain text.
  }
  return null;
}

/** Serialise editor blocks back into a `News.body` string. */
export function serializeNewsBlocks(blocks: NewsBlock[]): string {
  const doc: NewsBlocksDoc = { v: 1, kind: BLOCKS_MARKER, blocks };
  return JSON.stringify(doc);
}

/**
 * Seed editor state from an existing body: parse blocks when present,
 * otherwise wrap the legacy plain text in a single text block.
 */
export function newsBodyToBlocks(body: string | null | undefined): NewsBlock[] {
  const parsed = parseNewsBlocks(body);
  if (parsed) return parsed;
  return [{ type: 'text', text: (body ?? '').trim() }];
}

/** True when the blocks carry any real content (non-empty text or an image). */
export function newsBlocksHaveContent(blocks: NewsBlock[]): boolean {
  return blocks.some(
    (b) =>
      (b.type === 'text' && b.text.trim().length > 0) || b.type === 'image',
  );
}

/**
 * Flatten a body to plain text (joins text blocks, drops images). Used for the
 * card teaser so a blocks document never leaks raw JSON into a preview.
 */
export function newsBodyToPlainText(body: string | null | undefined): string {
  const blocks = parseNewsBlocks(body);
  if (!blocks) return body ?? '';
  return blocks
    .filter((b): b is NewsTextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n\n')
    .trim();
}
