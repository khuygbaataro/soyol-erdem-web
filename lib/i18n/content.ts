/**
 * Structured page-level translations. Each export here is keyed by
 * Language (MN | JP | EN) so server / client can grab the localised
 * variant in one lookup:
 *
 *     const c = HOME_CONTENT[locale];
 *
 * Missing locale → Mongolian fallback via `localised()` below.
 */

import type { Language } from '@/lib/constants';

/** Safe locale getter — falls back to MN when a locale is missing. */
export function localised<T>(table: Record<Language, T>, locale: Language): T {
  return table[locale] ?? table.MN;
}

/* ───────────────────────── Common UI ──────────────────────────────── */

export const COMMON = {
  MN: {
    readMore: 'Дэлгэрэнгүй',
    viewAll: 'Бүх мэдээг үзэх',
    viewMore: 'Дэлгэрэнгүй мэдэх',
    learnMore: 'Илүү ихийг үзэх',
    seeAllPrograms: 'Бүх мэргэжлээ үзэх',
    contactUs: 'Бидэнтэй холбогдох',
    sendMessage: 'Зурвас илгээх',
    apply: 'Бүртгүүлэх',
    backToList: 'Жагсаалт руу буцах',
    address: 'Хаяг',
    phone: 'Утас',
    email: 'И-мэйл',
    hours: 'Ажиллах цаг',
    featured: 'Онцлох хөтөлбөр',
    badge2023: 'Японы хөрөнгө оруулалттай · 2023 онд байгуулагдсан',
    requirements: 'Шаардлага',
    documents: 'Бүрдүүлэх материал',
    additionalRequirements: 'Нэмэлт шаардлага',
    description: 'Дэлгэрэнгүй',
    note: 'Тайлбар',
    suitableFor: 'Хэнд тохиромжтой вэ?',
  },
  EN: {
    readMore: 'Read more',
    viewAll: 'View all news',
    viewMore: 'Learn more',
    learnMore: 'Find out more',
    seeAllPrograms: 'See all programs',
    contactUs: 'Contact us',
    sendMessage: 'Send a message',
    apply: 'Apply',
    backToList: 'Back to list',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    hours: 'Hours',
    featured: 'Featured program',
    badge2023: 'Japanese-funded · established 2023',
    requirements: 'Requirements',
    documents: 'Required documents',
    additionalRequirements: 'Additional requirements',
    description: 'Details',
    note: 'Note',
    suitableFor: 'Who is it for?',
  },
  JP: {
    readMore: '詳細を見る',
    viewAll: 'すべてのニュース',
    viewMore: '詳しく見る',
    learnMore: 'もっと見る',
    seeAllPrograms: 'すべての専攻',
    contactUs: 'お問い合わせ',
    sendMessage: 'メッセージを送る',
    apply: '出願する',
    backToList: '一覧に戻る',
    address: '住所',
    phone: '電話',
    email: 'メール',
    hours: '営業時間',
    featured: '特集プログラム',
    badge2023: '日本資本 · 2023年設立',
    requirements: '応募条件',
    documents: '必要書類',
    additionalRequirements: '追加要件',
    description: '詳細',
    note: '備考',
    suitableFor: '対象となる方',
  },
};

/* ───────────────────────── Home page ──────────────────────────────── */

