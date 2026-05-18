'use client';

import { useMemo, useState } from 'react';
import { Section } from '@/components/layout/Section';
import { NewsCard } from '@/components/ui/NewsCard';
import { cn } from '@/lib/utils';
import { localiseNewsCategory } from '@/lib/admin-helpers';
import { useLocale } from '@/components/system/LocaleProvider';

const CATEGORY_FILTERS = ['ALL', 'NEWS', 'EVENT', 'ANNOUNCEMENT', 'RESEARCH', 'ACHIEVEMENT', 'PROGRAM'] as const;

interface Item {
  id: string;
  title: string;
  excerpt: string;
  body?: string | null;
  image: string;
  date: string;
  category: string;
}

interface NewsListClientProps {
  items: Item[];
  /** Detail link prefix. Defaults to '/news'. Pass '/high-school/news' for the sub-site. */
  hrefBase?: string;
}

export function NewsListClient({ items, hrefBase = '/news' }: NewsListClientProps) {
  const [active, setActive] = useState<(typeof CATEGORY_FILTERS)[number]>('ALL');
  const { locale } = useLocale();
  const allLabel = locale === 'EN' ? 'All' : locale === 'JP' ? 'すべて' : 'Бүгд';
  const emptyLabel =
    locale === 'EN'
      ? 'No news items in this category.'
      : locale === 'JP'
        ? 'このカテゴリーのニュースはありません。'
        : 'Энэ ангилалд мэдээ байхгүй байна.';

  const filtered = useMemo(() => {
    if (active === 'ALL') return items;
    return items.filter((n) => n.category === active);
  }, [active, items]);

  return (
    <>
      <div className="sticky top-20 z-30 border-b border-border-light bg-white/95 backdrop-blur">
        <div className="container-custom flex flex-wrap items-center gap-2 py-4">
          {CATEGORY_FILTERS.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
                  isActive
                    ? 'border-navy-900 bg-navy-900 text-white'
                    : 'border-border-light bg-white text-text-body hover:border-navy-900 hover:text-navy-900',
                )}
              >
                {cat === 'ALL' ? allLabel : localiseNewsCategory(cat, locale)}
              </button>
            );
          })}
        </div>
      </div>

      <Section background="cream-soft">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-text-muted">{emptyLabel}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((n) => (
              <NewsCard
                key={n.id}
                image={n.image}
                date={n.date}
                category={localiseNewsCategory(n.category, locale)}
                title={n.title}
                excerpt={n.excerpt}
                body={n.body}
                href={`${hrefBase}/${n.id}`}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
