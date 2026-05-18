'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import type { Language } from '@/lib/constants';
import { LOCALE_COOKIE } from '@/lib/i18n/locale';
import { MESSAGES, type TranslationKey } from '@/lib/i18n/messages';

interface LocaleContextValue {
  locale: Language;
  setLocale: (next: Language) => void;
  /** Translate a key in the active locale, falling back to Mongolian. */
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  initialLocale: Language;
  children: React.ReactNode;
}

/**
 * Top-of-tree locale state. The server pre-resolves the cookie in
 * app/layout.tsx and passes `initialLocale` so the first paint already
 * matches the user's preference (no flicker, no SEO indexing in the
 * wrong language).
 *
 * `setLocale` writes the cookie and triggers a router refresh so the
 * server re-renders any pages that read translations via `getLocale()`
 * in their server component.
 */
export function LocaleProvider({
  initialLocale,
  children,
}: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Language>(initialLocale);
  const router = useRouter();

  const setLocale = useCallback(
    (next: Language) => {
      setLocaleState(next);
      if (typeof document !== 'undefined') {
        // Persist for one year. Path=/ so the cookie applies sitewide.
        document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
      }
      // Refresh so server components reading the cookie re-render.
      router.refresh();
    },
    [router],
  );

  const t = useCallback(
    (key: TranslationKey) => {
      const bundle = MESSAGES[locale];
      const value = bundle?.[key];
      if (value) return value;
      // Fall back to Mongolian then to the key itself so missing
      // translations surface visibly during development.
      return MESSAGES.MN[key] ?? key;
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

/**
 * Read locale + setLocale + t() in a client component. Throws if used
 * outside of <LocaleProvider/> — that's a programming error.
 */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used inside <LocaleProvider />');
  }
  return ctx;
}

/** Sugar: directly access the translator in a client component. */
export function useTranslation() {
  return useLocale().t;
}
