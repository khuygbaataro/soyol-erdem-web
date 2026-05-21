'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, Mail, Phone, School as SchoolIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/components/system/LocaleProvider';
import type { TranslationKey } from '@/lib/i18n/messages';

/**
 * Соёл Эрдэм Дээд Сургуулийн бүтэц, зохион байгуулалт.
 *
 * Layout (Munkhchimeg's latest reference):
 *
 *                       [Удирдах зөвлөл]
 *                              │
 *                      [Эрдмийн зөвлөл]
 *                              │
 *   [Захиргааны зөвлөл] ─── [Захирал] ─── [Чанарын үнэлгээний алба]
 *                              │
 *      ┌──────────────┬────────┴────────┬──────────────┐
 *   [Сургалт]  [Эрдэмтэн нар.б.]   [Захиргаа]   [Багшийн хөгжил]
 *      ├ Япон судлал    ├ Ахисан түвш.    ├ Санхүү аж ахуй     ├ Гадаад харилц.
 *      ├ МТ танхим      ├ Судалгааны төв  ├ Маркетинг          └ Оюутны зөвлөл
 *      ├ "Хажимэ" ном.
 *      └ Дадлагын бааз
 *
 * Every node is clickable — including the councils and headers — and
 * opens a modal that lists ALL staff assigned to that node (multiple
 * Staff rows can share the same `positionKey`, e.g. board members).
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
 * Fallback staff used when the DB hasn't been seeded yet. Each entry
 * is a SINGLE seed person for the matching positionKey; after admin
 * adds rows via /admin/staff the seed entry gets shadowed and the
 * admin list (which may contain 2-3 people per node) takes over.
 */
