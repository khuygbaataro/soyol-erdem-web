'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu, MapPin, Phone } from 'lucide-react';
import { Container } from './Container';
import { MobileMenu } from './MobileMenu';
import { Logo } from '@/components/icons/Logo';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { Button } from '@/components/ui/Button';
import { NAV_ITEMS, SITE } from '@/lib/constants';
import { useLocale } from '@/components/system/LocaleProvider';
import type { TranslationKey } from '@/lib/i18n/messages';
import { cn } from '@/lib/utils';

// Utility-bar links. The high-school card sits first and renders as a
// gold-accented pill so it pulls focus as a sibling institution; library
// / newspaper trail it as quick-access portals. xCloud / Cisco / Moodle
// were trimmed earlier (now reachable from the footer "Чухал холбоос"
// column).
const UTILITY_LINKS = [
  {
    key: 'header.utility.highSchool' as TranslationKey,
    href: '/high-school',
    external: false,
    featured: true,
  },
  { key: 'header.utility.library' as TranslationKey, href: '/library', external: false, featured: false },
  { key: 'header.utility.newspaper' as TranslationKey, href: '/sonin-hewlel', external: false, featured: false },
  { key: 'header.utility.regulations' as TranslationKey, href: '/regulations', external: false, featured: false },
] as const;

// Main nav labels are looked up at render time so they translate with
// the active locale. `key` maps onto i18n/messages, `href` stays in MN.
const NAV_KEYS: Record<string, TranslationKey> = {
  '/': 'nav.home',
  '/about': 'nav.about',
  '/programs': 'nav.programs',
  '/research': 'nav.research',
  '/student-life': 'nav.studentLife',
  '/international': 'nav.international',
  '/news': 'nav.news',
};

/**
 * Sticky two-row site header.
 *
 *   • Top utility strip — slim navy bar with phone/address (md+ left) and
 *     external service links + language switch (right). Acts as a
 *     wayfinding stripe above the main bar.
 *   • Main row — bright cream/white surface with logo + wordmark, primary
 *     nav (xl+) and admission CTA. The bright surface is the requested
 *     refresh: it pulls focus onto the wordmark + nav and pairs cleanly
 *     with the Montserrat heading face the brand now uses.
 *
 * Below xl the primary nav collapses into a hamburger drawer.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Slim navy utility strip */}
        <div className="bg-navy-900 text-[12px] text-white/85">
          <Container className="flex min-h-[36px] flex-nowrap items-center justify-between gap-4 py-1">
            <div className="hidden items-center gap-5 md:flex">
              <a
                href={`tel:${SITE.contact.phone.replace('-', '')}`}
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                <span>{SITE.contact.phone}</span>
              </a>
              <span className="hidden items-center gap-1.5 lg:flex">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                <span>{t('header.address')}</span>
              </span>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <ul className="hidden items-center gap-1 lg:flex">
                {UTILITY_LINKS.map((link) => {
                  const label = t(link.key);
                  return (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        className={cn(
                          'transition-colors',
                          link.featured
                            ? 'inline-flex items-center rounded-full bg-gold-500/15 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.06em] text-gold-400 ring-1 ring-gold-500/40 hover:bg-gold-500 hover:text-navy-900 hover:ring-gold-500'
                            : 'block px-2.5 py-1 hover:bg-white/10 hover:text-[#f5b06b]',
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <span className="hidden h-4 w-px bg-white/15 lg:block" aria-hidden />

              <LanguageSwitch
                currentLang={locale}
                onChange={setLocale}
                invert
                className="text-[12px]"
              />
            </div>
          </Container>
        </div>

        {/* Bright main row */}
        <div className="border-b border-border-light bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur supports-[backdrop-filter]:bg-white/90">
          <Container className="flex h-[84px] flex-nowrap items-center justify-between gap-8">
            <Link
              href="/"
              className="group flex h-full shrink-0 items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
              aria-label={t('brand.universityHomeAria')}
            >
              <Logo size={64} />
              <span className="hidden flex-col leading-tight md:flex">
                <span className="font-serif text-[15px] font-extrabold uppercase tracking-[0.14em] text-navy-900">
                  {t('brand.short')}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-500">
                  Дээд сургууль
                </span>
              </span>
            </Link>

            <nav className="hidden min-w-0 flex-1 flex-nowrap items-stretch justify-center gap-1 xl:flex">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href));
                const tKey = NAV_KEYS[item.href];
                const label = tKey ? t(tKey) : item.label;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group/nav flex items-center whitespace-nowrap rounded-md px-3 text-[12.5px] font-bold uppercase tracking-[0.06em] transition-colors duration-200 2xl:px-4 2xl:text-[13px]',
                      'hover:bg-navy-900/[0.04]',
                      isActive ? 'text-navy-900' : 'text-text-heading/80 hover:text-navy-900',
                    )}
                  >
                    <span className="relative inline-block py-1.5">
                      {label}
                      <span
                        aria-hidden
                        className={cn(
                          'pointer-events-none absolute inset-x-0 -bottom-1 h-[2.5px] origin-center rounded-full bg-gold-500 transition-transform duration-300 ease-out',
                          isActive
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
                href="/admission"
                variant="accent"
                size="md"
                icon={<ChevronRight className="h-4 w-4" />}
                className="uppercase tracking-[0.08em]"
              >
                {t('nav.admission')}
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

      <MobileMenu
        isOpen={open}
        onClose={() => setOpen(false)}
        currentLang={locale}
        onLangChange={setLocale}
      />
    </>
  );
}
