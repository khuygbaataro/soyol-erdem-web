import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { prisma } from '@/lib/prisma';
import { getSiteContentMap } from '@/lib/site-content';
import { getServerLocale } from '@/lib/i18n/server';
import { localisedField } from '@/lib/i18n/db';
import { CAREERS_APPLY_CONTENT } from '@/lib/i18n/content';
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
        select: {
          slug: true,
          title: true,
          titleEn: true,
          titleJa: true,
        },
      })
      .catch(() => null),
    getSiteContentMap('banners'),
    getServerLocale(),
  ]);

  const c = CAREERS_APPLY_CONTENT[locale];

  // Single source of truth: /admin/careers → JobOpening DB table.
  // Titles are locale-resolved so the dropdown labels switch when the
  // visitor changes the UI language (falls back to MN when EN / JP
  // columns are empty).
  const positions = (dbOpenings ?? []).map((o) =>
    localisedField(o, 'title', locale),
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
