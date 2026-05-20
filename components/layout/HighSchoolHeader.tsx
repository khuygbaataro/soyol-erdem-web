'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ChevronRight, Mail, Menu, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Container } from './Container';
import { Button } from '@/components/ui/Button';
import { HIGH_SCHOOL, HIGH_SCHOOL_NAV_ITEMS } from '@/lib/constants';
import { useTranslation } from '@/components/system/LocaleProvider';
import type { TranslationKey } from '@/lib/i18n/messages';
import { cn } from '@/lib/utils';

const HS_NAV_KEYS: Record<string, TranslationKey> = {
  '/high-school': 'hsNav.home',
  '/high-school/about': 'hsNav.about',
  '/high-school/programs': 'hsNav.programs',
  '/high-school/admission': 'hsNav.admission',
  '/high-school/news': 'hsNav.news',
  '/high-school/contact': 'hsNav.contact',
};

/**
 * Sticky header for the /high-school sub-site.
 *
 * Mirrors the redesigned main university Header: a slim navy utility
 * strip on top (← back-to-university + contact info) and a bright main
 * row carrying the high-school identity (logo + wordmark), sub-nav and
 * the gold admission CTA. The bright surface differentiates it from the
 * earlier all-navy bar and lets the gold "Элсэлт" button pull focus.
 *
 * Below xl the nav collapses into a slide-in mobile drawer.
 */
export function HighSchoolHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslation();

  const isActive = (href: string) => {
    const path = href.split('#')[0];
    if (path === '/high-school') return pathname === '/high-school';
    return pathname?.startsWith(path);
  };

  // "Элсэлт" already lives on the right-side gold CTA button, so we
  // skip it inside the main nav list to avoid a duplicate label.
  const visibleNavItems = HIGH_SCHOOL_NAV_ITEMS.filter(
    (item) => item.href !== '/high-school/admission',
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Slim navy utility strip — back-link + contact */}
        <div className="bg-navy-900 text-[12px] text-white/85">
          <Container className="flex h-[36px] flex-nowrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#f5b06b]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              <span>{t('hsNav.backToUniversity')}</span>
            </Link>

            <div className="hidden items-center gap-5 md:flex">
              <a
                href={`tel:${HIGH_SCHOOL.contact.phonePrimary.replace('-', '')}`}
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                <span>{HIGH_SCHOOL.contact.phonePrimary}</span>
              </a>
              <a
                href={`mailto:${HIGH_SCHOOL.contact.email}`}
                className="hidden items-center gap-1.5 transition-colors hover:text-white lg:flex"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                <span>{HIGH_SCHOOL.contact.email}</span>
              </a>
            </div>
          </Container>
        </div>

        {/* Bright main row — high-school identity + sub-nav */}
        <div className="border-b border-border-light bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur supports-[backdrop-filter]:bg-white/90">
          <Container className="flex h-[84px] flex-nowrap items-center justify-between gap-8">
            <Link
              href="/high-school"
              className="group flex shrink-0 items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
              aria-label={t('brand.highSchoolHomeAria')}
            >
              <Image
                src="/ahlal-logo-new.png"
                alt={t('brand.highSchoolLogoAlt')}
                width={64}
                height={64}
                priority
                className="shrink-0 object-contain"
                style={{ width: 64, height: 64 }}
              />
              <span className="hidden flex-col leading-tight md:flex">
                <span className="font-serif text-[15px] font-extrabold uppercase tracking-[0.14em] text-navy-900">
                  {t('brand.short')}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-500">
                  {t('brand.highSchoolShort')}
                </span>
              </span>
            </Link>

            <nav className="hidden min-w-0 flex-1 flex-nowrap items-stretch justify-center gap-1 xl:flex">
              {visibleNavItems.map((item) => {
                const active = isActive(item.href);
                const tKey = HS_NAV_KEYS[item.href];
                const label = tKey ? t(tKey) : item.label;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group/nav flex items-center whitespace-nowrap rounded-md px-3 text-[12.5px] font-bold uppercase tracking-[0.06em] transition-colors duration-200 2xl:px-4 2xl:text-[13px]',
                      'hover:bg-navy-900/[0.04]',
                      active ? 'text-navy-900' : 'text-text-heading/80 hover:text-navy-900',
                    )}
                  >
                    <span className="relative inline-block py-1.5">
                      {label}
                      <span
                        aria-hidden
                        className={cn(
                          'pointer-events-none absolute inset-x-0 -bottom-1 h-[2.5px] origin-center rounded-full bg-gold-500 transition-transform duration-300 ease-out',
                          active
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover/nav:scale-x-75',
                        )}
                      />
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden shrink-0 items-center gap-3 xl:flex">
              <Button
                href="/high-school/admission"
                variant="accent"
                size="md"
                icon={<ChevronRight className="h-4 w-4" />}
                className="uppercase tracking-[0.08em]"
              >
                {t('hsNav.admission')}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t('common.openMenu')}
              className="flex h-12 w-12 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-900/5 xl:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </Container>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex flex-col bg-white"
          >
            <div className="flex items-center justify-between border-b border-border-light px-4 py-4">
              <span className="font-serif text-base font-bold text-navy-900">
                {t('brand.highSchoolMobileSection')}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('common.close')}
                className="flex h-10 w-10 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-cream-soft"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-1">
                {visibleNavItems.map((item) => {
                  const tKey = HS_NAV_KEYS[item.href];
                  const label = tKey ? t(tKey) : item.label;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-navy-900 transition-colors hover:bg-cream-soft"
                      >
                        {label}
                        <ChevronRight className="h-4 w-4 text-text-muted" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="mt-6 flex items-center gap-2 rounded-lg border border-border-light px-3 py-3 text-sm font-semibold text-text-muted transition-colors hover:bg-cream-soft hover:text-navy-900"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('hsNav.backToUniversity')}
              </Link>
            </nav>
            <div className="space-y-3 border-t border-border-light px-6 py-5">
              <Button
                href="/high-school/admission"
                variant="accent"
                size="lg"
                icon={<ChevronRight className="h-5 w-5" />}
                className="w-full"
              >
                {t('hsNav.admission')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
