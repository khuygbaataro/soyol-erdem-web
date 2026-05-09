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

// Editor renamed two of the public-facing labels in May 2026:
//   EVENT        was "Үйл явдал" → now "Нээлттэй ажлын байр"
//   ANNOUNCEMENT was "Зарлал"   → now "Ярилцлага"
// The enum values stay the same so existing rows don't need migration;
// only the human label changed.
export const NEWS_CATEGORY_LABEL: Record<string, string> = {
  NEWS: 'Мэдээ',
  EVENT: 'Нээлттэй ажлын байр',
  ANNOUNCEMENT: 'Ярилцлага',
  RESEARCH: 'Эрдэм шинжилгээ',
  ACHIEVEMENT: 'Амжилт',
  PROGRAM: 'Хөтөлбөр',
};

export const STATUS_LABEL: Record<string, string> = {
  DRAFT: 'Ноорог',
  PUBLISHED: 'Нийтлэгдсэн',
  ARCHIVED: 'Архивласан',
};

export const BOOK_LANGUAGE_LABEL: Record<string, string> = {
  MN: 'Монгол',
  JP: 'Япон',
  EN: 'Англи',
  OTHER: 'Бусад',
};

export const RESEARCH_TYPE_LABEL: Record<string, string> = {
  ARTICLE: 'Нийтлэл',
  CONFERENCE: 'Хурал',
  BOOK: 'Ном',
  THESIS: 'Дипломын ажил',
  PROJECT: 'Төсөл',
};

export const ROLE_LABEL: Record<string, string> = {
  ADMIN: 'Захирагч',
  EDITOR: 'Редактор',
  LIBRARIAN: 'Номын санч',
  RESEARCHER: 'Судлаач',
};
