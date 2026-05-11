import { notFound } from 'next/navigation';
import dynamicImport from 'next/dynamic';
import { prisma } from '@/lib/prisma';

const NewspaperReader = dynamicImport(
  () =>
    import('@/components/sections/NewspaperReader').then(
      (m) => m.NewspaperReader,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center bg-[#f5efe3] text-navy-900">
        <span className="text-sm font-semibold">Уншигчийг ачаалж байна…</span>
      </div>
    ),
  },
);

interface PageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps) {
  const item = await prisma.regulation
    .findUnique({ where: { id: params.id } })
    .catch(() => null);
  return item
    ? {
        title: item.title,
        description: item.description ?? `Соёл Эрдэм Дээд Сургуулийн ${item.title} журам.`,
      }
    : { title: 'Дүрэм журам' };
}

/**
 * Standalone reader page for a single regulation PDF. Re-uses the
 * NewspaperReader component (thumbnail rail + zoom + page-jump) tuned
 * for printed documents.
 */
export default async function RegulationReadingPage({ params }: PageProps) {
  const item = await prisma.regulation
    .findUnique({ where: { id: params.id } })
    .catch(() => null);
  if (!item || item.status !== 'PUBLISHED') notFound();

  // Fire-and-forget view counter.
  prisma.regulation
    .update({ where: { id: item.id }, data: { views: { increment: 1 } } })
    .catch(() => {});

  return (
    <NewspaperReader
      pdfUrl={item.fileUrl}
      issueNumber={item.order || 0}
      issueTitle={item.title}
      publishedAt={item.createdAt}
      eyebrow="Соёл Эрдэм · Дүрэм журам"
      showIssueNumber={false}
    />
  );
}
