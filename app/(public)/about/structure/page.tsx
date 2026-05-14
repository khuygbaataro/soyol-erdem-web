import { Section } from '@/components/layout/Section';
import { OrgChart } from '@/components/sections/OrgChart';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Бүтэц, зохион байгуулалт',
};

export default async function StructurePage() {
  // Server-fetch staff so each edit in /admin/staff surfaces here on the
  // next request. Resilient: if the table doesn't exist yet the chart
  // simply falls back to its bundled defaults.
  const staff = await prisma.staff
    .findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { position: 'asc' }],
    })
    .catch(() => []);

  return (
    <>
      <Section background="cream-soft">
        <OrgChart staff={staff} />
      </Section>
    </>
  );
}
