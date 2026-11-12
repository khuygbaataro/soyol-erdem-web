'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, Mail, Phone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { montserrat } from '@/lib/fonts';
import { useTranslation } from '@/components/system/LocaleProvider';
import type { TranslationKey } from '@/lib/i18n/messages';

/**
 * Соёл Эрдэм Дээд Сургуулийн бүтэц, зохион байгуулалт ("Бүтэц 2026").
 *
 * Layout (reference):
 *
 *                              [Удирдах Зөвлөл]
 *                                     │
 *              [Эрдмийн Зөвлөл] ── [Захирал]
 *                                     │
 *       [Чанарын үнэлгээний алба] ────┼──── [Захиргааны Зөвлөл]
 *                                     │
 *        ┌────────────────────────────┼──────────┬────────┬────────┬───────┐
 *  [Сургалтын алба]        [Эрдэм шинжилгээ    [Захиргаа, [Багшийн [Марке- [Архив]
 *   │  │  │  │  │           хамтын ажиллагаа]   Санхүү,    хөгжлийн тингийн
 *  Япон МТ Хажимэ Дадлага Оюутны  │  │  │  │    аж ахуй]   төв]     алба]
 *                          Ахисан ЭНБД Судалгаа Гадаад
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

/* ─── Chart geometry ──────────────────────────────────────────────
 * Mirrors the "Бүтэц 2026" slide. The bottom tier is a 13-column grid:
 * 5 Сургалтын алба units, 4 Эрдэм шинжилгээ units, then 4 stand-alone
 * units hung straight off the bus. Everything above hangs off one
 * spine running from Удирдах Зөвлөл down into Эрдэм шинжилгээ, хамтын
 * ажиллагаа. Values are px on a fixed canvas; narrow screens scroll it.
 */

const COL_W = 56;
const COL_GAP = 18;
const COLS = 13;

const colLeft = (i: number) => i * (COL_W + COL_GAP);
const colCenter = (i: number) => colLeft(i) + COL_W / 2;
const spanWidth = (first: number, last: number) => colLeft(last) + COL_W - colLeft(first);
const spanCenter = (first: number, last: number) => colLeft(first) + spanWidth(first, last) / 2;

const TRAINING_COLS = [0, 1, 2, 3, 4];
const RESEARCH_COLS = [5, 6, 7, 8];
const STANDALONE_COLS = [9, 10, 11, 12];

const BOX_H = 48;
const HEAD_H = 60;
const VERT_H = 230;

const ROW_BOARD = 0;
const ROW_RECTOR = 84;
const ROW_STAFF = 168;
const BUS_Y = 244;
const ROW_HEAD = 268;
const ROW_CHILD = ROW_HEAD + HEAD_H + 24;

const CANVAS_W = spanWidth(0, COLS - 1);
const CANVAS_H = ROW_CHILD + VERT_H;

const SPINE_X = spanCenter(5, 8);
const TRAINING_X = spanCenter(0, 4);

const BOARD = { x: SPINE_X - 120, w: 240 };
const RECTOR = { x: SPINE_X - 100, w: 200 };
const ACADEMIC_COUNCIL = { x: RECTOR.x - 56 - 220, w: 220 };
const QUALITY = { x: SPINE_X - 48 - 280, w: 280 };
const ADMIN_COUNCIL = { x: SPINE_X + 48, w: 280 };

type Variant = 'top' | 'director' | 'mid' | 'head' | 'unit';

interface ChartBox {
  id: string;
  labelKey: TranslationKey;
  variant: Variant;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Tall, narrow box with bottom-to-top text (rotated units on the slide). */
  vertical?: boolean;
}

const TRAINING_UNITS: { id: string; labelKey: TranslationKey }[] = [
  { id: 'japanese-dept', labelKey: 'orgchart.unit.japaneseDept' },
  { id: 'it-dept', labelKey: 'orgchart.unit.itDept' },
  { id: 'library', labelKey: 'orgchart.unit.library' },
  { id: 'practice', labelKey: 'orgchart.unit.practice' },
  { id: 'student-council', labelKey: 'orgchart.unit.studentCouncil' },
];

