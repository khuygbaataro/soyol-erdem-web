import { PageHero } from '@/components/sections/PageHero';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { NewsListClient } from './NewsListClient';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Мэдээ' };

export default async function NewsPage() {
  const news = await prisma.news.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
  });

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
        subtitle="Сургуулийн сүүлийн мэдээ, үйл явдал, амжилт."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Мэдээ' }]}
      />

      <NewsListClient items={items} />

      <CtaBanner
        title="Сургуулиас санал болгох"
        ctaLabel="Бидэнтэй холбогдох"
        ctaHref="/contact"
      />
    </>
  );
}
