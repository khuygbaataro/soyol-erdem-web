'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, Mail, Phone, School as SchoolIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Соёл Эрдэм Дээд Сургуулийн бүтэц, зохион байгуулалт.
 *
 * Visual reference: classic university org-chart (rounded navy cards
 * connected by dashed lines, top → bottom). Each clickable card opens an
 * animated modal showing the staff member's photo, name and degree.
 *
 * Staff data is fetched server-side from the `Staff` model and passed in
 * via the `staff` prop. The hard-coded FALLBACK_STAFF below acts as a
 * safety net for development / first-time deploys before the DB is seeded.
 */

export interface Staff {
  /** Chart-node identifier — matches the OrgChart node id. */
  positionKey: string;
  /** Full name, e.g. "Т. Дорждагва". */
  name: string;
  /** Job title rendered above the name in the modal. */
  position: string;
  /** "Бакалавр", "Магистр (MS)", "Доктор (PhD)", … */
  degree?: string | null;
  /** Public/CDN photo URL. Falls back to an initial avatar when empty. */
  photo?: string | null;
  /** Optional short biography for the modal body. */
  bio?: string | null;
  /** Optional contact details rendered in the modal footer. */
  email?: string | null;
  phone?: string | null;
  active?: boolean;
}

/**
 * Fallback staff used when the DB hasn't been seeded yet. After
 * `npm run db:seed` runs against a fresh install these get replaced by
 * the editable Staff rows.
 */
const FALLBACK_STAFF: Record<string, Omit<Staff, 'positionKey'>> = {
  rector: {
    name: 'Т. Дорждагва',
    position: 'Захирал',
    degree: 'Доктор (PhD), Дэд профессор',
    bio: 'Соёл Эрдэм Дээд Сургуулийн захирлаар олон жил ажиллаж буй, япон судлалын чиглэлээр докторын зэрэг хамгаалсан судлаач.',
  },
  'academic-affairs': {
    name: 'Ц. Цэвэгсүрэн',
    position: 'Сургалтын албаны эрхлэгч',
    degree: 'Магистр (MS)',
    bio: 'Сургалтын чанар, шинэчлэлийн чиглэлээр 10+ жил ажилласан мэргэжилтэн.',
  },
  'scientific-secretary': {
    name: 'Б. Мөнхзул',
    position: 'Эрдэмтэн нарийн бичгийн дарга',
    degree: 'Доктор (PhD)',
    bio: 'Эрдэм шинжилгээний бодлого, ахисан түвшний хөтөлбөрийн координатор.',
  },
  'admin-finance': {
    name: 'Г. Балжинням',
    position: 'Захиргаа, санхүү, аж ахуйн эрхлэгч',
    degree: 'Магистр (MBA)',
    bio: 'Санхүү, аж ахуйн менежментийн чиглэлээр магистрын зэрэгтэй.',
  },
  'faculty-development': {
    name: 'Р. Бямбаа',
    position: 'Багшийн хөгжлийн төвийн эрхлэгч',
    degree: 'Доктор (PhD)',
    bio: 'Сурган хүмүүжүүлэх ухаан, багш хөгжлийн арга зүйн чиглэлээр судлаач.',
  },
  'japanese-dept': {
    name: 'С. Уранцэцэг',
    position: 'Япон судлалын тэнхимийн эрхлэгч',
    degree: 'Магистр (MA)',
  },
  'it-dept': {
    name: 'О. Цолмон',
    position: 'Мэдээллийн технологийн тэнхимийн эрхлэгч',
    degree: 'Магистр (MS)',
  },
  library: {
    name: 'Д. Сарантуяа',
    position: '"Хажимэ" номын сангийн эрхлэгч',
    degree: 'Бакалавр (BA)',
  },
  practice: {
    name: 'Л. Эрдэнэбат',
    position: 'Дадлагын баазын ахлах мэргэжилтэн',
    degree: 'Магистр (MS)',
  },
  'graduate-studies': {
    name: 'Ч. Энхболд',
    position: 'Ахисан түвшний сургалтын алба',
    degree: 'Доктор (PhD)',
  },
  'research-center': {
    name: 'Ж. Гомбо-Очир',
    position: 'Судалгааны төвийн эрхлэгч',
    degree: 'Доктор (PhD), Профессор',
  },
  archive: {
    name: 'Н. Болормаа',
    position: 'Архивын ахлах ажилтан',
    degree: 'Бакалавр (BA)',
  },
  marketing: {
    name: 'Б. Оюун',
    position: 'Маркетингийн алба',
    degree: 'Магистр (MBA)',
  },
  'foreign-relations': {
    name: 'У. Энхтуяа',
    position: 'Гадаад харилцааны албаны эрхлэгч',
    degree: 'Магистр (MA)',
  },
  'student-council': {
    name: 'Сонгогдсон тэргүүн',
    position: 'Оюутны зөвлөл',
    degree: 'Оюутан удирдагч',
  },
};

