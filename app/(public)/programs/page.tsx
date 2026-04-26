import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ProgramsListClient } from './ProgramsListClient';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Мэргэжлүүд' };

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    where: { active: true },
    orderBy: [{ order: 'asc' }, { name: 'asc' }],
  });

  const items = programs.map((p) => ({
    id: p.slug,
    name: p.name,
    degree: p.degree,
    duration: p.duration,
    icon: p.icon,
    shortDescription: p.shortDescription,
    language: p.language,
  }));

  return (
    <>
      <PageHero
        title="МЭРГЭЖЛҮҮД"
        subtitle="Манай сургуулийн боловсролын хөтөлбөрөөс өөртөө тохирох мэргэжлээ сонгоорой."
        breadcrumb={[{ label: 'Нүүр', href: '/' }, { label: 'Мэргэжлүүд' }]}
      />

      <ProgramsListClient items={items} />

      <Section background="white" spacing="md">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 font-bold text-navy-900">
            Сонголтоо хийж чадахгүй байна уу?
          </h2>
          <p className="mt-4 text-text-body">
            Манай элсэлтийн зөвлөхөөс зөвлөгөө аваарай.
          </p>
          <div className="mt-6">
            <Button href="/contact" variant="primary" size="md">
              Холбоо барих
            </Button>
          </div>
        </div>
      </Section>

      <CtaBanner
        title="Тохирох мэргэжлээ олсон уу?"
        ctaLabel="Элсэх"
        ctaHref="/admission"
      />
    </>
  );
}