export const HOME_CONTENT = {
  MN: {
    hero: {
      titleLine1: 'ИРЭЭДҮЙГЭЭ',
      titleLine2: 'ЭНДЭЭС ЭХЭЛ',
      italic: 'Япон хэлний боловсролын манлайлагч',
      body: 'Япон улсын 100% хөрөнгө оруулалттай Соёл Эрдэм Дээд Сургууль 1993 онд байгуулагдсан. Манай сургууль нь япон хэлний боловсролын чиглэлээр Монгол улсдаа тэргүүлэгч сургууль бөгөөд япон улсын 30 гаруй их, дээд сургуультай хамтран ажиллаж, оюутан солилцооны хөтөлбөр амжилттай хэрэгжүүлсээр байна. Бид одоогийн байдлаар 1500 гаруй оюутныг төгсгөж, нийт төгсөгчдийн 40 орчим хувь нь Япон улсад суралцаж, ажиллаж байна.',
      ctaPrimary: 'Мэргэжлээ сонгох',
      ctaSecondary: 'Элсэлтийн мэдээлэл',
      heroAlt: 'Соёл Эрдэм Их Сургуулийн зураг',
    },
    internship: {
      badge: 'Онцлох хөтөлбөр',
      title: 'Япон улсад цалинтай дадлага хий',
      body: 'Сард 150,000 иений (≈2.5 сая төгрөг) цалинтай практик дадлага. 2014 оноос Монгол улсад анх удаа нэвтэрсэн интерншип хөтөлбөр.',
      bullets: [
        'Япон улсын зочид буудал, ресторан, халуун рашаанд дадлага',
        'Япон хэлний дадлага + цалин',
        'Япон соёл, ёс заншилтай танилцах боломж',
      ],
      cta: 'Дэлгэрэнгүй мэдэх',
    },
    news: {
      heading: 'СҮҮЛИЙН МЭДЭЭ',
      viewAll: 'Бүх мэдээг үзэх',
    },
  },
  EN: {
    hero: {
      titleLine1: 'START YOUR',
      titleLine2: 'FUTURE HERE',
      italic: 'Leader in Japanese-language education',
      body: 'Soyol Erdem University was established in 1993 as a 100%-Japanese-funded institution. It is Mongolia\'s leading school for Japanese-language education, partnering with more than 30 universities in Japan to run successful student-exchange programs. So far, more than 1,500 students have graduated and around 40% of our alumni study or work in Japan.',
      ctaPrimary: 'Browse programs',
      ctaSecondary: 'Admission info',
      heroAlt: 'Photo of Soyol Erdem University building',
    },
    internship: {
      badge: 'Featured program',
      title: 'Earn while you intern in Japan',
      body: 'Monthly stipend of ¥150,000 (≈ MNT 2.5M). The first paid-internship program of its kind in Mongolia, running since 2014.',
      bullets: [
        'Placement at Japanese hotels, restaurants, and onsen resorts',
        'On-the-job Japanese-language practice with a real salary',
        'Direct exposure to Japanese culture and customs',
      ],
      cta: 'Find out more',
    },
    news: {
      heading: 'LATEST NEWS',
      viewAll: 'View all news',
    },
  },
  JP: {
    hero: {
      titleLine1: '未来は',
      titleLine2: 'ここから始まる',
      italic: '日本語教育のリーディング・スクール',
      body: '1993年に設立された日本資本100%の私立大学、ソヨル・エルデム大学。モンゴル国における日本語教育の中心的存在として、日本国内30以上の大学と連携した交換留学プログラムを運営しています。これまでに1,500名以上が卒業し、卒業生の約40%が日本で学び・働いています。',
      ctaPrimary: '専攻を選ぶ',
      ctaSecondary: '入学案内を見る',
      heroAlt: 'ソヨル・エルデム大学のキャンパス写真',
    },
    internship: {
      badge: '特集プログラム',
      title: '日本での有給インターンシップ',
      body: '月給150,000円(約250万トゥグルグ)で実践的なインターンシップに参加できます。2014年からモンゴルで初めて導入された有給インターン制度です。',
      bullets: [
        '日本のホテル・レストラン・温泉旅館でのインターン',
        '実務を通した日本語の実践と給与の両立',
        '日本の文化・習慣に直に触れる絶好の機会',
      ],
      cta: '詳しく見る',
    },
    news: {
      heading: '最新ニュース',
      viewAll: 'すべてのニュース',
    },
  },
};

/* ──────────────────────── About page ─────────────────────────────── */

