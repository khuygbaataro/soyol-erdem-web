import { Container } from '@/components/layout/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import type { BreadcrumbItem } from '@/types';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  /** Visual style. Default: navy. */
  variant?: 'navy' | 'cream';
  /** Compact (py-8/10) vs default (py-12/14). Default: 'default'. */
  size?: 'sm' | 'default';
  className?: string;
}

/**
 * Page hero band for inner pages. Navy or cream variant with subtle decorative
 * gold rings on the right edge to break up the otherwise flat background.
 */
export function PageHero({
  title,
  subtitle,
  breadcrumb,
  variant = 'navy',
  size = 'default',
  className,
}: PageHeroProps) {
  const isNavy = variant === 'navy';
  const padding = size === 'sm' ? 'py-8 md:py-10' : 'py-10 md:py-14';

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        isNavy ? 'bg-navy-900 text-white' : 'bg-cream-soft',
        className,
      )}
    >
      {/* Subtle decorative rings — visible on md+ screens to fill empty space */}
      {isNavy && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-gold-500/15" />
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-gold-500/10" />
          <div className="absolute -bottom-24 -left-16 h-48 w-48 rounded-full border border-white/5" />
        </div>
      )}

      <Container className={cn('relative', padding)}>
        {breadcrumb && breadcrumb.length > 0 && (
          <div
            className={cn(
              'mb-3',
              isNavy && '[&_a]:text-white/60 [&_span]:text-white/80 [&_li:last-child_span]:text-gold-400 [&_svg]:text-white/40',
            )}
          >
            <Breadcrumb items={breadcrumb} />
          </div>
        )}

        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
          <div className="min-w-0 flex-1">
            <h1
              className={cn(
                'text-2xl font-bold leading-tight md:text-4xl',
                isNavy ? 'text-white' : 'text-navy-900',
              )}
            >
              {title}
            </h1>
            <div className="mt-3 h-0.5 w-12 rounded-full bg-gold-500" />
          </div>
          {subtitle && (
            <p
              className={cn(
                'max-w-md text-sm leading-relaxed md:text-right',
                isNavy ? 'text-white/75' : 'text-text-body',
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
