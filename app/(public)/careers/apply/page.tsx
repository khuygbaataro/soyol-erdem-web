import { Section } from '@/components/layout/Section';
import { CAREERS_DEFAULT_OPENINGS } from '@/lib/content';
import { prisma } from '@/lib/prisma';
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
  const dbOpenings = await prisma.jobOpening
    .findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { title: 'asc' }],
      select: { slug: true, title: true },
    })
    .catch(() => null);

  const positions =
    dbOpenings && dbOpenings.length > 0
      ? dbOpenings.map((o) => o.title)
      : CAREERS_DEFAULT_OPENINGS.map((o) => o.title);

  // Always offer "Бусад" so applicants without a matching listing aren't
  // dead-ended.
  const allPositions = [...positions, 'Бусад'];
  const initialPosition = searchParams.position?.trim() || '';

  return (
    <>
      <Section background="cream-soft">
        <div className="mx-auto max-w-3xl">
          <JobApplyClient positions={allPositions} initialPosition={initialPosition} />
        </div>
      </Section>
    </>
  );
}
