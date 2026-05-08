import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Download, ExternalLink } from 'lucide-react';
import { RESEARCH_JOURNALS } from '@/lib/research-journals';

// react-pdf + react-pageflip rely on browser-only APIs; load lazily and skip
// SSR entirely so the heavy PDF.js bundle never reaches the server.
const JournalFlipbook = dynamic(
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

export function generateStaticParams() {
  return RESEARCH_JOURNALS.map((j) => ({ id: j.id }));
}

export function generateMetadata({ params }: PageProps) {
  const journal = RESEARCH_JOURNALS.find((j) => j.id === params.id);
  return journal
    ? {
        title: `${journal.title} · ${journal.subtitle}`,
        description: `Соёл Эрдэм Дээд Сургуулийн эрдэм шинжилгээний сэтгүүл — ${journal.title}, ${journal.subtitle}.`,
      }
    : { title: 'Сэтгүүл' };
}

/**
 * Standalone reading page for one issue of the research journal. Mirrors the
 * pattern of citi.edu.mn/journal-reading-… — opens in a new tab, no site
 * header / footer / nav, just the flipbook and a slim action strip in the
 * top-right corner. Closing the tab is the intended way to return.
 */
export default function JournalReadingPage({ params }: PageProps) {
  const journal = RESEARCH_JOURNALS.find((j) => j.id === params.id);
  if (!journal) notFound();

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden">
      {/* Floating action strip — top-right, small enough to leave the page
          feeling full-bleed. Just download + open-raw-PDF. */}
      <div className="absolute right-3 top-3 z-20 flex items-center gap-2 sm:right-5 sm:top-5">
        <a
          href={journal.file}
          download
          aria-label="Татаж авах"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur transition-colors hover:bg-white/20"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Татах</span>
        </a>
        <a
          href={journal.file}
          target="_blank"
          rel="noreferrer"
          aria-label="Шинэ табад нээх"
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur transition-colors hover:bg-white/20"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">PDF</span>
        </a>
      </div>

      {/* Subtle title at bottom-left, doesn't compete with the book */}
      <div className="absolute bottom-3 left-3 z-20 max-w-xs text-white/45 sm:bottom-5 sm:left-5">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em]">
          Соёл Эрдэм · Эрдэм шинжилгээний сэтгүүл
        </p>
        <p className="mt-0.5 truncate font-serif text-sm font-bold">
          {journal.title} · {journal.subtitle}
        </p>
      </div>

      {/* Flipbook stage takes the full viewport */}
      <div className="flex h-full w-full items-center justify-center px-2 py-3 sm:px-4 sm:py-5">
        <JournalFlipbook pdfUrl={journal.file} />
      </div>
    </div>
  );
}