export const ABOUT_CONTENT = {
  MN: {
    heroTitle1: 'СОЁЛ ЭРДЭМ',
    heroTitle2: 'ДЭЭД СУРГУУЛЬ',
    heroBody:
      'Япон улсын 100% хөрөнгө оруулалттай Соёл Эрдэм Дээд Сургууль 1993 онд байгуулагдсан. Манай сургууль нь япон хэлний боловсролын чиглэлээр Монгол улсдаа тэргүүлэгч сургууль бөгөөд япон улсын 30 гаруй их, дээд сургуультай хамтран ажиллаж, оюутан солилцооны хөтөлбөр амжилттай хэрэгжүүлсээр байна. Бид одоогийн байдлаар 1500 гаруй оюутныг төгсгөж, нийт төгсөгчдийн 40 орчим хувь нь Япон улсад суралцаж, ажиллаж байна.',
    heroCta: 'Бидний тухай дэлгэрэнгүй',
    breadcrumbHome: 'Нүүр',
    breadcrumbThis: 'Сургуулийн тухай',
    introEyebrow: 'Танилцуулга',
    introTitle: 'МАНАЙ СУРГУУЛИЙН ТҮҮХТЭЙ ТАНИЛЦАХ ХЭСЭГ',
    mvvEyebrow: 'Бидний үнэт зүйлс',
    sections: [
      {
        number: '01',
        title: 'ҮҮСГЭН БАЙГУУЛАГЧ',
        text: 'Үүсгэн байгуулагч, Удирдах зөвлөлийн дарга Макихара Соичи — сургуулийн үүсэл, эрхэм зорилгын тухай.',
      },
      {
        number: '02',
        title: 'ЗАХИРЛЫН МЭНДЧИЛГЭЭ',
        text: 'Гүйцэтгэх захирал Д.Эрдэнэчимэг — багш, оюутан, төгсөгчид болон хамтран ажиллагч нартаа зориулсан мэндчилгээ.',
      },
      {
        number: '03',
        title: 'БҮТЭЦ, ЗОХИОН БАЙГУУЛАЛТ',
        text: 'Удирдах зөвлөл, Эрдмийн зөвлөл, Захирал, Чанарын үнэлгээний алба болон 4 үндсэн зохион байгуулалт.',
      },
      {
        number: '04',
        title: 'МАГАДЛАН ИТГЭМЖЛЭЛ',
        text: '2003, 2010, 2020 онуудад магадлан итгэмжлэгдсэн. 2026 оны 4 дэх удаагийн магадлан итгэмжлэлийн үйл ажиллагаа явагдаж байна.',
      },
    ],
    mvv: {
      mission: {
        title: 'ЭРХЭМ ЗОРИЛГО',
        text: 'Монгол болон Япон улсын зах зээлд хүлээн зөвшөөрөгдөхүйц мэргэжилтэн бэлтгэнэ.',
      },
      vision: {
        title: 'АЛСЫН ХАРАА',
        text: 'Япон судлалын чиглэлээр Монгол улсдаа тэргүүлэгч сургууль байх.',
      },
      values: {
        title: 'ҮНЭТ ЗҮЙЛС',
        text: 'С — Соёл уламжлалаа дээдэлсэн\nЭ — Эрдэм мэдлэгийг эрхэмлэсэн\nД — Даяар хөгжлийг хүндэтгэж, судалгааны төгөлдөршилд тэмүүлсэн\nС — Соёл-Эрдэм болж тэмүүлсэн',
      },
      slogan: {
        title: 'УРИА',
        text: 'Эрдмийн өндөр оргилоос ертөнцийг харъя',
      },
    },
  },
  EN: {
    heroTitle1: 'SOYOL ERDEM',
    heroTitle2: 'UNIVERSITY',
    heroBody:
      'Soyol Erdem University was founded in 1993 as a 100%-Japanese-funded institution. It is the leading school in Mongolia for Japanese-language education, partnering with more than 30 universities in Japan to run successful student-exchange programs. To date, over 1,500 students have graduated, and around 40% of our alumni study or work in Japan.',
    heroCta: 'Learn more about us',
    breadcrumbHome: 'Home',
    breadcrumbThis: 'About',
    introEyebrow: 'Overview',
    introTitle: 'GET TO KNOW OUR UNIVERSITY',
    mvvEyebrow: 'Our values',
    sections: [
      {
        number: '01',
        title: 'FOUNDER',
        text: 'Founder and chairman of the board Soichi Makihara — on the origins and mission of the school.',
      },
      {
        number: '02',
        title: 'DIRECTOR\'S MESSAGE',
        text: 'Director D. Erdenechimeg — a message to faculty, students, alumni, and partners.',
      },
      {
        number: '03',
        title: 'GOVERNANCE & STRUCTURE',
        text: 'Board of Trustees, Academic Council, Director, Quality Assurance Office, and the four core divisions.',
      },
      {
        number: '04',
        title: 'ACCREDITATION',
        text: 'Accredited in 2003, 2010, and 2020. The fourth round of accreditation is currently in progress (2026).',
      },
    ],
    mvv: {
      mission: {
        title: 'MISSION',
        text: 'To prepare professionals recognised in both the Mongolian and Japanese labour markets.',
      },
      vision: {
        title: 'VISION',
        text: 'To be Mongolia\'s leading university in the field of Japanese studies.',
      },
      values: {
        title: 'VALUES',
        text: 'С — Cherish cultural heritage\nЭ — Pursue knowledge with rigour\nД — Embrace global development and research excellence\nС — Strive to embody Soyol Erdem',
      },
      slogan: {
        title: 'MOTTO',
        text: 'See the world from the heights of scholarship',
      },
    },
  },
  JP: {
    heroTitle1: 'ソヨル・エルデム',
    heroTitle2: '大学',
    heroBody:
      '1993年設立、日本資本100%のソヨル・エルデム大学。モンゴルにおける日本語教育の中心的存在として、日本国内30以上の大学と提携し、交換留学プログラムを成功裏に運営してきました。これまでに1,500名以上が卒業し、卒業生の約40%が日本で学び・働いています。',
    heroCta: '大学について詳しく',
    breadcrumbHome: 'ホーム',
    breadcrumbThis: '大学について',
    introEyebrow: '紹介',
    introTitle: '本学について知る',
    mvvEyebrow: '私たちの価値観',
    sections: [
      {
        number: '01',
        title: '創立者',
        text: '創立者・理事長 牧原 聡一 — 大学の創立とミッションについて。',
      },
      {
        number: '02',
        title: '学長メッセージ',
        text: '学長 D. エルデネチメグ — 教職員・学生・卒業生・関係者の皆さまへのメッセージ。',
      },
      {
        number: '03',
        title: '組織構成',
        text: '理事会、学術評議会、学長、品質保証室、および4つの基幹部門。',
      },
      {
        number: '04',
        title: '認定・認証',
        text: '2003年・2010年・2020年に認証を取得。現在、第4回目の認証取得手続きを進行中です(2026年)。',
      },
    ],
    mvv: {
      mission: {
        title: '使命',
        text: 'モンゴル・日本両国の労働市場で通用する人材を育成する。',
      },
      vision: {
        title: 'ビジョン',
        text: '日本研究の分野でモンゴル屈指の大学であること。',
      },
      values: {
        title: '価値観',
        text: 'С — 文化遺産を大切に\nЭ — 学識と研鑽の追求\nД — 世界基準の発展と研究の卓越\nС — ソヨル・エルデムらしさの追求',
      },
      slogan: {
        title: 'スローガン',
        text: '学問の頂きから世界を見渡そう',
      },
    },
  },
};

