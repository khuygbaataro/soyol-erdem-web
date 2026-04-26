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

export const NEWS_CATEGORY_LABEL: Record<string, string> = {
  NEWS: 'Мэдээ',
  EVENT: 'Үйл явдал',
  ANNOUNCEMENT: 'Зарлал',
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
