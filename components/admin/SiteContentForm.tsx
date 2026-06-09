'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Globe2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses, textareaClasses } from '@/components/admin/FormField';
import { FileUpload, ImageUpload } from '@/components/admin/ImageUpload';
import { useUploadGuard } from '@/lib/use-upload-guard';

export interface SiteContentItem {
  id: string;
  key: string;
  type: 'TEXT' | 'IMAGE';
  value: string;
  valueEn: string | null;
  valueJa: string | null;
  group: string;
  label: string;
  hint: string | null;
  multiline: boolean;
  order: number;
}

interface Props {
  items: SiteContentItem[];
  /** Heading shown above the form. */
  groupLabel: string;
}

/** Per-row state for the three language slots. Images skip En/Ja since
 *  they are language-agnostic (one upload reused across locales). */
interface RowState {
  value: string;
  valueEn: string;
  valueJa: string;
}

export function SiteContentForm({ items, groupLabel }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { isUploading, onUploadingChange } = useUploadGuard();
  const [values, setValues] = useState<Record<string, RowState>>(() =>
    Object.fromEntries(
      items.map((i) => [
        i.key,
        {
          value: i.value,
          valueEn: i.valueEn ?? '',
          valueJa: i.valueJa ?? '',
        },
      ]),
    ),
  );

  function update(key: string, slot: keyof RowState, v: string) {
    setValues((prev) => ({
      ...prev,
      [key]: { ...prev[key], [slot]: v },
    }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      items: items.map((i) => {
        const row = values[i.key] ?? { value: '', valueEn: '', valueJa: '' };
        // IMAGE rows skip the translation slots — only the upload URL
        // (stored on `value`) matters.
        if (i.type === 'IMAGE') {
          return { key: i.key, value: row.value };
        }
        return {
          key: i.key,
          value: row.value,
          valueEn: row.valueEn,
          valueJa: row.valueJa,
        };
      }),
    };
    startTransition(async () => {
      const res = await fetch('/api/site-content', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error ?? 'Хадгалахад алдаа гарлаа');
        return;
      }
      toast.success(`${groupLabel} — амжилттай хадгалагдлаа`);
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-6">
      <Card hover={false} className="space-y-5">
        {items.length === 0 ? (
          <p className="text-sm text-text-muted">Энэ хэсэгт засагдах талбар алга.</p>
        ) : (
          items.map((item) => {
            const row = values[item.key] ?? {
              value: '',
              valueEn: '',
              valueJa: '',
            };
            return (
              <FormField
                key={item.id}
                label={item.label}
                hint={item.hint ?? undefined}
              >
                {item.type === 'IMAGE' ? (
                  // Keys ending in `.fileUrl` store a PDF (e.g. handbook).
                  item.key.endsWith('.fileUrl') ? (
                    <FileUpload
                      value={row.value}
                      onChange={(url) => update(item.key, 'value', url)}
                      folder="handbooks"
                      hint="PDF файл сонгох (Гарын авлага)"
                      onUploadingChange={onUploadingChange}
                    />
                  ) : (
                    <ImageUpload
                      value={row.value}
                      onChange={(url) => update(item.key, 'value', url)}
                      folder="misc"
                      onUploadingChange={onUploadingChange}
                    />
                  )
                ) : (
                  <div className="space-y-3">
                    {/* Canonical Mongolian — always shown */}
                    {item.multiline ? (
                      <textarea
                        rows={5}
                        value={row.value}
                        onChange={(e) => update(item.key, 'value', e.target.value)}
                        className={textareaClasses}
                      />
                    ) : (
                      <input
                        value={row.value}
                        onChange={(e) => update(item.key, 'value', e.target.value)}
                        className={inputClasses}
                      />
                    )}

                    {/* Collapsible EN / JP translation slots. Uses
                       native <details> so the bundle stays tiny and
                       the row stays compact when not in use. The
                       filled-slot counter mirrors the same UX as the
                       TranslationFields helper used by News /
                       Programs / Staff admin forms. */}
                    <details className="group rounded-button border border-border-light bg-cream-soft/40 open:border-navy-900/40">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-xs font-semibold text-text-muted [&::-webkit-details-marker]:hidden">
                        <span className="inline-flex items-center gap-1.5">
                          <Globe2 className="h-3.5 w-3.5 text-gold-500" />
                          Орчуулга (EN / JP)
                          <span
                            className={
                              'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ' +
                              (row.valueEn.length > 0 || row.valueJa.length > 0
                                ? 'bg-emerald-500/15 text-emerald-700'
                                : 'bg-cream text-text-muted')
                            }
                          >
                            {[row.valueEn, row.valueJa].filter(
                              (v) => v.length > 0,
                            ).length}{' '}
                            / 2
                          </span>
                        </span>
                        <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="space-y-3 border-t border-border-light px-3 py-3">
                        <div>
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            English
                          </label>
                          {item.multiline ? (
                            <textarea
                              rows={4}
                              value={row.valueEn}
                              onChange={(e) =>
                                update(item.key, 'valueEn', e.target.value)
                              }
                              className={textareaClasses}
                              placeholder="Хоосон үлдвэл орчуулсан хэвлэлийг харуулна"
                            />
                          ) : (
                            <input
                              value={row.valueEn}
                              onChange={(e) =>
                                update(item.key, 'valueEn', e.target.value)
                              }
                              className={inputClasses}
                              placeholder="English translation"
                            />
                          )}
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            日本語
                          </label>
                          {item.multiline ? (
                            <textarea
                              rows={4}
                              value={row.valueJa}
                              onChange={(e) =>
                                update(item.key, 'valueJa', e.target.value)
                              }
                              className={textareaClasses}
                              placeholder="空欄の場合は翻訳バンドルを表示します"
                            />
                          ) : (
                            <input
                              value={row.valueJa}
                              onChange={(e) =>
                                update(item.key, 'valueJa', e.target.value)
                              }
                              className={inputClasses}
                              placeholder="日本語訳"
                            />
                          )}
                        </div>
                      </div>
                    </details>
                  </div>
                )}
              </FormField>
            );
          })
        )}
      </Card>

      <Button
        type="submit"
        variant="primary"
        size="md"
        icon={<Save className="h-4 w-4" />}
        iconPosition="left"
        loading={pending}
        disabled={isUploading}
      >
        {isUploading ? 'Зураг ачаалж байна…' : 'Хадгалах'}
      </Button>
    </form>
  );
}
