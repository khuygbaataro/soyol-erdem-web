import { PageHero } from '@/components/sections/PageHero';
import { NewsListClient } from './NewsListClient';
import { prisma } from '@/lib/prisma';
import { getSiteContentMap } from '@/lib/site-content';
import { getServerLocale, getServerTranslator } from '@/lib/i18n/server';
import { localisedField } from '@/lib/i18n/db';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Мэдээ' };

export default async function NewsPage() {
  const [news, banners, locale, t] = await Promise.all([
    prisma.news.findMany({
      where: { status: 'PUBLISHED', site: 'UNIVERSITY' },
      orderBy: { publishedAt: 'desc' },
    }),
    getSiteContentMap('banners'),
    getServerLocale(),
    getServerTranslator(),
  ]);

  const items = news.map((n) => ({
    id: n.slug,
    title: localisedField(n, 'title', locale),
    excerpt: localisedField(n, 'excerpt', locale),
    body: localisedField(n, 'body', locale),
    image:
      n.coverImage ??
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=60',
    date: (n.publishedAt ?? n.createdAt).toISOString().slice(0, 10),
    category: n.category,
  }));

  const banner = banners.get('page.news.banner') || '/medee_banner.png';

  return (
    <>
      <PageHero
        title={t('news.heroTitle')}
        subtitle={t('news.heroSubtitle')}
        breadcrumb={[
          { label: t('nav.home'), href: '/' },
          { label: t('news.breadcrumbThis') },
        ]}
        backgroundImage={banner}
      />

      <NewsListClient items={items} />
    </>
  );
}
