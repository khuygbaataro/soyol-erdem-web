'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Loader2,
  Maximize2,
  Minus,
  MoveHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  X,
} from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useTranslation } from '@/components/system/LocaleProvider';

// PDF.js worker — load from unpkg CDN to avoid bundling.
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface NewspaperReaderProps {
  pdfUrl: string;
  issueNumber: number;
  issueTitle?: string | null;
  publishedAt?: Date | null;
  /**
   * Header eyebrow label, default "Соёл Эрдэм · Сонин хэвлэл". Passable
   * so the same reader can power /regulations and other PDF surfaces.
   */
  eyebrow?: string;
  /**
   * Whether to render the "№<n>" prefix before the title. Newspapers use
   * it, regulations don't. Defaults to true.
   */
  showIssueNumber?: boolean;
}

type FitMode = 'page' | 'width';

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

/**
 * Newspaper-specific PDF reader. Different reading model from the journal
 * flipbook:
 *  • Thumbnail rail on the left so readers can jump straight to a page
 *    instead of leafing one-by-one — the way you scan a newspaper.
 *  • Top toolbar with fit-page / fit-width, +/- zoom and a page-jump input.
 *  • A single page in the centre, scrollable when zoomed in (so people can
 *    actually read small body copy in articles).
 *  • Paper-coloured chrome instead of the dark book stage — the journal is
 *    a leather-bound volume, the newspaper is a printed sheet on a desk.
 */
