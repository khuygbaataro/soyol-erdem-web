import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumberedCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isActive?: boolean;
  href?: string;
  className?: string;
}

/**
 * Marketing card with a large gold number, top-right icon and arrow CTA.
 * Active state inverts to navy background with white content.
 */
export function NumberedCard({
  number,
  title,
  description,
  icon: Icon,
  isActive = false,
  href,
  className,
}: NumberedCardProps) {
  const Wrapper: any = href ? Link : 'div';
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        'group relative flex h-full flex-col rounded-card border p-8 shadow-card transition-all duration-300',
        isActive
          ? 'border-navy-900 bg-navy-900 text-white'
          : 'border-border-light bg-white text-text-body hover:-translate-y-0.5 hover:shadow-card-hover',
        href && 'cursor-pointer',
        className,
      )}
    >
      <div className="mb-6 flex items-start justify-between">
        <span
          className={cn(
            'text-5xl font-bold leading-none',
            isActive ? 'text-gold-400' : 'text-gold-500',
          )}
        >
          {number}
        </span>
        <span
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full',
            isActive ? 'bg-white/10 text-gold-400' : 'bg-gold-500/10 text-gold-500',
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
      </div>

      <h3
        className={cn(
          'mb-3 text-xl font-semibold',
          isActive ? 'text-white' : 'text-text-heading',
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          'mb-6 flex-1 text-sm leading-relaxed',
          isActive ? 'text-white/80' : 'text-text-body',
        )}
      >
        {description}
      </p>

      <div
        className={cn(
          'mt-auto inline-flex items-center gap-2 text-sm font-semibold',
          isActive ? 'text-white' : 'text-navy-900',
        )}
      >
        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Wrapper>
  );
}
