import { PageHero } from '@/components/sections/PageHero';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { NewsListClient } from '@/app/(public)/news/NewsListClient';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ахлах сургууль · Мэдээ' };

export default async function HighSchoolNewsPage() {
  const news = await prisma.news
    .findMany({
      where: { status: 'PUBLISHED', site: 'HIGH_SCHOOL' },
      orderBy: { publishedAt: 'desc' },
    })
    .catch(() => []);

  const items = news.map((n) => ({
    id: n.slug,
    title: n.title,
    excerpt: n.excerpt,
    image:
      n.coverImage ??
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=60',
    date: (n.publishedAt ?? n.createdAt).toISOString().slice(0, 10),
    category: n.category,
  }));

  return (
    <>
      <PageHero
        title="МЭДЭЭ"
        subtitle="Ахлах сургуулийн сүүлийн мэдээ, үйл явдал, амжилт."
        breadcrumb={[
          { label: 'Их сургууль', href: '/' },
          { label: 'Ахлах сургууль', href: '/high-school' },
          { label: 'Мэдээ' },
        ]}
      />

      <NewsListClient items={items} hrefBase="/high-school/news" />

      <CtaBanner
        title="Соёл Эрдэм Ахлах Сургууль"
        ctaLabel="Элсэлтийн мэдээлэл"
        ctaHref="https://soyolerdem.edu.mn/high-school/elselt/"
        secondary={{ label: 'Холбоо барих', href: '/high-school#contact' }}
      />
    </>
  );
}
