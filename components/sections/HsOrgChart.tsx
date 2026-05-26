'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, Mail, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Соёл Эрдэм Сургуулийн (ахлах сургуулийн) бүтэц зохион байгуулалт.
 *
 * Layout (Munkhchimeg-ийн docx-аас):
 *
 *                  [Удирдах зөвлөл]
 *                         │
 *      [Гадаад харилцаа] ─ [Захирал]
 *                         │
 *   ┌───────────────┬────┴────┬──────────────────────┬───────────────┐
 * [Сургалтын    [Сургалтын  [Мэргэжлийн          [Захиргаа санхүү
 *  алба]         менежер]    багш нарын           аж ахуй]
 *   ├ I-V                    бүлэг]
 *   ├ VI-IX                  ├ Гоо зүй            ├ Архив, бичиг хэрэг
 *   ├ X-XII                  ├ Бага               └ Нийгмийн ажилтан
 *   └ Анги бүлэг             ├ НУ
 *                            └ БУ
 *
 * Бүх node clickable, нэг node-д олон ажилтан хадгалагдах боломжтой.
 * Staff DB-аас positionKey-ээр уншина (та Staff model-ийг үндсэн
 * сайтын OrgChart-тай хуваалцаж байгаа). Админ /admin/staff-аас
 * positionKey-руу шинэ ажилтан нэмж болно.
 */

export interface HsStaff {
  positionKey: string;
  name: string;
  position: string;
  degree?: string | null;
  photo?: string | null;
  bio?: string | null;
  email?: string | null;
  phone?: string | null;
  active?: boolean;
}

/**
 * Fallback ажилтан — DB хоосон бол default. positionKey-ууд:
 *   hs-board, hs-foreign-relations, hs-director,
 *   hs-training-office, hs-training-manager, hs-pro-teachers,
 *   hs-admin-finance,
 *   hs-grade-1-5, hs-grade-6-9, hs-grade-10-12, hs-class-groups,
 *   hs-subj-aesthetics, hs-subj-primary, hs-subj-social, hs-subj-natural,
 *   hs-archive, hs-social-worker
 */
const FALLBACK: Record<string, Omit<HsStaff, 'positionKey'>> = {
  'hs-board': {
    name: 'Удирдах зөвлөл',
    position: 'Удирдах зөвлөл',
  },
  'hs-foreign-relations': {
    name: 'Гадаад харилцаа',
    position: 'Гадаад харилцааны хариуцагч',
  },
  'hs-director': {
    name: 'Д. Эрдэнэцэцэг',
    position: 'Захирал',
    degree: 'Магистр (MA)',
  },
  'hs-training-office': {
    name: 'Сургалтын алба',
    position: 'Сургалтын албаны эрхлэгч',
  },
  'hs-training-manager': {
    name: 'Сургалтын менежер',
    position: 'Сургалтын менежер',
  },
  'hs-pro-teachers': {
    name: 'Мэргэжлийн багш нарын бүлэг',
    position: 'Бүлгийн ахлагч',
  },
  'hs-subjects': {
    name: 'Хичээлийн чиглэлүүд',
    position: 'Мэргэжлийн чиглэлийн ахлагч нар',
  },
  'hs-admin-finance': {
    name: 'Захиргаа санхүү аж ахуй',
    position: 'Захиргаа санхүү аж ахуйн эрхлэгч',
  },
  'hs-grade-1-5': { name: 'I–V анги', position: 'Багшийн бүрэлдэхүүн' },
  'hs-grade-6-9': { name: 'VI–IX анги', position: 'Багшийн бүрэлдэхүүн' },
  'hs-grade-10-12': { name: 'X–XII анги', position: 'Багшийн бүрэлдэхүүн' },
  'hs-class-groups': { name: 'Анги бүлэг', position: 'Анги бүлгийн зохион байгуулалт' },
  'hs-subj-aesthetics': { name: 'Гоо зүй', position: 'Гоо зүйн багш' },
  'hs-subj-primary': { name: 'Бага', position: 'Бага ангийн багш' },
  'hs-subj-social': { name: 'НУ (Нийгмийн ухаан)', position: 'Нийгмийн ухааны багш' },
  'hs-subj-natural': { name: 'БУ (Байгалийн ухаан)', position: 'Байгалийн ухааны багш' },
  'hs-archive': { name: 'Архив, бичиг хэрэг', position: 'Архивч' },
  'hs-social-worker': { name: 'Нийгмийн ажилтан', position: 'Нийгмийн ажилтан' },
};

