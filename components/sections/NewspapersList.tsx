'use client';

import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale, useTranslation } from '@/components/system/LocaleProvider';

export interface NewspaperListItem {
  id: string;
  issueNumber: number;
  title: string | null;
  publishedAt: Date | null;
}

interface NewspapersListProps {
  items: NewspaperListItem[];
}

/**
 * Shelf of newspaper cards. Each card opens a dedicated reading page
 * (`/sonin-hewlel/<id>`) in a new tab, matching the journal-flipbook pattern.
 * Cards are styled like printed-paper covers — cream background with a navy
 * masthead, gold accent rule and the issue number set large.
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
      {items.map((n) => (
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
              {n.publishedAt && (
                <p className="mt-3 text-xs uppercase tracking-widest text-text-muted">
                  {new Date(n.publishedAt).toLocaleDateString(dateLocale, {
                    year: 'numeric',
                    month: 'long',
                  })}
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
      ))}
    </div>
  );
}
