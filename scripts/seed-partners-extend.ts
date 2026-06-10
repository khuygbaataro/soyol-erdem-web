/**
 * 1) Add the 3 domestic partners (site=UNIVERSITY) so /international's
 *    "ДОТООД ХАМТЫН АЖИЛЛАГААТАЙ БАЙГУУЛЛАГУУД" becomes admin-editable.
 * 2) Clone every UNIVERSITY partner into HIGH_SCHOOL so the high-school
 *    cooperation page starts with the same set, editable separately.
 * Idempotent. Run: npx tsx scripts/seed-partners-extend.ts
 */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const DOMESTIC = [
  { name: 'Монгол Улс дахь Япон Улсын Элчин сайдын яам', url: 'https://www.mn.emb-japan.go.jp/', logo: '/partners/jp-embassy.svg', detail: 'Соёл Эрдэм Дээд Сургууль нь Японы Элчин сайдын яамтай хамтран Японы хэл, соёл, боловсролыг таниулсан олон арга хэмжээнд оюутнууд, багш нараа идэвхтэй оролцуулсаар ирсэн.', activities: '"Япон киноны өдөрлөг"\n"Японд суралцах талаар танилцуулах сургалт"', order: 1 },
  { name: 'Монгол-Японы Хүний Нөөцийн Хөгжлийн Төв', url: 'https://japan-center.edu.mn/', logo: 'https://www.google.com/s2/favicons?domain=japan-center.edu.mn&sz=128', detail: 'Сургууль анх байгуулагдсан цагаасаа эхлэн "Монгол-Япон төв"-тэй нягт хамтран ажиллаж ирсэн. Тус төвөөс зохион байгуулдаг Японы соёл, боловсролын олон арга хэмжээ, сургалтад багш, оюутнууд тогтмол идэвхтэй оролцдог.', activities: '"Япон хэлний түвшин тогтоох жишиг шалгалт"\n"Японы их дээд сургуулиудыг танилцуулах мэдээллийн ярмаг"\n"Япон хэлний багш нарын заах аргын сургалт"\n"Японы соёлыг танилцуулах баяр"\n"Нээлттэй семинар"', order: 2 },
  { name: 'Монголын Япон Хэлний Багш нарын Холбоо', url: 'https://matj.mn/', logo: '/partners/matj.svg', detail: 'Тус холбооноос зохион байгуулдаг багшийн хөгжлийг дэмжсэн арга хэмжээнд багш нараа тогтмол хамруулан хамтран ажиллаж байна.', activities: 'Жилд 2 удаа зохион байгуулагддаг "Япон хэлний түвшин тогтоох шалгалт — JLPT"-ийн зохион байгуулалт\n"Япон хэлний боловсролын симпозиум"', order: 3 },
];

async function main() {
  // 1) Domestic for UNIVERSITY
  const uniDomestic = await prisma.partner.count({ where: { site: 'UNIVERSITY', type: 'domestic' } });
  if (uniDomestic === 0) {
    for (const d of DOMESTIC) {
      await prisma.partner.create({ data: { site: 'UNIVERSITY', type: 'domestic', name: d.name, url: d.url, logo: d.logo, detail: d.detail, activities: d.activities, active: true, order: d.order } });
    }
    console.log(`Added ${DOMESTIC.length} domestic (UNIVERSITY).`);
  } else {
    console.log('Domestic (UNIVERSITY) already present, skipped.');
  }

  // 2) Clone all UNIVERSITY partners into HIGH_SCHOOL
  const hsCount = await prisma.partner.count({ where: { site: 'HIGH_SCHOOL' } });
  if (hsCount === 0) {
    const uni = await prisma.partner.findMany({ where: { site: 'UNIVERSITY' } });
    for (const p of uni) {
      await prisma.partner.create({
        data: {
          site: 'HIGH_SCHOOL', type: p.type, name: p.name, nameJp: p.nameJp, logo: p.logo,
          headline: p.headline, location: p.location, partnerSince: p.partnerSince,
          detail: p.detail, url: p.url, activities: p.activities, active: p.active, order: p.order,
        },
      });
    }
    console.log(`Cloned ${uni.length} partners into HIGH_SCHOOL.`);
  } else {
    console.log(`HIGH_SCHOOL already has ${hsCount} partners, skipped.`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
