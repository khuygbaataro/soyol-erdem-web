import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Render the school name alongside the badge. Default: false. */
  withLabel?: boolean;
  /** Logo image size in px. Default: 64. */
  size?: number;
  /** Render with white text — for use on dark backgrounds (Header/Footer). */
  invert?: boolean;
  /**
   * Wordmark style. `single` prints "Соёл Эрдэм" as one tight serif line.
   * `stacked` keeps the older two-line "Соёл Эрдэм / Дээд сургууль" layout
   * for places that have vertical room (Footer, Mobile drawer).
   * Only used when `withLabel` is true. Default: 'single'.
   */
  variant?: 'single' | 'stacked';
  /** Label text override. Defaults to "Соёл Эрдэм". */
  label?: string;
  /** Sublabel for stacked variant. Defaults to "Дээд сургууль". */
  sublabel?: string;
}

/**
 * Brand mark — official Соёл Эрдэм logo (public/logo.png), optionally paired
 * with a serif wordmark. The image renders bare (no ring/border) so the crest
 * sits flat against any background, leaving headroom for the navbar layout.
 */
export function Logo({
  className,
  withLabel = false,
  size = 64,
  invert = false,
  variant = 'single',
  label = 'Соёл Эрдэм',
  sublabel = 'Дээд сургууль',
}: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <Image
        src="/logo.png"
        alt="Соёл Эрдэм Дээд Сургуулийн лого"
        width={size}
        height={size}
        priority
        className="shrink-0 object-contain"
        style={{ width: size, height: size }}
      />

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