interface NodeProps {
  id?: string;
  label: React.ReactNode;
  level: 'top' | 'director' | 'mid' | 'pillar' | 'unit';
  centered?: boolean;
  onSelect?: (id: string) => void;
  /** Staff map indexed by positionKey; nodes without an entry stay non-clickable. */
  staffMap?: Map<string, Staff>;
}

function ChartNode({ id, label, level, centered, onSelect, staffMap }: NodeProps) {
  const staff = id ? staffMap?.get(id) : undefined;
  const clickable = !!staff && !!onSelect;

  const baseStyles = {
    top: 'bg-navy-900 text-white px-6 py-3 text-sm font-bold uppercase tracking-wider',
    director:
      'bg-gold-500 text-navy-900 px-6 py-3 text-sm font-bold uppercase tracking-wider ring-2 ring-gold-500/40',
    mid: 'bg-navy-900 text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide',
    pillar: 'bg-navy-900 text-white px-4 py-3 text-xs font-bold uppercase tracking-wide text-center',
    unit: 'bg-white text-navy-900 border border-border-light px-4 py-2.5 text-sm',
  } as const;

  const className = cn(
    'inline-flex items-center justify-center rounded-md text-center shadow-card transition-all duration-200',
    centered && 'mx-auto',
    baseStyles[level],
    clickable && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-2 hover:ring-gold-500/60',
  );

  if (clickable) {
    return (
      <button
        type="button"
        onClick={() => onSelect!(id!)}
        className={className}
        aria-label={`${staff.position} — ${staff.name}`}
      >
        {label}
      </button>
    );
  }
  return <div className={className}>{label}</div>;
}

function UnitNode({
  id,
  children,
  onSelect,
  staffMap,
}: {
  id?: string;
  children: React.ReactNode;
  onSelect?: (id: string) => void;
  staffMap?: Map<string, Staff>;
}) {
  return (
    <ChartNode
      id={id}
      label={children}
      level="unit"
      onSelect={onSelect}
      staffMap={staffMap}
    />
  );
}

function SiblingNode({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-start gap-2 rounded-md border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-xs font-semibold leading-snug text-navy-900 shadow-card">
      <SchoolIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
      <span>{children}</span>
    </div>
  );
}

function Connector({ dashed = true, height = 6 }: { dashed?: boolean; height?: number }) {
  return (
    <span
      aria-hidden
      className={cn(
        'mx-auto block w-px',
        dashed
          ? 'bg-[image:repeating-linear-gradient(to_bottom,rgba(30,58,95,0.5)_0_3px,transparent_3px_7px)]'
          : 'bg-navy-900/35',
      )}
      style={{ height: `${height * 4}px` }}
    />
  );
}

/**
 * Horizontal sibling connector — the "left arm" or "right arm" of a node
 * that pairs with a peer beside it. Drawn as a flat horizontal navy rule
 * sitting in a flex row between two nodes.
 */
function SiblingConnector() {
  return (
    <span
      aria-hidden
      className="block h-px flex-1 bg-navy-900/35"
    />
  );
}

/**
 * Branching connector — an inverted-T that drops a vertical line from the
 * parent, runs a horizontal rule across N children, then drops short
 * vertical lines down to each child. Used between Чанарын үнэлгээний
 * алба and the four pillar columns at the bottom of the chart.
 */
