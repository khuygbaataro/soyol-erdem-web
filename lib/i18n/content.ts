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

/* ──────────────────────── Admission page ──────────────────────────── */

interface AdmissionProgramTr {
  id: string;
  title: string;
  intro: string;
  bulletsLabel?: string;
  bullets: string[];
  bullets2Label?: string;
  bullets2?: string[];
  cta: string;
}

interface AdmissionStepTr {
  number: string;
  title: string;
  description: string;
}

interface ScholarshipTr {
  title: string;
  description: string;
}

interface FaqItemTr {
  question: string;
  answer: string;
}

interface AdmissionBundle {
  heroTitle: string;
  heroSubtitle: string;
  subNav: { info: string; foreign: string; payment: string };
  sectionInfoTitle: string;
  sectionInfoSubtitle: string;
  stepsTitle: string;
  stepsSubtitle: string;
  requirementsHeading: string;
  foreignTitle: string;
  paymentTitle: string;
  paymentSubtitle: string;
  faqTitle: string;
  programs: AdmissionProgramTr[];
  steps: AdmissionStepTr[];
  requirements: string[];
  scholarships: ScholarshipTr[];
  faq: FaqItemTr[];
}

export const ADMISSION_CONTENT: Record<Language, AdmissionBundle> = {
  MN: {
    heroTitle: 'ЭЛСЭЛТ',
    heroSubtitle: '2026-2027 оны хичээлийн жилийн элсэлтийн мэдээлэл.',
    subNav: {
      info: 'Мэргэжлээ сонгох',
      foreign: 'Гадаад оюутан элсэх',
      payment: 'Төлбөр, хөнгөлөлт',
    },
    sectionInfoTitle: 'МЭРГЭЖЛЭЭ СОНГОХ',
    sectionInfoSubtitle:
      '2026-2027 оны хичээлийн жилийн элсэлтийн журам, тэтгэлэг ба элсэлтийн төрлүүд.',
    stepsTitle: 'ЭЛСЭЛТИЙН АЛХАМ',
    stepsSubtitle: '5 алхамт энгийн процесс.',
    requirementsHeading: 'Элсэгчдэд тавигдах нийтлэг шаардлага',
    foreignTitle: 'ГАДААД ОЮУТАН ЭЛСЭХ',
    paymentTitle: 'ТӨЛБӨР, ХӨНГӨЛӨЛТ',
    paymentSubtitle: 'Элсэгчидэд зориулсан төлбөрийн хөнгөлөлтийн нөхцөл.',
    faqTitle: 'Тогтмол асуултууд',
    programs: [
      { id: 'bachelor', title: 'БАКАЛАВРЫН ЭЛСЭЛТ (2026–2027)', intro: '2026–2027 оны хичээлийн жилд дараах мэргэжлүүдээр элсэлт авч байна.', bullets: ['Программ хангамж', 'Бусад бакалаврын хөтөлбөрүүд'], bullets2Label: 'Тайлбар', bullets2: ['Элсэгчид ЭЕШ-ийн онооны шаардлагыг хангасан байна.'], cta: 'Бүртгүүлэх' },
      { id: 'software', title: 'ПРОГРАММ ХАНГАМЖИЙН МЭРГЭЖИЛ', intro: 'Ирээдүйн эрэлттэй салбарт суралцах боломж.', bullets: ['Орчин үеийн IT хөтөлбөр', 'Практикт суурилсан сургалт', 'Дотоод, гадаадын ажлын боломж'], cta: 'Дэлгэрэнгүй харах' },
      { id: 'master', title: 'МАГИСТРЫН ЭЛСЭЛТ', intro: 'Магистрын шатны элсэлт дараах чиглэлээр явагдана.', bullets: ['Гадаад хэл шинжлэл'], bullets2Label: 'Давуу тал', bullets2: ['Судалгаанд суурилсан сургалт', 'Ажлын хажуугаар суралцах боломж'], cta: 'Бүртгүүлэх' },
      { id: 'thirty-plus', title: '30+ ХӨТӨЛБӨР', intro: '30-аас дээш насны, ЭЕШ өгөөгүй иргэдэд зориулсан тусгай элсэлт.', bulletsLabel: 'Шаардлага', bullets: ['Мэргэжлээрээ 3+ жил ажилласан байх', 'Ажлын газрын тодорхойлолт', 'Бүрэн дунд боловсролын гэрчилгээ'], cta: 'Хүсэлт илгээх' },
      { id: 'transfer-major', title: 'МЭРГЭЖИЛ ХӨРВӨХ ХӨТӨЛБӨР', intro: 'Өмнө нь өөр мэргэжлээр төгссөн бол шинэ чиглэлээр суралцах боломж.', bulletsLabel: 'Хэнд тохиромжтой вэ?', bullets: ['Коллеж, МСҮТ, их дээд сургууль төгсөгчид', 'Шинэ мэргэжил эзэмших хүсэлтэй хүмүүс', 'Япон хэл сураад Япон улсад үргэлжлүүлэн суралцах сонирхолтой'], bullets2Label: 'Бүрдүүлэх материал', bullets2: ['Диплом, үнэмлэх', 'Холбогдох бичиг баримтууд'], cta: 'Дэлгэрэнгүй' },
      { id: 'transfer-abroad', title: 'ГАДААДААС ШИЛЖИН СУРАЛЦАХ', intro: 'Гадаадад суралцаж байгаад шилжин ирэх боломжтой.', bulletsLabel: 'Нэмэлт шаардлага', bullets: ['Суралцаж байсан сургуулийн дүнгийн хуулга', 'Баталгаат орчуулга'], cta: 'Шилжилт хүсэх' },
      { id: 'online', title: 'ОНЛАЙН СУРГАЛТ', intro: 'Гадаадад ажиллаж, амьдарч буй иргэдэд зориулсан уян хатан хэлбэр.', bullets: ['100% онлайн сургалт', 'Бакалавр, магистрын зэрэг олгоно', 'Хаанаас ч суралцах боломж'], cta: 'Онлайнаар бүртгүүлэх' },
      { id: 'preparation', title: 'БЭЛТГЭЛ АНГИ', intro: 'ЭЕШ-ийн оноо хүрээгүй элсэгчдэд зориулсан хөтөлбөр.', bullets: ['1 жилийн бэлтгэл сургалт', 'ЭЕШ-д бэлтгэнэ', 'Оноо авсны дараа үндсэн ангид шилжинэ'], cta: 'Бүртгүүлэх' },
    ],
    steps: [
      { number: '01', title: 'МЭДЭЭЛЭЛ АВАХ', description: 'Манай мэргэжлүүд, сургалтын төлбөр, тэтгэлэгийн талаар судал. Утсаар эсвэл биечлэн ирж зөвлөгөө аваарай.' },
      { number: '02', title: 'БҮРТГҮҮЛЭХ', description: 'Онлайн эсвэл биечлэн бүртгүүлэх. ЭЕШ-ын батламж, гэрчилгээ, бусад баримт бичгээ бэлдээд ирээрэй.' },
      { number: '03', title: 'БАРИМТ ӨГӨХ', description: 'ЭЕШ-ын батламж, суурь боловсролын гэрчилгээ, бүрэн дунд боловсролын гэрчилгээ, бусад шаардагдах баримт.' },
      { number: '04', title: 'ШАЛГАЛТ / ЯРИЛЦЛАГА', description: 'Зарим мэргэжлийн ангид нэмэлт шалгалт эсвэл ярилцлага байж болно. Гадаадын иргэн, дээд боловсролтой иргэн эссэ бичиж, ярилцлагад орно.' },
      { number: '05', title: 'ҮР ДҮН', description: 'Тэнцсэн элсэгчдэд суралцах эрхийн бичиг олгоно. Сургалтын төлбөр төлж бүртгэлээ дуусгана.' },
    ],
    requirements: [
      'Элсэлтийн ерөнхий шалгалтын батламжтай байх',
      'Суурь боловсролын гэрчилгээ болон бүрэн дунд боловсролын гэрчилгээтэй байх',
      'Эрүүл мэнд, сэтгэцийн хувьд тус сургуульд элсэхэд харшлах зүйлгүй байна',
      'Гадаадын иргэн болон дээд боловсролтой Монгол улсын иргэн эссэ бичиж, ярилцлагад орно',
      'Бүрдүүлэх материал: ЭЕШ батламж, гэрчилгээнүүд, иргэний үнэмлэх, цээж зураг',
    ],
    scholarships: [
      { title: 'Япон улсад 50% эсвэл 100% тэтгэлэгтэй суралцах', description: 'Шилдэг оюутнуудад Япон улсын 30 гаруй хамтран ажиллагч их сургуулиар тэтгэлэгтэй сургалт.' },
      { title: 'Интерншип — цалинтай дадлага', description: 'Сард 2.5 сая төгрөгтэй тэнцэх (150,000 иений) цалинтай япон хэл, соёлын практик дадлага.' },
      { title: 'Зуны амралтын тэтгэлэг', description: 'Багш, оюутнууд зуны амралтаараа 100% тэтгэлэгтэй хэлний бэлтгэлд суралцах боломж.' },
      { title: 'Хөгжлийн бэрхшээлтэй элсэгчид', description: 'Хөгжлийн бэрхшээлтэй эсвэл эцэг эх нь хоёулаа хөгжлийн бэрхшээлтэй элсэгчдэд төлбөрийн хөнгөлөлт.' },
      { title: 'Олон хүүхэдтэй өрхийн тэтгэлэг', description: 'Нэг өрхийн 3 болон түүнээс дээш хүүхэд дээд боловсрол эзэмшихээр зэрэг суралцаж буй бол 1 хүүхдийн төлбөрийн хөнгөлөлт.' },
    ],
    faq: [
      { question: 'Япон хэл огт мэдэхгүй элсэж болох уу?', answer: 'Тийм. Манай сургуульд япон хэлний бүх түвшний оюутан элсэх боломжтой. Бид анхан шатнаас N1 түвшин хүртэл системтэй сургалт явуулдаг.' },
      { question: 'Япон улсад ажиллах баталгаатай юу?', answer: 'Манай төгсөгчдийн 40% Япон улсад ажиллаж байна. Интерншип хөтөлбөр болон 30 гаруй японы хамтрагч сургуулиар дамжуулан Япон улсад очих боломж өндөр.' },
      { question: 'Сургалтын төлбөр хэд вэ?', answer: 'Жил тутмын сургалтын төлбөр болон төлбөрийн нөхцөлийн талаар манай элсэлтийн алба руу 7011-8584 утсаар лавлана уу.' },
      { question: 'Дотуур байр байгаа юу?', answer: 'Тийм. Сургуулийн дэргэд дотуур байр ажиллаж байна. Орон нутгаас ирсэн оюутнуудыг хариуцлагатай шууд хариуцана.' },
      { question: 'Хэдэн настай элсэх боломжтой вэ?', answer: 'Бүрэн дунд боловсрол эзэмшсэн, ЭЕШ-ын батламжтай 17 наснаас дээш насны иргэн элсэх боломжтой. Насны дээд хязгааргүй.' },
    ],
  },
  EN: {
    heroTitle: 'ADMISSION',
    heroSubtitle: 'Admission information for the 2026–2027 academic year.',
    subNav: {
      info: 'Choose your major',
      foreign: 'International students',
      payment: 'Tuition & scholarships',
    },
    sectionInfoTitle: 'CHOOSE YOUR MAJOR',
    sectionInfoSubtitle:
      'Admission policies, scholarships, and program types for the 2026–2027 academic year.',
    stepsTitle: 'APPLICATION STEPS',
    stepsSubtitle: 'A straightforward five-step process.',
    requirementsHeading: 'General admission requirements',
    foreignTitle: 'INTERNATIONAL STUDENTS',
    paymentTitle: 'TUITION & SCHOLARSHIPS',
    paymentSubtitle: 'Discount and scholarship options for applicants.',
    faqTitle: 'Frequently asked questions',
    programs: [
      { id: 'bachelor', title: 'BACHELOR\'S ADMISSION (2026–2027)', intro: 'Admission for the 2026–2027 academic year is open in the majors below.', bullets: ['Software Engineering', 'Other bachelor\'s programs'], bullets2Label: 'Note', bullets2: ['Applicants must meet the national entrance-exam (EYESH) score requirement.'], cta: 'Apply' },
      { id: 'software', title: 'SOFTWARE ENGINEERING', intro: 'Train for one of the highest-demand fields of the future.', bullets: ['Modern IT curriculum', 'Hands-on, practice-based learning', 'Career opportunities at home and abroad'], cta: 'Learn more' },
      { id: 'master', title: 'MASTER\'S ADMISSION', intro: 'Master\'s admission runs in the following track.', bullets: ['Foreign Linguistics'], bullets2Label: 'Why study with us', bullets2: ['Research-based curriculum', 'Study while you work'], cta: 'Apply' },
      { id: 'thirty-plus', title: '30+ PROGRAM', intro: 'A dedicated admission track for applicants over 30 who did not sit the EYESH.', bulletsLabel: 'Eligibility', bullets: ['Three or more years of work experience in the field', 'Letter of employment', 'Certificate of complete secondary education'], cta: 'Submit application' },
      { id: 'transfer-major', title: 'MAJOR-CHANGE PROGRAM', intro: 'An opportunity for graduates of other fields to retrain in a new specialty.', bulletsLabel: 'Who is it for?', bullets: ['Graduates of colleges, vocational schools, and universities', 'Anyone wishing to acquire a new profession', 'Those learning Japanese with the intention of continuing studies in Japan'], bullets2Label: 'Required documents', bullets2: ['Diploma and ID', 'Relevant supporting paperwork'], cta: 'Learn more' },
      { id: 'transfer-abroad', title: 'TRANSFER FROM ABROAD', intro: 'Transfer in from another institution overseas.', bulletsLabel: 'Additional requirements', bullets: ['Transcript from the previous institution', 'Certified translation'], cta: 'Request transfer' },
      { id: 'online', title: 'ONLINE LEARNING', intro: 'A flexible track designed for Mongolians living and working overseas.', bullets: ['100% online instruction', 'Bachelor\'s and master\'s degrees offered', 'Study from anywhere'], cta: 'Apply online' },
      { id: 'preparation', title: 'PREP COURSE', intro: 'A pathway for applicants whose EYESH score did not yet meet the threshold.', bullets: ['One-year preparatory program', 'EYESH coaching included', 'Promotion to the main program once the score is achieved'], cta: 'Apply' },
    ],
    steps: [
      { number: '01', title: 'GATHER INFORMATION', description: 'Read up on our majors, tuition, and scholarship options. Call us or come in person for a consultation.' },
      { number: '02', title: 'REGISTER', description: 'Register online or in person. Bring your EYESH certificate, transcripts, and other required documents.' },
      { number: '03', title: 'SUBMIT DOCUMENTS', description: 'EYESH certificate, basic-education certificate, complete-secondary certificate, and any other supporting documents.' },
      { number: '04', title: 'EXAM / INTERVIEW', description: 'Some majors require an extra entrance exam or interview. International applicants and those with prior higher education complete an essay and interview.' },
      { number: '05', title: 'RESULT', description: 'Successful applicants receive their letter of enrolment. Pay the tuition fee to finalise registration.' },
    ],
    requirements: [
      'Hold a valid national entrance-exam (EYESH) certificate',
      'Hold a basic-education certificate and a complete-secondary-education certificate',
      'Be in good physical and mental health, with no medical contraindications to enrolment',
      'International applicants and Mongolian citizens with prior higher education complete an essay and interview',
      'Application packet: EYESH certificate, school certificates, ID, passport photos',
    ],
    scholarships: [
      { title: 'Study in Japan with a 50% or 100% scholarship', description: 'Top students receive scholarships at our 30+ partner universities in Japan.' },
      { title: 'Internship — paid practical experience', description: 'A paid Japanese-language and culture internship worth roughly MNT 2.5M (¥150,000) per month.' },
      { title: 'Summer scholarship', description: 'Faculty and students can join a fully-funded summer Japanese-language program.' },
      { title: 'Applicants with disabilities', description: 'Tuition discount for applicants with disabilities or whose both parents are disabled.' },
      { title: 'Large-family scholarship', description: 'When three or more children from the same household are studying in higher education at the same time, one child\'s tuition is discounted.' },
    ],
    faq: [
      { question: 'Can I enrol without any Japanese-language background?', answer: 'Yes. We accept students at every level of Japanese ability and run a structured curriculum from beginner all the way up to JLPT N1.' },
      { question: 'Is employment in Japan guaranteed?', answer: 'About 40% of our alumni currently work in Japan. Through the internship program and our 30+ Japanese partner universities, the chances of going to Japan are high.' },
      { question: 'How much is tuition?', answer: 'Please call our admissions office at 7011-8584 for the latest annual tuition and payment terms.' },
      { question: 'Is on-campus housing available?', answer: 'Yes. We operate a residence hall on the campus grounds and prioritise placement for students from outside the capital.' },
      { question: 'What is the age range for admission?', answer: 'Anyone aged 17 or above who has completed secondary education and holds an EYESH certificate may apply. There is no upper age limit.' },
    ],
  },
  JP: {
    heroTitle: '入学案内',
    heroSubtitle: '2026–2027年度入試の最新情報。',
    subNav: {
      info: '専攻を選ぶ',
      foreign: '留学生の方へ',
      payment: '学費・奨学金',
    },
    sectionInfoTitle: '専攻を選ぶ',
    sectionInfoSubtitle:
      '2026–2027年度の入試要項、奨学金、選考方式の一覧。',
    stepsTitle: '出願ステップ',
    stepsSubtitle: '5ステップで完結するシンプルな手続き。',
    requirementsHeading: '一般的な出願資格',
    foreignTitle: '留学生の方へ',
    paymentTitle: '学費・奨学金',
    paymentSubtitle: '入学者向けの学費減免・奨学金制度の概要。',
    faqTitle: 'よくあるご質問',
    programs: [
      { id: 'bachelor', title: '学士課程入試(2026–2027)', intro: '2026–2027年度は以下の専攻で出願を受け付けます。', bullets: ['ソフトウェア工学', 'その他の学士課程'], bullets2Label: '備考', bullets2: ['全国共通入試(EYESH)の合格基準点を満たす必要があります。'], cta: '出願する' },
      { id: 'software', title: 'ソフトウェア工学', intro: '将来性の高い分野で学ぶチャンス。', bullets: ['最新のIT教育', '実務に直結した実践型学習', '国内外での就職機会'], cta: '詳しく見る' },
      { id: 'master', title: '修士課程入試', intro: '修士課程は以下の研究領域で募集します。', bullets: ['外国語学・言語学'], bullets2Label: '本学の強み', bullets2: ['研究中心のカリキュラム', '社会人と並行して学べる柔軟さ'], cta: '出願する' },
      { id: 'thirty-plus', title: '30+(30歳以上)プログラム', intro: 'EYESH未受験の30歳以上の方を対象とした特別入試枠。', bulletsLabel: '応募条件', bullets: ['当該分野での実務経験3年以上', '勤務先の証明書', '中等教育修了証'], cta: '申請する' },
      { id: 'transfer-major', title: '専攻転換プログラム', intro: 'すでに別分野で卒業された方が新しい専攻に挑戦できます。', bulletsLabel: '対象となる方', bullets: ['短大・専門学校・大学の既卒者', '新しい職能を身に付けたい方', '日本語を学び将来日本での進学を目指す方'], bullets2Label: '必要書類', bullets2: ['卒業証書、身分証', '関連する補足書類'], cta: '詳しく見る' },
      { id: 'transfer-abroad', title: '海外からの編入', intro: '海外で在学中の方も編入できます。', bulletsLabel: '追加要件', bullets: ['在学先大学の成績証明書', '公証付き翻訳'], cta: '編入を申し込む' },
      { id: 'online', title: 'オンライン学習', intro: '海外在住・在勤のモンゴル人向け、柔軟な学習形態。', bullets: ['100%オンライン授業', '学士・修士の学位授与', '世界中どこからでも受講可能'], cta: 'オンラインで出願' },
      { id: 'preparation', title: '予備コース', intro: 'EYESHの基準点に届かなかった方のための準備プログラム。', bullets: ['1年間の予備課程', 'EYESH対策込み', '基準点取得後は本科に移行'], cta: '出願する' },
    ],
    steps: [
      { number: '01', title: '情報収集', description: '専攻、学費、奨学金について調べる。電話または来校の上、相談員にご相談ください。' },
      { number: '02', title: '出願登録', description: 'オンラインまたは来校で出願。EYESH合格証、卒業証書、その他必要書類をご準備ください。' },
      { number: '03', title: '書類提出', description: 'EYESH合格証、基礎教育修了証、中等教育修了証、その他必要書類を提出。' },
      { number: '04', title: '試験・面接', description: '一部の専攻では追加試験または面接があります。留学生および既卒者は小論文と面接が課されます。' },
      { number: '05', title: '結果通知', description: '合格者には入学許可書を発行。学費納付をもって入学手続き完了です。' },
    ],
    requirements: [
      'EYESH(モンゴル全国共通入試)合格証を保有していること',
      '基礎教育修了証および中等教育修了証を保有していること',
      '心身ともに本学での就学に支障がないこと',
      '留学生およびモンゴル国籍の既卒者は小論文と面接を受けること',
      '提出書類:EYESH合格証、各種卒業証、身分証、顔写真',
    ],
    scholarships: [
      { title: '日本で50%または100%の奨学金で留学', description: '優秀な学生は日本の30以上の提携校で奨学金留学のチャンス。' },
      { title: 'インターンシップ - 有給実習', description: '月額約MNT 2,500,000(150,000円)相当の有給日本語・文化研修。' },
      { title: '夏期奨学金', description: '教職員と学生が夏期休暇中に100%奨学金で日本語集中講座を受講可能。' },
      { title: '障がいのある方', description: '本人または両親が障がいをお持ちの場合、学費を減免します。' },
      { title: '多子世帯奨学金', description: '同一世帯から3人以上が同時期に高等教育を受ける場合、1名分の学費を減免します。' },
    ],
    faq: [
      { question: '日本語の知識がなくても入学できますか?', answer: 'はい。日本語の習熟度を問わず、すべてのレベルの学生を受け入れます。初級からJLPT N1まで体系的なカリキュラムを用意しています。' },
      { question: '日本で働ける保証はありますか?', answer: '本学の卒業生の約40%が日本で就労しています。インターンシップ制度と30以上の提携校を通じて、日本での進路の機会は豊富です。' },
      { question: '学費はいくらですか?', answer: '年間の学費および支払い条件については、入学事務室(7011-8584)までお問い合わせください。' },
      { question: '寮はありますか?', answer: 'はい。学内に学生寮を備えており、地方出身の学生を優先的に受け入れます。' },
      { question: '何歳から出願できますか?', answer: '中等教育を修了し、EYESH合格証を持つ17歳以上の方であればご出願いただけます。年齢の上限はありません。' },
    ],
  },
};


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
