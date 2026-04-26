import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Background variant. Default: white. */
  background?: 'white' | 'cream' | 'cream-soft' | 'navy';
  /** Vertical padding scale. Default: md. */
  spacing?: 'sm' | 'md' | 'lg';
  /** When true, the inner container is rendered. Default: true. */
  contained?: boolean;
  id?: string;
}

const bgClasses = {
  white: 'bg-white',
  cream: 'bg-cream',
  'cream-soft': 'bg-cream-soft',
  navy: 'bg-navy-900 text-white',
} as const;

const spacingClasses = {
  sm: 'py-10 md:py-14',
  md: 'py-12 md:py-20',
  lg: 'py-16 md:py-28',
} as const;

/**
 * Page section wrapper with background, vertical spacing and optional Container.
 */
export function Section({
  children,
  className,
  background = 'white',
  spacing = 'md',
  contained = true,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(bgClasses[background], spacingClasses[spacing], className)}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
