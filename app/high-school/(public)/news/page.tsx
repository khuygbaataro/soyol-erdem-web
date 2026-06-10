import { PageHero } from '@/components/sections/PageHero';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { HighSchoolNewsListClient } from './NewsListClient';
import { prisma } from '@/lib/prisma';
import { getServerLocale, getServerTranslator } from '@/lib/i18n/server';
import { localisedField } from '@/lib/i18n/db';
import { getSiteContentMap } from '@/lib/site-content';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ахлах сургууль · Мэдээ мэдээлэл' };

export default async function HighSchoolNewsPage() {
  const [news, locale, t, site] = await Promise.all([
    prisma.news
      .findMany({
        where: { status: 'PUBLISHED', site: 'HIGH_SCHOOL' },
        orderBy: { publishedAt: 'desc' },
      })
      .catch(() => []),
    getServerLocale(),
    getServerTranslator(),
    // Bug fix: previously fetched 'ahlah-home' — but the banner key
    // lives in the 'ahlah-news' group, so `site.get('ahlah-news.hero
    // .image')` always returned undefined and the admin upload had no
    // visible effect.
    getSiteContentMap('ahlah-news'),
  ]);
  const heroImage = site.get('ahlah-news.hero.image') || undefined;
  // Hero title/subtitle — admin-editable (MN); EN/JP fall back to i18n.
  const heroTitle =
    (locale === 'MN' && site.get('ahlah-news.hero.title')) || t('hsNews.heroTitle');
  const heroSubtitle =
    (locale === 'MN' && site.get('ahlah-news.hero.subtitle')) || t('hsNews.heroSubtitle');

  const items = news.map((n) => ({
    id: n.slug,
    title: localisedField(n, 'title', locale),
    excerpt: localisedField(n, 'excerpt', locale),
    image:
      n.coverImage ??
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=60',
    date: (n.publishedAt ?? n.createdAt).toISOString().slice(0, 10),
    category: n.category,
  }));

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumb={[
          { label: t('brand.short'), href: '/' },
          { label: t('hsNav.home'), href: '/high-school' },
          { label: t('hsNews.breadcrumbThis') },
        ]}
        backgroundImage={heroImage}
      />

      <HighSchoolNewsListClient items={items} />

    </>
  );
}
