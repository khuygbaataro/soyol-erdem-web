'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { BookOpen, Download, ExternalLink, X } from 'lucide-react';
import type { Journal } from '@/lib/research-journals';
import { cn } from '@/lib/utils';

// react-pdf + react-pageflip rely on browser-only APIs; load them lazily and
// keep them out of the SSR bundle so the rest of the page renders fast.
const JournalFlipbook = dynamic(
  () => import('./JournalFlipbook').then((m) => m.JournalFlipbook),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center text-white/80">
        <span className="text-sm">Уншигч ачааллагдаж байна…</span>
      </div>
    ),
  },
);

interface ResearchJournalsListProps {
  journals: Journal[];
}

export function ResearchJournalsList({ journals }: ResearchJournalsListProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = activeId ? journals.find((j) => j.id === activeId) ?? null : null;

  // Lock body scroll while modal is open.
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {journals.map((j) => (
          <button
            key={j.id}
            type="button"
            onClick={() => setActiveId(j.id)}
            className={cn(
              'group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-card text-left transition-all',
              'bg-gradient-to-br from-navy-900 via-[#243454] to-[#1c2745]',
              'shadow-card hover:-translate-y-1 hover:shadow-card-hover',
              'ring-1 ring-gold-500/20 hover:ring-gold-500/60',
            )}
          >
            {/* Spine highlight */}
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-gold-500 via-[#e8893f] to-[#a4521f]"
            />
            {/* Decorative kanji watermark */}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-3 font-serif text-[140px] font-bold leading-none text-white/[0.05]"
            >
              専
            </span>

            <div className="relative z-10 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
                Соёл-Эрдэм
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-white/55">
                Эрдэм шинжилгээний сэтгүүл
              </p>
            </div>

            <div className="relative z-10 p-5">
              <p className="font-serif text-3xl font-bold leading-none text-white">
                {j.volume}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-white/85">
                {j.title}
              </p>
              <p className="mt-1 text-xs text-white/70">{j.subtitle}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 transition-transform group-hover:translate-x-0.5">
                <BookOpen className="h-3.5 w-3.5" />
                Уншиж эхлэх
              </span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} · ${active.subtitle}`}
          className="fixed inset-0 z-50 flex items-stretch justify-center bg-[#040814]/92 px-2 py-3 backdrop-blur-sm sm:px-4 sm:py-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveId(null);
          }}
        >
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between gap-3 px-2 pb-3 sm:px-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold uppercase tracking-widest text-gold-400">
                  Эрдэм шинжилгээний сэтгүүл
                </p>
                <p className="truncate text-base font-bold text-white">
                  {active.title} · {active.subtitle}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={active.file}
                  download
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 transition-colors hover:bg-white/20"
                  aria-label="Татаж авах"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Татах</span>
                </a>
                <a
                  href={active.file}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/85 transition-colors hover:bg-white/20"
                  aria-label="Шинэ табад нээх"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Шинэ табад</span>
                </a>
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  aria-label="Хаах"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center overflow-hidden">
              <JournalFlipbook pdfUrl={active.file} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