interface NodeProps {
  id?: string;
  label: React.ReactNode;
  level: 'top' | 'director' | 'mid' | 'pillar' | 'unit';
  onSelect?: (id: string) => void;
  hasStaff?: boolean;
}

function ChartNode({ id, label, level, onSelect, hasStaff }: NodeProps) {
  const clickable = !!id && !!onSelect;
  const baseStyles = {
    top: 'bg-navy-900 text-white px-6 py-3 text-sm font-bold uppercase tracking-wider',
    director:
      'bg-gold-500 text-navy-900 px-6 py-3 text-sm font-bold uppercase tracking-wider ring-2 ring-gold-500/40',
    mid: 'bg-navy-900 text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide',
    pillar:
      'bg-white text-navy-900 border border-navy-900/30 px-4 py-3 text-xs font-bold uppercase tracking-wide text-center min-h-[3.5rem]',
    unit: 'bg-white text-navy-900 border border-border-light px-4 py-2.5 text-sm',
  } as const;

  const className = cn(
    'items-center justify-center rounded-md text-center shadow-card transition-all duration-200',
    level === 'pillar' ? 'flex w-full' : 'inline-flex',
    baseStyles[level],
    clickable && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-2 hover:ring-gold-500/60',
    clickable && !hasStaff && 'opacity-90',
  );

  if (clickable) {
    return (
      <button type="button" onClick={() => onSelect!(id!)} className={className}>
        {label}
      </button>
    );
  }
  return <div className={className}>{label}</div>;
}

function Connector({ height = 6 }: { height?: number }) {
  return (
    <span
      aria-hidden
      className="mx-auto block w-[1.5px] bg-[image:repeating-linear-gradient(to_bottom,rgba(30,58,95,0.7)_0_4px,transparent_4px_8px)]"
      style={{ height: `${height * 4}px` }}
    />
  );
}

function SiblingConnector() {
  return <span aria-hidden className="block h-[1.5px] flex-1 bg-navy-900/70" />;
}

function BranchConnector({ count }: { count: number }) {
  return (
    <div aria-hidden className="relative mx-auto mb-2 w-full" style={{ height: '32px' }}>
      <span className="absolute left-1/2 top-0 h-3 w-[1.5px] -translate-x-1/2 bg-navy-900/70" />
      <span
        className="absolute top-3 h-[1.5px] bg-navy-900/70"
        style={{
          left: `calc(${100 / (count * 2)}% )`,
          right: `calc(${100 / (count * 2)}% )`,
        }}
      />
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute top-3 h-5 w-[1.5px] bg-navy-900/70"
          style={{ left: `calc(${(100 / count) * (i + 0.5)}%)` }}
        />
      ))}
    </div>
  );
}

