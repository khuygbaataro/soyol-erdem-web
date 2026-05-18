import { Section } from '@/components/layout/Section';
import { OrgChart } from '@/components/sections/OrgChart';
import { prisma } from '@/lib/prisma';
import { getServerLocale } from '@/lib/i18n/server';
import { localisedField, localisedFieldOptional } from '@/lib/i18n/db';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Бүтэц, зохион байгуулалт',
};

export default async function StructurePage() {
  // Server-fetch staff so each edit in /admin/staff surfaces here on the
  // next request. Resilient: if the table doesn't exist yet the chart
  // simply falls back to its bundled defaults.
  const [staff, locale] = await Promise.all([
    prisma.staff
      .findMany({
        where: { active: true },
        orderBy: [{ order: 'asc' }, { position: 'asc' }],
      })
      .catch(() => []),
    getServerLocale(),
  ]);

  // Pre-localise each row's position / degree / bio fields before
  // passing them to the OrgChart so the client component stays
  // locale-agnostic and just renders what it's given.
  const localised = staff.map((s) => ({
    positionKey: s.positionKey,
    name: s.name,
    position: localisedField(s, 'position', locale),
    degree: localisedFieldOptional(s, 'degree', locale),
    bio: localisedFieldOptional(s, 'bio', locale),
    photo: s.photo,
    email: s.email,
    phone: s.phone,
    active: s.active,
  }));

  return (
    <>
      <Section background="cream-soft">
        <OrgChart staff={localised} />
      </Section>
    </>
  );
}
