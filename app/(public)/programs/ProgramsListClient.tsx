'use client';

import { useMemo } from 'react';
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

/**
 * Mapping from `Program.degree` (e.g. "Бакалавр") to the fuller display
 * heading shown above each degree's card group. Falls back to the raw
 * uppercased degree string when an entry isn't listed here.
 */
const DEGREE_HEADING_LABEL: Record<string, string> = {
  Бакалавр: 'БАКАЛАВРЫН ХӨТӨЛБӨРҮҮД',
  Магистр: 'МАГИСТРЫН ХӨТӨЛБӨРҮҮД',
  Доктор: 'ДОКТОРЫН ХӨТӨЛБӨРҮҮД',
};

/**
 * Programs grouped by degree. Editor's request was to drop the
 * "Зэрэг бүгд / Хэл бүгд" filter row and present бакалавр / магистр
 * хөтөлбөрүүдийг тус тусдаа жагсаалт болгох.
 */
export function ProgramsListClient({ items }: { items: Item[] }) {
  const groups = useMemo(() => {
    const byDegree = new Map<string, Item[]>();
    for (const item of items) {
      const key = item.degree?.trim() || 'Бусад';
      const arr = byDegree.get(key) ?? [];
      arr.push(item);
      byDegree.set(key, arr);
    }

    // Stable preferred order: Бакалавр, Магистр, then anything else
    // alphabetically. Empty groups disappear naturally.
    const preferred = ['Бакалавр', 'Магистр'];
    const ordered: { degree: string; items: Item[] }[] = [];
    for (const d of preferred) {
      const list = byDegree.get(d);
      if (list && list.length > 0) {
        ordered.push({ degree: d, items: list });
        byDegree.delete(d);
      }
    }
    for (const [degree, list] of [...byDegree.entries()].sort((a, b) =>
      a[0].localeCompare(b[0], 'mn'),
    )) {
      if (list.length > 0) ordered.push({ degree, items: list });
    }
    return ordered;
  }, [items]);

  if (groups.length === 0) {
    return (
      <Section background="cream-soft">
        <p className="py-20 text-center text-text-muted">
          Хөтөлбөр одоохондоо нийтлэгдээгүй байна.
        </p>
      </Section>
    );
  }

  return (
    <Section background="cream-soft">
      <div className="space-y-14">
        {groups.map((group) => (
          <div key={group.degree}>
            <div className="mb-6 flex items-end gap-4">
              <h2 className="text-h3 font-bold text-navy-900">
                {DEGREE_HEADING_LABEL[group.degree] ?? group.degree.toUpperCase()}
              </h2>
              <span className="mb-1 text-sm text-text-muted">
                {group.items.length} хөтөлбөр
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((p) => (
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
          </div>
        ))}
      </div>
    </Section>
  );
}
