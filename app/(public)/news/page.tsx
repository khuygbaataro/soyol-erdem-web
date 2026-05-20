import { PageHero } from '@/components/sections/PageHero';
import { NewsListClient } from './NewsListClient';
import { prisma } from '@/lib/prisma';
import { getSiteContentMap } from '@/lib/site-content';
import { getServerLocale, getServerTranslator } from '@/lib/i18n/server';
import { localisedField } from '@/lib/i18n/db';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Мэдээ' };

/** Default cover used for job-opening cards when no banner is configured. */
const JOB_DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=60';

export default async function NewsPage() {
  const [news, jobs, banners, locale, t] = await Promise.all([
    prisma.news.findMany({
      where: { status: 'PUBLISHED', site: 'UNIVERSITY' },
      orderBy: { publishedAt: 'desc' },
    }),
    // Pull open job postings managed at /admin/careers (JobOpening table).
    // We surface them inside this News listing under the EVENT category
    // (label "Нээлттэй ажлын байр") so the admin has a single source of
    // truth: anything added at /admin/careers shows up here automatically.
    prisma.jobOpening
      .findMany({
        where: { active: true },
        orderBy: [{ order: 'asc' }, { updatedAt: 'desc' }],
      })
      .catch(() => [] as never[]),
    getSiteContentMap('banners'),
    getServerLocale(),
    getServerTranslator(),
  ]);

  const newsItems = news.map((n) => ({
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

  // Promote /admin/careers entries into virtual news cards under
  // category=EVENT (the enum value that maps to the "Нээлттэй ажлын
  // байр" filter chip on this page). Clicking one of these cards
  // routes to /careers#openings rather than a nonexistent
  // /news/<slug> detail page — that's where the per-opening
  // "Анкет татах" + "Анкет бөглөх" buttons live.
  const jobBanner =
    banners.get('page.careers.banner') || JOB_DEFAULT_IMAGE;
  const jobItems = jobs.map((j) => ({
    id: `job-${j.id}`,
    title: j.title,
    excerpt:
      j.description?.trim() ||
      `Бид ${j.title.trim()} мэргэжлийн ажилтан хүлээн авч байна. Дэлгэрэнгүй мэдээллийг харах, анкет татаж / бөглөж илгээх боломжтой.`,
    body: null as string | null,
    image: jobBanner,
    date: (j.updatedAt ?? j.createdAt).toISOString().slice(0, 10),
    category: 'EVENT',
    href: `/careers#openings`,
  }));

  // Combine and sort by date (descending). Job cards keep parity
  // with news cards: the most recently posted opening sits next to
  // the most recent news article in the unfiltered grid.
  const items = [...newsItems, ...jobItems].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  );

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
