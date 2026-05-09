import { School } from 'lucide-react';

/**
 * Соёл Эрдэм Дээд Сургуулийн бүтэц, зохион байгуулалт.
 * 4 main pillars under the rector, plus three sibling cards
 * (Эрдмийн зөвлөл / Захиргааны зөвлөл / Чанарын үнэлгээний алба) and
 * the high-school as a parallel institution under the same Council.
 */

interface Pillar {
  title: string;
  units: string[];
}

const PILLARS: Pillar[] = [
  {
    title: 'Сургалтын алба',
    units: [
      'Япон судлалын тэнхим',
      'Мэдээлэл технологийн тэнхим',
      '"Хажимэ" номын сан',
      'Дадлагын бааз',
    ],
  },
  {
    title: 'Эрдэмтэн нарийн бичгийн дарга',
    units: ['Ахисан түвшний сургалтын алба', 'Судалгааны төв'],
  },
  {
    title: 'Захиргаа, Санхүү, аж ахуй',
    units: ['Архив', 'Маркетингийн алба'],
  },
  {
    title: 'Багшийн хөгжлийн төв',
    units: ['Гадаад харилцааны алба', 'Оюутны зөвлөл'],
  },
];

export function OrgChart() {
  return (
    <div className="space-y-10">
      {/* Top row — Удирдах зөвлөл + sibling high-school card */}
      <div className="flex flex-col items-center">
        <div className="grid w-full gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <div className="hidden sm:block" />
          <ChartNode level="top" centered>
            УДИРДАХ ЗӨВЛӨЛ
          </ChartNode>
          <div className="mt-4 flex justify-center sm:mt-0 sm:justify-start">
            <SiblingNode>
              Нийслэлийн Ерөнхий Боловсролын
              <br />
              Соёл Эрдэм сургууль (ЕБС)
            </SiblingNode>
          </div>
        </div>

        <Connector />

        <ChartNode level="top">ЭРДМИЙН ЗӨВЛӨЛ</ChartNode>

        <Connector />

        {/* Three-up: Захиргааны зөвлөл / Захирал / Чанарын үнэлгээний алба */}
        <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
          <ChartNode level="mid">Захиргааны зөвлөл</ChartNode>
          <ChartNode level="director">ЗАХИРАЛ</ChartNode>
          <ChartNode level="mid">Чанарын үнэлгээний алба</ChartNode>
        </div>

        <Connector />
      </div>

      {/* Bottom — 4 pillar columns */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p) => (
          <div key={p.title} className="flex flex-col">
            <ChartNode level="pillar">{p.title}</ChartNode>
            <span aria-hidden className="mx-auto h-4 w-px bg-navy-900/30" />
            <ul className="space-y-2">
              {p.units.map((u) => (
                <li key={u}>
                  <UnitNode>{u}</UnitNode>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Atoms ───────────────────────────────────────────────────── */

function Connector() {
  return (
    <span aria-hidden className="my-2 block h-6 w-px bg-navy-900/30" />
  );
}

interface ChartNodeProps {
  children: React.ReactNode;
  level: 'top' | 'director' | 'mid' | 'pillar';
  centered?: boolean;
}

function ChartNode({ children, level, centered = false }: ChartNodeProps) {
  const styles = {
    top: 'bg-navy-900 text-white px-6 py-3 text-sm font-bold uppercase tracking-wider',
    director:
      'bg-gold-500 text-navy-900 px-6 py-3 text-sm font-bold uppercase tracking-wider ring-2 ring-gold-500/40',
    mid: 'bg-navy-900 text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide',
    pillar:
      'bg-navy-900 text-white px-4 py-3 text-xs font-bold uppercase tracking-wide text-center',
  } as const;
  return (
    <div
      className={`${centered ? 'mx-auto' : ''} inline-flex items-center justify-center rounded-md text-center shadow-card ${styles[level]}`}
    >
      {children}
    </div>
  );
}

function SiblingNode({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-start gap-2 rounded-md border border-gold-500/40 bg-gold-500/10 px-4 py-2 text-xs font-semibold leading-snug text-navy-900 shadow-card">
      <School className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
      <span>{children}</span>
    </div>
  );
}

function UnitNode({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border-light bg-white px-4 py-2.5 text-center text-sm text-navy-900 shadow-sm">
      {children}
    </div>
  );
}
