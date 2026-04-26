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