const RESEARCH_UNITS: { id: string; labelKey: TranslationKey }[] = [
  { id: 'graduate-studies', labelKey: 'orgchart.unit.graduateStudies' },
  { id: 'scientific-secretary', labelKey: 'orgchart.pillar.scientific' },
  { id: 'research-center', labelKey: 'orgchart.unit.researchCenter' },
  { id: 'foreign-relations', labelKey: 'orgchart.unit.foreignRelations' },
];

const STANDALONE_UNITS: { id: string; labelKey: TranslationKey }[] = [
  { id: 'admin-finance', labelKey: 'orgchart.pillar.admin' },
  { id: 'faculty-development', labelKey: 'orgchart.pillar.facultyDev' },
  { id: 'marketing', labelKey: 'orgchart.unit.marketing' },
  { id: 'archive', labelKey: 'orgchart.unit.archive' },
];

const BOXES: ChartBox[] = [
  { id: 'board', labelKey: 'orgchart.board', variant: 'top', x: BOARD.x, y: ROW_BOARD, w: BOARD.w, h: BOX_H },
  {
    id: 'academic-council',
    labelKey: 'orgchart.academicCouncil',
    variant: 'mid',
    x: ACADEMIC_COUNCIL.x,
    y: ROW_RECTOR,
    w: ACADEMIC_COUNCIL.w,
    h: BOX_H,
  },
  { id: 'rector', labelKey: 'orgchart.rector', variant: 'director', x: RECTOR.x, y: ROW_RECTOR, w: RECTOR.w, h: BOX_H },
  { id: 'quality-office', labelKey: 'orgchart.qualityOffice', variant: 'mid', x: QUALITY.x, y: ROW_STAFF, w: QUALITY.w, h: BOX_H },
  {
    id: 'admin-council',
    labelKey: 'orgchart.adminCouncil',
    variant: 'mid',
    x: ADMIN_COUNCIL.x,
    y: ROW_STAFF,
    w: ADMIN_COUNCIL.w,
    h: BOX_H,
  },
  {
    id: 'academic-affairs',
    labelKey: 'orgchart.pillar.academic',
    variant: 'head',
    x: colLeft(0),
    y: ROW_HEAD,
    w: spanWidth(0, 4),
    h: HEAD_H,
  },
  {
    id: 'research-cooperation',
    labelKey: 'orgchart.pillar.research',
    variant: 'head',
    x: colLeft(5),
    y: ROW_HEAD,
    w: spanWidth(5, 8),
    h: HEAD_H,
  },
  ...TRAINING_UNITS.map((u, i) => ({
    ...u,
    variant: 'unit' as const,
    vertical: true,
    x: colLeft(TRAINING_COLS[i]),
    y: ROW_CHILD,
    w: COL_W,
    h: VERT_H,
  })),
  ...RESEARCH_UNITS.map((u, i) => ({
    ...u,
    variant: 'unit' as const,
    vertical: true,
    x: colLeft(RESEARCH_COLS[i]),
    y: ROW_CHILD,
    w: COL_W,
    h: VERT_H,
  })),
  ...STANDALONE_UNITS.map((u, i) => ({
    ...u,
    variant: 'unit' as const,
    vertical: true,
    x: colLeft(STANDALONE_COLS[i]),
    y: ROW_HEAD,
    w: COL_W,
    h: VERT_H,
  })),
];

/** Connector segments as [x1, y1, x2, y2]. */
const LINES: Array<[number, number, number, number]> = [
  // Spine: Удирдах Зөвлөл → Захирал → Эрдэм шинжилгээ, хамтын ажиллагаа
  [SPINE_X, ROW_BOARD + BOX_H, SPINE_X, ROW_RECTOR],
  [SPINE_X, ROW_RECTOR + BOX_H, SPINE_X, ROW_HEAD],
  // Эрдмийн Зөвлөл ── Захирал
  [ACADEMIC_COUNCIL.x + ACADEMIC_COUNCIL.w, ROW_RECTOR + BOX_H / 2, RECTOR.x, ROW_RECTOR + BOX_H / 2],
  // Чанарын үнэлгээний алба ──┼── Захиргааны Зөвлөл
  [QUALITY.x + QUALITY.w, ROW_STAFF + BOX_H / 2, ADMIN_COUNCIL.x, ROW_STAFF + BOX_H / 2],
  // Bus across the second tier
  [TRAINING_X, BUS_Y, colCenter(STANDALONE_COLS[STANDALONE_COLS.length - 1]), BUS_Y],
  [TRAINING_X, BUS_Y, TRAINING_X, ROW_HEAD],
  ...STANDALONE_COLS.map(
    (c) => [colCenter(c), BUS_Y, colCenter(c), ROW_HEAD] as [number, number, number, number],
  ),
  // Stubs from each division head down to its units
  ...[...TRAINING_COLS, ...RESEARCH_COLS].map(
    (c) => [colCenter(c), ROW_HEAD + HEAD_H, colCenter(c), ROW_CHILD] as [number, number, number, number],
  ),
];

