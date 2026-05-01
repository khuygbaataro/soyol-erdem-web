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
import type { Language } from '@/lib/constants';
import { cn } from '@/lib/utils';

// TODO: replace with real URLs when available
const UTILITY_LINKS = [
  { label: 'Сонин хэвлэл', href: '/news', external: false },
  { label: 'xCloud', href: 'https://xcloud.example.com', external: true },
  { label: 'Cisco', href: 'https://cisco.example.com', external: true },
  { label: 'Moodle', href: 'https://moodle.example.com', external: true },
];

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

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Utility bar — darker shade for visual layering */}
        <div className="border-b border-white/5 bg-[#0d1530] text-[12.5px] text-white/85">
          <Container className="flex h-[40px] flex-nowrap items-center justify-between gap-4">
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
              {/* Language switcher — moved up from the main row to avoid crowding the nav */}
              <LanguageSwitch
                currentLang={lang}
                onChange={setLang}
                invert
                className="text-[12.5px]"
              />

              <span className="hidden h-4 w-px bg-white/15 md:block" aria-hidden />

              <ul className="hidden items-center divide-x divide-white/15 sm:flex">
                {UTILITY_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="block px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-[#f5b06b]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="block px-3 py-1.5 transition-colors hover:bg-white/10 hover:text-[#f5b06b]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>

        {/* Main row — heavy navy, matches user's request */}
        <div className="bg-[#1d2942]/95 shadow-[0_2px_24px_rgba(13,21,48,0.45)] backdrop-blur supports-[backdrop-filter]:bg-[#1d2942]/85">
          <Container className="flex h-[88px] flex-nowrap items-center justify-between gap-6">
            <Link
              href="/"
              className="flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.02]"
              aria-label="Нүүр хуудас"
            >
              <Logo withLabel size={50} invert />
            </Link>

            <nav className="hidden min-w-0 flex-1 flex-nowrap items-stretch justify-center gap-0.5 xl:flex">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative flex items-center whitespace-nowrap rounded-md px-3.5 text-[14px] font-semibold tracking-wide text-white/85 transition-all duration-200',
                      'hover:bg-white/[0.06] hover:text-white',
                      'after:pointer-events-none after:absolute after:bottom-3 after:left-3.5 after:right-3.5 after:h-[2px] after:origin-center after:scale-x-0 after:rounded-full after:bg-gold-500 after:transition-transform after:duration-300 after:ease-out',
                      'hover:after:scale-x-75',
                      isActive && 'text-white after:scale-x-100',
                    )}
                  >
                    {item.label}
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
              >
                Элсэх
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
        onLangChange={setLang}
      />
    </>
  );
}
