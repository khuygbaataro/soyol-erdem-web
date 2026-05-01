export const SITE = {
  name: 'Соёл-Эрдэм',
  fullName: 'Соёл-Эрдэм Дээд Сургууль',
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

export const NAV_ITEMS = [
  { label: 'Сургуулийн тухай', href: '/about' },
  { label: 'Ахлах сургууль', href: '/high-school' },
  { label: 'Сургалт', href: '/programs' },
  { label: 'Эрдэм шинжилгээ', href: '/research' },
  { label: 'Оюутан', href: '/student-life' },
  { label: 'Хамтын ажиллагаа', href: '/international' },
  { label: 'Номын сан', href: '/library' },
  { label: 'Мэдээ', href: '/news' },
];

export const FOOTER_LINKS = {
  about: [
    { label: 'Сургуулийн тухай', href: '/about' },
    { label: 'Сургалт', href: '/programs' },
    { label: 'Оюутан', href: '/student-life' },
    { label: 'Тэтгэлэг', href: '/admission#scholarship' },
    { label: 'Мэдээ', href: '/news' },
  ],
  help: [
    { label: 'Элсэн заавар', href: '/admission' },
    { label: 'Тэтгэлэг', href: '/admission#scholarship' },
    { label: 'Тогтмол асуулт', href: '/contact#faq' },
    { label: 'Холбоо барих', href: '/contact' },
  ],
};

export const LANGUAGES = ['MN', 'JP', 'EN'] as const;
export type Language = (typeof LANGUAGES)[number];

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
  { label: 'Танилцуулга', href: '/high-school#about' },
  { label: 'Хөтөлбөр', href: '/high-school#programs' },
  { label: 'Мэдээ', href: '/high-school/news' },
  { label: 'Холбоо барих', href: '/high-school#contact' },
];
