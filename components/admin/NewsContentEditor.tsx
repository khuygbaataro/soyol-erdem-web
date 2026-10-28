'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ImagePlus,
  Loader2,
  Trash2,
  Type,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { inputClasses, textareaClasses } from '@/components/admin/FormField';
import {
  DEFAULT_IMAGE_WIDTH,
  MAX_IMAGE_WIDTH,
  MIN_IMAGE_WIDTH,
  type NewsBlock,
  type NewsImageAlign,
  type NewsImageBlock,
} from '@/lib/news-content';

interface NewsContentEditorProps {
  /** Ordered blocks (controlled). */
  value: NewsBlock[];
  onChange: (next: NewsBlock[]) => void;
  /** Blob folder prefix for uploaded images. */
  folder?: 'news' | 'misc';
  /** Mirrors ImageUpload/MultiImageUpload — fires while an upload is in
   *  flight so the parent form can disable Save until it finishes. */
  onUploadingChange?: (uploading: boolean) => void;
}

/** Width presets offered as one-tap buttons. */
const WIDTH_PRESETS: Array<[label: string, value: number]> = [
  ['Жижиг', 25],
  ['Дунд', 50],
  ['Том', 75],
  ['Бүтэн', 100],
];

const ALIGN_OPTIONS: Array<[NewsImageAlign, string, typeof AlignLeft]> = [
  ['left', 'Зүүн', AlignLeft],
  ['center', 'Төв', AlignCenter],
  ['right', 'Баруун', AlignRight],
];

/**
 * Block-based content editor for the News body. Editors stack text and image
 * blocks in any order; each image block carries its own width (10–100% of the
 * content column) and alignment, with a live preview so sizing a QR code or a
 * poster is visual rather than guesswork. Images upload to Vercel Blob, same
 * pipeline as the cover / slideshow controls.
 */
