'use client';

import { cn } from '@/lib/utils';
import { LANGUAGES, type Language } from '@/lib/constants';

interface LanguageSwitchProps {
  currentLang: Language;
  onChange?: (lang: Language) => void;
  className?: string;
  /** Render with white text — for use on dark backgrounds (Header). */
  invert?: boolean;
}

/**
 * Three-language switch (MN | JP | EN). Active language gets a gold underline.
 */
export function LanguageSwitch({
  currentLang,
  onChange,
  className,
  invert = false,
}: LanguageSwitchProps) {
  return (
    <div className={cn('flex items-center gap-2 text-sm font-semibold', className)}>
      {LANGUAGES.map((lang, idx) => {
        const isActive = lang === currentLang;
        return (
          <div key={lang} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange?.(lang)}
              className={cn(
                'relative pb-1 transition-colors',
                isActive
                  ? cn(
                      'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gold-500',
                      invert ? 'text-white' : 'text-navy-900',
                    )
                  : invert
                    ? 'text-white/60 hover:text-white'
                    : 'text-text-muted hover:text-navy-900',
              )}
            >
              {lang}
            </button>
            {idx < LANGUAGES.length - 1 && (
              <span className={invert ? 'text-white/30' : 'text-border-medium'}>
                |
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
