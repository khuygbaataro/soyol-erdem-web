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
    'hsNav.backToUniversity': 'Дээд сургуульд буцах',

    // ─── Common buttons / labels ──────────────────────────────────
    'common.readMore': 'Дэлгэрэнгүй',
    'common.continueReading': 'Үргэлжлэлийг унших',
    'common.viewAll': 'Бүгдийг үзэх',
    'common.back': 'Буцах',
    'common.submit': 'Илгээх',
    'common.save': 'Хадгалах',
    'common.cancel': 'Цуцлах',
    'common.close': 'Хаах',
    'common.openMenu': 'Цэс нээх',
    'common.loading': 'Ачаалж байна…',
    'common.imageComingSoon': 'Зураг удахгүй',
    'common.internshipPhotoAlt': 'Япон улс — интерншип',

    // ─── Brand alts / aria labels ─────────────────────────────────
    'brand.universityLogoAlt': 'Соёл Эрдэм Дээд Сургуулийн лого',
    'brand.highSchoolLogoAlt': 'Соёл Эрдэм Сургуулийн лого',
    'brand.universityHomeAria': 'Соёл Эрдэм · Нүүр хуудас',
    'brand.highSchoolHomeAria': 'Соёл Эрдэм сургуулийн нүүр хуудас',
    'brand.short': 'Соёл Эрдэм',
    'brand.highSchoolShort': 'сургууль',
    'brand.highSchoolMobileSection': 'Соёл Эрдэм сургууль',

    // ─── Slideshow / gallery aria labels ──────────────────────────
    'gallery.previous': 'Өмнөх зураг',
    'gallery.next': 'Дараагийн зураг',
    'gallery.image': 'Зураг',

    // ─── Flipbook / PDF reader ────────────────────────────────────
    'reader.loading': 'Ачаалж байна…',
    'reader.loadError': 'PDF-ийг ачаалж чадсангүй. Дараа дахин оролдоно уу.',
    'reader.previousPage': 'Өмнөх хуудас',
    'reader.nextPage': 'Дараагийн хуудас',
    'reader.jumpTo': 'Хуудас руу үсрэх',
    'reader.zoomIn': 'Томруулах',
    'reader.zoomOut': 'Жижигрүүлэх',
    'reader.fitPage': 'Хуудсанд багтаах',
    'reader.fitWidth': 'Өргөнд багтаах',
    'reader.fitPageShort': 'Хуудас',
    'reader.fitWidthShort': 'Өргөн',
    'reader.openNewTab': 'Шинэ табад нээх',
    'reader.download': 'Татах',
    'reader.downloadAria': 'Татаж авах',
    'reader.openList': 'Хуудасны жагсаалт нээх',
    'reader.closeList': 'Хуудасны жагсаалт хаах',
    'reader.pages': 'Хуудсууд',

    // ─── Newspaper / journal list ─────────────────────────────────
    'newspaper.empty': 'Одоохондоо сонин хэвлэлийн дугаар нийтлэгдээгүй байна.',
    'newspaper.eyebrow': 'Соёл Эрдэм · Сонин хэвлэл',
    'newspaper.brandShort': 'СЭ',
    'newspaper.startReading': 'Уншиж эхлэх',
    'newspaper.cardBrand': 'Соёл Эрдэм',
    'newspaper.cardCategory': 'Сонин хэвлэл',
    'journal.cardCategory': 'Эрдэм шинжилгээний сэтгүүл',

    // ─── Accreditation gallery ────────────────────────────────────
    'accreditation.cap1': 'Анхны магадлан итгэмжлэл',
    'accreditation.cap2': '2 дахь магадлан итгэмжлэл',
    'accreditation.cap3': '3 дахь магадлан итгэмжлэл',
    'accreditation.alt1':
      'Соёл Эрдэм Дээд Сургуулийн 2003 оны магадлан итгэмжлэлийн гэрчилгээ',
    'accreditation.alt2':
      'Соёл Эрдэм Дээд Сургуулийн 2010 оны магадлан итгэмжлэлийн гэрчилгээ',
    'accreditation.alt3':
      'Соёл Эрдэм Дээд Сургуулийн 2020 оны магадлан итгэмжлэлийн гэрчилгээ',
    'accreditation.zoom': 'Томруулах',
    'accreditation.year': 'он',

    // ─── OrgChart (structure page) ────────────────────────────────
    'orgchart.tooltip': 'Ажилтны мэдээллийг үзэхийн тулд карт дээр дарна уу.',
    'orgchart.board': 'УДИРДАХ ЗӨВЛӨЛ',
    'orgchart.affiliatedLine1': 'Нийслэлийн Ерөнхий Боловсролын',
    'orgchart.affiliatedLine2': 'Соёл Эрдэм сургууль (ЕБС)',
    'orgchart.academicCouncil': 'Эрдмийн зөвлөл',
    'orgchart.rector': 'ЗАХИРАЛ',
    'orgchart.adminCouncil': 'Захиргааны зөвлөл',
    'orgchart.qualityOffice': 'Чанарын үнэлгээний алба',
    'orgchart.pillar.academic': 'Сургалтын алба',
    'orgchart.pillar.scientific': 'Эрдэмтэн нарийн бичгийн дарга',
    'orgchart.pillar.admin': 'Захиргаа, Санхүү, аж ахуй',
    'orgchart.pillar.facultyDev': 'Багшийн хөгжлийн төв',
    'orgchart.unit.japaneseDept': 'Япон судлалын тэнхим',
    'orgchart.unit.itDept': 'Мэдээллийн технологийн тэнхим',
    'orgchart.unit.library': '"Хажимэ" номын сан',
    'orgchart.unit.practice': 'Дадлагын бааз',
    'orgchart.unit.graduateStudies': 'Ахисан түвшний сургалтын алба',
    'orgchart.unit.researchCenter': 'Судалгааны төв',
    'orgchart.unit.archive': 'Архив',
    'orgchart.unit.marketing': 'Маркетингийн алба',
    'orgchart.unit.foreignRelations': 'Гадаад харилцааны алба',
    'orgchart.unit.studentCouncil': 'Оюутны зөвлөл',

    // ─── News listing pages ───────────────────────────────────────
    'news.heroTitle': 'МЭДЭЭ',
    'news.heroSubtitle': 'Сургуулийн сүүлийн мэдээ, үйл явдал, амжилт.',
    'news.breadcrumbThis': 'Мэдээ',
    'hsNews.heroTitle': 'МЭДЭЭ МЭДЭЭЛЭЛ',
    'hsNews.heroSubtitle': 'Соёл Эрдэм сургуулийн сүүлийн мэдээ, үйл явдал, амжилт.',
    'hsNews.breadcrumbThis': 'Мэдээ мэдээлэл',
    'hsNews.bannerTitle': 'Соёл Эрдэм Сургууль',
    'hsNews.bannerCta': 'Элсэлтийн мэдээлэл',
    'hsNews.bannerSecondary': 'Холбоо барих',

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
    'common.continueReading': 'Continue reading',
    'common.viewAll': 'View all',
    'common.back': 'Back',
    'common.submit': 'Submit',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.openMenu': 'Open menu',
    'common.loading': 'Loading…',
    'common.imageComingSoon': 'Photo coming soon',
    'common.internshipPhotoAlt': 'Internship in Japan',

    // ─── Brand alts / aria labels ─────────────────────────────────
    'brand.universityLogoAlt': 'Soyol Erdem University logo',
    'brand.highSchoolLogoAlt': 'Soyol Erdem High School logo',
    'brand.universityHomeAria': 'Soyol Erdem · Home',
    'brand.highSchoolHomeAria': 'High school home',
    'brand.short': 'Soyol Erdem',
    'brand.highSchoolShort': 'High School',
    'brand.highSchoolMobileSection': 'High School',

    // ─── Slideshow / gallery aria labels ──────────────────────────
    'gallery.previous': 'Previous image',
    'gallery.next': 'Next image',
    'gallery.image': 'Image',

    // ─── Flipbook / PDF reader ────────────────────────────────────
    'reader.loading': 'Loading…',
    'reader.loadError': "Couldn't load the PDF. Please try again later.",
    'reader.previousPage': 'Previous page',
    'reader.nextPage': 'Next page',
    'reader.jumpTo': 'Jump to page',
    'reader.zoomIn': 'Zoom in',
    'reader.zoomOut': 'Zoom out',
    'reader.fitPage': 'Fit to page',
    'reader.fitWidth': 'Fit to width',
    'reader.fitPageShort': 'Page',
    'reader.fitWidthShort': 'Width',
    'reader.openNewTab': 'Open in new tab',
    'reader.download': 'Download',
    'reader.downloadAria': 'Download',
    'reader.openList': 'Open page list',
    'reader.closeList': 'Close page list',
    'reader.pages': 'Pages',

    // ─── Newspaper / journal list ─────────────────────────────────
    'newspaper.empty': 'No newspaper issues have been published yet.',
    'newspaper.eyebrow': 'Soyol Erdem · Newspaper',
    'newspaper.brandShort': 'SE',
    'newspaper.startReading': 'Start reading',
    'newspaper.cardBrand': 'Soyol Erdem',
    'newspaper.cardCategory': 'Newspaper',
    'journal.cardCategory': 'Academic journal',

    // ─── Accreditation gallery ────────────────────────────────────
    'accreditation.cap1': 'First accreditation',
    'accreditation.cap2': 'Second accreditation',
    'accreditation.cap3': 'Third accreditation',
    'accreditation.alt1':
      'Soyol Erdem University accreditation certificate, 2003',
    'accreditation.alt2':
      'Soyol Erdem University accreditation certificate, 2010',
    'accreditation.alt3':
      'Soyol Erdem University accreditation certificate, 2020',
    'accreditation.zoom': 'Zoom in',
    'accreditation.year': '',

    // ─── OrgChart (structure page) ────────────────────────────────
    'orgchart.tooltip': 'Tap a card to view the staff member details.',
    'orgchart.board': 'BOARD OF GOVERNORS',
    'orgchart.affiliatedLine1': 'Soyol Erdem Secondary School',
    'orgchart.affiliatedLine2': '(affiliated)',
    'orgchart.academicCouncil': 'Academic Council',
    'orgchart.rector': 'RECTOR',
    'orgchart.adminCouncil': 'Administrative Council',
    'orgchart.qualityOffice': 'Quality assurance office',
    'orgchart.pillar.academic': 'Academic affairs',
    'orgchart.pillar.scientific': 'Scientific secretary',
    'orgchart.pillar.admin': 'Administration, finance & operations',
    'orgchart.pillar.facultyDev': 'Faculty development centre',
    'orgchart.unit.japaneseDept': 'Department of Japanese Studies',
    'orgchart.unit.itDept': 'Department of Information Technology',
    'orgchart.unit.library': '"Hajime" Library',
    'orgchart.unit.practice': 'Practice base',
    'orgchart.unit.graduateStudies': 'Graduate studies office',
    'orgchart.unit.researchCenter': 'Research centre',
    'orgchart.unit.archive': 'Archive',
    'orgchart.unit.marketing': 'Marketing office',
    'orgchart.unit.foreignRelations': 'International affairs office',
    'orgchart.unit.studentCouncil': 'Student council',

    // ─── News listing pages ───────────────────────────────────────
    'news.heroTitle': 'NEWS',
    'news.heroSubtitle': 'The latest news, events and achievements from the university.',
    'news.breadcrumbThis': 'News',
    'hsNews.heroTitle': 'NEWS',
    'hsNews.heroSubtitle': 'The latest news, events and achievements from the high school.',
    'hsNews.breadcrumbThis': 'News',
    'hsNews.bannerTitle': 'Soyol Erdem Senior High School',
    'hsNews.bannerCta': 'Admission details',
    'hsNews.bannerSecondary': 'Contact',

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
    'common.continueReading': '続きを読む',
    'common.viewAll': 'すべて見る',
    'common.back': '戻る',
    'common.submit': '送信',
    'common.save': '保存',
    'common.cancel': 'キャンセル',
    'common.close': '閉じる',
    'common.openMenu': 'メニューを開く',
    'common.loading': '読み込み中…',
    'common.imageComingSoon': '画像準備中',
    'common.internshipPhotoAlt': '日本 ― インターンシップ',

    // ─── Brand alts / aria labels ─────────────────────────────────
    'brand.universityLogoAlt': 'ソヨル・エルデム大学 ロゴ',
    'brand.highSchoolLogoAlt': 'ソヨル・エルデム高等学校 ロゴ',
    'brand.universityHomeAria': 'ソヨル・エルデム ・ ホーム',
    'brand.highSchoolHomeAria': '高等学校ホーム',
    'brand.short': 'ソヨル・エルデム',
    'brand.highSchoolShort': '高等学校',
    'brand.highSchoolMobileSection': '高等学校',

    // ─── Slideshow / gallery aria labels ──────────────────────────
    'gallery.previous': '前の画像',
    'gallery.next': '次の画像',
    'gallery.image': '画像',

    // ─── Flipbook / PDF reader ────────────────────────────────────
    'reader.loading': '読み込み中…',
    'reader.loadError': 'PDFを読み込めませんでした。あとでもう一度お試しください。',
    'reader.previousPage': '前のページ',
    'reader.nextPage': '次のページ',
    'reader.jumpTo': 'ページへ移動',
    'reader.zoomIn': '拡大',
    'reader.zoomOut': '縮小',
    'reader.fitPage': 'ページに合わせる',
    'reader.fitWidth': '幅に合わせる',
    'reader.fitPageShort': 'ページ',
    'reader.fitWidthShort': '幅',
    'reader.openNewTab': '新しいタブで開く',
    'reader.download': 'ダウンロード',
    'reader.downloadAria': 'ダウンロード',
    'reader.openList': 'ページ一覧を開く',
    'reader.closeList': 'ページ一覧を閉じる',
    'reader.pages': 'ページ',

    // ─── Newspaper / journal list ─────────────────────────────────
    'newspaper.empty': '広報誌は現在公開されていません。',
    'newspaper.eyebrow': 'ソヨル・エルデム ・ 広報誌',
    'newspaper.brandShort': 'SE',
    'newspaper.startReading': '読み始める',
    'newspaper.cardBrand': 'ソヨル・エルデム',
    'newspaper.cardCategory': '広報誌',
    'journal.cardCategory': '学術ジャーナル',

    // ─── Accreditation gallery ────────────────────────────────────
    'accreditation.cap1': '第1回認証評価',
    'accreditation.cap2': '第2回認証評価',
    'accreditation.cap3': '第3回認証評価',
    'accreditation.alt1':
      'ソヨル・エルデム大学 2003年認証評価証書',
    'accreditation.alt2':
      'ソヨル・エルデム大学 2010年認証評価証書',
    'accreditation.alt3':
      'ソヨル・エルデム大学 2020年認証評価証書',
    'accreditation.zoom': '拡大',
    'accreditation.year': '年',

    // ─── OrgChart (structure page) ────────────────────────────────
    'orgchart.tooltip': 'カードをタップすると教職員の情報が表示されます。',
    'orgchart.board': '理事会',
    'orgchart.affiliatedLine1': '附属ソヨル・エルデム',
    'orgchart.affiliatedLine2': '中等学校',
    'orgchart.academicCouncil': '学術評議会',
    'orgchart.rector': '学長',
    'orgchart.adminCouncil': '運営評議会',
    'orgchart.qualityOffice': '質保証室',
    'orgchart.pillar.academic': '教務課',
    'orgchart.pillar.scientific': '学術書記官',
    'orgchart.pillar.admin': '総務・財務・運営',
    'orgchart.pillar.facultyDev': '教員研修センター',
    'orgchart.unit.japaneseDept': '日本研究学科',
    'orgchart.unit.itDept': '情報技術学科',
    'orgchart.unit.library': '「ハジメ」図書館',
    'orgchart.unit.practice': '実習基地',
    'orgchart.unit.graduateStudies': '大学院事務室',
    'orgchart.unit.researchCenter': '研究センター',
    'orgchart.unit.archive': 'アーカイブ',
    'orgchart.unit.marketing': 'マーケティング室',
    'orgchart.unit.foreignRelations': '国際交流課',
    'orgchart.unit.studentCouncil': '学生会',

    // ─── News listing pages ───────────────────────────────────────
    'news.heroTitle': 'ニュース',
    'news.heroSubtitle': '大学の最新ニュース、イベント、実績。',
    'news.breadcrumbThis': 'ニュース',
    'hsNews.heroTitle': 'ニュース',
    'hsNews.heroSubtitle': '高等学校の最新ニュース、イベント、実績。',
    'hsNews.breadcrumbThis': 'ニュース',
    'hsNews.bannerTitle': 'ソヨル・エルデム高等学校',
    'hsNews.bannerCta': '入学案内',
    'hsNews.bannerSecondary': 'お問い合わせ',

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
