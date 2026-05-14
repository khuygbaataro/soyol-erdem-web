import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { NewspapersList } from '@/components/sections/NewspapersList';
import { prisma } from '@/lib/prisma';
import { getSiteContentMap } from '@/lib/site-content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Сонин хэвлэл',
  description:
    'Соёл Эрдэм Дээд Сургуулийн "Сонин хэвлэл" — сургуулийн үйл явдал, амжилт, оюутны амьдралыг тусгасан тогтмол хэвлэл.',
};

export default async function SoninHewlelPage() {
  const [items, banners] = await Promise.all([
    prisma.newspaper
      .findMany({
        where: { status: 'PUBLISHED' },
        orderBy: { issueNumber: 'desc' },
        select: {
          id: true,
          issueNumber: true,
          title: true,
          publishedAt: true,
        },
      })
      .catch(() => []),
    getSiteContentMap('banners'),
  ]);

  return (
    <>
      <PageHero
        title="СОНИН ХЭВЛЭЛ"
        subtitle="Сургуулийн тогтмол хэвлэлийн архив. Дугаар бүрийг номын хуудас эргүүлэн уншиж танилцана уу."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Сонин хэвлэл' }]}
        backgroundImage={banners.get('page.sonin-hewlel.banner') || undefined}
      />

      <Section background="cream-soft" spacing="md">
        <NewspapersList items={items} />
      </Section>
    </>
  );
}
