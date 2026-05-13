'use client';

import { useMemo, useState } from 'react';
import { Section } from '@/components/layout/Section';
import { NewsCard } from '@/components/ui/NewsCard';
import { cn } from '@/lib/utils';

/**
 * Categories shown on /high-school/news. Each tab maps the user-facing
 * Mongolian label onto a set of existing News.category enum values, so the
 * admin form can keep using the shared dropdown without a schema migration.
 */
const HS_NEWS_TABS: { id: string; label: string; matches: string[] }[] = [
  {
    id: 'all',
    label: 'Бүгд',
    matches: [],
  },
  {
    id: 'school-info',
    label: 'Ахлах сургуулийн мэдээлэл',
    matches: ['NEWS', 'ANNOUNCEMENT'],
  },
  {
    id: 'extra',
    label: 'Хичээлээс гадуур ажил',
    matches: ['EVENT'],
  },
  {
    id: 'exchange',
    label: 'Сурагч солилцоо',
    matches: ['PROGRAM'],
  },
  {
    id: 'library',
    label: 'Номын сан',
    matches: ['RESEARCH'],
  },
  {
    id: 'graduation',
    label: 'Төгсөлт',
    matches: ['ACHIEVEMENT'],
  },
];

/** Reverse lookup: enum value → visible tab label. */
const CATEGORY_BADGE: Record<string, string> = {
  NEWS: 'Ахлах сургуулийн мэдээлэл',
  ANNOUNCEMENT: 'Ахлах сургуулийн мэдээлэл',
  EVENT: 'Хичээлээс гадуур ажил',
  PROGRAM: 'Сурагч солилцоо',
  RESEARCH: 'Номын сан',
  ACHIEVEMENT: 'Төгсөлт',
};

interface Item {
  id: string;
  title: string;
  excerpt: string;
  body?: string | null;
  image: string;
  date: string;
  category: string;
}

interface HighSchoolNewsListClientProps {
  items: Item[];
}

export function HighSchoolNewsListClient({ items }: HighSchoolNewsListClientProps) {
  const [active, setActive] = useState<string>('all');

  const counts = useMemo(() => {
    const out: Record<string, number> = { all: items.length };
    for (const tab of HS_NEWS_TABS) {
      if (tab.id === 'all') continue;
      out[tab.id] = items.filter((n) => tab.matches.includes(n.category)).length;
    }
    return out;
  }, [items]);

  const filtered = useMemo(() => {
    if (active === 'all') return items;
    const tab = HS_NEWS_TABS.find((t) => t.id === active);
    if (!tab) return items;
    return items.filter((n) => tab.matches.includes(n.category));
  }, [active, items]);

  return (
    <>
      <div className="sticky top-20 z-30 border-b border-border-light bg-white/95 backdrop-blur">
        <div className="mx-auto w-full max-w-container px-4 py-4 md:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {HS_NEWS_TABS.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
                    isActive
                      ? 'border-navy-900 bg-navy-900 text-white'
                      : 'border-border-light bg-white text-text-body hover:border-navy-900 hover:text-navy-900',
                  )}
                >
                  <span>{tab.label}</span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-bold',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-cream text-text-muted',
                    )}
                  >
                    {counts[tab.id] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
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
                category={CATEGORY_BADGE[n.category] ?? n.category}
                title={n.title}
                excerpt={n.excerpt}
                body={n.body}
                href={`/high-school/news/${n.id}`}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
