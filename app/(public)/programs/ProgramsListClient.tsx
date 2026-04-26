'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { ProgramCard } from '@/components/ui/ProgramCard';
import { resolveIcon } from '@/lib/icon-map';

interface Item {
  id: string;
  name: string;
  degree: string;
  duration: string;
  icon: string;
  shortDescription: string;
  language: string;
}

const DEGREES = ['Бүгд', 'Бакалавр', 'Магистр'] as const;

export function ProgramsListClient({ items }: { items: Item[] }) {
  const [degree, setDegree] = useState<string>('Бүгд');
  const [language, setLanguage] = useState<string>('Бүгд');
  const [query, setQuery] = useState('');

  const languages = useMemo(() => {
    const set = new Set(items.map((i) => i.language));
    return ['Бүгд', ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      if (degree !== 'Бүгд' && p.degree !== degree) return false;
      if (language !== 'Бүгд' && p.language !== language) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.shortDescription.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [degree, language, query, items]);

  return (
    <>
      <div className="sticky top-20 z-30 border-b border-border-light bg-white/95 backdrop-blur">
        <div className="container-custom flex flex-wrap items-center gap-3 py-4">
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="rounded-button border border-border-light bg-white px-4 py-2 text-sm font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10"
          >
            {DEGREES.map((d) => (
              <option key={d} value={d}>
                Зэрэг: {d}
              </option>
            ))}
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-button border border-border-light bg-white px-4 py-2 text-sm font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10"
          >
            {languages.map((l) => (
              <option key={l} value={l}>
                Хэл: {l}
              </option>
            ))}
          </select>
          <div className="ml-auto flex items-center gap-2 rounded-button border border-border-light bg-white px-3 py-2">
            <Search className="h-4 w-4 text-text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Хайх..."
              className="w-40 bg-transparent text-sm text-text-heading placeholder-text-muted focus:outline-none md:w-56"
            />
          </div>
        </div>
      </div>

      <Section background="cream-soft">
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-text-muted">
            Хайлтад тохирох мэргэжил олдсонгүй.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProgramCard
                key={p.id}
                icon={resolveIcon(p.icon)}
                name={p.name}
                degree={p.degree}
                description={p.shortDescription}
                href={`/programs/${p.id}`}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
