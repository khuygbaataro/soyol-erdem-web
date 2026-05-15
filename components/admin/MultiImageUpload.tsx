'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import {
  ArrowDown,
  ArrowUp,
  ImagePlus,
  Loader2,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

interface MultiImageUploadProps {
  /** Current ordered list of image URLs (controlled). */
  value: string[];
  /** Called whenever the list changes. */
  onChange: (next: string[]) => void;
  /** Blob folder prefix. */
  folder?: 'news' | 'misc';
  /** Hard cap to keep payload reasonable. */
  max?: number;
}

/**
 * Click-to-upload control for an ordered list of images. Each row shows
 * a thumbnail with reorder + delete buttons; a single "Зураг нэмэх"
 * button at the bottom adds new entries. All uploads go to Vercel Blob.
 *
 * Used by NewsForm to power the article slideshow.
 */
export function MultiImageUpload({
  value,
  onChange,
  folder = 'news',
  max = 20,
}: MultiImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const remaining = Math.max(0, max - value.length);

  async function handleFiles(files: FileList) {
    if (files.length === 0) return;
    if (remaining === 0) {
      toast.error(`Дээд тал нь ${max} зураг.`);
      return;
    }
    const accepted = Array.from(files).slice(0, remaining);
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of accepted) {
        const blob = await upload(`${folder}/${Date.now()}-${file.name}`, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
        });
        uploaded.push(blob.url);
      }
      onChange([...value, ...uploaded]);
      toast.success(`${uploaded.length} зураг нэмэгдлээ`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Ачаалахад алдаа гарлаа',
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
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
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex aspect-[16/6] w-full flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-border-medium bg-cream-soft text-text-muted transition-colors hover:border-gold-500 hover:bg-gold-500/5 hover:text-navy-900 disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-sm font-semibold">Ачаалж байна…</span>
            </>
          ) : (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gold-500 shadow-sm">
                <ImagePlus className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">Олон зураг нэмэх</span>
              <span className="text-xs text-text-muted">
                Slideshow дээр харагдана · хамгийн ихдээ {max}
              </span>
            </>
          )}
        </button>
      ) : (
        <>
          <ol className="space-y-2">
            {value.map((url, idx) => (
              <li
                key={`${url}-${idx}`}
                className="flex items-center gap-3 rounded-card border border-border-light bg-white p-2 pr-3 shadow-sm"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-xs font-bold text-gold-600">
                  {idx + 1}
                </span>
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-button bg-cream-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Slide ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="min-w-0 flex-1 truncate text-xs text-text-muted">
                  {url.split('/').pop()?.split('?')[0] ?? url}
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
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading || remaining === 0}
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
                {remaining < max && (
                  <span className="text-xs text-text-muted">
                    ({value.length}/{max})
                  </span>
                )}
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
}
