import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding...');

  /* Users */
  const adminPassword = await bcrypt.hash('admin123', 10);
  const editorPassword = await bcrypt.hash('editor123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@soyolerdem.edu.mn' },
    update: {},
    create: {
      email: 'admin@soyolerdem.edu.mn',
      password: adminPassword,
      name: 'Захиргааны admin',
      role: 'ADMIN',
    },
  });
  await prisma.user.upsert({
    where: { email: 'editor@soyolerdem.edu.mn' },
    update: {},
    create: {
      email: 'editor@soyolerdem.edu.mn',
      password: editorPassword,
      name: 'Контент editor',
      role: 'EDITOR',
    },
  });
  console.log('✓ Users');

  /* Site settings */
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      schoolName: 'Соёл-Эрдэм Дээд Сургууль',
      email: 'soyolerdem.daigaku@gmail.com',
      phonePrimary: '7011-8584',
      phoneSecondary: '7011-8589',
      address: 'Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Олимпийн гудамж',
      facebookUrl: 'https://www.facebook.com/soyolerdem.edu.mn',
      workingHours: 'Даваа-Баасан: 08:00-17:00',
    },
  });
  console.log('✓ Site settings');

  /* Programs (6) */
  const programs = [
    {
      slug: 'japanese-translation',
      name: 'Япон хэлний орчуулга',
      code: '023101',
      degree: 'Бакалавр',
      duration: '4 жил',
      icon: 'Languages',
      shortDescription: 'Япон хэлний аман ба бичгийн орчуулга, хэл шинжлэлийн судалгаа.',
      fullDescription:
        '"Япон хэлний орчуулагч" бакалаврын хөтөлбөрөөр япон хэлний аман ба бичгийн орчуулга хийх, бие даан энэ чиглэлийн үйл ажиллагааг эрхлэх, зохион байгуулах, дорно дахины болон хэл шинжлэлийн судалгааны ажил хийх чадвартай мэргэжилтнийг академик сургалтаар бэлтгэнэ.',
      skills:
        'JLPT N1, N2 түвшний япон хэлний мэдлэг\nАман ба бичгийн орчуулгын ур чадвар\nХэл шинжлэл, орчуулга судлалын онол\nЯпон үндэстний соёл, ёс зүйн ойлголт',
      language: 'Япон, Монгол',
      admissionScore: 600,
      order: 1,
    },
    {
      slug: 'tourism-management',
      name: 'Аялал жуулчлалын менежмент',
      degree: 'Бакалавр',
      duration: '4 жил',
      icon: 'Map',
      shortDescription: 'Аялал жуулчлалын салбарын мэргэжлийн боловсон хүчин.',
      fullDescription:
        'Аялал жуулчлалын менежмент мэргэжил нь аялал жуулчлалын салбарын төрийн, бизнесийн, олон нийтийн, олон улсын болон үйлчилгээний байгууллагуудад мэргэжлийн боловсон хүчин бэлтгэн хангах зориулалттай бакалаврын зэрэг олгох хөтөлбөр юм.',
      skills:
        'Зочид буудал, ресторан, аялалын менежмент\nЯпон хэлний үйлчилгээний хэллэг\nОлон улсын аялал жуулчлалын стандарт\nHospitality болон хэрэглэгчийн сэтгэл судлал',
      language: 'Япон, Монгол',
      admissionScore: 550,
      order: 2,
    },
    {
      slug: 'international-relations',
      name: 'Олон улс, орон судлал',
      degree: 'Бакалавр',
      duration: '4 жил',
      icon: 'Globe',
      shortDescription: 'Япон болон олон улсын улс төр, эдийн засаг, соёл судлал.',
      fullDescription:
        'Олон улс, орон судлал хөтөлбөр нь Япон орон болон олон улсын улс төр, эдийн засаг, соёл, нийгмийн харилцааг шинжлэх ухааны үндэслэлтэйгээр судалж, олон улсын харилцаанд ажиллах чадвартай, мэдлэг, ур чадвар, ёс зүй хосолсон мэргэжилтэн бэлтгэнэ.',
      skills:
        'Япон болон Зүүн Азийн орон судлал\nДипломат харилцаа, гадаад бодлого\nОлон улсын байгууллагын зохион байгуулалт\nСонгомол судалгааны арга зүй',
      language: 'Япон, Англи, Монгол',
      admissionScore: 600,
      order: 3,
    },
    {
      slug: 'economics',
      name: 'Эдийн засаг',
      degree: 'Бакалавр',
      duration: '4 жил',
      icon: 'TrendingUp',
      shortDescription: 'Олон улсын болон үндэсний эдийн засгийн судлаач.',
      fullDescription:
        'Эдийн засгийн ухааны онол, арга зүйд суурилсан, олон улсын болон үндэсний түвшний эдийн засгийн асуудлыг судлах, дүн шинжилгээ хийх, шийдвэр гаргах чадвартай судлаач мэргэжилтэн бэлтгэнэ.',
      skills:
        'Микро болон макро эдийн засгийн шинжилгээ\nЯпон бизнес, корпорацийн менежмент\nЭконометрик, статистикийн арга\nОлон улсын худалдаа, санхүү',
      language: 'Япон, Монгол',
      admissionScore: 600,
      order: 4,
    },
    {
      slug: 'japanese-language-teacher',
      name: 'Япон хэлний багш',
      degree: 'Бакалавр',
      duration: '4 жил',
      icon: 'Presentation',
      shortDescription: 'ЕБС-д Япон хэл заах багшийн мэргэжил.',
      fullDescription:
        'Япон хэлний багшийн мэргэжлээр япон хэл, соёлын онолын суурь, заах арга зүй, сэтгэл судлал зэрэг чиглэлээр гүнзгийрсэн боловсролоор хичээллүүлж, ЕБС болон бусад сургалтын байгууллагад чадварлаг, мэргэжлийн багш бэлтгэнэ.',
      skills:
        'Япон хэлний дидактик ба заах арга зүй\nСурган хүмүүжүүлэх ухаан\nСэтгэл судлал ба хүүхдийн хөгжил\nСургалтын материал боловсруулах',
      language: 'Япон, Монгол',
      admissionScore: 580,
      order: 5,
    },
    {
      slug: 'software',
      name: 'Программ хангамж',
      degree: 'Бакалавр',
      duration: '4 жил',
      icon: 'Code2',
      shortDescription: 'Япон хэл + программчлалын хосолсон сургалт.',
      fullDescription:
        'Япон хэл, программ хангамжийн хосолсон сургалтаар орчин үеийн программ хангамжийн инженер бэлтгэнэ. Япон улсын IT компанид ажиллах боломжтой мэргэжилтэн бэлтгэх зорилготой.',
      skills:
        'Web ба mobile програмчлал (React, Node.js)\nАлгоритм, өгөгдлийн бүтэц\nЯпон IT терминологи, документаци\nAgile, Scrum багийн ажиллагаа',
      language: 'Япон, Англи, Монгол',
      admissionScore: 620,
      order: 6,
    },
  ];
  for (const p of programs) {
    await prisma.program.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`✓ Programs (${programs.length})`);

  /* News (5) */
  const news = [
    {
      slug: '30-year-anniversary',
      title: '30 жилийн ойн ёслол амжилттай зохион байгуулагдав',
      excerpt:
        'Соёл-Эрдэм дээд сургуулийн үүсэн байгуулагдсаны 30 жилийн ойн ёслолыг 2023 оны 8 сарын 3-нд зохион байгуулж, мөн өдөр Соёл-Эрдэм Ахлах Сургуулийг шинээр үүсгэн байгуулсан.',
      body: 'Сургуулийн үүсэн байгуулагдсаны 30 жилийн ойн ёслолыг 2023 оны 8 сарын 3-нд төв танхимдаа зохион байгууллаа. Тус арга хэмжээнд ахмад багш нар, төгсөгчид, одоогийн оюутнууд, Япон Улсын Элчин сайдын яамны төлөөлөгчид оролцов.\n\nЗахирал Т.Дорждагва "Бид нэг гэр бүлийн ёсоор дараагийн 30 жилд ч япон хэлний боловсролын манлайлагч хэвээр байх болно" хэмээн ярилаа.\n\nМөн өдөр Соёл-Эрдэм Ахлах Сургуулийг дэргэдээ үүсгэн байгуулсан нь шинэ үе шатны эхлэл боллоо.',
      coverImage:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=60',
      category: 'EVENT' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2023-08-03'),
    },
    {
      slug: 'fourth-accreditation',
      title: '4 дэх удаагийн магадлан итгэмжлэлд оров',
      excerpt:
        'Манай сургууль 2025 онд 4 дэх удаагаа БМИҮЗ-ийн магадлан итгэмжлэлд орох ажиллагаа эхэллээ. 2003, 2010, 2020 онуудад тус тус амжилттай магадлан итгэмжлэгдсэн.',
      body: 'БМИҮЗ-ийн шинжээчдийн баг 2025 оны 4 сарын 10-наас эхлэн манай сургуулийн өөрийн үнэлгээ, сургалтын чанар, профессор-багш нарын чадавхи зэргийг үнэлж эхэллээ.\n\nМагадлан итгэмжлэлийн үр дүн 2025 оны 4-р улиралд гарах төлөвтэй байна.',
      coverImage:
        'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1600&q=60',
      category: 'ANNOUNCEMENT' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2025-04-10'),
    },
    {
      slug: 'embassy-exhibition',
      title: 'Япон-Монголын дипломат харилцааны 50 жилийн ойн үзэсгэлэн',
      excerpt:
        'Япон Улсын Элчин сайдын яамтай хамтран "Хүүхэд, залуучуудын харилцааны түүх" гэрэл зургийн үзэсгэлэнг сургуулийн номын санд 3-р сарын 9-22-ний хооронд зохион байгуулав.',
      body: 'Үзэсгэлэн нь Япон-Монгол улсын дипломат харилцаа тогтоосны 50 жилийн ойд зориулагдсан. Олон улсын зочид болон оюутнууд оролцлоо.',
      coverImage:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=60',
      category: 'EVENT' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2024-03-09'),
    },
    {
      slug: 'internship-2024',
      title: 'Интерншип хөтөлбөрт 25 оюутан хамрагдсанаар Японд явлаа',
      excerpt:
        '2024 оны намрын улирлын интерншип хөтөлбөрт нийт 25 оюутан амжилттай тэнцэж Япон улсад очиж сарын 150,000 иений цалинтай дадлага хийж эхэллээ.',
      body: 'Энэ улирлын интерншип хөтөлбөрт орсон оюутнууд Токио, Осака, Хоккайдо зэрэг бүс нутгийн зочид буудал, ресторан, IT компаниудад дадлага хийнэ.',
      coverImage:
        'https://images.unsplash.com/photo-1542222024-c39e2281f121?auto=format&fit=crop&w=1600&q=60',
      category: 'PROGRAM' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2024-09-15'),
    },
    {
      slug: 'speech-contest-31',
      title: 'Япон хэлний уран илтгэлийн 31 дэх тэмцээнд оюутнууд тэргүүлэв',
      excerpt:
        'Сургууль хоорондын япон хэлний уран илтгэлийн 31 дэх удаагийн тэмцээнд манай сургуулийн оюутнууд тэргүүн байр эзэлсэн.',
      body: '31 дэх удаагийн уран илтгэлийн тэмцээн 2025 оны 11 сарын 15-17-ны хооронд боллоо. Манай сургуулийн оюутан Б.Мөнхзул тэргүүн байр эзэлсэн.',
      coverImage:
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=60',
      category: 'ACHIEVEMENT' as const,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2025-11-18'),
    },
  ];
  for (const n of news) {
    await prisma.news.upsert({
      where: { slug: n.slug },
      update: n,
      create: { ...n, authorId: admin.id },
    });
  }
  console.log(`✓ News (${news.length})`);

  /* Library books (sample) */
  const books = [
    { title: 'Минна-но Нихонго I', author: '3A Network', language: 'JP' as const, category: 'Сурах бичиг (JLPT N5)', publishYear: 2022, totalCopies: 15, availableCopies: 12, shelfLocation: 'A-1-1' },
    { title: 'Япон-Монгол толь бичиг', author: 'Б.Сүмберэл', language: 'MN' as const, category: 'Япон хэл, соёл, түүх', publishYear: 2019, totalCopies: 8, availableCopies: 5, shelfLocation: 'B-2-3' },
    { title: 'Japanese for Busy People', author: 'AJALT', language: 'EN' as const, category: 'Сурах бичиг (JLPT N4)', publishYear: 2021, totalCopies: 10, availableCopies: 8, shelfLocation: 'A-1-2' },
    { title: 'Зүүн Азийн эдийн засгийн түүх', author: 'Г.Балжинням', language: 'MN' as const, category: 'Эдийн засаг, бизнес', publishYear: 2020, totalCopies: 5, availableCopies: 4, shelfLocation: 'C-3-1' },
    { title: 'Япон уран зохиолын антологи', author: 'Олон зохиолч', language: 'JP' as const, category: 'Уран зохиол (япон, монгол)', publishYear: 2018, totalCopies: 6, availableCopies: 6, shelfLocation: 'D-4-2' },
    { title: 'Орчуулгын онол ба практик', author: 'Р.Бямбаа', language: 'MN' as const, category: 'Орчуулга судлал', publishYear: 2023, totalCopies: 7, availableCopies: 7, shelfLocation: 'B-2-4' },
  ];
  for (const b of books) {
    const exists = await prisma.libraryBook.findFirst({ where: { title: b.title, author: b.author } });
    if (!exists) await prisma.libraryBook.create({ data: b });
  }
  console.log(`✓ Library books (${books.length})`);

  /* Research (sample) */
  const research = [
    {
      slug: 'japan-mongolia-translation-corpus',
      title: 'Япон-Монгол хэлний орчуулгын корпус судалгаа',
      authors: 'Т.Дорждагва, Б.Мөнхзул',
      type: 'ARTICLE' as const,
      area: 'Орчуулга судлал',
      abstract:
        'Япон-Монгол хос хэлний орчуулгын корпусын статистик шинжилгээ. Энэхүү судалгаагаар 10,000 өгүүлбэрийн корпус ашиглан орчуулгын чанар, хэв маяг, нийтлэг алдааг тодорхойлсон.',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2024-06-15'),
    },
    {
      slug: 'tokyo-ub-business-relations',
      title: 'Токио-Улаанбаатар хотуудын бизнесийн харилцаа',
      authors: 'С.Цэцэг',
      type: 'CONFERENCE' as const,
      area: 'Олон улсын харилцаа',
      abstract:
        'Сүүлийн 10 жилийн япон-монгол бизнесийн харилцааны хөгжлийн чиг хандлагыг шинжилсэн илтгэл.',
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2024-11-02'),
    },
  ];
  for (const r of research) {
    await prisma.research.upsert({
      where: { slug: r.slug },
      update: r,
      create: { ...r, uploadedById: admin.id },
    });
  }
  console.log(`✓ Research (${research.length})`);

  console.log('\n✅ Seed дуусав!\n');
  console.log('Login мэдээлэл:');
  console.log('  Admin: admin@soyolerdem.edu.mn / admin123');
  console.log('  Editor: editor@soyolerdem.edu.mn / editor123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
