'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu, MapPin, Phone } from 'lucide-react';
import { Container } from './Container';
import { MobileMenu } from './MobileMenu';
import { Logo } from '@/components/icons/Logo';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { Button } from '@/components/ui/Button';
import { NAV_ITEMS, SITE } from '@/lib/constants';
import type { Language } from '@/lib/constants';
import {
  readGoogleTranslateLang,
  setGoogleTranslateLang,
} from '@/lib/google-translate';
import { cn } from '@/lib/utils';

// Utility-bar links. The high-school card sits first and renders larger
// + gold-accented per Munkhchimeg's "ТОМООР БИЧЭЭД ӨГӨӨРЭЙ" note so it
// pulls focus as a sibling institution; library / newspaper trail it as
// quick-access portals. xCloud / Cisco / Moodle were trimmed earlier
// (now reachable from the footer "Чухал холбоос" column).
const UTILITY_LINKS = [
  {
    label: 'НЕБ-ЫН СОЁЛ ЭРДЭМ СУРГУУЛЬ',
    href: '/high-school',
    external: false,
    featured: true,
  },
  { label: 'Номын сан', href: '/library', external: false, featured: false },
  { label: 'Сонин хэвлэл', href: '/sonin-hewlel', external: false, featured: false },
  { label: 'Дүрэм журам', href: '/regulations', external: false, featured: false },
] as const;

/**
 * Sticky two-row site header.
 *
 *   • Top utility bar — phone/address (md+ left), language switch +
 *     external service links (right). Painted a hair darker than the
 *     main row so the two read as a layered set.
 *   • Main row — logo, primary nav (xl+) and the admission CTA.
 *
 * Below xl the primary nav collapses into a hamburger drawer.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Language>('MN');
  const pathname = usePathname();

  // Sync local highlight with whichever language Google Translate is
  // currently rendering. The cookie persists across navigations, so on
  // first paint we want the active pill to match what the user actually
  // sees on the page.
  useEffect(() => {
    setLang(readGoogleTranslateLang());
  }, []);

  function changeLang(next: Language) {
    setLang(next);
    // Set the Google cookie + reload so the translation applies to the
    // whole document, not just the components mounted right now.
    setGoogleTranslateLang(next);
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Utility bar — lighter navy on top. Slightly taller than before
            so the featured "НЕБ-ЫН СОЁЛ ЭРДЭМ СУРГУУЛЬ" pill has room to
            breathe without overlapping the row above it. */}
        <div className="border-b border-white/5 bg-navy-900 text-[12.5px] text-white/85">
          <Container className="flex min-h-[44px] flex-nowrap items-center justify-between gap-4 py-1">
            <div className="hidden items-center gap-6 md:flex">
              <a
                href={`tel:${SITE.contact.phone.replace('-', '')}`}
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                <span>{SITE.contact.phone}</span>
              </a>
              <span className="hidden items-center gap-1.5 lg:flex">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                <span>Сүхбаатар дүүрэг, Улаанбаатар</span>
              </span>
            </div>

            <div className="ml-auto flex items-center gap-3">
              {/* Featured high-school link sits first, rendered as a
                  gold-tinted pill so it pulls focus as a sibling
                  institution instead of blending into the utility row.
                  Library / Newspaper trail it as quick-access portals. */}
              <ul className="hidden items-center gap-2 lg:flex">
                {UTILITY_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={cn(
                          'transition-colors',
                          link.featured
                            ? 'inline-flex items-center rounded-full bg-gold-500/15 px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-[0.06em] text-gold-400 ring-1 ring-gold-500/40 hover:bg-gold-500 hover:text-navy-900 hover:ring-gold-500'
                            : 'block px-2.5 py-1.5 hover:bg-white/10 hover:text-[#f5b06b]',
                        )}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          'transition-colors',
                          link.featured
                            ? 'inline-flex items-center rounded-full bg-gold-500/15 px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-[0.06em] text-gold-400 ring-1 ring-gold-500/40 hover:bg-gold-500 hover:text-navy-900 hover:ring-gold-500'
                            : 'block px-2.5 py-1.5 hover:bg-white/10 hover:text-[#f5b06b]',
                        )}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <span className="hidden h-4 w-px bg-white/15 lg:block" aria-hidden />

              <LanguageSwitch
                currentLang={lang}
                onChange={changeLang}
                invert
                className="text-[12.5px]"
              />
            </div>
          </Container>
        </div>

        {/* Main row — darker navy now sits below the lighter utility bar */}
        <div className="bg-[#142a47]/95 shadow-[0_2px_24px_rgba(13,21,48,0.45)] backdrop-blur supports-[backdrop-filter]:bg-[#142a47]/92">
          <Container className="flex h-[80px] flex-nowrap items-center justify-between gap-8">
            <Link
              href="/"
              className="group flex h-full shrink-0 items-center transition-transform duration-300 hover:scale-[1.02]"
              aria-label="Соёл Эрдэм · Нүүр хуудас"
            >
              <Logo size={76} />
            </Link>

            <nav className="hidden min-w-0 flex-1 flex-nowrap items-stretch justify-center gap-1 xl:flex">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group/nav flex items-center whitespace-nowrap rounded-md px-3 text-[12.5px] font-bold uppercase tracking-[0.06em] transition-colors duration-200 2xl:px-4 2xl:text-[13px]',
                      'hover:bg-white/[0.06]',
                      isActive ? 'text-white' : 'text-white/85 hover:text-white',
                    )}
                  >
                    {/*
                      Underline sits directly beneath the label text (not the
                      stretched link box) so it visually anchors to "Сургалт",
                      "Эрдэм шинжилгээ", … rather than floating in the lower
                      half of the navbar.
                    */}
                    <span className="relative inline-block py-1.5">
                      {item.label}
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
                Элсэлт
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Цэс нээх"
              className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 xl:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </Container>
        </div>
      </header>

      <MobileMenu
        isOpen={open}
        onClose={() => setOpen(false)}
        currentLang={lang}
        onLangChange={changeLang}
      />
    </>
  );
}
