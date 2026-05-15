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
import { cn } from '@/lib/utils';

/**
 * Sticky header for the /high-school sub-site.
 *
 * Visually distinct from the main university Header:
 *  • Two-row layout (utility bar + main row) but uses a slightly warmer
 *    palette and shows a "← Дээд сургуульд буцах" link in the utility bar so
 *    visitors always know they're inside a sibling sub-site.
 *  • The main row carries a 高 kanji crest beside the school name to mark
 *    the high-school identity.
 *  • Sub-nav lists only the high-school sections (Нүүр, Танилцуулга,
 *    Хөтөлбөр, Мэдээ, Холбоо).
 *  • Below xl the nav collapses into a slide-in mobile drawer.
 */
export function HighSchoolHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    const path = href.split('#')[0];
    if (path === '/high-school') return pathname === '/high-school';
    return pathname?.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Utility bar — back-to-university link + contact */}
        <div className="border-b border-white/5 bg-navy-900 text-[12.5px] text-white/85">
          <Container className="flex h-[40px] flex-nowrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#f5b06b]"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              <span>Дээд сургуульд буцах</span>
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

        {/* Main row — high-school identity + sub-nav */}
        <div className="bg-[#142a47]/95 shadow-[0_2px_24px_rgba(13,21,48,0.45)] backdrop-blur supports-[backdrop-filter]:bg-[#142a47]/92">
          <Container className="flex h-[80px] flex-nowrap items-center justify-between gap-8">
            <Link
              href="/high-school"
              className="group flex shrink-0 items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
              aria-label="Ахлах сургуулийн нүүр хуудас"
            >
              <Image
                src="/ahlal-logo-new.png"
                alt="Соёл Эрдэм Ахлах Сургуулийн лого"
                width={76}
                height={76}
                priority
                className="shrink-0 object-contain"
                style={{ width: 76, height: 76 }}
              />
              <span className="flex flex-col items-center font-serif font-bold tracking-tight text-white">
                <span className="text-xl leading-tight md:text-2xl">
                  СОЁЛ ЭРДЭМ
                </span>
                <span className="text-lg leading-tight text-white/95 md:text-xl">
                  Сургууль
                </span>
              </span>
            </Link>

            <nav className="hidden min-w-0 flex-1 flex-nowrap items-stretch justify-center gap-1 xl:flex">
              {HIGH_SCHOOL_NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group/nav flex items-center whitespace-nowrap rounded-md px-3 text-[12.5px] font-bold uppercase tracking-[0.06em] transition-colors duration-200 2xl:px-4 2xl:text-[13px]',
                      'hover:bg-white/[0.06]',
                      active ? 'text-white' : 'text-white/85 hover:text-white',
                    )}
                  >
                    <span className="relative inline-block py-1.5">
                      {item.label}
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
                Ахлах Сургууль
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Цэс хаах"
                className="flex h-10 w-10 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-cream-soft"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-1">
                {HIGH_SCHOOL_NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-navy-900 transition-colors hover:bg-cream-soft"
                    >
                      {item.label}
                      <ChevronRight className="h-4 w-4 text-text-muted" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="mt-6 flex items-center gap-2 rounded-lg border border-border-light px-3 py-3 text-sm font-semibold text-text-muted transition-colors hover:bg-cream-soft hover:text-navy-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Дээд сургуульд буцах
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
                Элсэлт
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
