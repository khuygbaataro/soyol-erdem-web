import { ChevronRight, ExternalLink, Laptop, Monitor, UserSquare } from 'lucide-react';

interface PortalLink {
  label: string;
  href: string;
  icon: typeof Laptop;
  /** External links open in a new tab and show the ExternalLink corner glyph. */
  external?: boolean;
}

const PORTALS: PortalLink[] = [
  {
    label: 'Оюутны систем',
    href: 'https://student.soyolerdem.edu.mn',
    icon: Laptop,
    external: true,
  },
  {
    label: 'Багшийн систем',
    href: 'https://teacher.soyolerdem.edu.mn',
    icon: UserSquare,
    external: true,
  },
  {
    label: 'Цахим сургалт',
    href: '/elearning',
    icon: Monitor,
    external: false,
  },
];

/**
 * Three-up portal launcher styled after CITI University's home strip:
 * a single dark navy bar split into equal-width buttons (Оюутны систем /
 * Багшийн систем / Цахим сургалт). Hovering a segment fills it gold so
 * it reads as the "active / next" segment, mirroring the editor's
 * mockup. Each segment is an external link that opens in a new tab.
 */
export function QuickPortals() {
  return (
    <section className="bg-cream-soft pb-10 pt-2 sm:pb-14">
      <div className="container-custom">
        <div className="overflow-hidden rounded-card bg-navy-900 shadow-[0_18px_40px_-15px_rgba(13,21,48,0.45)] ring-1 ring-white/5">
          <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {PORTALS.map((p) => {
              const Icon = p.icon;
              const CornerGlyph = p.external ? ExternalLink : ChevronRight;
              return (
                <a
                  key={p.href}
                  href={p.href}
                  {...(p.external
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                  className="group relative flex items-center justify-center gap-3 px-5 py-5 text-white transition-colors duration-200 hover:bg-gold-500 hover:text-navy-900 sm:py-6"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white transition-colors duration-200 group-hover:bg-navy-900/15 group-hover:text-navy-900">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[13px] font-bold uppercase tracking-[0.18em]">
                    {p.label}
                  </span>
                  <CornerGlyph
                    className="absolute right-3 top-3 h-3 w-3 text-white/40 transition-colors duration-200 group-hover:text-navy-900/60"
                    aria-hidden
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