const FALLBACK_STAFF: Record<string, Omit<Staff, 'positionKey'>> = {
  board: {
    name: 'Удирдах зөвлөл',
    position: 'Удирдах зөвлөлийн дарга',
    degree: '',
  },
  'academic-council': {
    name: 'Эрдмийн зөвлөл',
    position: 'Эрдмийн зөвлөлийн дарга',
    degree: '',
  },
  'admin-council': {
    name: 'Захиргааны зөвлөл',
    position: 'Захиргааны зөвлөлийн дарга',
    degree: '',
  },
  'quality-office': {
    name: 'Чанарын үнэлгээний алба',
    position: 'Албаны эрхлэгч',
    degree: '',
  },
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
    position: 'Захиргааны эрхлэгч',
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
  finance: {
    name: 'Г. Балжинням',
    position: 'Санхүү, аж ахуйн эрхлэгч',
    degree: 'Магистр (MBA)',
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
  /** Has at least one staff member assigned (for clickable styling). */
  hasStaff?: boolean;
}

function ChartNode({ id, label, level, centered, onSelect, hasStaff }: NodeProps) {
  // Every node with an id is clickable now — admin or fallback staff
  // attach to the node, and the modal handles empty-list gracefully.
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
    centered && 'mx-auto',
    baseStyles[level],
    clickable && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-2 hover:ring-gold-500/60',
    // Faint visual cue when the node has no staff assigned yet —
    // still clickable but the modal will show an empty-state.
    clickable && !hasStaff && 'opacity-90',
  );

  if (clickable) {
    return (
      <button
        type="button"
        onClick={() => onSelect!(id!)}
        className={className}
        aria-label={String(label)}
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
  hasStaff,
}: {
  id?: string;
  children: React.ReactNode;
  onSelect?: (id: string) => void;
  hasStaff?: boolean;
}) {
  return (
    <ChartNode
      id={id}
      label={children}
      level="unit"
      onSelect={onSelect}
      hasStaff={hasStaff}
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
        'mx-auto block',
        dashed
          ? 'w-[1.5px] bg-[image:repeating-linear-gradient(to_bottom,rgba(30,58,95,0.7)_0_4px,transparent_4px_8px)]'
          : 'w-[1.5px] bg-navy-900/70',
      )}
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
  staffByKey: Map<string, Staff[]>;
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
            <UnitNode
              id={u.id}
              onSelect={onSelect}
              hasStaff={u.id ? (staffByKey.get(u.id)?.length ?? 0) > 0 : false}
            >
              {u.label}
            </UnitNode>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Pillar data ─────────────────────────────────────────────── */

interface Pillar {
  id: string;
  titleKey: TranslationKey;
  units: { id?: string; labelKey: TranslationKey }[];
}

const PILLARS: Pillar[] = [
  {
    id: 'academic-affairs',
    titleKey: 'orgchart.pillar.academic',
    units: [
      { id: 'japanese-dept', labelKey: 'orgchart.unit.japaneseDept' },
      { id: 'it-dept', labelKey: 'orgchart.unit.itDept' },
      { id: 'library', labelKey: 'orgchart.unit.library' },
      { id: 'practice', labelKey: 'orgchart.unit.practice' },
    ],
  },
  {
    id: 'scientific-secretary',
    titleKey: 'orgchart.pillar.scientific',
    units: [
      { id: 'graduate-studies', labelKey: 'orgchart.unit.graduateStudies' },
      { id: 'research-center', labelKey: 'orgchart.unit.researchCenter' },
    ],
  },
  {
    id: 'admin-finance',
    titleKey: 'orgchart.pillar.admin',
    units: [
      // Munkhchimeg-ийн зурганд "Захиргаа" багана дотор Архив биш —
      // "Санхүү аж ахуй" + "Маркетингийн алба" хоёр л үлдсэн.
      { id: 'finance', labelKey: 'orgchart.unit.finance' },
      { id: 'marketing', labelKey: 'orgchart.unit.marketing' },
    ],
  },
  {
    id: 'faculty-development',
    titleKey: 'orgchart.pillar.facultyDev',
    units: [
      { id: 'foreign-relations', labelKey: 'orgchart.unit.foreignRelations' },
      { id: 'student-council', labelKey: 'orgchart.unit.studentCouncil' },
    ],
  },
];

/* ─── Component ───────────────────────────────────────────────── */

interface OrgChartProps {
  staff?: Staff[];
}

export function OrgChart({ staff }: OrgChartProps = {}) {
  const t = useTranslation();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Build `Map<positionKey, Staff[]>` — multiple staff per key so a
  // single node can host 2-3 people. Admin rows take priority over
  // FALLBACK_STAFF: if admin has even one row for a key, the seed
  // entry is shadowed.
  const staffByKey = useMemo(() => {
    const m = new Map<string, Staff[]>();
    const adminKeysSeen = new Set<string>();
    for (const s of staff ?? []) {
      if (s.active === false) continue;
      adminKeysSeen.add(s.positionKey);
      const list = m.get(s.positionKey) ?? [];
      list.push(s);
      m.set(s.positionKey, list);
    }
    for (const [key, value] of Object.entries(FALLBACK_STAFF)) {
      if (!adminKeysSeen.has(key)) {
        m.set(key, [{ positionKey: key, ...value }]);
      }
    }
    return m;
  }, [staff]);

  const selectedList = selectedId ? staffByKey.get(selectedId) ?? [] : [];

  // Lock body scroll while modal open + ESC key handler
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

  return (
    <>
      <div className="space-y-6">
        {/* Row 1 — Удирдах зөвлөл (centre) + НЕБ-ын Соёл Эрдэм сургууль (right peer) */}
        <div className="flex flex-col items-center">
          <div className="flex w-full items-center justify-center gap-0 sm:gap-3">
            <div className="hidden flex-1 sm:block" />
            <ChartNode
              id="board"
              label={t('orgchart.board')}
              level="top"
              onSelect={setSelectedId}
              hasStaff={hasStaff('board')}
            />
            <div className="hidden flex-1 items-center sm:flex">
              <SiblingConnector />
              <SiblingNode>
                {t('orgchart.affiliatedLine1')}
                <br />
                {t('orgchart.affiliatedLine2')}
              </SiblingNode>
            </div>
          </div>

          <div className="mt-4 flex justify-center sm:hidden">
            <SiblingNode>
              {t('orgchart.affiliatedLine1')}
              <br />
              {t('orgchart.affiliatedLine2')}
            </SiblingNode>
          </div>

          <Connector height={6} />

          {/* Row 2 — Эрдмийн зөвлөл (single, centered under Board) */}
          <ChartNode
            id="academic-council"
            label={t('orgchart.academicCouncil')}
            level="mid"
            onSelect={setSelectedId}
            hasStaff={hasStaff('academic-council')}
          />

          <Connector height={6} />

          {/* Row 3 — Захиргааны зөвлөл ← ЗАХИРАЛ → Чанарын үнэлгээний алба */}
          <div className="flex w-full max-w-4xl items-center justify-center gap-0 sm:gap-3">
            <div className="hidden flex-1 items-center justify-end sm:flex">
              <ChartNode
                id="admin-council"
                label={t('orgchart.adminCouncil')}
                level="mid"
                onSelect={setSelectedId}
                hasStaff={hasStaff('admin-council')}
              />
              <SiblingConnector />
            </div>
            <ChartNode
              id="rector"
              label={t('orgchart.rector')}
              level="director"
              onSelect={setSelectedId}
              hasStaff={hasStaff('rector')}
            />
            <div className="hidden flex-1 items-center sm:flex">
              <SiblingConnector />
              <ChartNode
                id="quality-office"
                label={t('orgchart.qualityOffice')}
                level="mid"
                onSelect={setSelectedId}
                hasStaff={hasStaff('quality-office')}
              />
            </div>
          </div>

          {/* mobile-only sibling stack */}
          <div className="mt-4 flex flex-col items-center gap-2 sm:hidden">
            <ChartNode
              id="admin-council"
              label={t('orgchart.adminCouncil')}
              level="mid"
              onSelect={setSelectedId}
              hasStaff={hasStaff('admin-council')}
            />
            <ChartNode
              id="quality-office"
              label={t('orgchart.qualityOffice')}
              level="mid"
              onSelect={setSelectedId}
              hasStaff={hasStaff('quality-office')}
            />
          </div>
        </div>

        {/* Branching connector — 3-row → 4 pillars */}
        <BranchConnector count={4} />

        {/* Row 4 — 4 pillar columns, each with its tree of units */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.id} className="flex flex-col">
              <ChartNode
                id={p.id}
                label={t(p.titleKey)}
                level="pillar"
                onSelect={setSelectedId}
                hasStaff={hasStaff(p.id)}
              />
              <UnitTree
                units={p.units.map((u) => ({ id: u.id, label: t(u.labelKey) }))}
                onSelect={setSelectedId}
                staffByKey={staffByKey}
              />
            </div>
          ))}
        </div>

        <p className="pt-6 text-center text-sm text-text-muted md:text-base">
          {t('orgchart.tooltip')}
        </p>
      </div>

      {/* Staff modal — lists ALL staff assigned to the selected node */}
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
                aria-label={t('common.close')}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-navy-900 backdrop-blur transition-colors hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="max-h-[85vh] overflow-y-auto">
                {selectedList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
                    <p className="text-sm text-text-muted">
                      Энэ хэсэгт одоогоор ажилтан бүртгэгдээгүй байна.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-border-light">
                    {selectedList.map((person, idx) => (
                      <PersonRow key={`${person.positionKey}-${idx}`} person={person} t={t} />
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

/** Single staff row inside the modal — repeats per person at the node. */
function PersonRow({ person, t }: { person: Staff; t: (k: TranslationKey) => string }) {
  void t;
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
