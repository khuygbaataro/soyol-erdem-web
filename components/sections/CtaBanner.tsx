import { ChevronRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

interface CtaBannerProps {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  secondary?: { label: string; href: string };
}

/**
 * Reusable navy CTA band placed at the bottom of marketing pages.
 */
export function CtaBanner({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondary,
}: CtaBannerProps) {
  return (
    <Section background="navy" spacing="md">
      <div className="text-center">
        <h2 className="text-h2 font-bold text-white">{title}</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-500" />
        {subtitle && (
          <p className="mx-auto mt-4 max-w-xl text-white/80">{subtitle}</p>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            href={ctaHref}
            variant="accent"
            size="lg"
            icon={<ChevronRight className="h-5 w-5" />}
          >
            {ctaLabel}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy-900">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
