'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, Mail, Phone, School as SchoolIcon, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Соёл Эрдэм Дээд Сургуулийн бүтэц, зохион байгуулалт.
 *
 * Visual reference: classic university org-chart (rounded navy cards
 * connected by dashed lines, top → bottom). Each clickable card opens an
 * animated modal showing the staff member's photo, name and degree.
 *
 * Staff data is currently hard-coded — when admin CRUD for staff is added
 * later, swap STAFF for a fetched record.
 */

interface Staff {
  /** Full name, e.g. "Т. Дорждагва". */
  name: string;
  /** Job title rendered above the name in the modal. */
  position: string;
  /** "Бакалавр", "Магистр (MS)", "Доктор (PhD)", … */
  degree?: string;
  /** Public/CDN photo URL. Falls back to an initial avatar when empty. */
  photo?: string;
  /** Optional short biography for the modal body. */
  bio?: string;
  /** Optional contact details rendered in the modal footer. */
  email?: string;
  phone?: string;
}

/**
 * Mapping from a chart-node id → staff member. Add more entries here as
 * positions get filled. Nodes without an entry render as non-interactive
 * boxes (used for collective bodies like УДИРДАХ ЗӨВЛӨЛ).
 */
const STAFF: Record<string, Staff> = {
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
}

function ChartNode({ id, label, level, centered, onSelect }: NodeProps) {
  const staff = id ? STAFF[id] : undefined;
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
}: {
  id?: string;
  children: React.ReactNode;
  onSelect?: (id: string) => void;
}) {
  return <ChartNode id={id} label={children} level="unit" onSelect={onSelect} />;
}

function SiblingNode({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-start gap-2 rounded-md border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-xs font-semibold leading-snug text-navy-900 shadow-card">
      <SchoolIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
      <span>{children}</span>
    </div>
  );
}

function Connector({ dashed = true }: { dashed?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'my-2 block h-6 w-px',
        dashed
          ? 'bg-[image:repeating-linear-gradient(to_bottom,rgba(30,58,95,0.4)_0_3px,transparent_3px_8px)]'
          : 'bg-navy-900/30',
      )}
    />
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

export function OrgChart() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? STAFF[selectedId] : null;

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
      <div className="space-y-10">
        {/* Top row — Удирдах зөвлөл + sibling high-school card */}
        <div className="flex flex-col items-center">
          <div className="grid w-full gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="hidden sm:block" />
            <ChartNode label="УДИРДАХ ЗӨВЛӨЛ" level="top" centered />
            <div className="mt-4 flex justify-center sm:mt-0 sm:justify-start">
              <SiblingNode>
                Нийслэлийн Ерөнхий Боловсролын
                <br />
                Соёл Эрдэм сургууль (ЕБС)
              </SiblingNode>
            </div>
          </div>

          <Connector />

          <ChartNode label="ЭРДМИЙН ЗӨВЛӨЛ" level="top" />

          <Connector />

          {/* Three-up: Захиргааны зөвлөл / Захирал / Чанарын үнэлгээний алба */}
          <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
            <ChartNode label="Захиргааны зөвлөл" level="mid" />
            <ChartNode
              id="rector"
              label="ЗАХИРАЛ"
              level="director"
              onSelect={setSelectedId}
            />
            <ChartNode label="Чанарын үнэлгээний алба" level="mid" />
          </div>

          <Connector />
        </div>

        {/* Bottom — 4 pillar columns */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.id} className="flex flex-col">
              <ChartNode
                id={p.id}
                label={p.title}
                level="pillar"
                onSelect={setSelectedId}
              />
              <span aria-hidden className="mx-auto h-4 w-px bg-navy-900/30" />
              <ul className="space-y-2">
                {p.units.map((u) => (
                  <li key={u.label}>
                    <UnitNode id={u.id} onSelect={setSelectedId}>
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
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-600">
                    <User className="h-3 w-3" />
                    Ажилтан
                  </span>

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
