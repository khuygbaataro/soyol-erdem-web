'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// PDF.js worker — load from unpkg CDN to avoid bundling.
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface JournalFlipbookProps {
  /** URL of the PDF (e.g. /journals/sp-2024-n1.pdf). */
  pdfUrl: string;
  /** Optional title shown in the toolbar above the book. */
  title?: string;
}

const PageWrapper = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; pageNumber: number }
>(function PageWrapperImpl({ children }, ref) {
  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden bg-white"
    >
      {children}
    </div>
  );
});

/**
 * Page-flipping PDF reader. Renders every page of a PDF with PDF.js (via
 * react-pdf) and stacks them inside react-pageflip's HTMLFlipBook so the
 * reader feels like leafing through a printed journal.
 */
export function JournalFlipbook({ pdfUrl, title }: JournalFlipbookProps) {
  const [numPages, setNumPages] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState({ w: 480, h: 680 });
  const flipRef = useRef<unknown>(null);

  // Resize the book to the available viewport. Aim for two-page spread when
  // wide enough, single page when narrow.
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Reserve room for top toolbar (56) + bottom controls (72) + padding.
      const maxH = vh - 180;
      const maxW = vw - 32;
      const ratio = 0.71; // ~A4 portrait
      let h = Math.min(maxH, 880);
      let w = h * ratio;
      // Two-page spread fits if 2*w + gap < maxW
      if (2 * w + 32 > maxW) {
        w = Math.min(w, (maxW - 16) / 2);
        h = w / ratio;
      }
      setPageSize({ w: Math.floor(w), h: Math.floor(h) });
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  function handleFlip(e: { data: number }) {
    setCurrentPage(e.data);
  }

  function flip(direction: 'prev' | 'next') {
    const book = flipRef.current as
      | { pageFlip: () => { flipPrev: () => void; flipNext: () => void } }
      | null;
    if (!book) return;
    if (direction === 'prev') book.pageFlip().flipPrev();
    else book.pageFlip().flipNext();
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-between gap-4">
      {title && (
        <p className="text-center text-sm font-semibold text-white/80">
          {title}
        </p>
      )}

      <div className="flex w-full flex-1 items-center justify-center">
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages: n }) => {
            setNumPages(n);
            setLoaded(true);
          }}
          loading={
            <div className="flex flex-col items-center gap-3 text-white/80">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="text-sm">Сэтгүүлийг ачаалж байна…</p>
            </div>
          }
          error={
            <p className="text-sm text-red-300">
              PDF-ийг ачаалж чадсангүй. Дараа дахин оролдоно уу.
            </p>
          }
        >
          {loaded && numPages > 0 && (
            // The library's typings are loose; cast through `any` to keep
            // the call site readable.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <HTMLFlipBook
              {...({
                ref: flipRef,
                width: pageSize.w,
                height: pageSize.h,
                size: 'fixed',
                minWidth: 280,
                maxWidth: 1200,
                minHeight: 380,
                maxHeight: 1400,
                showCover: true,
                drawShadow: true,
                flippingTime: 700,
                usePortrait: true,
                startZIndex: 0,
                autoSize: false,
                maxShadowOpacity: 0.5,
                mobileScrollSupport: true,
                clickEventForward: true,
                useMouseEvents: true,
                swipeDistance: 30,
                showPageCorners: true,
                disableFlipByClick: false,
                onFlip: handleFlip,
                className: 'shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]',
              } as any)}
            >
              {Array.from({ length: numPages }, (_, i) => (
                <PageWrapper key={i} pageNumber={i + 1}>
                  <Page
                    pageNumber={i + 1}
                    width={pageSize.w}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    loading={
                      <div className="flex h-full w-full items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin text-text-muted" />
                      </div>
                    }
                  />
                </PageWrapper>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>

      {loaded && numPages > 0 && (
        <div className="flex items-center gap-3 text-white/85">
          <button
            type="button"
            onClick={() => flip('prev')}
            disabled={currentPage === 0}
            aria-label="Өмнөх хуудас"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="min-w-[6rem] text-center text-sm font-semibold tabular-nums">
            {currentPage + 1} / {numPages}
          </span>
          <button
            type="button"
            onClick={() => flip('next')}
            disabled={currentPage >= numPages - 1}
            aria-label="Дараагийн хуудас"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

// Re-export icons for convenience in the launcher component.
export { Maximize2, Minimize2 };
