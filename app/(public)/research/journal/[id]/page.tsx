import { notFound } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
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
      <div className="flex h-[60vh] items-center justify-center text-white/80">
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
        description: `Соёл-Эрдэм Дээд Сургуулийн эрдэм шинжилгээний сэтгүүл — ${journal.title}, ${journal.subtitle}.`,
      }
    : { title: 'Сэтгүүл' };
}

/**
 * Standalone reading page for one issue of the research journal. Mirrors the
 * pattern of citi.edu.mn/journal-reading-… — the flipbook is the page, with
 * a slim toolbar above it for navigation back to /research and quick PDF
 * actions (download, open raw PDF in new tab).
 */
export default function JournalReadingPage({ params }: PageProps) {
  const journal = RESEARCH_JOURNALS.find((j) => j.id === params.id);
  if (!journal) notFound();

  return (
    <div className="flex min-h-[calc(100vh-128px)] flex-col bg-[#040814] text-white">
      {/* Toolbar */}
      <div className="border-b border-white/5 bg-[#0d1530]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Эрдэм шинжилгээ
            </Link>
            <span aria-hidden className="hidden h-4 w-px bg-white/15 sm:block" />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-400">
                Эрдэм шинжилгээний сэтгүүл
              </p>
              <p className="truncate font-serif text-lg font-bold text-white">
                {journal.title}{' '}
                <span className="text-white/65">· {journal.subtitle}</span>
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={journal.file}
              download
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 transition-colors hover:bg-white/20"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Татах</span>
            </a>
            <a
              href={journal.file}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 transition-colors hover:bg-white/20"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Шинэ табад</span>
            </a>
          </div>
        </div>
      </div>

      {/* Flipbook stage — title sits in the toolbar above so the book has
          maximum vertical room here. */}
      <div className="flex flex-1 items-center justify-center px-2 py-4 sm:px-4 sm:py-6">
        <JournalFlipbook pdfUrl={journal.file} />
      </div>
    </div>
  );
}
