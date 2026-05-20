import { Building2, CalendarCheck, ChevronDown, MapPin } from 'lucide-react';
import type { PartnerDetailed } from '@/lib/content';

/**
 * Disclosure card for a partner profile. Collapsed shows just the
 * headline + scholarship pill; clicking reveals the full narrative
 * inline (no page navigation). Built on the native <details> element
 * so it works without any client-side JS. `expandLabel` /
 * `collapseLabel` arrive pre-localised from the calling page so the
 * card stays locale-agnostic.
 *
 * Used by /international (main site) and /high-school/cooperation
 * (HS sub-site) since both pages list the same shared partner data
 * from `lib/content.ts`.
 */
export function PartnerProfileCard({
  p,
  icon: Icon = Building2,
  expandLabel,
  collapseLabel,
}: {
  p: PartnerDetailed;
  icon?: typeof Building2;
  expandLabel: string;
  collapseLabel: string;
}) {
  return (
    <details className="group h-full overflow-hidden rounded-card border border-border-light bg-white shadow-card transition-all duration-300 open:border-navy-900/40 hover:border-navy-900/40 hover:shadow-card-hover">
      <summary className="flex cursor-pointer list-none flex-col gap-3 p-5 [&::-webkit-details-marker]:hidden">
        <div className="flex items-start justify-between gap-3">
          {p.logo ? (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-button border border-border-light bg-white p-1.5 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logo}
                alt={`${p.name} logo`}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </span>
          ) : (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-button bg-navy-900 text-gold-400 ring-1 ring-navy-900/20">
              <Icon className="h-5 w-5" />
            </span>
          )}
          {p.headline && (
            <span className="shrink-0 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold leading-tight text-navy-900 shadow-sm">
              {p.headline}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold leading-snug text-navy-900">
            {p.name}
          </h3>
          {p.nameJp && (
            <p className="mt-1 line-clamp-2 text-xs italic text-text-muted">
              {p.nameJp}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3 text-gold-500" />
            {p.location}
          </span>
          {p.partnerSince && (
            <span className="inline-flex items-center gap-1">
              <CalendarCheck className="h-3 w-3 text-gold-500" />
              {p.partnerSince}
            </span>
          )}
        </div>
        <span className="mt-1 inline-flex items-center gap-1 self-start text-[11px] font-bold uppercase tracking-wider text-navy-900 transition-colors group-open:text-gold-500">
          <span className="group-open:hidden">{expandLabel}</span>
          <span className="hidden group-open:inline">{collapseLabel}</span>
          <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-180" />
        </span>
      </summary>
      <div className="border-t border-border-light bg-cream-soft/40 p-5 text-sm leading-relaxed text-text-body">
        {p.detail}
      </div>
    </details>
  );
}
