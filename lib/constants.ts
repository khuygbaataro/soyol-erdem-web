export const SITE = {
  name: 'Соёл Эрдэм',
  fullName: 'Соёл Эрдэм Дээд Сургууль',
  jpName: 'モンゴル文化教育大学',
  founded: 1993,
  description:
    'Япон улсын хөрөнгө оруулалттай дээд сургууль. Япон хэл, соёл, олон улсын харилцааны чиглэлээр Монголдоо тэргүүлэгч.',
  url: 'https://soyolerdem.edu.mn',
  contact: {
    phone: '7011-8584',
    phoneSecondary: '7011-8589',
    email: 'soyolerdem.daigaku@gmail.com',
    address:
      'Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Олимпийн гудамж',
    facebook: 'https://www.facebook.com/soyolerdem.edu.mn',
  },
  workingHours: 'Даваа-Баасан: 08:00-17:00',
};

/**
 * Primary nav. "Нүүр" leads. The high-school sub-site is featured in
 * the top utility bar (Header.UTILITY_LINKS) as
 * "НЕБ-ЫН СОЁЛ ЭРДЭМ СУРГУУЛЬ" so it reads as a sibling institution
 * rather than another tab in the main university menu.
 */
export const NAV_ITEMS = [
  { label: 'Нүүр', href: '/' },
  { label: 'Сургуулийн тухай', href: '/about' },
  { label: 'Сургалт', href: '/programs' },
  { label: 'Эрдэм шинжилгээ', href: '/research' },
  { label: 'Оюутан', href: '/student-life' },
  { label: 'Хамтын ажиллагаа', href: '/international' },
  { label: 'Мэдээ', href: '/news' },
];

/**
 * Footer "Чухал холбоос" column. External links go to the partner
 * services / portals; internal links to "Элсэлтийн мэдээлэл" land on
 * the admission page.
 */
export const FOOTER_LINKS = {
  important: [
    {
      label: 'Багшийн веб',
      href: 'https://teacher.soyolerdem.edu.mn',
      external: true,
    },
    {
      label: 'Оюутны веб',
      href: 'https://student.soyolerdem.edu.mn',
      external: true,
    },
    {
      label: 'Цахим сургалт',
      href: '/elearning',
      external: false,
    },
    {
      label: 'Элсэлтийн мэдээлэл',
      href: '/admission',
      external: false,
    },
  ],
};

export const LANGUAGES = ['MN', 'JP', 'EN'] as const;
export type Language = (typeof LANGUAGES)[number];

/**
 * Known position keys on the /about/structure org chart. The Staff model
 * uses these as a unique identifier so an admin entry maps onto a specific
 * node in the chart. Adding a key here makes it selectable in the admin
 * Staff form.
 */
export const STAFF_POSITION_KEYS = [
  { key: 'rector', label: 'Захирал' },
  { key: 'academic-affairs', label: 'Сургалтын алба' },
  { key: 'scientific-secretary', label: 'Эрдэмтэн нарийн бичгийн дарга' },
  { key: 'admin-finance', label: 'Захиргаа, санхүү, аж ахуй' },
  { key: 'faculty-development', label: 'Багшийн хөгжлийн төв' },
  { key: 'japanese-dept', label: 'Япон судлалын тэнхим' },
  { key: 'it-dept', label: 'Мэдээллийн технологийн тэнхим' },
  { key: 'library', label: '"Хажимэ" номын сан' },
  { key: 'practice', label: 'Дадлагын бааз' },
  { key: 'graduate-studies', label: 'Ахисан түвшний сургалтын алба' },
  { key: 'research-center', label: 'Судалгааны төв' },
  { key: 'archive', label: 'Архив' },
  { key: 'marketing', label: 'Маркетингийн алба' },
  { key: 'foreign-relations', label: 'Гадаад харилцааны алба' },
  { key: 'student-council', label: 'Оюутны зөвлөл' },
] as const;

/* ─────────────────────────────────────────────────────────────────────────
 * High-school sub-site
 * Lives at /high-school behind its own route group + header so it reads as
 * a self-contained mini-site with its own navigation, news feed and admin.
 * ─────────────────────────────────────────────────────────────────────── */

export const HIGH_SCHOOL = {
  name: 'Соёл Эрдэм Ахлах Сургууль',
  shortName: 'Ахлах сургууль',
  fullName: 'Нийслэлийн Ерөнхий боловсролын Соёл Эрдэм Сургууль',
  tagline: 'Хичээнгүй суралцагч · Чадварлаг багш · Япон хэл, соёл',
  founded: 2023,
  contact: {
    phonePrimary: '7011-8589',
    phoneSecondary: '9953-3738',
    email: 'info@soyolerdem.edu.mn',
  },
};

export const HIGH_SCHOOL_NAV_ITEMS = [
  { label: 'Нүүр', href: '/high-school' },
  { label: 'Танилцуулга', href: '/high-school/about' },
  { label: 'Сургалт', href: '/high-school/programs' },
  { label: 'Элсэлт', href: '/high-school/admission' },
  { label: 'Мэдээ', href: '/high-school/news' },
  { label: 'Холбоо барих', href: '/high-school/contact' },
];

/**
 * Categories used to tag /high-school/news articles. These map onto values
 * stored in the existing `News.category` field (high-school site only), so
 * the filter UI on /high-school/news can present a stable set of tabs.
 */
export const HIGH_SCHOOL_NEWS_CATEGORIES = [
  { id: 'school-info', label: 'Ахлах сургуулийн мэдээлэл' },
  { id: 'extra', label: 'Хичээлээс гадуур ажил' },
  { id: 'exchange', label: 'Сурагч солилцоо' },
  { id: 'library', label: 'Номын сан' },
  { id: 'graduation', label: 'Төгсөлт' },
];