function BranchConnector({ count }: { count: number }) {
  return (
    <div aria-hidden className="relative mx-auto mb-2 w-full" style={{ height: '32px' }}>
      {/* Top vertical — parent → horizontal bar */}
      <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-navy-900/40" />
      {/* Horizontal bar across the columns */}
      <span
        className="absolute left-0 right-0 top-3 h-px bg-navy-900/40"
        style={{
          left: `calc(${100 / (count * 2)}% )`,
          right: `calc(${100 / (count * 2)}% )`,
        }}
      />
      {/* Vertical drops down to each column */}
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute top-3 h-5 w-px bg-navy-900/40"
          style={{ left: `calc(${(100 / count) * (i + 0.5)}%)` }}
        />
      ))}
    </div>
  );
}

/* ─── Pillar data ─────────────────────────────────────────────── */

interface Pillar {
  id: string;
  title: string;
  units: { id?: string; label: string }[];
}

const PILLARS: Pillar[] = [
  {
    id: 'academic-affairs',
    title: 'Сургалтын алба',
    units: [
      { id: 'japanese-dept', label: 'Япон судлалын тэнхим' },
      { id: 'it-dept', label: 'Мэдээллийн технологийн тэнхим' },
      { id: 'library', label: '"Хажимэ" номын сан' },
      { id: 'practice', label: 'Дадлагын бааз' },
    ],
  },
  {
    id: 'scientific-secretary',
    title: 'Эрдэмтэн нарийн бичгийн дарга',
    units: [
      { id: 'graduate-studies', label: 'Ахисан түвшний сургалтын алба' },
      { id: 'research-center', label: 'Судалгааны төв' },
    ],
  },
  {
    id: 'admin-finance',
    title: 'Захиргаа, Санхүү, аж ахуй',
    units: [
      { id: 'archive', label: 'Архив' },
      { id: 'marketing', label: 'Маркетингийн алба' },
    ],
  },
  {
    id: 'faculty-development',
    title: 'Багшийн хөгжлийн төв',
    units: [
      { id: 'foreign-relations', label: 'Гадаад харилцааны алба' },
      { id: 'student-council', label: 'Оюутны зөвлөл' },
    ],
  },
];

/* ─── Component ───────────────────────────────────────────────── */

interface OrgChartProps {
  /** Staff list fetched server-side; falls back to FALLBACK_STAFF when empty. */
  staff?: Staff[];
}

