'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu } from 'lucide-react';
import { Container } from './Container';
import { MobileMenu } from './MobileMenu';
import { Logo } from '@/components/icons/Logo';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import { Button } from '@/components/ui/Button';
import { NAV_ITEMS } from '@/lib/constants';
import type { Language } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Sticky site header. Desktop nav appears at xl (1280px+) where 7 nav links,
 * language switch and CTA button fit comfortably on a single line. Below xl
 * we collapse to a hamburger drawer.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Language>('MN');
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-900/95 backdrop-blur supports-[backdrop-filter]:bg-navy-900/85">
        <Container className="flex h-20 flex-nowrap items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="Нүүр хуудас"
          >
            <Logo withLabel size={44} invert />
          </Link>

          <nav className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-0.5 xl:flex">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative whitespace-nowrap px-2.5 py-2 text-[13px] font-semibold text-white/90 transition-colors hover:text-white',
                    'after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-gold-500 after:transition-all after:duration-300',
                    'hover:after:w-3/4',
                    isActive && 'text-white after:w-3/4',
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