/* ──────────────────────── Stats labels ───────────────────────────── */

export const STATS_LABELS = {
  MN: {
    history: 'Жилийн түүхтэй',
    graduates: 'Төгсөгчид',
    partners: 'Япон хамтрагч их сургууль',
    inJapan: 'Япон улсад ажиллаж байна',
  },
  EN: {
    history: 'years of history',
    graduates: 'graduates',
    partners: 'partner universities in Japan',
    inJapan: 'now study or work in Japan',
  },
  JP: {
    history: '年の歴史',
    graduates: '卒業生',
    partners: '日本国内の提携大学',
    inJapan: '日本で学び・働く卒業生',
  },
};

/* ─────────────────────── Section titles (shared) ──────────────────── */

export const SECTION_TITLES = {
  MN: {
    homeLatestNews: 'СҮҮЛИЙН МЭДЭЭ',
    homeViewAllNews: 'Бүх мэдээг үзэх',
    studentLifeTitle: 'ОЮУТНЫ АМЬДРАЛ',
    researchTitle: 'ЭРДЭМ ШИНЖИЛГЭЭ, СУДАЛГААНЫ АЖИЛ',
    internationalTitle: 'СУРГУУЛИЙН ГАДААД, ДОТООД ХАМТЫН АЖИЛЛАГАА',
    programsTitle: 'МЭРГЭЖЛҮҮД',
    admissionTitle: 'ЭЛСЭЛТ',
    contactTitle: 'ХОЛБОО БАРИХ',
    libraryTitle: 'НОМЫН САН',
    careersTitle: 'НЭЭЛТТЭЙ АЖЛЫН БАЙР',
    regulationsTitle: 'ДҮРЭМ ЖУРАМ',
    newsTitle: 'МЭДЭЭ',
    soninTitle: 'СОНИН ХЭВЛЭЛ',
    elearningTitle: 'ЦАХИМ СУРГАЛТ',
  },
  EN: {
    homeLatestNews: 'LATEST NEWS',
    homeViewAllNews: 'View all news',
    studentLifeTitle: 'STUDENT LIFE',
    researchTitle: 'RESEARCH & SCHOLARSHIP',
    internationalTitle: 'INTERNATIONAL & DOMESTIC PARTNERSHIPS',
    programsTitle: 'PROGRAMS',
    admissionTitle: 'ADMISSION',
    contactTitle: 'CONTACT US',
    libraryTitle: 'LIBRARY',
    careersTitle: 'CAREERS',
    regulationsTitle: 'REGULATIONS',
    newsTitle: 'NEWS',
    soninTitle: 'SCHOOL NEWSPAPER',
    elearningTitle: 'ONLINE LEARNING',
  },
  JP: {
    homeLatestNews: '最新ニュース',
    homeViewAllNews: 'すべてのニュース',
    studentLifeTitle: '学生生活',
    researchTitle: '研究・学術活動',
    internationalTitle: '国際・国内連携',
    programsTitle: '専攻一覧',
    admissionTitle: '入学案内',
    contactTitle: 'お問い合わせ',
    libraryTitle: '図書館',
    careersTitle: '採用情報',
    regulationsTitle: '規則・規程',
    newsTitle: 'ニュース',
    soninTitle: '広報誌',
    elearningTitle: 'オンライン学習',
  },
};
