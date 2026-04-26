import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
  /** When true (default false), renders white text for use on dark sections. */
  invert?: boolean;
}

/**
 * Section heading with a 60px gold underline.
 */
export function SectionTitle({
  title,
  subtitle,
  align = 'center',
  className,
  invert = false,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'mb-10 max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      <h2
        className={cn(
          'text-h2 font-bold',
          invert ? 'text-white' : 'text-text-heading',
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          'h-1 w-16 rounded-full bg-gold-500',
          align === 'center' ? 'mx-auto mt-4' : 'mt-4',
        )}
      />
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed',
            invert ? 'text-white/80' : 'text-text-body',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
