'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { Button } from '@/components/ui/Button';
import { NAV_ITEMS } from '@/lib/constants';
import type { Language } from '@/lib/constants';

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
              aria-label="Цэс хаах"
              className="flex h-10 w-10 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-cream-soft"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-navy-900 transition-colors hover:bg-cream-soft"
                  >
                    {item.label}
                    <ChevronRight className="h-4 w-4 text-text-muted" />
                  </Link>
                </li>
              ))}
            </ul>
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
              Элсэх
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
