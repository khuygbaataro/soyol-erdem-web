import type { Language } from '@/lib/constants';

/**
 * In-app translation message bundles. Mongolian is the source-of-truth
 * (`MN`); `JP` and `EN` mirror the same keys. `t('nav.home')` reads from
 * the active bundle at render time.
 *
 * Missing keys fall back to Mongolian so a half-translated string never
 * blocks a page from rendering.
 */
type Messages = Record<string, string>;

export const MESSAGES: Record<Language, Messages> = {
  MN: {
    // ─── Header utility bar ───────────────────────────────────────
    'header.address': 'Сүхбаатар дүүрэг, Улаанбаатар',
    'header.utility.highSchool': 'НЕБ-ЫН СОЁЛ ЭРДЭМ СУРГУУЛЬ',
    'header.utility.library': 'Номын сан',
    'header.utility.newspaper': 'Сонин хэвлэл',
    'header.utility.regulations': 'Дүрэм журам',

    // ─── Main nav (university) ────────────────────────────────────
    'nav.home': 'Нүүр',
    'nav.about': 'Сургуулийн тухай',
    'nav.programs': 'Сургалт',
    'nav.research': 'Эрдэм шинжилгээ',
    'nav.studentLife': 'Оюутан',
    'nav.international': 'Хамтын ажиллагаа',
    'nav.news': 'Мэдээ',
    'nav.contact': 'Холбоо барих',
    'nav.admission': 'Элсэлт',

    // ─── High-school nav ──────────────────────────────────────────
    'hsNav.home': 'Нүүр',
    'hsNav.about': 'Танилцуулга',
    'hsNav.programs': 'Сургалт',
    'hsNav.admission': 'Элсэлт',
    'hsNav.news': 'Мэдээ',
    'hsNav.contact': 'Холбоо барих',
    'hsNav.backToUniversity': 'Их сургуульд буцах',

    // ─── Common buttons / labels ──────────────────────────────────
    'common.readMore': 'Дэлгэрэнгүй',
    'common.viewAll': 'Бүгдийг үзэх',
    'common.back': 'Буцах',
    'common.submit': 'Илгээх',
    'common.save': 'Хадгалах',
    'common.cancel': 'Цуцлах',
    'common.close': 'Хаах',
    'common.openMenu': 'Цэс нээх',
    'common.loading': 'Ачаалж байна…',

    // ─── Footer ───────────────────────────────────────────────────
    'footer.importantLinks': 'ЧУХАЛ ХОЛБООС',
    'footer.contact': 'ХОЛБОО БАРИХ',
    'footer.copyright': 'Бүх эрх хуулиар хамгаалагдсан.',
    'footer.privacy': 'Нууцлалын бодлого',
    'footer.link.teacherWeb': 'Багшийн веб',
    'footer.link.studentWeb': 'Оюутны веб',
    'footer.link.elearning': 'Цахим сургалт',
    'footer.link.admission': 'Элсэлтийн мэдээлэл',
    'footer.tagline.university':
      '1993 онд байгуулагдсан, Япон улсын 100% хөрөнгө оруулалттай дээд боловсролын сургалтын байгууллага.',
    'footer.tagline.highSchool':
      'Соёл Эрдэм Дээд Сургуулийн харьяа төрөлжсөн ерөнхий боловсролын ахлах сургууль. Япон хэл, соёл, IT-ийн чиглэлээр чанартай боловсрол олгоно.',
    'footer.address.university':
      'СБД, 1 дүгээр хороо, Элчингийн гудамж 15а, Embassy One tower — 4, 5 дугаар давхарт',
    'footer.address.highSchool':
      'Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Олимпийн гудамж',

    // ─── Quick portals (home page strip) ──────────────────────────
    'portal.studentSystem': 'Оюутны систем',
    'portal.teacherSystem': 'Багшийн систем',
    'portal.elearning': 'Цахим сургалт',
  },

  EN: {
    // ─── Header utility bar ───────────────────────────────────────
    'header.address': 'Sukhbaatar District, Ulaanbaatar',
    'header.utility.highSchool': 'SOYOL-ERDEM HIGH SCHOOL',
    'header.utility.library': 'Library',
    'header.utility.newspaper': 'Newspaper',
    'header.utility.regulations': 'Regulations',

    // ─── Main nav (university) ────────────────────────────────────
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.programs': 'Programs',
    'nav.research': 'Research',
    'nav.studentLife': 'Student Life',
    'nav.international': 'Partnerships',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.admission': 'Admission',

    // ─── High-school nav ──────────────────────────────────────────
    'hsNav.home': 'Home',
    'hsNav.about': 'About',
    'hsNav.programs': 'Programs',
    'hsNav.admission': 'Admission',
    'hsNav.news': 'News',
    'hsNav.contact': 'Contact',
    'hsNav.backToUniversity': 'Back to the university',

    // ─── Common buttons / labels ──────────────────────────────────
    'common.readMore': 'Read more',
    'common.viewAll': 'View all',
    'common.back': 'Back',
    'common.submit': 'Submit',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.openMenu': 'Open menu',
    'common.loading': 'Loading…',

    // ─── Footer ───────────────────────────────────────────────────
    'footer.importantLinks': 'QUICK LINKS',
    'footer.contact': 'CONTACT',
    'footer.copyright': 'All rights reserved.',
    'footer.privacy': 'Privacy policy',
    'footer.link.teacherWeb': 'Faculty portal',
    'footer.link.studentWeb': 'Student portal',
    'footer.link.elearning': 'E-learning',
    'footer.link.admission': 'Admissions',
    'footer.tagline.university':
      'Founded in 1993 with 100% Japanese investment — a higher-education institution.',
    'footer.tagline.highSchool':
      "A specialised senior high school under Soyol Erdem University. Quality education in Japanese language, culture and IT.",
    'footer.address.university':
      'Sukhbaatar District, 1st Khoroo, 15a Elchingiin Street, Embassy One Tower — floors 4 & 5',
    'footer.address.highSchool':
      'Olympic Street, 1st Khoroo, Sukhbaatar District, Ulaanbaatar',

    // ─── Quick portals (home page strip) ──────────────────────────
    'portal.studentSystem': 'Student system',
    'portal.teacherSystem': 'Faculty system',
    'portal.elearning': 'E-learning',
  },

  JP: {
    // ─── Header utility bar ───────────────────────────────────────
    'header.address': 'ウランバートル市 スフバートル区',
    'header.utility.highSchool': 'ソヨル・エルデム高等学校',
    'header.utility.library': '図書館',
    'header.utility.newspaper': '広報誌',
    'header.utility.regulations': '規則・規程',

    // ─── Main nav (university) ────────────────────────────────────
    'nav.home': 'ホーム',
    'nav.about': '大学について',
    'nav.programs': '専攻',
    'nav.research': '研究',
    'nav.studentLife': '学生生活',
    'nav.international': '国際交流',
    'nav.news': 'ニュース',
    'nav.contact': 'お問い合わせ',
    'nav.admission': '入学案内',

    // ─── High-school nav ──────────────────────────────────────────
    'hsNav.home': 'ホーム',
    'hsNav.about': '学校紹介',
    'hsNav.programs': 'コース',
    'hsNav.admission': '入学案内',
    'hsNav.news': 'ニュース',
    'hsNav.contact': 'お問い合わせ',
    'hsNav.backToUniversity': '大学へ戻る',

    // ─── Common buttons / labels ──────────────────────────────────
    'common.readMore': '詳しく見る',
    'common.viewAll': 'すべて見る',
    'common.back': '戻る',
    'common.submit': '送信',
    'common.save': '保存',
    'common.cancel': 'キャンセル',
    'common.close': '閉じる',
    'common.openMenu': 'メニューを開く',
    'common.loading': '読み込み中…',

    // ─── Footer ───────────────────────────────────────────────────
    'footer.importantLinks': '関連リンク',
    'footer.contact': 'お問い合わせ',
    'footer.copyright': 'All rights reserved.',
    'footer.privacy': 'プライバシーポリシー',
    'footer.link.teacherWeb': '教員ポータル',
    'footer.link.studentWeb': '学生ポータル',
    'footer.link.elearning': 'オンライン学習',
    'footer.link.admission': '入学案内',
    'footer.tagline.university':
      '1993年に日本100%出資のもとで設立された高等教育機関。',
    'footer.tagline.highSchool':
      'ソヨル・エルデム大学附属の専門特化型高等学校。日本語・日本文化・ITの分野で質の高い教育を提供。',
    'footer.address.university':
      'モンゴル国ウランバートル市スフバートル区第1ホロー、エルチンギーン通り15a、Embassy One Tower 4・5階',
    'footer.address.highSchool':
      'モンゴル国ウランバートル市スフバートル区第1ホロー、オリンピック通り',

    // ─── Quick portals (home page strip) ──────────────────────────
    'portal.studentSystem': '学生システム',
    'portal.teacherSystem': '教員システム',
    'portal.elearning': 'オンライン学習',
  },
};

export type TranslationKey = keyof (typeof MESSAGES)['MN'];
