'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses, textareaClasses } from '@/components/admin/FormField';
import { ImageUpload } from '@/components/admin/ImageUpload';

export interface SiteContentItem {
  id: string;
  key: string;
  type: 'TEXT' | 'IMAGE';
  value: string;
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

export function SiteContentForm({ items, groupLabel }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(items.map((i) => [i.key, i.value])),
  );

  function update(key: string, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      items: items.map((i) => ({ key: i.key, value: values[i.key] ?? '' })),
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
          items.map((item) => (
            <FormField
              key={item.id}
              label={item.label}
              hint={item.hint ?? undefined}
            >
              {item.type === 'IMAGE' ? (
                <ImageUpload
                  value={values[item.key] ?? ''}
                  onChange={(url) => update(item.key, url)}
                  folder="misc"
                />
              ) : item.multiline ? (
                <textarea
                  rows={5}
                  value={values[item.key] ?? ''}
                  onChange={(e) => update(item.key, e.target.value)}
                  className={textareaClasses}
                />
              ) : (
                <input
                  value={values[item.key] ?? ''}
                  onChange={(e) => update(item.key, e.target.value)}
                  className={inputClasses}
                />
              )}
            </FormField>
          ))
        )}
      </Card>

      <Button
        type="submit"
        variant="primary"
        size="md"
        icon={<Save className="h-4 w-4" />}
        iconPosition="left"
        loading={pending}
      >
        Хадгалах
      </Button>
    </form>
  );
}
