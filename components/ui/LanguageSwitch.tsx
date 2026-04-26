'use client';

import { cn } from '@/lib/utils';
import { LANGUAGES, type Language } from '@/lib/constants';

interface LanguageSwitchProps {
  currentLang: Language;
  onChange?: (lang: Language) => void;
  className?: string;
}

/**
 * Three-language switch (MN | JP | EN). Active language gets a gold underline.
 */
export function LanguageSwitch({
  currentLang,
  onChange,
  className,
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
                  ? 'text-navy-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gold-500'
                  : 'text-text-muted hover:text-navy-900',
              )}
            >
              {lang}
            </button>
            {idx < LANGUAGES.length - 1 && (
              <span className="text-border-medium">|</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