export function OrgChart({ staff }: OrgChartProps = {}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Build a key-indexed map. Admin rows take priority; any position the
  // admin hasn't filled yet falls back to the hard-coded sample so the
  // chart never has empty nodes.
  const staffMap = useMemo(() => {
    const m = new Map<string, Staff>();
    // Fallback first
    for (const [key, value] of Object.entries(FALLBACK_STAFF)) {
      m.set(key, { positionKey: key, ...value });
    }
    // Admin overrides — only `active` rows surface on the chart
    for (const s of staff ?? []) {
      if (s.active === false) {
        m.delete(s.positionKey);
        continue;
      }
      m.set(s.positionKey, s);
    }
    return m;
  }, [staff]);

  const selected = selectedId ? staffMap.get(selectedId) ?? null : null;

  // Lock body scroll while modal open + ESC key handler
  useEffect(() => {
    if (!selected) return;
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
  }, [selected]);

  return (
    <>
      <div className="space-y-6">
        {/* Row 1 — Удирдах зөвлөл (centre) + НЕБ-ын Соёл Эрдэм сургууль (right peer) */}
        <div className="flex flex-col items-center">
          <div className="flex w-full items-center justify-center gap-0 sm:gap-3">
            <div className="hidden flex-1 sm:block" />
            <ChartNode label="УДИРДАХ ЗӨВЛӨЛ" level="top" />
            <div className="hidden flex-1 items-center sm:flex">
              <SiblingConnector />
              <SiblingNode>
                Нийслэлийн Ерөнхий Боловсролын
                <br />
                Соёл Эрдэм сургууль (ЕБС)
              </SiblingNode>
            </div>
          </div>

          {/* mobile-only sibling card under the parent */}
          <div className="mt-4 flex justify-center sm:hidden">
            <SiblingNode>
              Нийслэлийн Ерөнхий Боловсролын
              <br />
              Соёл Эрдэм сургууль (ЕБС)
            </SiblingNode>
          </div>

          <Connector height={6} />

          {/* Row 2 — Эрдмийн Зөвлөл ← ЗАХИРАЛ → Захиргааны Зөвлөл (three siblings) */}
          <div className="flex w-full max-w-4xl items-center justify-center gap-0 sm:gap-3">
            <div className="hidden flex-1 items-center justify-end sm:flex">
              <ChartNode label="Эрдмийн зөвлөл" level="mid" />
              <SiblingConnector />
            </div>
            <ChartNode
              id="rector"
              label="ЗАХИРАЛ"
              level="director"
              onSelect={setSelectedId}
              staffMap={staffMap}
            />
            <div className="hidden flex-1 items-center sm:flex">
              <SiblingConnector />
              <ChartNode label="Захиргааны зөвлөл" level="mid" />
            </div>
          </div>

          {/* mobile-only sibling stack */}
          <div className="mt-4 flex flex-col items-center gap-2 sm:hidden">
            <ChartNode label="Эрдмийн зөвлөл" level="mid" />
            <ChartNode label="Захиргааны зөвлөл" level="mid" />
          </div>

          <Connector height={6} />

          {/* Row 3 — Чанарын үнэлгээний алба */}
          <ChartNode label="Чанарын үнэлгээний алба" level="mid" />
        </div>

        {/* Branching connector — Чанарын алба → 4 pillars */}
        <BranchConnector count={4} />

        {/* Row 4 — 4 pillar columns */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.id} className="flex flex-col">
              <ChartNode
                id={p.id}
                label={p.title}
                level="pillar"
                onSelect={setSelectedId}
                staffMap={staffMap}
              />
              <span aria-hidden className="mx-auto h-4 w-px bg-navy-900/40" />
              <ul className="space-y-2">
                {p.units.map((u) => (
                  <li key={u.label}>
                    <UnitNode id={u.id} onSelect={setSelectedId} staffMap={staffMap}>
                      {u.label}
                    </UnitNode>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="pt-4 text-center text-xs text-text-muted">
          💡 Цэнхэр болон цагаан картан дээр дарж тухайн ажилтны мэдээлэлтэй
          танилцаарай.
        </p>
      </div>

      {/* Staff modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
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
              className="relative w-full max-w-2xl overflow-hidden rounded-card bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
            >
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Хаах"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-navy-900 backdrop-blur transition-colors hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid gap-0 sm:grid-cols-[auto_1fr]">
                {/* Photo / initial avatar */}
                <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-navy-900 via-[#243454] to-[#1c2745] sm:w-56">
                  {selected.photo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={selected.photo}
                      alt={selected.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-serif text-7xl font-bold text-gold-400/80">
                        {selected.name.replace(/^[А-Я]\.\s*/, '').charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-500 via-[#e8893f] to-[#a4521f]" />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-3 p-6 sm:p-8">
                  <h2 className="font-serif text-2xl font-bold leading-tight text-navy-900 md:text-3xl">
                    {selected.name}
                  </h2>
                  <p className="text-sm font-semibold text-text-body">
                    {selected.position}
                  </p>

                  {selected.degree && (
                    <div className="mt-1 flex items-center gap-2 rounded-button bg-cream-soft px-3 py-2">
                      <GraduationCap className="h-4 w-4 shrink-0 text-gold-500" />
                      <span className="text-sm font-semibold text-navy-900">
                        {selected.degree}
                      </span>
                    </div>
                  )}

                  {selected.bio && (
                    <p className="mt-2 text-sm leading-relaxed text-text-body">
                      {selected.bio}
                    </p>
                  )}

                  {(selected.email || selected.phone) && (
                    <div className="mt-4 flex flex-wrap gap-3 border-t border-border-light pt-4 text-sm">
                      {selected.email && (
                        <a
                          href={`mailto:${selected.email}`}
                          className="inline-flex items-center gap-1.5 text-navy-900 hover:text-gold-500"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          {selected.email}
                        </a>
                      )}
                      {selected.phone && (
                        <a
                          href={`tel:${selected.phone.replace(/\D/g, '')}`}
                          className="inline-flex items-center gap-1.5 text-navy-900 hover:text-gold-500"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {selected.phone}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
