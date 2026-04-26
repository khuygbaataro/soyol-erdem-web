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
  className?: string;
}

/**
 * Compact page hero for inner pages — navy or cream band with breadcrumb + title.
 */
export function PageHero({
  title,
  subtitle,
  breadcrumb,
  variant = 'navy',
  className,
}: PageHeroProps) {
  const isNavy = variant === 'navy';
  return (
    <section
      className={cn(
        'py-14 md:py-20',
        isNavy ? 'bg-navy-900 text-white' : 'bg-cream-soft',
        className,
      )}
    >
      <Container>
        {breadcrumb && breadcrumb.length > 0 && (
          <div className={cn('mb-4', isNavy && '[&_a]:text-white/70 [&_span]:text-white/80 [&_li:last-child_span]:text-gold-400')}>
            <Breadcrumb items={breadcrumb} />
          </div>
        )}
        <h1
          className={cn(
            'text-h1 font-bold',
            isNavy ? 'text-white' : 'text-navy-900',
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              'mt-4 max-w-3xl text-base md:text-lg',
              isNavy ? 'text-white/80' : 'text-text-body',
            )}
          >
            {subtitle}
          </p>
        )}
        <div className="mt-5 h-1 w-16 rounded-full bg-gold-500" />
      </Container>
    </section>
  );
}
