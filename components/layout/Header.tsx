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
 *  • Top utility bar — phone/address (left, md+), external service links (right).
 *  • Main row — logo, primary nav (xl+), language switch + admission CTA.
 * Below xl the primary nav collapses into a hamburger drawer.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Language>('MN');
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Utility bar */}
        <div className="bg-[#1d2942] text-[12.5px] text-white/80">
          <Container className="flex h-[38px] items-center justify-between gap-4">
            <div className="hidden items-center gap-5 md:flex">
              <a
                href={`tel:${SITE.contact.phone.replace('-', '')}`}
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                <span>{SITE.contact.phone}</span>
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                <span>Сүхбаатар дүүрэг, Улаанбаатар</span>
              </span>
            </div>

            <ul className="ml-auto flex items-center divide-x divide-white/15">
              {UTILITY_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="block px-3 py-1 transition-colors hover:bg-white/10 hover:text-[#f5b06b]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-3 py-1 transition-colors hover:bg-white/10 hover:text-[#f5b06b]"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </div>

        {/* Main row */}
        <div className="border-t border-gold-500/25 bg-[#2d3e5e]/95 backdrop-blur supports-[backdrop-filter]:bg-[#2d3e5e]/85">
          <Container className="flex h-[84px] flex-nowrap items-center justify-between gap-4">
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="Нүүр хуудас"
            >
              <Logo withLabel size={44} invert />
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
                      'relative flex items-center whitespace-nowrap px-3 text-[13px] font-semibold text-white/90 transition-colors hover:text-white',
                      'after:pointer-events-none after:absolute after:bottom-4 after:left-3 after:right-3 after:h-0.5 after:rounded-[2px] after:bg-gold-500 after:transition-opacity after:duration-300',
                      isActive ? 'text-white after:opacity-100' : 'after:opacity-0 hover:after:opacity-60',
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden shrink-0 items-center gap-4 xl:flex">
              <LanguageSwitch currentLang={lang} onChange={setLang} invert />
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
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 xl:hidden"
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
