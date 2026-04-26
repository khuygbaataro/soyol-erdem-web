'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

/**
 * Functional accordion with single-open behaviour.
 */
export function Accordion({ items, className }: AccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className={cn('divide-y divide-border-light rounded-card border border-border-light bg-white', className)}>
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx}>
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-cream-soft"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-text-heading">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-navy-900 transition-transform duration-300',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
            <div
              className={cn(
                'grid overflow-hidden px-5 transition-all duration-300',
                isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden text-sm leading-relaxed text-text-body">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
