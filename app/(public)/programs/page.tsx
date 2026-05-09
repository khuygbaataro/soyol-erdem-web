import { PageHero } from '@/components/sections/PageHero';
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
    </>
  );
}
