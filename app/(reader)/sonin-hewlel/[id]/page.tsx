import { notFound } from 'next/navigation';
import dynamicImport from 'next/dynamic';
import { Download, ExternalLink } from 'lucide-react';
import { prisma } from '@/lib/prisma';

const JournalFlipbook = dynamicImport(
  () =>
    import('@/components/sections/JournalFlipbook').then(
      (m) => m.JournalFlipbook,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center text-white/80">
        <span className="text-sm">Уншигчийг ачаалж байна…</span>
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
        description: item.title ?? `Соёл-Эрдэм Дээд Сургуулийн сонин хэвлэлийн №${item.issueNumber} дугаар.`,
      }
    : { title: 'Сонин хэвлэл' };
}

/**
 * Standalone reader page for one newspaper issue. Uses the same flipbook
 * component as the research journals — same UX, different content source.
 */
export default async function NewspaperReadingPage({ params }: PageProps) {
  const item = await prisma.newspaper
    .findUnique({ where: { id: params.id } })
    .catch(() => null);
  if (!item || item.status !== 'PUBLISHED') notFound();

  // Increment view count fire-and-forget.
  prisma.newspaper
    .update({ where: { id: item.id }, data: { views: { increment: 1 } } })
    .catch(() => {});

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden">
      <div className="absolute right-3 top-3 z-20 flex items-center gap-2 sm:right-5 sm:top-5">
        <a
          href={item.fileUrl}
          download
          aria-label="Татаж авах"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur transition-colors hover:bg-white/20"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Татах</span>
        </a>
        <a
          href={item.fileUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Шинэ табад нээх"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur transition-colors hover:bg-white/20"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">PDF</span>
        </a>
      </div>

      <div className="absolute bottom-3 left-3 z-20 max-w-xs text-white/45 sm:bottom-5 sm:left-5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em]">
          Соёл-Эрдэм · Сонин хэвлэл
        </p>
        <p className="mt-0.5 truncate font-serif text-sm font-bold">
          №{item.issueNumber}
          {item.title ? ` · ${item.title}` : ''}
        </p>
      </div>

      <div className="flex h-full w-full items-center justify-center px-2 py-3 sm:px-4 sm:py-5">
        <JournalFlipbook pdfUrl={item.fileUrl} />
      </div>
    </div>
  );
}
