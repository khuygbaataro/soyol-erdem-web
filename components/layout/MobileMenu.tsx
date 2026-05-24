'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ChevronRight, Mountain, Newspaper, School, Scroll, X } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { Button } from '@/components/ui/Button';
import { NAV_ITEMS } from '@/lib/constants';
import type { Language } from '@/lib/constants';
import { useTranslation } from '@/components/system/LocaleProvider';
import type { TranslationKey } from '@/lib/i18n/messages';

const NAV_KEYS: Record<string, TranslationKey> = {
  '/': 'nav.home',
  '/about': 'nav.about',
  '/programs': 'nav.programs',
  '/research': 'nav.research',
  '/student-life': 'nav.studentLife',
  '/international': 'nav.international',
  '/news': 'nav.news',
};

// Mirror of the desktop utility-bar items so mobile visitors can also
// jump to the high-school sub-site, library, newspaper and regulations
// from the drawer. The featured high-school link gets a gold-accented
// pill treatment to keep parity with the desktop bar.
const UTILITY_LINKS: Array<{
  key: TranslationKey;
  href: string;
  icon: typeof BookOpen;
  featured?: boolean;
}> = [
  {
    key: 'header.utility.highSchool',
    href: '/high-school',
    icon: School,
    featured: true,
  },
  { key: 'header.utility.library', href: '/library', icon: BookOpen },
  { key: 'header.utility.newspaper', href: '/sonin-hewlel', icon: Newspaper },
  { key: 'header.utility.regulations', href: '/regulations', icon: Scroll },
  { key: 'header.utility.shiliinBulag', href: '/shiliin-bulag', icon: Mountain },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

/**
 * Full-screen drawer triggered from the header on small screens.
 * Locks body scroll while open.
 */
export function MobileMenu({
  isOpen,
  onClose,
  currentLang,
  onLangChange,
}: MobileMenuProps) {
  const t = useTranslation();
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col bg-white"
        >
          <div className="flex items-center justify-between border-b border-border-light px-4 py-4">
            <Logo withLabel />
            <button
              type="button"
              onClick={onClose}
              aria-label={t('common.close')}
              className="flex h-10 w-10 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-cream-soft"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const tKey = NAV_KEYS[item.href];
                const label = tKey ? t(tKey) : item.label;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-navy-900 transition-colors hover:bg-cream-soft"
                    >
                      {label}
                      <ChevronRight className="h-4 w-4 text-text-muted" />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mirror of the desktop utility bar — high-school sibling
                site + library / newspaper / regulations quick portals.
                Sits below the primary nav with a thin separator so it
                reads as a distinct section. The featured high-school
                link gets a gold pill to match the desktop treatment. */}
            <div className="mt-6 border-t border-border-light pt-5">
              <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                {t('footer.importantLinks')}
              </p>
              <ul className="space-y-1.5">
                {UTILITY_LINKS.map((u) => {
                  const Icon = u.icon;
                  return (
                    <li key={u.key}>
                      <Link
                        href={u.href}
                        onClick={onClose}
                        className={
                          u.featured
                            ? 'flex items-center justify-between rounded-lg bg-gold-500/15 px-3 py-3 text-sm font-bold uppercase tracking-[0.04em] text-navy-900 ring-1 ring-gold-500/40 transition-colors hover:bg-gold-500 hover:text-navy-900'
                            : 'flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-navy-900 transition-colors hover:bg-cream-soft'
                        }
                      >
                        <span className="inline-flex items-center gap-2.5">
                          <Icon className={u.featured ? 'h-4 w-4 text-gold-500' : 'h-4 w-4 text-text-muted'} />
                          {t(u.key)}
                        </span>
                        <ChevronRight className="h-4 w-4 text-text-muted" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <div className="space-y-4 border-t border-border-light px-6 py-5">
            <LanguageSwitch
              currentLang={currentLang}
              onChange={(lang) => {
                onLangChange(lang);
              }}
            />
            <Button
              href="/admission"
              variant="accent"
              size="lg"
              icon={<ChevronRight className="h-5 w-5" />}
              className="w-full"
            >
              {t('nav.admission')}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
