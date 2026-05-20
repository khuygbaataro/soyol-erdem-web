'use client';

import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale, useTranslation } from '@/components/system/LocaleProvider';

export interface NewspaperListItem {
  id: string;
  issueNumber: number;
  title: string | null;
  publishedAt: Date | null;
  /** Optional admin-uploaded cover thumbnail. When present the card
   *  renders the image as its hero with a navy gradient overlay
   *  carrying the issue number + metadata. When null/empty we fall
   *  back to the printed-masthead design used historically. */
  coverImage?: string | null;
}

interface NewspapersListProps {
  items: NewspaperListItem[];
}

/**
 * Shelf of newspaper cards. Each card opens a dedicated reading page
 * (`/sonin-hewlel/<id>`) in a new tab, matching the journal-flipbook
 * pattern.
 *
 * Two render modes:
 *   • With `coverImage` — the uploaded thumbnail fills the card and a
 *     navy gradient at the bottom carries the masthead + issue number
 *     + date + CTA, so the photographic cover dominates.
 *   • Without `coverImage` — falls back to the printed-paper layout:
 *     cream background, navy masthead band, large №X numeral. This
 *     keeps issues that haven't had a cover uploaded yet from
 *     looking broken.
 */
export function NewspapersList({ items }: NewspapersListProps) {
  const t = useTranslation();
  const { locale } = useLocale();
  if (items.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border-medium bg-white p-10 text-center text-sm text-text-muted">
        {t('newspaper.empty')}
      </div>
    );
  }
  const dateLocale =
    locale === 'EN' ? 'en-US' : locale === 'JP' ? 'ja-JP' : 'mn-MN';

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {items.map((n) => {
        const dateLabel =
          n.publishedAt &&
          new Date(n.publishedAt).toLocaleDateString(dateLocale, {
            year: 'numeric',
            month: 'long',
          });

        if (n.coverImage) {
          // ───── Variant A: photographic cover ─────
          // Long-format newspapers (a real broadsheet PDF is much
          // taller than the 3:4 card) get cropped at the *bottom*
          // via `object-top` so the masthead + headline area always
          // stays visible. The lower ~55 % of the card is a deep navy
          // gradient that softly fades into whatever the bottom of
          // the cover happened to be, making the crop feel
          // intentional rather than abrupt. Issue №, date, title and
          // CTA all sit on that gradient.
          return (
            <a
              key={n.id}
              href={`/sonin-hewlel/${n.id}`}
              target="_blank"
              rel="noopener"
              className={cn(
                'group relative flex aspect-[3/4] flex-col overflow-hidden rounded-card text-left transition-all',
                'bg-navy-900', // visible at the bottom under the gradient
                'shadow-card hover:-translate-y-1 hover:shadow-card-hover',
                'ring-1 ring-border-light hover:ring-gold-500/60',
              )}
            >
              {/* Cover image — anchored to the top of its own canvas
                  so tall newspapers display the masthead first.
                  Hover zooms it slightly while staying anchored. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={n.coverImage}
                alt={n.title ?? `№${n.issueNumber}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Tall multi-stop navy gradient at the bottom — masks
                  any crop edge softly and acts as the metadata
                  surface. Three colour stops give a smooth fade-in
                  rather than a hard line. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-navy-900 from-30% via-navy-900/80 via-65% to-transparent"
              />

              {/* Metadata block sits on top of the gradient. Pushed
                  to the bottom with `mt-auto` on the flex column so
                  the image fills everything above. */}
              <div className="relative z-10 mt-auto px-4 pb-4 pt-12 text-white">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gold-400">
                  {t('newspaper.cardBrand')} · {t('newspaper.cardCategory')}
                </p>
                <p className="mt-1 font-serif text-[2.25rem] font-extrabold leading-none text-white">
                  №{n.issueNumber}
                </p>
                {dateLabel && (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/75">
                    {dateLabel}
                  </p>
                )}
                {n.title && (
                  <p className="mt-2 line-clamp-2 text-xs font-semibold leading-snug text-white/95">
                    {n.title}
                  </p>
                )}
                <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-400 transition-transform group-hover:translate-x-0.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  {t('newspaper.startReading')}
                </span>
              </div>
            </a>
          );
        }

        // ───── Variant B: printed-masthead fallback (no cover) ─────
        return (
          <a
            key={n.id}
            href={`/sonin-hewlel/${n.id}`}
            target="_blank"
            rel="noopener"
            className={cn(
              'group relative flex aspect-[3/4] flex-col overflow-hidden rounded-card text-left transition-all',
              'bg-cream-soft',
              'shadow-card hover:-translate-y-1 hover:shadow-card-hover',
              'ring-1 ring-border-light hover:ring-gold-500/60',
            )}
          >
            {/* Top masthead — printed-paper feel */}
            <div className="relative bg-navy-900 px-5 py-4 text-white">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-400">
                {t('newspaper.cardBrand')}
              </p>
              <p className="mt-0.5 font-serif text-base font-bold tracking-tight">
                {t('newspaper.cardCategory')}
              </p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent"
              />
            </div>

            {/* Issue body */}
            <div className="relative flex flex-1 flex-col justify-between px-5 py-5">
              <div>
                <p className="font-serif text-5xl font-bold leading-none text-navy-900">
                  №{n.issueNumber}
                </p>
                {dateLabel && (
                  <p className="mt-3 text-xs uppercase tracking-widest text-text-muted">
                    {dateLabel}
                  </p>
                )}
                {n.title && (
                  <p className="mt-3 line-clamp-3 text-sm font-semibold leading-snug text-text-body">
                    {n.title}
                  </p>
                )}
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 transition-transform group-hover:translate-x-0.5">
                <BookOpen className="h-3.5 w-3.5 text-gold-500" />
                {t('newspaper.startReading')}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
