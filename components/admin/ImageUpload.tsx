'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { upload } from '@vercel/blob/client';
import { ImageIcon, Loader2, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  /** Current image URL value (controlled). */
  value: string;
  /** Called with the new URL after successful upload, or empty string when cleared. */
  onChange: (url: string) => void;
  /**
   * Folder prefix used as the Blob pathname prefix. Determines allowed types
   * on the server (research/ allows PDFs; others image-only).
   */
  folder?: 'news' | 'library' | 'programs' | 'misc';
  /** Accept attribute for the file input. Default: image/*. */
  accept?: string;
  className?: string;
}

/**
 * Click-to-upload image control. Uploads directly to Vercel Blob, displays
 * preview with replace / remove controls.
 */
export function ImageUpload({
  value,
  onChange,
  folder = 'misc',
  accept = 'image/*',
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!file) return;
    setUploading(true);
    try {
      const blob = await upload(`${folder}/${Date.now()}-${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      onChange(blob.url);
      toast.success('Зураг ачааллагдлаа');
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : 'Ачаалахад алдаа гарлаа',
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className={cn('space-y-3', className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      {value ? (
        <div className="space-y-2">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card border border-border-light bg-cream-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-button border border-border-light bg-white px-3 py-2 text-xs font-semibold text-navy-900 transition-colors hover:bg-cream-soft disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Ачаалж байна…
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5" />
                  Солих
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="inline-flex items-center gap-1.5 rounded-button px-3 py-2 text-xs font-semibold text-text-muted transition-colors hover:bg-cream-soft hover:text-red-600"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Устгах
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-border-medium bg-cream-soft text-text-muted transition-colors hover:border-gold-500 hover:bg-gold-500/5 hover:text-navy-900 disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="h-7 w-7 animate-spin" />
              <span className="text-sm font-semibold">Ачаалж байна…</span>
            </>
          ) : (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gold-500 shadow-sm">
                <Upload className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold">Зураг сонгох</span>
              <span className="text-xs text-text-muted">PNG, JPG, WebP — max 5 MB</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

/**
 * File-style variant for non-image uploads (PDF). Shows filename + replace / remove.
 */
export function FileUpload({
  value,
  onChange,
  folder = 'research',
  accept = 'application/pdf',
  className,
}: Omit<ImageUploadProps, 'folder'> & { folder?: 'research' | 'misc' }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!file) return;
    setUploading(true);
    try {
      const blob = await upload(`${folder}/${Date.now()}-${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });
      onChange(blob.url);
      toast.success('Файл ачааллагдлаа');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Ачаалахад алдаа гарлаа');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  const filename = value ? value.split('/').pop()?.split('?')[0] : '';

  return (
    <div className={cn('space-y-2', className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      {value ? (
        <div className="flex items-center gap-3 rounded-card border border-border-light bg-white px-4 py-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
            <ImageIcon className="h-5 w-5" />
          </span>
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 flex-1 truncate text-sm font-semibold text-navy-900 hover:text-gold-500"
          >
            {filename}
          </a>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-xs font-semibold text-text-muted hover:text-navy-900"
          >
            Солих
          </button>
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs font-semibold text-text-muted hover:text-red-600"
          >
            Устгах
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full items-center justify-center gap-2 rounded-card border-2 border-dashed border-border-medium bg-cream-soft px-4 py-6 text-sm font-semibold text-text-muted transition-colors hover:border-gold-500 hover:bg-gold-500/5 hover:text-navy-900 disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Ачаалж байна…
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              PDF файл сонгох (max 15 MB)
            </>
          )}
        </button>
      )}
    </div>
  );
}