// Labels use the site's heading face (Montserrat, `font-serif`). Only the
// two top boxes stay in capitals; everything else reads in sentence case
// at a size that holds up on the canvas.
const VARIANT_STYLES: Record<Variant, string> = {
  top: 'bg-navy-900 text-white px-6 text-[15px] font-bold uppercase tracking-[0.06em]',
  director: 'bg-gold-500 text-navy-900 px-6 text-[15px] font-bold uppercase tracking-[0.06em] ring-2 ring-gold-500/40',
  mid: 'bg-navy-900 text-white px-5 text-[15px] font-semibold',
  head: 'bg-white text-navy-900 border border-navy-900/30 px-4 text-base font-bold leading-snug',
  unit: 'bg-white text-navy-900 border border-border-light px-1.5 py-3 text-sm font-medium leading-snug',
};

function ChartNode({
  box,
  label,
  onSelect,
  hasStaff,
}: {
  box: ChartBox;
  label: string;
  onSelect: (id: string) => void;
  hasStaff: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(box.id)}
      aria-label={label.replace(/\n/g, ' ')}
      style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
      className={cn(
        'absolute flex cursor-pointer items-center justify-center rounded-md text-center font-serif shadow-card transition-all duration-200',
        'hover:-translate-y-0.5 hover:shadow-card-hover hover:ring-2 hover:ring-gold-500/60',
        VARIANT_STYLES[box.variant],
        // Faint visual cue when the node has no staff assigned yet —
        // still clickable but the modal will show an empty-state.
        !hasStaff && 'opacity-90',
      )}
    >
      {box.vertical ? (
        <span className="max-h-full rotate-180 [writing-mode:vertical-rl]">{label}</span>
      ) : (
        <span className="whitespace-pre-line">{label}</span>
      )}
    </button>
  );
}

/* ─── Component ───────────────────────────────────────────────── */

interface OrgChartProps {
  staff?: Staff[];
}

export function OrgChart({ staff }: OrgChartProps = {}) {
  const t = useTranslation();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  // On narrow screens the canvas scrolls sideways — start it centred on
  // the spine so Удирдах Зөвлөл / Захирал are in view first.
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      el.scrollLeft = SPINE_X - el.clientWidth / 2;
    }
  }, []);

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
        <div ref={scrollRef} className="-mx-4 overflow-x-auto px-4 pb-4 pt-1 md:mx-0 md:px-0">
          {/* Re-declares --font-serif here: the `:root` fallback in
              globals.css overrides next/font's value on <html>, so without
              this the labels fall back to the system sans. */}
          <div
            className={cn('relative mx-auto', montserrat.variable)}
            style={{ width: CANVAS_W, height: CANVAS_H }}
          >
            <svg
              aria-hidden
              className="absolute inset-0 text-navy-900/70"
              width={CANVAS_W}
              height={CANVAS_H}
            >
              {LINES.map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={1.5} />
              ))}
            </svg>
            {BOXES.map((box) => (
              <ChartNode
                key={box.id}
                box={box}
                label={t(box.labelKey)}
                onSelect={setSelectedId}
                hasStaff={hasStaff(box.id)}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-text-muted lg:hidden">{t('orgchart.scrollHint')}</p>
        <p className="text-center text-sm text-text-muted md:text-base">{t('orgchart.tooltip')}</p>
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
