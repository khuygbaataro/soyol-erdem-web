import type { Language } from '@/lib/constants';

/** Generate a URL-safe slug from a Mongolian / Latin title. */
export function slugify(input: string): string {
  return input
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s/_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* ─────────────────────────── Public-facing label maps ─────────────
 * The canonical (MN) map keeps backwards compatibility for any
 * existing call-site (admin pages, debug logs, etc). Each label also
 * has an EN / JP variant — pages with a known locale should call
 * `localiseNewsCategory(key, locale)` etc. so the public-facing
 * /news, /research, /high-school pages display in the visitor's
 * language. Admin pages keep using the MN map by default since the
 * admin UI is Mongolian-only.
 *
 * Editor renamed two of the public-facing news labels in May 2026:
 *   EVENT        was "Үйл явдал" → now "Нээлттэй ажлын байр"
 *   ANNOUNCEMENT was "Зарлал"   → now "Ярилцлага"
 * The enum values stay the same so existing rows don't need
 * migration; only the human label changed.
 * ────────────────────────────────────────────────────────────────── */

export const NEWS_CATEGORY_LABEL: Record<string, string> = {
  NEWS: 'Мэдээ',
  EVENT: 'Нээлттэй ажлын байр',
  ANNOUNCEMENT: 'Ярилцлага',
  RESEARCH: 'Эрдэм шинжилгээ',
  ACHIEVEMENT: 'Амжилт',
  PROGRAM: 'Хөтөлбөр',
};

const NEWS_CATEGORY_LABEL_EN: Record<string, string> = {
  NEWS: 'News',
  EVENT: 'Careers',
  ANNOUNCEMENT: 'Interview',
  RESEARCH: 'Research',
  ACHIEVEMENT: 'Achievement',
  PROGRAM: 'Programme',
};

const NEWS_CATEGORY_LABEL_JP: Record<string, string> = {
  NEWS: 'ニュース',
  EVENT: '求人',
  ANNOUNCEMENT: 'インタビュー',
  RESEARCH: '研究',
  ACHIEVEMENT: '実績',
  PROGRAM: 'プログラム',
};

/** Look up the news-category badge label for the given visitor locale.
 *  Falls back to Mongolian, and finally to the raw enum value so the
 *  badge never renders blank. */
export function localiseNewsCategory(key: string, locale: Language): string {
  const table =
    locale === 'EN'
      ? NEWS_CATEGORY_LABEL_EN
      : locale === 'JP'
        ? NEWS_CATEGORY_LABEL_JP
        : NEWS_CATEGORY_LABEL;
  return table[key] ?? NEWS_CATEGORY_LABEL[key] ?? key;
}

export const STATUS_LABEL: Record<string, string> = {
  DRAFT: 'Ноорог',
  PUBLISHED: 'Нийтлэгдсэн',
  ARCHIVED: 'Архивласан',
};

const STATUS_LABEL_EN: Record<string, string> = {
  DRAFT: 'Draft',
  PUBLISHED: 'Published',
  ARCHIVED: 'Archived',
};

const STATUS_LABEL_JP: Record<string, string> = {
  DRAFT: '下書き',
  PUBLISHED: '公開中',
  ARCHIVED: 'アーカイブ',
};

export function localiseStatus(key: string, locale: Language): string {
  const table =
    locale === 'EN'
      ? STATUS_LABEL_EN
      : locale === 'JP'
        ? STATUS_LABEL_JP
        : STATUS_LABEL;
  return table[key] ?? STATUS_LABEL[key] ?? key;
}

export const BOOK_LANGUAGE_LABEL: Record<string, string> = {
  MN: 'Монгол',
  JP: 'Япон',
  EN: 'Англи',
  OTHER: 'Бусад',
};

const BOOK_LANGUAGE_LABEL_EN: Record<string, string> = {
  MN: 'Mongolian',
  JP: 'Japanese',
  EN: 'English',
  OTHER: 'Other',
};

const BOOK_LANGUAGE_LABEL_JP: Record<string, string> = {
  MN: 'モンゴル語',
  JP: '日本語',
  EN: '英語',
  OTHER: 'その他',
};

export function localiseBookLanguage(key: string, locale: Language): string {
  const table =
    locale === 'EN'
      ? BOOK_LANGUAGE_LABEL_EN
      : locale === 'JP'
        ? BOOK_LANGUAGE_LABEL_JP
        : BOOK_LANGUAGE_LABEL;
  return table[key] ?? BOOK_LANGUAGE_LABEL[key] ?? key;
}

export const RESEARCH_TYPE_LABEL: Record<string, string> = {
  ARTICLE: 'Нийтлэл',
  CONFERENCE: 'Хурал',
  BOOK: 'Ном',
  THESIS: 'Дипломын ажил',
  PROJECT: 'Төсөл',
};

const RESEARCH_TYPE_LABEL_EN: Record<string, string> = {
  ARTICLE: 'Article',
  CONFERENCE: 'Conference',
  BOOK: 'Book',
  THESIS: 'Thesis',
  PROJECT: 'Project',
};

const RESEARCH_TYPE_LABEL_JP: Record<string, string> = {
  ARTICLE: '論文',
  CONFERENCE: '学会発表',
  BOOK: '書籍',
  THESIS: '学位論文',
  PROJECT: 'プロジェクト',
};

export function localiseResearchType(key: string, locale: Language): string {
  const table =
    locale === 'EN'
      ? RESEARCH_TYPE_LABEL_EN
      : locale === 'JP'
        ? RESEARCH_TYPE_LABEL_JP
        : RESEARCH_TYPE_LABEL;
  return table[key] ?? RESEARCH_TYPE_LABEL[key] ?? key;
}

export const ROLE_LABEL: Record<string, string> = {
  ADMIN: 'Захирагч',
  EDITOR: 'Редактор',
  LIBRARIAN: 'Номын санч',
  RESEARCHER: 'Судлаач',
};
