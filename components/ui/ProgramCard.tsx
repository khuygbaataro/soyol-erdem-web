'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/components/system/LocaleProvider';

interface ProgramCardProps {
  icon: LucideIcon;
  name: string;
  degree: string;
  description: string;
  href: string;
  className?: string;
}

/**
 * Academic program card. Resting: white bg, navy title, gold-tinted icon
 * (the same baseline as the four numbered cards on /about). On hover the
 * whole card flips to navy with the title / body in white and the icon
 * recoloured to gold-on-translucent — same motion the editor liked on
 * the about-page cards.
 */
export function ProgramCard({
  icon: Icon,
  name,
  degree,
  description,
  href,
  className,
}: ProgramCardProps) {
  const t = useTranslation();
  return (
    <Link
      href={href}
      className={cn(
        'group flex h-full flex-col rounded-card border border-border-light bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-navy-900 hover:bg-navy-900 hover:shadow-card-hover',
        className,
      )}
    >
      <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream text-navy-900 transition-colors duration-300 group-hover:bg-gold-500/20 group-hover:text-gold-400">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="text-lg font-semibold leading-snug text-navy-900 transition-colors duration-300 group-hover:text-white">
        {name}
      </h3>
      <p className="mt-1 text-xs uppercase tracking-wide text-text-muted transition-colors duration-300 group-hover:text-gold-400">
        {degree}
      </p>
      <p className="mt-3 flex-1 line-clamp-3 text-sm leading-relaxed text-text-body transition-colors duration-300 group-hover:text-white/80">
        {description}
      </p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy-900 transition-colors duration-300 group-hover:text-gold-400">
        {t('common.readMore')}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