export function NewsContentEditor({
  value,
  onChange,
  folder = 'news',
  onUploadingChange,
}: NewsContentEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  function update(idx: number, patch: Partial<NewsBlock>) {
    onChange(
      value.map((b, i) => (i === idx ? ({ ...b, ...patch } as NewsBlock) : b)),
    );
  }

  function remove(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  function move(idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }

  function addText() {
    onChange([...value, { type: 'text', text: '' }]);
  }

  async function handleFiles(files: FileList) {
    if (files.length === 0) return;
    setUploading(true);
    onUploadingChange?.(true);
    const added: NewsImageBlock[] = [];
    let errMsg: string | null = null;
    try {
      for (const file of Array.from(files)) {
        const blob = await upload(`${folder}/${Date.now()}-${file.name}`, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
        });
        added.push({
          type: 'image',
          url: blob.url,
          width: DEFAULT_IMAGE_WIDTH,
          align: 'center',
        });
      }
    } catch (err) {
      // Keep whatever uploaded before the failure so those Blobs aren't
      // orphaned (mirrors MultiImageUpload's partial-commit behaviour).
      errMsg = err instanceof Error ? err.message : 'Ачаалахад алдаа гарлаа';
    } finally {
      if (added.length > 0) {
        onChange([...value, ...added]);
        toast.success(`${added.length} зураг нэмэгдлээ`);
      }
      if (errMsg) toast.error(errMsg);
      setUploading(false);
      onUploadingChange?.(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
        }}
      />

      {value.length === 0 ? (
        <div className="rounded-card border-2 border-dashed border-border-medium bg-cream-soft px-4 py-8 text-center text-sm text-text-muted">
          Текст болон зураг нэмж агуулга бүрдүүлнэ үү.
        </div>
      ) : (
        <ol className="space-y-3">
          {value.map((block, idx) => (
            <li
              key={idx}
              className="rounded-card border border-border-light bg-white p-3 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-text-muted">
                  {block.type === 'text' ? (
                    <>
                      <Type className="h-3.5 w-3.5" /> Текст
                    </>
                  ) : (
                    <>
                      <ImagePlus className="h-3.5 w-3.5" /> Зураг
                    </>
                  )}
                </span>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(idx, -1)}
                    disabled={idx === 0}
                    aria-label="Дээш зөөх"
                    className="flex h-8 w-8 items-center justify-center rounded-button text-text-muted transition-colors hover:bg-cream-soft hover:text-navy-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text-muted"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(idx, 1)}
                    disabled={idx === value.length - 1}
                    aria-label="Доош зөөх"
                    className="flex h-8 w-8 items-center justify-center rounded-button text-text-muted transition-colors hover:bg-cream-soft hover:text-navy-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text-muted"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    aria-label="Устгах"
                    className="flex h-8 w-8 items-center justify-center rounded-button text-text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {block.type === 'text' ? (
                <textarea
                  value={block.text}
                  onChange={(e) => update(idx, { text: e.target.value })}
                  className={textareaClasses}
                  rows={5}
                  placeholder="Текст бичнэ үү… (хоосон мөрөөр догол мөр тусгаарлана)"
                />
              ) : (
                <ImageBlockControls
                  block={block}
                  onChange={(patch) => update(idx, patch)}
                />
              )}
            </li>
          ))}
        </ol>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={addText}
          className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-cream-soft"
        >
          <Type className="h-4 w-4" />
          Текст нэмэх
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-button border border-border-light bg-white px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-cream-soft disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Ачаалж байна…
            </>
          ) : (
            <>
              <ImagePlus className="h-4 w-4" />
              Зураг нэмэх
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ImageBlockControls({
  block,
  onChange,
}: {
  block: NewsImageBlock;
  onChange: (patch: Partial<NewsImageBlock>) => void;
}) {
  const alignClass =
    block.align === 'left'
      ? 'mr-auto'
      : block.align === 'right'
        ? 'ml-auto'
        : 'mx-auto';

  return (
    <div className="space-y-3">
      {/* Live preview — mimics the article content column. */}
      <div className="rounded-button border border-border-light bg-cream-soft p-3">
        <div
          className={cn('overflow-hidden rounded-button', alignClass)}
          style={{ width: `${block.width}%` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={block.caption || 'preview'}
            className="h-auto w-full rounded-button"
          />
        </div>
        {block.caption && (
          <p
            className={cn(
              'mt-1.5 text-xs italic text-text-muted',
              block.align === 'left'
                ? 'text-left'
                : block.align === 'right'
                  ? 'text-right'
                  : 'text-center',
            )}
          >
            {block.caption}
          </p>
        )}
      </div>

      {/* Width: presets + slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Өргөн
          </span>
          <span className="text-xs font-bold text-navy-900">{block.width}%</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {WIDTH_PRESETS.map(([label, w]) => (
            <button
              key={w}
              type="button"
              onClick={() => onChange({ width: w })}
              className={cn(
                'rounded-button border px-2.5 py-1 text-xs font-semibold transition-colors',
                block.width === w
                  ? 'border-gold-500 bg-gold-500/10 text-navy-900'
                  : 'border-border-light bg-white text-text-muted hover:bg-cream-soft hover:text-navy-900',
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          type="range"
          min={MIN_IMAGE_WIDTH}
          max={MAX_IMAGE_WIDTH}
          step={5}
          value={block.width}
          onChange={(e) => onChange({ width: Number(e.target.value) })}
          className="w-full accent-gold-500"
          aria-label="Зургийн өргөн"
        />
      </div>

      {/* Alignment */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Байршил
        </span>
        <div className="flex gap-1.5">
          {ALIGN_OPTIONS.map(([value, label, Icon]) => (
            <button
              key={value}
              type="button"
              onClick={() => onChange({ align: value })}
              aria-label={label}
              aria-pressed={block.align === value}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-button border px-3 py-1.5 text-xs font-semibold transition-colors',
                block.align === value
                  ? 'border-gold-500 bg-gold-500/10 text-navy-900'
                  : 'border-border-light bg-white text-text-muted hover:bg-cream-soft hover:text-navy-900',
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Caption */}
      <input
        type="text"
        value={block.caption ?? ''}
        onChange={(e) => onChange({ caption: e.target.value })}
        className={inputClasses}
        placeholder="Зургийн тайлбар (сонголтоор)"
      />
    </div>
  );
}