function UnitTree({
  units,
  onSelect,
  staffByKey,
}: {
  units: { id?: string; label: string }[];
  onSelect: (id: string) => void;
  staffByKey: Map<string, HsStaff[]>;
}) {
  if (units.length === 0) return null;
  return (
    <div className="relative mt-2 pl-6">
      <span
        aria-hidden
        className="absolute left-3 top-0 w-[2px] bg-[image:repeating-linear-gradient(to_bottom,rgba(30,58,95,0.7)_0_3px,transparent_3px_7px)]"
        style={{ height: `calc(100% - 1.25rem)` }}
      />
      <ul className="space-y-3">
        {units.map((u) => (
          <li key={u.label} className="relative">
            <span
              aria-hidden
              className="absolute -left-3 top-1/2 h-[2px] w-3 bg-[image:repeating-linear-gradient(to_right,rgba(30,58,95,0.7)_0_3px,transparent_3px_7px)]"
            />
            <ChartNode
              id={u.id}
              label={u.label}
              level="unit"
              onSelect={onSelect}
              hasStaff={u.id ? (staffByKey.get(u.id)?.length ?? 0) > 0 : false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

interface Pillar {
  id: string;
  title: string;
  units: { id: string; label: string }[];
}

// Захиралын доорхи 3 шууд багана (Munkhchimeg-ийн зурганд: Сургалтын
// менежер / Нийгмийн ажилтан / Захиргаа санхүү аж ахуй).
const TOP_PILLARS: Pillar[] = [
  {
    id: 'hs-training-manager',
    title: 'Сургалтын менежер',
    units: [],
  },
  {
    id: 'hs-social-worker',
    title: 'Нийгмийн ажилтан',
    units: [],
  },
  {
    id: 'hs-admin-finance',
    title: 'Захиргаа санхүү аж ахуй',
    units: [{ id: 'hs-archive', label: 'Архив, бичиг хэрэг' }],
  },
];

// "Мэргэжлийн багш нарын бүлэг"-ийн доор 2 sub-pillar:
//   • Сургалтын алба (3 анги нэгж: I-V, VI-IX, X-XII)
//   • Хичээлийн чиглэл (4 мэргэжил: Гоо зүй, Бага, НУ, БУ)
const PRO_SUB_PILLARS: Pillar[] = [
  {
    id: 'hs-training-office',
    title: 'Сургалтын алба',
    units: [
      { id: 'hs-grade-1-5', label: 'I–V анги' },
      { id: 'hs-grade-6-9', label: 'VI–IX анги' },
      { id: 'hs-grade-10-12', label: 'X–XII анги' },
    ],
  },
  {
    id: 'hs-subjects',
    title: 'Хичээлийн чиглэлүүд',
    units: [
      { id: 'hs-subj-aesthetics', label: 'Гоо зүй' },
      { id: 'hs-subj-primary', label: 'Бага' },
      { id: 'hs-subj-social', label: 'НУ (Нийгмийн ухаан)' },
      { id: 'hs-subj-natural', label: 'БУ (Байгалийн ухаан)' },
    ],
  },
];

interface HsOrgChartProps {
  staff?: HsStaff[];
  /** Optional translated labels. Defaults to MN strings. */
  labels?: {
    tooltip?: string;
    emptyState?: string;
    close?: string;
  };
}

export function HsOrgChart({ staff, labels }: HsOrgChartProps = {}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const staffByKey = useMemo(() => {
    const m = new Map<string, HsStaff[]>();
    const adminKeysSeen = new Set<string>();
    for (const s of staff ?? []) {
      if (s.active === false) continue;
      adminKeysSeen.add(s.positionKey);
      const list = m.get(s.positionKey) ?? [];
      list.push(s);
      m.set(s.positionKey, list);
    }
    for (const [key, value] of Object.entries(FALLBACK)) {
      if (!adminKeysSeen.has(key)) {
        m.set(key, [{ positionKey: key, ...value }]);
      }
    }
    return m;
  }, [staff]);

  const selectedList = selectedId ? staffByKey.get(selectedId) ?? [] : [];

  useEffect(() => {
    if (!selectedId) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedId]);

  const hasStaff = (id: string) => (staffByKey.get(id)?.length ?? 0) > 0;
  const closeLabel = labels?.close ?? 'Хаах';
  const tooltipLabel =
    labels?.tooltip ?? 'Ажилтны мэдээллийг үзэхийн тулд карт дээр дарна уу.';
  const emptyLabel =
    labels?.emptyState ?? 'Энэ хэсэгт одоогоор ажилтан бүртгэгдээгүй байна.';

  return (
    <>
      <div className="space-y-6">
        {/* Row 1 — Удирдах зөвлөл */}
        <div className="flex flex-col items-center">
          <ChartNode
            id="hs-board"
            label="УДИРДАХ ЗӨВЛӨЛ"
            level="top"
            onSelect={setSelectedId}
            hasStaff={hasStaff('hs-board')}
          />

          <Connector height={6} />

          {/* Row 2 — Гадаад харилцаа ← ЗАХИРАЛ */}
          <div className="flex w-full max-w-4xl items-center justify-center gap-0 sm:gap-3">
            <div className="hidden flex-1 items-center justify-end sm:flex">
              <ChartNode
                id="hs-foreign-relations"
                label="Гадаад харилцаа"
                level="mid"
                onSelect={setSelectedId}
                hasStaff={hasStaff('hs-foreign-relations')}
              />
              <SiblingConnector />
            </div>
            <ChartNode
              id="hs-director"
              label="ЗАХИРАЛ"
              level="director"
              onSelect={setSelectedId}
              hasStaff={hasStaff('hs-director')}
            />
            <div className="hidden flex-1 sm:block" />
          </div>

          {/* mobile-only sibling stack */}
          <div className="mt-4 flex flex-col items-center gap-2 sm:hidden">
            <ChartNode
              id="hs-foreign-relations"
              label="Гадаад харилцаа"
              level="mid"
              onSelect={setSelectedId}
              hasStaff={hasStaff('hs-foreign-relations')}
            />
          </div>
        </div>

        {/* Branching connector → 3 top pillars */}
        <BranchConnector count={3} />

        {/*
          3-багана grid. Эхний 2 багана (Сургалтын менежер +
          Нийгмийн ажилтан) доороо "Мэргэжлийн багш нарын бүлэг"-
          ийг хуваалцана (col-span-2). Захиргаа санхүү аж ахуй
          (3-р багана) бие даасан, доороо Архив unit-ыг л өвлөнө.
          Энэ нь Munkhchimeg-ийн зурганд: МБНБ нь зөвхөн 2-ын
          доор сууж, 3 дахь pillar-ийн доор биш гэсэн дүрсний дагуу.
        */}
        <div className="grid gap-x-6 gap-y-8 lg:grid-cols-3">
          {/* Top row: 3 pillars in 3 columns */}
          {TOP_PILLARS.map((p) => (
            <div key={p.id} className="flex flex-col">
              <ChartNode
                id={p.id}
                label={p.title}
                level="pillar"
                onSelect={setSelectedId}
                hasStaff={hasStaff(p.id)}
              />
              <UnitTree
                units={p.units}
                onSelect={setSelectedId}
                staffByKey={staffByKey}
              />
            </div>
          ))}

          {/*
            2-р мөр — col-span-2-аар зүүн 2 баганыг хүлээлгэж,
            МБНБ + 2 sub-pillar-ыг доорх зорилттой газар нь
            байрлуулна. 3-р багана хоосон үлдэх тул Захиргаа санхүү
            аж ахуй нь дээрх мөрөнд бие даан үлдэнэ.
          */}
          <div className="space-y-6 border-t border-border-light pt-8 lg:col-span-2">
            <div className="mx-auto max-w-2xl">
              <ChartNode
                id="hs-pro-teachers"
                label="Мэргэжлийн багш нарын бүлэг"
                level="pillar"
                onSelect={setSelectedId}
                hasStaff={hasStaff('hs-pro-teachers')}
              />
            </div>

            <BranchConnector count={PRO_SUB_PILLARS.length} />

            <div className="grid gap-6 md:grid-cols-2">
              {PRO_SUB_PILLARS.map((p) => (
                <div key={p.id} className="flex flex-col">
                  <ChartNode
                    id={p.id}
                    label={p.title}
                    level="pillar"
                    onSelect={setSelectedId}
                    hasStaff={hasStaff(p.id)}
                  />
                  <UnitTree
                    units={p.units}
                    onSelect={setSelectedId}
                    staffByKey={staffByKey}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="pt-6 text-center text-sm text-text-muted md:text-base">
          {tooltipLabel}
        </p>
      </div>

      {/* Staff modal */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/70 px-4 py-6 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedId(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-card bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label={closeLabel}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-navy-900 backdrop-blur transition-colors hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="max-h-[85vh] overflow-y-auto">
                {selectedList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
                    <p className="text-sm text-text-muted">{emptyLabel}</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border-light">
                    {selectedList.map((p, idx) => (
                      <PersonRow key={`${p.positionKey}-${idx}`} person={p} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PersonRow({ person }: { person: HsStaff }) {
  return (
    <div className="grid gap-0 sm:grid-cols-[auto_1fr]">
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-navy-900 via-[#243454] to-[#1c2745] sm:w-44">
        {person.photo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={person.photo}
            alt={person.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-6xl font-bold text-gold-400/80">
              {person.name.replace(/^[А-Я]\.\s*/, '').charAt(0) || '?'}
            </span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-500 via-[#e8893f] to-[#a4521f]" />
      </div>

      <div className="flex flex-col gap-2 p-5 sm:p-6">
        <h3 className="font-serif text-xl font-bold leading-tight text-navy-900 md:text-2xl">
          {person.name}
        </h3>
        <p className="text-sm font-semibold text-text-body">{person.position}</p>
        {person.degree && (
          <div className="mt-1 flex w-fit items-center gap-2 rounded-button bg-cream-soft px-3 py-1.5">
            <GraduationCap className="h-3.5 w-3.5 shrink-0 text-gold-500" />
            <span className="text-xs font-semibold text-navy-900">{person.degree}</span>
          </div>
        )}
        {person.bio && (
          <p className="mt-1 text-sm leading-relaxed text-text-body">{person.bio}</p>
        )}
        {(person.email || person.phone) && (
          <div className="mt-2 flex flex-wrap gap-3 border-t border-border-light pt-3 text-xs">
            {person.email && (
              <a
                href={`mailto:${person.email}`}
                className="inline-flex items-center gap-1.5 text-navy-900 hover:text-gold-500"
              >
                <Mail className="h-3.5 w-3.5" />
                {person.email}
              </a>
            )}
            {person.phone && (
              <a
                href={`tel:${person.phone.replace(/\D/g, '')}`}
                className="inline-flex items-center gap-1.5 text-navy-900 hover:text-gold-500"
              >
                <Phone className="h-3.5 w-3.5" />
                {person.phone}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
