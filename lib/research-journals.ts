/**
 * Соёл Эрдэм-ийн эрдэм шинжилгээний сэтгүүлийн ботиуд.
 * Файл нь /public/journals/ дотор хадгалагдсан.
 *
 * Шинэ боть нэмэхдээ:
 *   1. PDF-ыг /public/journals/sp-<year>-n<issue>.pdf нэрээр хадгал
 *   2. Доорх жагсаалтад дараагийн обьектыг нэмнэ
 */

export type Journal = {
  /** URL-нд таарах нэр */
  id: string;
  /** /public руу харьцангуй PDF файлын зам */
  file: string;
  /** Дугаарлалт (1, 2, 3 …) */
  volume: number;
  year: number;
  /** Тухайн жилийн дотоод дугаар: "№1", "№2" гэх мэт */
  issue: string;
  title: string;
  subtitle: string;
  /**
   * Анхдагч нүүр зураг. Хэрэв admin /admin/site-content дотроос өөр
   * зураг оруулсан бол тэр нь давамгайлна. PDF reader дотор энэ зураг
   * сэтгүүлийн эхний хуудсаар харагдана.
   */
  cover?: string;
};

export const RESEARCH_JOURNALS: Journal[] = [
  {
    id: 'sp-2023-n1',
    file: '/journals/sp-2023-n1.pdf',
    cover: '/Erdemshinjilgee/1.jpg',
    volume: 1,
    year: 2023,
    issue: '№1',
    title: '1-р боть',
    subtitle: '2023 он · №1',
  },
  {
    id: 'sp-2024-n1',
    file: '/journals/sp-2024-n1.pdf',
    cover: '/Erdemshinjilgee/2.jpg',
    volume: 2,
    year: 2024,
    issue: '№1',
    title: '2-р боть',
    subtitle: '2024 он · №1',
  },
  {
    id: 'sp-2025-n1',
    file: '/journals/sp-2025-n1.pdf',
    cover: '/Erdemshinjilgee/3.jpg',
    volume: 3,
    year: 2025,
    issue: '№1',
    title: '3-р боть',
    subtitle: '2025 он · №1',
  },
  {
    id: 'sp-2025-n2',
    file: '/journals/sp-2025-n2.pdf',
    cover: '/Erdemshinjilgee/4.jpg',
    volume: 4,
    year: 2025,
    issue: '№2',
    title: '4-р боть',
    subtitle: '2025 он · №2',
  },
  {
    id: 'sp-2026-n1',
    file: '/journals/sp-2026-n1.pdf',
    // 5-р боть нь өөрийн нүүр зураггүй учир 4-ийн зургийг түр ашиглаж байна.
    cover: '/Erdemshinjilgee/4.jpg',
    volume: 5,
    year: 2026,
    issue: '№1',
    title: '5-р боть',
    subtitle: '2026 он · №1',
  },
];
