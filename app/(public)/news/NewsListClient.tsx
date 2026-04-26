'use client';

import { useMemo, useState } from 'react';
import { Section } from '@/components/layout/Section';
import { NewsCard } from '@/components/ui/NewsCard';
import { cn } from '@/lib/utils';
import { NEWS_CATEGORY_LABEL } from '@/lib/admin-helpers';

const CATEGORY_FILTERS = ['ALL', 'NEWS', 'EVENT', 'ANNOUNCEMENT', 'RESEARCH', 'ACHIEVEMENT', 'PROGRAM'] as const;

interface Item {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export function NewsListClient({ items }: { items: Item[] }) {
  const [active, setActive] = useState<(typeof CATEGORY_FILTERS)[number]>('ALL');

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
                {cat === 'ALL' ? 'Бүгд' : (NEWS_CATEGORY_LABEL[cat] ?? cat)}
              </button>
            );
          })}
        </div>
      </div>

      <Section background="cream-soft">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-text-muted">
            Энэ ангилалд мэдээ байхгүй байна.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((n) => (
              <NewsCard
                key={n.id}
                image={n.image}
                date={n.date}
                category={NEWS_CATEGORY_LABEL[n.category] ?? n.category}
                title={n.title}
                excerpt={n.excerpt}
                href={`/news/${n.id}`}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
