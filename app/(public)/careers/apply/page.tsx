import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { CAREERS_DEFAULT_OPENINGS } from '@/lib/content';
import { prisma } from '@/lib/prisma';
import { getSiteContentMap } from '@/lib/site-content';
import { getServerLocale } from '@/lib/i18n/server';
import { CAREERS_CONTENT, CAREERS_APPLY_CONTENT } from '@/lib/i18n/content';
import { JobApplyClient } from './JobApplyClient';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Ажлын анкет',
  description: 'Соёл Эрдэм Дээд Сургуулийн нээлттэй ажлын байрны анкет.',
};

interface PageProps {
  searchParams: { position?: string };
}

export default async function JobApplyPage({ searchParams }: PageProps) {
  const [dbOpenings, banners, locale] = await Promise.all([
    prisma.jobOpening
      .findMany({
        where: { active: true },
        orderBy: [{ order: 'asc' }, { title: 'asc' }],
        select: { slug: true, title: true },
      })
      .catch(() => null),
    getSiteContentMap('banners'),
    getServerLocale(),
  ]);

  const c = CAREERS_APPLY_CONTENT[locale];
  const careers = CAREERS_CONTENT[locale];

  // DB rows are admin-managed and authored verbatim; the seeded
  // defaults flip to the locale-specific titles.
  const positions =
    dbOpenings && dbOpenings.length > 0
      ? dbOpenings.map((o) => o.title)
      : CAREERS_DEFAULT_OPENINGS.map(
          (o, idx) => careers.defaultOpenings[idx] ?? o.title,
        );

  // Always offer "Other" so applicants without a matching listing
  // aren't dead-ended.
  const allPositions = [...positions, c.otherPosition];
  const initialPosition = searchParams.position?.trim() || '';

  return (
    <>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbHome, href: '/' },
          { label: c.breadcrumbCareers, href: '/careers' },
          { label: c.breadcrumbThis },
        ]}
        backgroundImage={banners.get('page.careers-apply.banner') || undefined}
      />
      <Section background="cream-soft">
        <div className="mx-auto max-w-3xl">
          <JobApplyClient
            positions={allPositions}
            initialPosition={initialPosition}
            labels={c}
          />
        </div>
      </Section>
    </>
  );
}
