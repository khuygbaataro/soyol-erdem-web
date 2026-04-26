import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgramCardProps {
  icon: LucideIcon;
  name: string;
  degree: string;
  description: string;
  href: string;
  className?: string;
}

/**
 * Academic program card with gold icon, navy title and degree label.
 */
export function ProgramCard({
  icon: Icon,
  name,
  degree,
  description,
  href,
  className,
}: ProgramCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex h-full flex-col rounded-card border border-border-light bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover',
        className,
      )}
    >
      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-500 transition-colors group-hover:bg-gold-500 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="text-lg font-semibold text-navy-900">{name}</h3>
      <p className="mt-1 text-xs uppercase tracking-wide text-text-muted">
        {degree}
      </p>
      <p className="mt-3 line-clamp-3 text-sm text-text-body">{description}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-navy-900">
        Дэлгэрэнгүй
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
