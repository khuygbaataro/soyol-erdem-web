'use client';

import { useState } from 'react';
import { ChevronDown, Globe2, Languages } from 'lucide-react';
import { FormField, inputClasses, textareaClasses } from '@/components/admin/FormField';
import { cn } from '@/lib/utils';

export interface TranslationFieldConfig {
  /** A unique key used for inputs (e.g. "title", "body"). */
  key: string;
  /** Human-readable Mongolian label of the source field. */
  label: string;
  /** Hint shown under the field. */
  hint?: string;
  /** Whether this field is multi-line. */
  multiline?: boolean;
  /** Number of textarea rows (when multiline). */
  rows?: number;
  /** Current EN value (controlled). */
  enValue: string;
  /** Current JA value (controlled). */
  jaValue: string;
  /** Setters for the EN and JA inputs. */
  setEn: (v: string) => void;
  setJa: (v: string) => void;
}

interface Props {
  fields: TranslationFieldConfig[];
  /** Title shown on the collapsed header. Defaults to "Орчуулга". */
  title?: string;
  /** Default open state. */
  defaultOpen?: boolean;
}

/**
 * Collapsible section showing English + Japanese inputs side-by-side for
 * a list of canonical Mongolian fields. Designed to be embedded in
 * admin forms (News / Program / Staff) below the canonical inputs.
 *
 * All values are controlled — the parent form owns the state and
 * decides what to send in the POST/PUT payload. Empty strings are
 * treated as "no translation" on the API side.
 */
export function TranslationFields({
  fields,
  title = 'Орчуулга (EN / JA) — заавал биш',
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const filledCount = fields.reduce(
    (sum, f) => sum + (f.enValue.trim().length > 0 ? 1 : 0) + (f.jaValue.trim().length > 0 ? 1 : 0),
    0,
  );
  const totalSlots = fields.length * 2;

  return (
    <div className="rounded-card border border-border-light bg-cream-soft/40">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
            <Languages className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-navy-900">{title}</span>
            <span className="block text-xs text-text-muted">
              {filledCount > 0
                ? `${filledCount} / ${totalSlots} талбар бөглөгдсөн`
                : 'Хоосон үлдээвэл монгол хэвээр харагдана'}
            </span>
          </span>
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-text-muted transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      {open && (
        <div className="space-y-5 border-t border-border-light px-5 py-5">
          {fields.map((f) => (
            <div key={f.key} className="space-y-3">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900">
                <Globe2 className="h-3 w-3 text-gold-500" />
                {f.label}
              </p>
              <div className="grid gap-3 lg:grid-cols-2">
                <FormField
                  label="English"
                  hint={f.hint}
                >
                  {f.multiline ? (
                    <textarea
                      rows={f.rows ?? 5}
                      value={f.enValue}
                      onChange={(e) => f.setEn(e.target.value)}
                      className={textareaClasses}
                    />
                  ) : (
                    <input
                      value={f.enValue}
                      onChange={(e) => f.setEn(e.target.value)}
                      className={inputClasses}
                    />
                  )}
                </FormField>
                <FormField label="日本語" hint={f.hint}>
                  {f.multiline ? (
                    <textarea
                      rows={f.rows ?? 5}
                      value={f.jaValue}
                      onChange={(e) => f.setJa(e.target.value)}
                      className={textareaClasses}
                    />
                  ) : (
                    <input
                      value={f.jaValue}
                      onChange={(e) => f.setJa(e.target.value)}
                      className={inputClasses}
                    />
                  )}
                </FormField>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
