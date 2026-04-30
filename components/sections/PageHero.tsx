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
      style={{ aspectRatio: '1440 / 600', minHeight: '380px' }}
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
 * "Dawn breaking" decorative SVG — full-bleed background. Painterly layered
 * scene to evoke a quiet warm sunrise above a Mongolian-Japanese campus.
 * Layer order (back → front):
 *   1.  Multi-stop sky gradient
 *   2.  Cool counterglow (top-left)
 *   3.  Atmospheric haze band (horizon warmth)
 *   4.  専 kanji watermark
 *   5.  Decorative outline rings (corners)
 *   6.  Stars + starbursts on the brightest few
 *   7.  Wispy amber-lit clouds
 *   8.  Far mountain silhouette (haze-tinted)
 *   9.  Light rays from the rising sun
 *   10. Sun disk (peeking above horizon)
 *   11. Mid mountain silhouette
 *   12. Warm dawn glow radial
 *   13. Sun arcs
 *   14. Front mountain silhouette (darkest, anchors composition)
 *   15. Torii gate silhouette (left foreground)
 *   16. Sakura branch with petals (bottom-left)
 *   17. Drifting sakura petals (mid-air)
 *   18. Subtle vignette
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
          <stop offset="0%" stopColor="#0e1530" />
          <stop offset="35%" stopColor="#1c2a4c" />
          <stop offset="70%" stopColor="#324a72" />
          <stop offset="92%" stopColor="#5a6f8e" />
          <stop offset="100%" stopColor="#8a7560" />
        </linearGradient>
        <radialGradient id="dawn-cool" cx="0.12" cy="0.18" r="0.55">
          <stop offset="0%" stopColor="#7a9bd0" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#7a9bd0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dawn-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0a04a" stopOpacity="0" />
          <stop offset="40%" stopColor="#f0a04a" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#e8893f" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="dawn-glow" cx="0.78" cy="0.95" r="0.75">
          <stop offset="0%" stopColor="#fde0b3" stopOpacity="0.85" />
          <stop offset="20%" stopColor="#f9c282" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#e8893f" stopOpacity="0.25" />
          <stop offset="80%" stopColor="#a4521f" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#a4521f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dawn-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff1d4" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#fbcc89" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#f0a04a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dawn-ray" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#f9c282" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#f9c282" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="dawn-vignette" cx="0.5" cy="0.55" r="0.85">
          <stop offset="55%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.40" />
        </radialGradient>
        <symbol id="dawn-petal" viewBox="-6 -6 12 12">
          <path
            d="M0,-5 C2.6,-3.5 2.6,-1.5 1.4,0 C2.6,1.5 2.6,3.5 0,5 C-2.6,3.5 -2.6,1.5 -1.4,0 C-2.6,-1.5 -2.6,-3.5 0,-5 Z"
            fill="#f7c0cf"
            fillOpacity="0.62"
          />
        </symbol>
        <symbol id="dawn-burst" viewBox="-10 -10 20 20">
          <path
            d="M0,-10 L0.6,-1 L10,0 L0.6,1 L0,10 L-0.6,1 L-10,0 L-0.6,-1 Z"
            fill="#ffffff"
            fillOpacity="0.55"
          />
        </symbol>
      </defs>

      {/* 1 — base sky */}
      <rect width="1440" height="540" fill="url(#dawn-sky)" />

      {/* 2 — cool counterglow */}
      <rect width="1440" height="540" fill="url(#dawn-cool)" />

      {/* 3 — atmospheric haze band */}
      <rect x="0" y="370" width="1440" height="120" fill="url(#dawn-haze)" />

      {/* 4 — 専 kanji watermark */}
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

      {/* 5a — top-left rings */}
      <g fill="none" stroke="#ffffff">
        <circle cx="120" cy="60" r="240" strokeOpacity="0.05" />
        <circle cx="120" cy="60" r="170" strokeOpacity="0.04" />
        <circle cx="120" cy="60" r="100" strokeOpacity="0.03" />
      </g>

      {/* 5b — bottom-right amber rings */}
      <g fill="none" stroke="#f0a04a">
        <circle cx="1360" cy="500" r="320" strokeOpacity="0.14" />
        <circle cx="1360" cy="500" r="230" strokeOpacity="0.10" />
        <circle cx="1360" cy="500" r="150" strokeOpacity="0.07" />
      </g>

      {/* 6 — stars */}
      <g fill="#ffffff">
        <circle cx="180" cy="90" r="0.9" opacity="0.75" />
        <circle cx="320" cy="50" r="0.6" opacity="0.55" />
        <circle cx="440" cy="120" r="1.3" opacity="0.9" />
        <circle cx="560" cy="70" r="0.5" opacity="0.4" />
        <circle cx="700" cy="40" r="0.8" opacity="0.65" />
        <circle cx="820" cy="110" r="1.0" opacity="0.7" />
        <circle cx="930" cy="60" r="0.6" opacity="0.45" />
        <circle cx="1050" cy="150" r="0.9" opacity="0.6" />
        <circle cx="1180" cy="80" r="1.4" opacity="0.85" />
        <circle cx="1300" cy="40" r="0.5" opacity="0.4" />
        <circle cx="240" cy="200" r="0.7" opacity="0.5" />
        <circle cx="600" cy="180" r="0.6" opacity="0.45" />
        <circle cx="880" cy="220" r="0.8" opacity="0.55" />
        <circle cx="1130" cy="240" r="0.6" opacity="0.4" />
        <circle cx="380" cy="260" r="0.5" opacity="0.4" />
        <circle cx="500" cy="30" r="0.4" opacity="0.35" />
        <circle cx="980" cy="280" r="0.5" opacity="0.4" />
        <circle cx="60" cy="160" r="0.6" opacity="0.45" />
      </g>
      {/* 6b — starbursts on a few prominent stars */}
      <use href="#dawn-burst" x="440" y="120" />
      <use href="#dawn-burst" x="1180" y="80" transform="scale(0.85)" />
      <use href="#dawn-burst" x="820" y="110" transform="scale(0.7)" />

      {/* 7 — wispy clouds */}
      <g fill="#f9c282">
        <ellipse cx="380" cy="330" rx="180" ry="6" opacity="0.10" />
        <ellipse cx="720" cy="305" rx="220" ry="5" opacity="0.08" />
        <ellipse cx="1080" cy="345" rx="200" ry="7" opacity="0.13" />
        <ellipse cx="220" cy="365" rx="120" ry="4" opacity="0.09" />
      </g>

      {/* 8 — far mountain silhouette (haze-tinted) */}
      <path
        d="M0,420 Q160,370 320,395 Q500,425 700,385 Q900,345 1080,395 Q1240,435 1440,400 L1440,540 L0,540 Z"
        fill="#3a4a6e"
        fillOpacity="0.35"
      />

      {/* 9 — light rays from the rising sun */}
      <g style={{ mixBlendMode: 'screen' }}>
        <path d="M 1240,540 L 1080,200 L 1180,180 Z" fill="url(#dawn-ray)" opacity="0.6" />
        <path d="M 1280,540 L 1280,160 L 1330,160 Z" fill="url(#dawn-ray)" opacity="0.5" />
        <path d="M 1320,540 L 1500,200 L 1420,180 Z" fill="url(#dawn-ray)" opacity="0.45" />
        <path d="M 1200,540 L 940,260 L 1000,240 Z" fill="url(#dawn-ray)" opacity="0.35" />
      </g>

      {/* 10 — sun disk (peeking above horizon) */}
      <circle cx="1280" cy="520" r="105" fill="url(#dawn-sun)" />

      {/* 11 — mid mountain silhouette */}
      <path
        d="M0,460 Q220,360 420,400 Q620,440 820,380 Q1020,330 1240,400 Q1360,440 1440,410 L1440,540 L0,540 Z"
        fill="#1c2745"
        fillOpacity="0.55"
      />

      {/* 12 — warm dawn glow */}
      <rect width="1440" height="540" fill="url(#dawn-glow)" />

      {/* 13 — sun arcs */}
      <g fill="none" stroke="#ffffff" strokeOpacity="0.10" strokeWidth="1">
        <path d="M1280,540 A90,90 0 0 1 1460,540" />
        <path d="M1240,540 A130,130 0 0 1 1500,540" />
        <path d="M1190,540 A180,180 0 0 1 1550,540" />
        <path d="M1130,540 A240,240 0 0 1 1610,540" />
      </g>

      {/* 14 — front mountain silhouette */}
      <path
        d="M0,500 Q300,440 600,470 Q900,500 1200,460 Q1340,440 1440,470 L1440,540 L0,540 Z"
        fill="#0d1530"
        fillOpacity="0.85"
      />

      {/* 15 — torii gate silhouette (left foreground) */}
      <g fill="#080c1f" fillOpacity="0.92">
        {/* Top kasagi beam — slightly curved upward at edges */}
        <path d="M 95,395 Q 175,380 255,395 L 250,408 L 100,408 Z" />
        {/* Second nuki beam */}
        <rect x="118" y="420" width="114" height="5" />
        {/* Pillars */}
        <rect x="148" y="408" width="9" height="132" />
        <rect x="193" y="408" width="9" height="132" />
        {/* Cap line */}
        <rect x="92" y="392" width="166" height="3" />
      </g>

      {/* 16 — sakura branch (bottom-left) */}
      <g>
        <path
          d="M 0,495 C 60,488 110,484 160,492 C 200,498 235,496 260,510"
          stroke="#070a1c"
          strokeWidth="2.5"
          fill="none"
          opacity="0.92"
          strokeLinecap="round"
        />
        <path
          d="M 75,491 C 95,478 105,470 100,455"
          stroke="#070a1c"
          strokeWidth="1.5"
          fill="none"
          opacity="0.9"
          strokeLinecap="round"
        />
        <path
          d="M 200,498 C 215,488 230,478 228,464"
          stroke="#070a1c"
          strokeWidth="1.5"
          fill="none"
          opacity="0.9"
          strokeLinecap="round"
        />
        {/* Petals attached to branch */}
        <use href="#dawn-petal" x="40" y="490" transform="rotate(20 40 490)" />
        <use href="#dawn-petal" x="80" y="486" transform="rotate(-15 80 486) scale(0.9)" />
        <use href="#dawn-petal" x="100" y="455" transform="rotate(35 100 455) scale(0.85)" />
        <use href="#dawn-petal" x="140" y="488" transform="rotate(-25 140 488)" />
        <use href="#dawn-petal" x="200" y="498" transform="rotate(15 200 498) scale(0.95)" />
        <use href="#dawn-petal" x="228" y="464" transform="rotate(-30 228 464) scale(0.8)" />
      </g>

      {/* 17 — drifting sakura petals */}
      <use href="#dawn-petal" x="290" y="320" transform="rotate(-25 290 320) scale(0.9)" />
      <use href="#dawn-petal" x="500" y="240" transform="rotate(45 500 240) scale(0.7)" />
      <use href="#dawn-petal" x="720" y="300" transform="rotate(-10 720 300) scale(1.1)" />
      <use href="#dawn-petal" x="940" y="200" transform="rotate(30 940 200) scale(0.8)" />
      <use href="#dawn-petal" x="1080" y="350" transform="rotate(-40 1080 350)" />
      <use href="#dawn-petal" x="380" y="420" transform="rotate(20 380 420) scale(0.85)" />
      <use href="#dawn-petal" x="820" y="430" transform="rotate(-15 820 430) scale(0.95)" />
      <use href="#dawn-petal" x="160" y="180" transform="rotate(15 160 180)" />
      <use href="#dawn-petal" x="610" y="380" transform="rotate(50 610 380) scale(0.75)" />
      <use href="#dawn-petal" x="900" y="380" transform="rotate(-20 900 380) scale(0.9)" />

      {/* 18 — subtle vignette */}
      <rect width="1440" height="540" fill="url(#dawn-vignette)" />
    </svg>
  );
}
