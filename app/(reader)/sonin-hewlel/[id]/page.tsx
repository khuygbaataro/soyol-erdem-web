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
  const item = await prisma.newspaper
    .findUnique({ where: { id: params.id } })
    .catch(() => null);
  return item
    ? {
        title: `Сонин хэвлэл №${item.issueNumber}`,
        description:
          item.title ??
          `Соёл Эрдэм Дээд Сургуулийн сонин хэвлэлийн №${item.issueNumber} дугаар.`,
      }
    : { title: 'Сонин хэвлэл' };
}

/**
 * Standalone reading page for one newspaper issue. Uses NewspaperReader —
 * a thumbnail-rail + zoom layout tuned for skimming a printed paper, not
 * the leaf-by-leaf flipbook used for research journals.
 */
export default async function NewspaperReadingPage({ params }: PageProps) {
  const item = await prisma.newspaper
    .findUnique({ where: { id: params.id } })
    .catch(() => null);
  if (!item || item.status !== 'PUBLISHED') notFound();

  // Fire-and-forget view counter.
  prisma.newspaper
    .update({ where: { id: item.id }, data: { views: { increment: 1 } } })
    .catch(() => {});

  return (
    <NewspaperReader
      pdfUrl={item.fileUrl}
      issueNumber={item.issueNumber}
      issueTitle={item.title}
      publishedAt={item.publishedAt}
    />
  );
}
