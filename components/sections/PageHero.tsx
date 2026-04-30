import { Container } from '@/components/layout/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { BreadcrumbItem } from '@/types';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  /**
   * Background photo path. Defaults to the AI-generated dawn scene at
   * `/hero_down.png`. Pass `null` to fall back to the decorative SVG.
   */
  backgroundImage?: string | null;
  className?: string;
}

const DEFAULT_HERO_IMAGE = '/hero_down.png';

/**
 * Page hero band for inner pages. By default shows an AI-generated dawn photo
 * with a navy darkening overlay so the title stays readable. Pass
 * `backgroundImage={null}` to fall back to the decorative "Dawn breaking" SVG.
 */
export function PageHero({
  title,
  subtitle,
  breadcrumb,
  backgroundImage = DEFAULT_HERO_IMAGE,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative isolate w-full overflow-hidden bg-[#1d2942] text-white',
        className,
      )}
      style={{ aspectRatio: '12 / 6', minHeight: '420px' }}
    >
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Soft navy gradient — darker at the bottom where text sits, near-clear on top so the photo stays vibrant. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-[#1d2942]/15 via-[#1d2942]/30 to-[#1d2942]/65"
          />
        </>
      ) : (
        <DawnSvg />
      )}

      <Container className="relative z-10 flex h-full flex-col justify-between py-10 md:px-16 md:py-12">
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
              className="font-serif text-3xl font-semibold uppercase leading-tight tracking-[0.18em] text-white md:text-6xl md:tracking-[0.22em]"
              style={{ textShadow: '0 2px 18px rgba(0,0,0,0.4)' }}
            >
              {title}
            </h1>
            <div className="mt-5 h-[3px] w-16 rounded-full bg-[#f0a04a]" />
          </div>
          {subtitle && (
            <p className="max-w-sm text-sm leading-relaxed text-white/80 md:text-right md:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

/**
 * "Dawn breaking" decorative SVG — 12:6 (1440 × 720) painterly scene.
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
 *   14. Front mountain silhouette
 *   15. Torii gate silhouette (left foreground)
 *   16. Sakura branch with petals (bottom-left)
 *   17. Drifting sakura petals
 *   18. Subtle vignette
 */
function DawnSvg() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 720"
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
        {/*
          Petal & starburst defined as <g>, not <symbol>, so each <use> renders
          at the group's natural coordinates. Position via transform.
          (A bare <use href> of a <symbol> with no width/height defaults to
          100% of the parent SVG — which is why earlier petals rendered huge.)
        */}
        <g id="dawn-petal">
          <path
            d="M0,-5 C2.6,-3.5 2.6,-1.5 1.4,0 C2.6,1.5 2.6,3.5 0,5 C-2.6,3.5 -2.6,1.5 -1.4,0 C-2.6,-1.5 -2.6,-3.5 0,-5 Z"
            fill="#f7c0cf"
            fillOpacity="0.62"
          />
        </g>
        <g id="dawn-burst">
          <path
            d="M0,-9 L0.5,-1 L9,0 L0.5,1 L0,9 L-0.5,1 L-9,0 L-0.5,-1 Z"
            fill="#ffffff"
            fillOpacity="0.55"
          />
        </g>
      </defs>

      {/* 1 — base sky */}
      <rect width="1440" height="720" fill="url(#dawn-sky)" />

      {/* 2 — cool counterglow */}
      <rect width="1440" height="720" fill="url(#dawn-cool)" />

      {/* 3 — atmospheric haze band */}
      <rect x="0" y="500" width="1440" height="140" fill="url(#dawn-haze)" />

      {/* 4 — 専 kanji watermark */}
      <text
        x="1110"
        y="450"
        fontSize="280"
        fontFamily="'Yu Mincho', 'Noto Serif JP', serif"
        fill="#ffffff"
        fillOpacity="0.04"
        fontWeight="600"
      >
        専
      </text>

      {/* 5a — top-left rings */}
      <g fill="none" stroke="#ffffff">
        <circle cx="120" cy="80" r="280" strokeOpacity="0.05" />
        <circle cx="120" cy="80" r="200" strokeOpacity="0.04" />
        <circle cx="120" cy="80" r="120" strokeOpacity="0.03" />
      </g>

      {/* 5b — bottom-right amber rings */}
      <g fill="none" stroke="#f0a04a">
        <circle cx="1360" cy="680" r="360" strokeOpacity="0.14" />
        <circle cx="1360" cy="680" r="260" strokeOpacity="0.10" />
        <circle cx="1360" cy="680" r="170" strokeOpacity="0.07" />
      </g>

      {/* 6 — stars (more density now that there's vertical room) */}
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
        <circle cx="350" cy="340" r="0.5" opacity="0.35" />
        <circle cx="680" cy="320" r="0.7" opacity="0.5" />
        <circle cx="1020" cy="370" r="0.5" opacity="0.4" />
        <circle cx="1280" cy="180" r="0.7" opacity="0.5" />
        <circle cx="160" cy="280" r="0.5" opacity="0.4" />
        <circle cx="780" cy="250" r="0.6" opacity="0.45" />
      </g>
      {/* 6b — starbursts on a few prominent stars */}
      <use href="#dawn-burst" transform="translate(440 120)" />
      <use href="#dawn-burst" transform="translate(1180 80) scale(0.85)" />
      <use href="#dawn-burst" transform="translate(820 110) scale(0.7)" />
      <use href="#dawn-burst" transform="translate(700 40) scale(0.6)" />

      {/* 7 — wispy clouds */}
      <g fill="#f9c282">
        <ellipse cx="380" cy="450" rx="180" ry="6" opacity="0.10" />
        <ellipse cx="720" cy="425" rx="220" ry="5" opacity="0.08" />
        <ellipse cx="1080" cy="465" rx="200" ry="7" opacity="0.13" />
        <ellipse cx="220" cy="490" rx="120" ry="4" opacity="0.09" />
        <ellipse cx="900" cy="495" rx="160" ry="4" opacity="0.10" />
      </g>

      {/* 8 — far mountain silhouette (haze-tinted) */}
      <path
        d="M0,560 Q160,510 320,535 Q500,565 700,525 Q900,485 1080,535 Q1240,575 1440,540 L1440,720 L0,720 Z"
        fill="#3a4a6e"
        fillOpacity="0.35"
      />

      {/* 9 — light rays from the rising sun */}
      <g style={{ mixBlendMode: 'screen' }}>
        <path d="M 1240,720 L 1080,300 L 1180,280 Z" fill="url(#dawn-ray)" opacity="0.6" />
        <path d="M 1280,720 L 1280,240 L 1330,240 Z" fill="url(#dawn-ray)" opacity="0.5" />
        <path d="M 1320,720 L 1500,300 L 1420,280 Z" fill="url(#dawn-ray)" opacity="0.45" />
        <path d="M 1200,720 L 940,360 L 1000,340 Z" fill="url(#dawn-ray)" opacity="0.35" />
      </g>

      {/* 10 — sun disk (peeking above horizon) */}
      <circle cx="1280" cy="700" r="115" fill="url(#dawn-sun)" />

      {/* 11 — mid mountain silhouette */}
      <path
        d="M0,610 Q220,500 420,550 Q620,600 820,520 Q1020,460 1240,540 Q1360,590 1440,560 L1440,720 L0,720 Z"
        fill="#1c2745"
        fillOpacity="0.55"
      />

      {/* 12 — warm dawn glow */}
      <rect width="1440" height="720" fill="url(#dawn-glow)" />

      {/* 13 — sun arcs */}
      <g fill="none" stroke="#ffffff" strokeOpacity="0.10" strokeWidth="1">
        <path d="M1280,720 A100,100 0 0 1 1480,720" />
        <path d="M1240,720 A140,140 0 0 1 1520,720" />
        <path d="M1180,720 A200,200 0 0 1 1580,720" />
        <path d="M1110,720 A270,270 0 0 1 1650,720" />
      </g>

      {/* 14 — front mountain silhouette */}
      <path
        d="M0,665 Q300,610 600,635 Q900,665 1200,625 Q1340,605 1440,635 L1440,720 L0,720 Z"
        fill="#0d1530"
        fillOpacity="0.85"
      />

      {/* 15 — torii gate silhouette (left foreground) */}
      <g fill="#080c1f" fillOpacity="0.92">
        {/* Top kasagi beam — slightly curved upward at edges */}
        <path d="M 95,540 Q 175,524 255,540 L 250,556 L 100,556 Z" />
        {/* Second nuki beam */}
        <rect x="118" y="572" width="114" height="6" />
        {/* Pillars */}
        <rect x="148" y="556" width="9" height="164" />
        <rect x="193" y="556" width="9" height="164" />
        {/* Cap line */}
        <rect x="92" y="536" width="166" height="4" />
      </g>

      {/* 16 — sakura branch (bottom-left) */}
      <g>
        <path
          d="M 0,650 C 60,642 110,638 160,646 C 200,652 235,650 260,665"
          stroke="#070a1c"
          strokeWidth="2.5"
          fill="none"
          opacity="0.92"
          strokeLinecap="round"
        />
        <path
          d="M 75,645 C 95,628 105,620 100,605"
          stroke="#070a1c"
          strokeWidth="1.5"
          fill="none"
          opacity="0.9"
          strokeLinecap="round"
        />
        <path
          d="M 200,652 C 215,640 230,628 228,614"
          stroke="#070a1c"
          strokeWidth="1.5"
          fill="none"
          opacity="0.9"
          strokeLinecap="round"
        />
        {/* Petals attached to branch — tiny, scale 0.7-1.0 */}
        <use href="#dawn-petal" transform="translate(40 644) rotate(20)" />
        <use href="#dawn-petal" transform="translate(80 640) rotate(-15) scale(0.9)" />
        <use href="#dawn-petal" transform="translate(100 605) rotate(35) scale(0.85)" />
        <use href="#dawn-petal" transform="translate(140 642) rotate(-25)" />
        <use href="#dawn-petal" transform="translate(200 652) rotate(15) scale(0.95)" />
        <use href="#dawn-petal" transform="translate(228 614) rotate(-30) scale(0.8)" />
      </g>

      {/* 17 — drifting sakura petals (mid-air) */}
      <use href="#dawn-petal" transform="translate(290 380) rotate(-25) scale(0.9)" />
      <use href="#dawn-petal" transform="translate(500 290) rotate(45) scale(0.7)" />
      <use href="#dawn-petal" transform="translate(720 360) rotate(-10) scale(1.1)" />
      <use href="#dawn-petal" transform="translate(940 240) rotate(30) scale(0.8)" />
      <use href="#dawn-petal" transform="translate(1080 420) rotate(-40)" />
      <use href="#dawn-petal" transform="translate(380 510) rotate(20) scale(0.85)" />
      <use href="#dawn-petal" transform="translate(820 520) rotate(-15) scale(0.95)" />
      <use href="#dawn-petal" transform="translate(160 220) rotate(15)" />
      <use href="#dawn-petal" transform="translate(610 460) rotate(50) scale(0.75)" />
      <use href="#dawn-petal" transform="translate(900 460) rotate(-20) scale(0.9)" />
      <use href="#dawn-petal" transform="translate(450 180) rotate(40) scale(0.7)" />

      {/* 18 — subtle vignette */}
      <rect width="1440" height="720" fill="url(#dawn-vignette)" />
    </svg>
  );
}