export function NewspaperReader({
  pdfUrl,
  issueNumber,
  issueTitle,
  publishedAt,
  eyebrow,
  showIssueNumber = true,
}: NewspaperReaderProps) {
  const t = useTranslation();
  // Eyebrow defaults to the locale-aware "Soyol Erdem · Newspaper"
  // string. Callers (regulations etc.) can still override via prop.
  const resolvedEyebrow = eyebrow ?? t('newspaper.eyebrow');
  const [numPages, setNumPages] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fitMode, setFitMode] = useState<FitMode>('page');
  const [scale, setScale] = useState(1);
  const [thumbsOpen, setThumbsOpen] = useState(true);
  const [pageInput, setPageInput] = useState('1');
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const thumbsRailRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLButtonElement>(null);

  // Recompute stage size on resize, sidebar toggle, or fit-mode change.
  useEffect(() => {
    const compute = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-collapse thumbs on small screens; user can re-open via toolbar.
      if (mobile) setThumbsOpen(false);

      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setStageSize({ w: rect.width, h: rect.height });
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Recompute when sidebar visibility changes (it shifts the stage width).
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    // Defer one frame so the layout has settled.
    const id = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      setStageSize({ w: rect.width, h: rect.height });
    });
    return () => cancelAnimationFrame(id);
  }, [thumbsOpen]);

  // Newspaper PDFs are typically tabloid / A3 portrait (~0.71 ratio).
  // We don't know the real ratio until the PDF loads, but 0.71 is a safe
  // starting estimate so the layout doesn't jump when the page renders.
  const PAGE_RATIO = 0.71;

  const basePageWidth = useMemo(() => {
    if (!stageSize.w || !stageSize.h) return 600;
    const padding = 48; // breathing room around the page
    if (fitMode === 'page') {
      const widthByHeight = (stageSize.h - padding) * PAGE_RATIO;
      return Math.min(stageSize.w - padding, widthByHeight);
    }
    return stageSize.w - padding;
  }, [stageSize, fitMode]);

  const pageWidth = Math.max(240, Math.floor(basePageWidth * scale));

  const goTo = useCallback(
    (n: number) => {
      if (!numPages) return;
      const clamped = Math.min(Math.max(1, n), numPages);
      setCurrentPage(clamped);
      setPageInput(String(clamped));
      stageRef.current?.scrollTo({ top: 0, left: 0 });
    },
    [numPages],
  );

  // Keyboard navigation — left/right arrows flip pages.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack typing in inputs.
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(currentPage - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(currentPage + 1);
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setScale((s) => Math.min(MAX_SCALE, +(s + SCALE_STEP).toFixed(2)));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setScale((s) => Math.max(MIN_SCALE, +(s - SCALE_STEP).toFixed(2)));
      } else if (e.key === '0') {
        e.preventDefault();
        setScale(1);
        setFitMode('page');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentPage, goTo]);

  // Keep the active thumbnail visible.
  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    });
  }, [currentPage]);

  // Reset zoom whenever the user changes fit mode — feels less surprising.
  function changeFit(mode: FitMode) {
    setFitMode(mode);
    setScale(1);
  }

  function submitPageInput(e: React.FormEvent) {
    e.preventDefault();
    const n = parseInt(pageInput, 10);
    if (Number.isFinite(n)) goTo(n);
  }

  const dateLabel = publishedAt
    ? new Date(publishedAt).toLocaleDateString('mn-MN', {
        year: 'numeric',
        month: 'long',
      })
    : null;

  return (
    <Document
      file={pdfUrl}
      onLoadSuccess={({ numPages: n }) => {
        setNumPages(n);
        setLoaded(true);
      }}
      loading={
        <div className="flex h-screen w-screen items-center justify-center bg-[#f5efe3] text-navy-900">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="text-sm font-semibold">{t('reader.loading')}</p>
          </div>
        </div>
      }
      error={
        <div className="flex h-screen w-screen items-center justify-center bg-[#f5efe3] text-navy-900">
          <p className="text-sm">{t('reader.loadError')}</p>
        </div>
      }
    >
      <div className="flex h-screen w-screen flex-col bg-[#f5efe3] text-navy-900">
        {/* ── Masthead ─────────────────────────────────────────────── */}
        <header className="relative z-10 border-b border-navy-900/15 bg-white/85 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[10px] font-bold tracking-tight text-gold-400">
                {t('newspaper.brandShort')}
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gold-500 sm:text-[10px]">
                  {resolvedEyebrow}
                </p>
                <p className="truncate font-serif text-base font-bold leading-tight sm:text-lg">
                  {showIssueNumber && <>№{issueNumber}</>}
                  {showIssueNumber && issueTitle ? ' · ' : ''}
                  {issueTitle}
                  {dateLabel ? (
                    <span className="ml-2 text-xs font-normal text-text-body sm:text-sm">
                      · {dateLabel}
                    </span>
                  ) : null}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={pdfUrl}
                download
                aria-label={t('reader.downloadAria')}
                className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/15 bg-white px-3 py-1.5 text-xs font-semibold text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-500"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t('reader.download')}</span>
              </a>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={t('reader.openNewTab')}
                className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/15 bg-white px-3 py-1.5 text-xs font-semibold text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-500"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">PDF</span>
              </a>
            </div>
          </div>

          {/* ── Toolbar ────────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-navy-900/10 bg-cream-soft/80 px-3 py-2 sm:px-6">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setThumbsOpen((v) => !v)}
                aria-label={thumbsOpen ? t('reader.closeList') : t('reader.openList')}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-navy-900/15 bg-white text-navy-900 hover:border-gold-500 hover:text-gold-500"
              >
                {thumbsOpen ? (
                  <PanelLeftClose className="h-4 w-4" />
                ) : (
                  <PanelLeftOpen className="h-4 w-4" />
                )}
              </button>

              <div className="mx-1 h-5 w-px bg-navy-900/15" />

              <button
                type="button"
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label={t('reader.previousPage')}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-navy-900/15 bg-white text-navy-900 hover:border-gold-500 hover:text-gold-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <form onSubmit={submitPageInput} className="flex items-center gap-1.5">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value.replace(/[^0-9]/g, ''))}
                  onBlur={submitPageInput}
                  aria-label={t('reader.jumpTo')}
                  className="h-8 w-12 rounded-md border border-navy-900/15 bg-white text-center text-sm font-semibold tabular-nums text-navy-900 outline-none focus:border-gold-500"
                />
                <span className="text-sm text-text-body">/ {numPages || '–'}</span>
              </form>

              <button
                type="button"
                onClick={() => goTo(currentPage + 1)}
                disabled={!numPages || currentPage >= numPages}
                aria-label={t('reader.nextPage')}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-navy-900/15 bg-white text-navy-900 hover:border-gold-500 hover:text-gold-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(MIN_SCALE, +(s - SCALE_STEP).toFixed(2)))}
                disabled={scale <= MIN_SCALE}
                aria-label={t('reader.zoomOut')}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-navy-900/15 bg-white text-navy-900 hover:border-gold-500 hover:text-gold-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[3.25rem] text-center text-xs font-semibold tabular-nums text-navy-900">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(MAX_SCALE, +(s + SCALE_STEP).toFixed(2)))}
                disabled={scale >= MAX_SCALE}
                aria-label={t('reader.zoomIn')}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-navy-900/15 bg-white text-navy-900 hover:border-gold-500 hover:text-gold-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>

              <div className="mx-1 h-5 w-px bg-navy-900/15" />

              <button
                type="button"
                onClick={() => changeFit('page')}
                aria-pressed={fitMode === 'page'}
                aria-label={t('reader.fitPage')}
                title={t('reader.fitPage')}
                className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-semibold transition-colors ${
                  fitMode === 'page'
                    ? 'border-gold-500 bg-gold-500/15 text-navy-900'
                    : 'border-navy-900/15 bg-white text-navy-900 hover:border-gold-500'
                }`}
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t('reader.fitPageShort')}</span>
              </button>
              <button
                type="button"
                onClick={() => changeFit('width')}
                aria-pressed={fitMode === 'width'}
                aria-label={t('reader.fitWidth')}
                title={t('reader.fitWidth')}
                className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-semibold transition-colors ${
                  fitMode === 'width'
                    ? 'border-gold-500 bg-gold-500/15 text-navy-900'
                    : 'border-navy-900/15 bg-white text-navy-900 hover:border-gold-500'
                }`}
              >
                <MoveHorizontal className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{t('reader.fitWidthShort')}</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── Body: thumbs rail + page stage ──────────────────────── */}
        <div className="relative flex flex-1 overflow-hidden">
          {/* Thumbnail rail. On mobile it overlays the stage as a drawer. */}
          {thumbsOpen && (
            <>
              {/* Backdrop on mobile only */}
              {isMobile && (
                <button
                  type="button"
                  aria-label={t('reader.closeList')}
                  onClick={() => setThumbsOpen(false)}
                  className="absolute inset-0 z-10 bg-navy-900/40 md:hidden"
                />
              )}
              <aside
                ref={thumbsRailRef}
                className={`${
                  isMobile
                    ? 'absolute left-0 top-0 z-20 h-full w-44 shadow-xl'
                    : 'relative h-full w-40 shrink-0 lg:w-48'
                } overflow-y-auto border-r border-navy-900/10 bg-white/70`}
              >
                <div className="sticky top-0 z-10 flex items-center justify-between bg-white/95 px-3 py-2 backdrop-blur">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-body">
                    {t('reader.pages')}
                  </p>
                  {isMobile && (
                    <button
                      type="button"
                      onClick={() => setThumbsOpen(false)}
                      aria-label={t('common.close')}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-md text-navy-900 hover:bg-navy-900/5"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <div className="flex flex-col items-center gap-2 px-2 py-3">
                  {loaded &&
                    Array.from({ length: numPages }, (_, i) => {
                      const n = i + 1;
                      const active = n === currentPage;
                      return (
                        <button
                          key={n}
                          ref={active ? activeThumbRef : undefined}
                          type="button"
                          onClick={() => {
                            goTo(n);
                            if (isMobile) setThumbsOpen(false);
                          }}
                          className={`group flex w-full flex-col items-center gap-1 rounded-md p-1.5 transition-colors ${
                            active
                              ? 'bg-gold-500/15 ring-1 ring-gold-500'
                              : 'hover:bg-navy-900/5'
                          }`}
                        >
                          <div className="overflow-hidden rounded-sm border border-navy-900/15 bg-white shadow-sm">
                            <Page
                              pageNumber={n}
                              width={120}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                              loading={
                                <div
                                  style={{
                                    width: 120,
                                    height: 120 / PAGE_RATIO,
                                  }}
                                  className="flex items-center justify-center"
                                >
                                  <Loader2 className="h-3 w-3 animate-spin text-text-muted" />
                                </div>
                              }
                            />
                          </div>
                          <span
                            className={`text-[11px] font-semibold tabular-nums ${
                              active ? 'text-navy-900' : 'text-text-body'
                            }`}
                          >
                            {n}
                          </span>
                        </button>
                      );
                    })}
                </div>
              </aside>
            </>
          )}

          {/* Page stage */}
          <div
            ref={stageRef}
            className="flex-1 overflow-auto bg-[#ece3d1]"
            style={{ scrollbarGutter: 'stable' }}
          >
            <div className="flex min-h-full min-w-full items-start justify-center p-4 sm:p-6">
              <div
                className="bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] ring-1 ring-navy-900/10"
                style={{ width: pageWidth }}
              >
                {loaded && numPages > 0 && (
                  <Page
                    key={`${currentPage}-${pageWidth}`}
                    pageNumber={currentPage}
                    width={pageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    loading={
                      <div
                        style={{ width: pageWidth, height: pageWidth / PAGE_RATIO }}
                        className="flex items-center justify-center"
                      >
                        <Loader2 className="h-6 w-6 animate-spin text-text-muted" />
                      </div>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Document>
  );
}
