'use client';

import { BookOpen } from 'lucide-react';
import type { Journal } from '@/lib/research-journals';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/components/system/LocaleProvider';

interface ResearchJournalsListProps {
  journals: Journal[];
  /**
   * Optional map of journal id → cover image URL. When a value is set, the
   * card renders the real cover photo with a gold/navy badge overlay.
   * When missing, the card falls back to the original navy/gold spine
   * styling with the volume number set large.
   */
  covers?: Map<string, string | null>;
}

/**
 * Shelf of research-journal cards. Each card is a link that opens a dedicated
 * reading page (`/research/journal/<id>`) in a new tab — matching the pattern
 * used at citi.edu.mn/journal-reading-…/. The reading page renders the PDF
 * with a page-flipping book viewer.
 */
export function ResearchJournalsList({
  journals,
  covers,
}: ResearchJournalsListProps) {
  const t = useTranslation();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {journals.map((j) => {
        const cover = covers?.get(j.id) ?? null;
        return (
          <a
            key={j.id}
            href={`/research/journal/${j.id}`}
            target="_blank"
            rel="noopener"
            className={cn(
              'group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-card text-left transition-all',
              !cover && 'bg-gradient-to-br from-navy-900 via-[#243454] to-[#1c2745]',
              'shadow-card hover:-translate-y-1 hover:shadow-card-hover',
              'ring-1 ring-gold-500/20 hover:ring-gold-500/60',
            )}
          >
            {/* Cover image when admin uploaded one */}
            {cover && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Navy gradient overlay keeps the badge + label legible */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/35 to-navy-900/10"
                />
              </>
            )}

            {/* Spine highlight — visible on both cover + fallback */}
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-gold-500 via-[#e8893f] to-[#a4521f]"
            />

            {/* Decorative kanji watermark — only on the fallback (no photo) */}
            {!cover && (
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-6 -right-3 font-serif text-[140px] font-bold leading-none text-white/[0.05]"
              >
                専
              </span>
            )}

            <div className="relative z-10 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
                {t('newspaper.cardBrand')}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-white/55">
                {t('journal.cardCategory')}
              </p>
            </div>

            <div className="relative z-10 p-5">
              <p className="font-serif text-3xl font-bold leading-none text-white">
                {j.volume}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-white/85">
                {j.title}
              </p>
              <p className="mt-1 text-xs text-white/80">{j.subtitle}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 transition-transform group-hover:translate-x-0.5">
                <BookOpen className="h-3.5 w-3.5" />
                {t('newspaper.startReading')}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
