import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { CtaBanner } from '@/components/sections/CtaBanner';
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
      <PageHero
        title="Бүтэц, зохион байгуулалт"
        subtitle="Удирдах зөвлөл, Эрдмийн зөвлөл, Захирал, Чанарын үнэлгээний алба болон 4 үндсэн чиглэл."
        breadcrumb={[
          { label: 'Нүүр', href: '/' },
          { label: 'Сургуулийн тухай', href: '/about' },
          { label: 'Бүтэц, зохион байгуулалт' },
        ]}
      />

      <Section background="cream-soft">
        <OrgChart staff={staff} />
      </Section>

      <CtaBanner
        title="Бидний тухай дэлгэрэнгүй танилцах уу?"
        ctaLabel="Захирлын мэндчилгээ"
        ctaHref="/about/director-message"
        secondary={{ label: 'Үүсгэн байгуулагч', href: '/about/founder' }}
      />
    </>
  );
}
