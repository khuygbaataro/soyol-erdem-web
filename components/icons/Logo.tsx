import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Render the school name alongside the badge. Default: false. */
  withLabel?: boolean;
  /** Logo image size in px. Default: 44. */
  size?: number;
  /** Render with white text — for use on dark backgrounds (Footer). */
  invert?: boolean;
}

/**
 * Brand mark — official Соёл-Эрдэм logo (public/logo.png) + optional label.
 */
export function Logo({ className, withLabel = false, size = 44, invert = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <Image
        src="/logo.png"
        alt="Соёл-Эрдэм Дээд Сургуулийн лого"
        width={size}
        height={size}
        priority
        className="object-contain"
        style={{ width: size, height: size }}
      />
      {withLabel && (
        <span className="flex flex-col leading-tight">
          <span
            className={cn(
              'text-sm font-bold whitespace-nowrap',
              invert ? 'text-white' : 'text-navy-900',
            )}
          >
            Соёл-Эрдэм
          </span>
          <span
            className={cn(
              'text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap',
              invert ? 'text-cream/70' : 'text-text-muted',
            )}
          >
            Дээд сургууль
          </span>
        </span>
      )}
    </span>
  );
}
