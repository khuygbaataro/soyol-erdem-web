import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { NewspapersList } from '@/components/sections/NewspapersList';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Сонин хэвлэл',
  description:
    'Соёл Эрдэм Дээд Сургуулийн "Сонин хэвлэл" — сургуулийн үйл явдал, амжилт, оюутны амьдралыг тусгасан тогтмол хэвлэл.',
};

export default async function SoninHewlelPage() {
  const items = await prisma.newspaper
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
    .catch(() => []);

  return (
    <>
      <PageHero
        title="СОНИН ХЭВЛЭЛ"
        subtitle="Сургуулийн тогтмол хэвлэлийн архив. Дугаар бүрийг номын хуудас эргүүлэн уншиж танилцана уу."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Сонин хэвлэл' }]}
      />

      <Section background="cream-soft" spacing="md">
        <NewspapersList items={items} />
      </Section>

      <CtaBanner
        title="Манай сургуулийн мэдээ, үйл явдал"
        ctaLabel="Сүүлийн мэдээ"
        ctaHref="/news"
        secondary={{ label: 'Холбоо барих', href: '/contact' }}
      />
    </>
  );
}
