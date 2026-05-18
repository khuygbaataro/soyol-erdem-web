import { PageHero } from '@/components/sections/PageHero';
import { ProgramsListClient } from './ProgramsListClient';
import { prisma } from '@/lib/prisma';
import { getSiteContentMap } from '@/lib/site-content';
import { getServerLocale } from '@/lib/i18n/server';
import { localisedField } from '@/lib/i18n/db';
import { SECTION_TITLES } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Мэргэжлүүд' };

export default async function ProgramsPage() {
  const [programs, banners, locale] = await Promise.all([
    prisma.program.findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    }),
    getSiteContentMap('banners'),
    getServerLocale(),
  ]);

  const items = programs.map((p) => ({
    id: p.slug,
    name: localisedField(p, 'name', locale),
    degree: p.degree,
    duration: p.duration,
    icon: p.icon,
    shortDescription: localisedField(p, 'shortDescription', locale),
    language: p.language,
  }));

  const subtitle =
    locale === 'EN'
      ? 'Choose the major that fits you best from our catalog.'
      : locale === 'JP'
        ? '本学のカリキュラムから自分に合った専攻を選びましょう。'
        : 'Манай сургуулийн боловсролын хөтөлбөрөөс өөртөө тохирох мэргэжлээ сонгоорой.';

  return (
    <>
      <PageHero
        title={SECTION_TITLES[locale].programsTitle}
        subtitle={subtitle}
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Мэргэжлүүд' }]}
        backgroundImage={banners.get('page.programs.banner') || undefined}
      />

      <ProgramsListClient items={items} />
    </>
  );
}
