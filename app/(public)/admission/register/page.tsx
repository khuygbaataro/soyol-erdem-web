import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { prisma } from '@/lib/prisma';
import { getSiteContentMap } from '@/lib/site-content';
import { getServerLocale } from '@/lib/i18n/server';
import { REGISTER_CONTENT } from '@/lib/i18n/content';
import { localisedField } from '@/lib/i18n/db';
import { RegisterFormClient } from './RegisterFormClient';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Элсэлтийн цахим бүртгэл',
  description:
    'Соёл Эрдэм Дээд Сургуулийн 2026-2027 оны хичээлийн жилийн элсэлтийн цахим бүртгэлийн анкет.',
};

export default async function AdmissionRegisterPage() {
  // Pull the program list so the form's programme step shows the real
  // catalog instead of a hard-coded placeholder. Each row is localised
  // up-front so the client component receives the correct language
  // names without having to call localisedField itself.
  //
  // Stays narrowly scoped so the page does the minimum needed to render
  // the 8-step wizard — anything fancier (admission summary panel etc.)
  // belongs on /admission. We learned the hard way that piling extra
  // server-side fetches and large inline JSX blocks onto a hot landing
  // page is a great way to surface obscure 500s when one of them fails.
  const [programs, banners, locale] = await Promise.all([
    prisma.program
      .findMany({
        where: { active: true },
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
        select: {
          id: true,
          name: true,
          nameEn: true,
          nameJa: true,
          degree: true,
        },
      })
      .catch(() => []),
    getSiteContentMap('banners'),
    getServerLocale(),
  ]);

  const c = REGISTER_CONTENT[locale];
  const localisedPrograms = programs.map((p) => ({
    id: p.id,
    name: localisedField(p, 'name', locale),
    degree: p.degree,
  }));

  return (
    <>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbHome, href: '/' },
          { label: c.breadcrumbAdmission, href: '/admission' },
          { label: c.breadcrumbThis },
        ]}
        backgroundImage={banners.get('page.admission-register.banner') || undefined}
      />

      <Section background="cream-soft">
        <div className="mx-auto max-w-3xl">
          <RegisterFormClient programs={localisedPrograms} labels={c} />
        </div>
      </Section>
    </>
  );
}
