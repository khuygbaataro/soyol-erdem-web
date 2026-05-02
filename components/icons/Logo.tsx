import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Render the school name alongside the badge. Default: false. */
  withLabel?: boolean;
  /** Logo image size in px. Default: 56. */
  size?: number;
  /** Render with white text — for use on dark backgrounds (Header/Footer). */
  invert?: boolean;
  /**
   * Wordmark style. `single` (default) prints "Соёл-Эрдэм" as one tight
   * serif line — used in the navbar to keep horizontal room for nav links.
   * `stacked` keeps the older two-line "Соёл-Эрдэм / Дээд сургууль" layout
   * for places that have vertical room (Footer, Mobile drawer).
   */
  variant?: 'single' | 'stacked';
  /** Label text override. Defaults to "Соёл-Эрдэм". */
  label?: string;
  /** Sublabel for stacked variant. Defaults to "Дээд сургууль". */
  sublabel?: string;
}

/**
 * Brand mark — official Соёл-Эрдэм logo (public/logo.png) optionally paired
 * with a serif wordmark. The image lives inside a soft ring so it reads as a
 * proper brand crest rather than a floating bitmap.
 */
export function Logo({
  className,
  withLabel = false,
  size = 56,
  invert = false,
  variant = 'single',
  label = 'Соёл-Эрдэм',
  sublabel = 'Дээд сургууль',
}: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span
        className={cn(
          'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 transition-shadow',
          invert
            ? 'bg-white/5 ring-gold-500/40 group-hover:ring-gold-500/70'
            : 'bg-white ring-border-light',
        )}
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.png"
          alt="Соёл-Эрдэм Дээд Сургуулийн лого"
          width={size}
          height={size}
          priority
          className="object-contain"
          style={{ width: size * 0.82, height: size * 0.82 }}
        />
      </span>

      {withLabel &&
        (variant === 'single' ? (
          <span
            className={cn(
              'font-serif text-lg font-bold leading-none tracking-tight whitespace-nowrap md:text-xl',
              invert ? 'text-white' : 'text-navy-900',
            )}
          >
            {label}
          </span>
        ) : (
          <span className="flex flex-col leading-tight">
            <span
              className={cn(
                'font-serif text-base font-bold whitespace-nowrap',
                invert ? 'text-white' : 'text-navy-900',
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                'text-[10px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap',
                invert ? 'text-cream/70' : 'text-text-muted',
              )}
            >
              {sublabel}
            </span>
          </span>
        ))}
    </span>
  );
}
