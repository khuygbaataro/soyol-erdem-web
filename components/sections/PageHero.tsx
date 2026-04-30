import { Container } from '@/components/layout/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { BreadcrumbItem } from '@/types';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  /** Optional background photo. When set, the SVG dawn scene is replaced. */
  backgroundImage?: string;
  className?: string;
}

/**
 * Page hero band for inner pages. Renders an atmospheric "Dawn breaking" SVG
 * scene by default — deep navy sky with a warm amber glow rising from the
 * bottom-right, layered mountain silhouettes, sparse stars and sakura petals.
 * If `backgroundImage` is provided the SVG is hidden and the photo shows under
 * a navy darkening overlay so foreground text stays readable.
 */
export function PageHero({
  title,
  subtitle,
  breadcrumb,
  backgroundImage,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative isolate w-full overflow-hidden bg-[#1d2942] text-white',
        // 1440 / 460 ≈ 3.13 → use Tailwind aspect-ratio + min-height fallback
        className,
      )}
      style={{ aspectRatio: '1440 / 460', minHeight: '280px' }}
    >
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-[#1d2942]/55" />
        </>
      ) : (
        <DawnSvg />
      )}

      <Container className="relative z-10 flex h-full flex-col justify-between py-9 md:px-16">
        {breadcrumb && breadcrumb.length > 0 ? (
          <div className="[&_a]:text-white/65 [&_a:hover]:text-white [&_span]:text-white/85 [&_li:last-child_span]:text-[#f0a04a] [&_svg]:text-white/40">
            <Breadcrumb items={breadcrumb} />
          </div>
        ) : (
          <div />
        )}

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="min-w-0 flex-1">
            <h1
              className="font-serif text-3xl font-semibold uppercase leading-tight tracking-[0.18em] text-white md:text-5xl md:tracking-[0.22em]"
              style={{ textShadow: '0 2px 16px rgba(0,0,0,0.35)' }}
            >
              {title}
            </h1>
            <div className="mt-4 h-[3px] w-14 rounded-full bg-[#f0a04a]" />
          </div>
          {subtitle && (
            <p className="max-w-xs text-sm leading-relaxed text-white/80 md:text-right">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

/**
 * "Dawn breaking" decorative SVG — full-bleed background. Layer order:
 *   1. Deep navy gradient sky
 *   2. Cool counterglow (top-left)
 *   3. 専 kanji watermark
 *   4. Decorative outline rings (corners)
 *   5. Stars
 *   6. Two mountain silhouettes
 *   7. Warm dawn glow (bottom-right radial)
 *   8. Faint sun arcs
 *   9. Sakura petals
 */
function DawnSvg() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 540"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="dawn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#141d38" />
          <stop offset="55%" stopColor="#243454" />
          <stop offset="100%" stopColor="#3a527a" />
        </linearGradient>
        <radialGradient id="dawn-cool" cx="0.12" cy="0.18" r="0.55">
          <stop offset="0%" stopColor="#7a9bd0" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7a9bd0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dawn-glow" cx="0.78" cy="0.95" r="0.7">
          <stop offset="0%" stopColor="#f9c282" stopOpacity="0.65" />
          <stop offset="35%" stopColor="#e8893f" stopOpacity="0.30" />
          <stop offset="70%" stopColor="#a4521f" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#a4521f" stopOpacity="0" />
        </radialGradient>
        <symbol id="dawn-petal" viewBox="-6 -6 12 12">
          <path
            d="M0,-5 C2.6,-3.5 2.6,-1.5 1.4,0 C2.6,1.5 2.6,3.5 0,5 C-2.6,3.5 -2.6,1.5 -1.4,0 C-2.6,-1.5 -2.6,-3.5 0,-5 Z"
            fill="#f7c0cf"
            fillOpacity="0.55"
          />
        </symbol>
      </defs>

      {/* 1 — base sky */}
      <rect width="1440" height="540" fill="url(#dawn-sky)" />

      {/* 2 — cool counterglow */}
      <rect width="1440" height="540" fill="url(#dawn-cool)" />

      {/* 3 — 専 kanji watermark */}
      <text
        x="1110"
        y="320"
        fontSize="240"
        fontFamily="'Yu Mincho', 'Noto Serif JP', serif"
        fill="#ffffff"
        fillOpacity="0.045"
        fontWeight="600"
      >
        専
      </text>

      {/* 4a — top-left rings */}
      <g fill="none" stroke="#ffffff">
        <circle cx="120" cy="60" r="240" strokeOpacity="0.05" />
        <circle cx="120" cy="60" r="170" strokeOpacity="0.04" />
        <circle cx="120" cy="60" r="100" strokeOpacity="0.03" />
      </g>

      {/* 4b — bottom-right amber rings */}
      <g fill="none" stroke="#f0a04a">
        <circle cx="1360" cy="500" r="320" strokeOpacity="0.14" />
        <circle cx="1360" cy="500" r="230" strokeOpacity="0.10" />
        <circle cx="1360" cy="500" r="150" strokeOpacity="0.07" />
      </g>

      {/* 5 — stars */}
      <g fill="#ffffff">
        <circle cx="180" cy="90" r="0.9" opacity="0.75" />
        <circle cx="320" cy="50" r="0.6" opacity="0.55" />
        <circle cx="440" cy="120" r="1.1" opacity="0.85" />
        <circle cx="560" cy="70" r="0.5" opacity="0.4" />
        <circle cx="700" cy="40" r="0.8" opacity="0.65" />
        <circle cx="820" cy="110" r="1.0" opacity="0.7" />
        <circle cx="930" cy="60" r="0.6" opacity="0.45" />
        <circle cx="1050" cy="150" r="0.9" opacity="0.6" />
        <circle cx="1180" cy="80" r="1.2" opacity="0.8" />
        <circle cx="1300" cy="40" r="0.5" opacity="0.4" />
        <circle cx="240" cy="200" r="0.7" opacity="0.5" />
        <circle cx="600" cy="180" r="0.6" opacity="0.45" />
        <circle cx="880" cy="220" r="0.8" opacity="0.55" />
        <circle cx="1130" cy="240" r="0.6" opacity="0.4" />
        <circle cx="380" cy="260" r="0.5" opacity="0.4" />
      </g>

      {/* 6 — outer mountain silhouette */}
      <path
        d="M0,460 Q220,360 420,400 Q620,440 820,380 Q1020,330 1240,400 Q1360,440 1440,410 L1440,540 L0,540 Z"
        fill="#1c2745"
        fillOpacity="0.55"
      />
      {/* 6 — inner mountain silhouette */}
      <path
        d="M0,500 Q300,440 600,470 Q900,500 1200,460 Q1340,440 1440,470 L1440,540 L0,540 Z"
        fill="#121a32"
        fillOpacity="0.78"
      />

      {/* 7 — warm dawn glow */}
      <rect width="1440" height="540" fill="url(#dawn-glow)" />

      {/* 8 — faint sun arcs (bottom-right) */}
      <g fill="none" stroke="#ffffff" strokeOpacity="0.10" strokeWidth="1">
        <path d="M1280,540 A90,90 0 0 1 1460,540" />
        <path d="M1240,540 A130,130 0 0 1 1500,540" />
        <path d="M1190,540 A180,180 0 0 1 1550,540" />
        <path d="M1130,540 A240,240 0 0 1 1610,540" />
      </g>

      {/* 9 — sakura petals */}
      <use href="#dawn-petal" x="160" y="180" transform="rotate(15 160 180)" />
      <use href="#dawn-petal" x="290" y="320" transform="rotate(-25 290 320) scale(0.9)" />
      <use href="#dawn-petal" x="500" y="240" transform="rotate(45 500 240) scale(0.7)" />
      <use href="#dawn-petal" x="720" y="300" transform="rotate(-10 720 300) scale(1.1)" />
      <use href="#dawn-petal" x="940" y="200" transform="rotate(30 940 200) scale(0.8)" />
      <use href="#dawn-petal" x="1080" y="350" transform="rotate(-40 1080 350)" />
      <use href="#dawn-petal" x="380" y="420" transform="rotate(20 380 420) scale(0.85)" />
      <use href="#dawn-petal" x="820" y="430" transform="rotate(-15 820 430) scale(0.95)" />
    </svg>
  );
}
