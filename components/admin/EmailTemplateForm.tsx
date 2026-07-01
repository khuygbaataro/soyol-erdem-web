'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses, textareaClasses } from '@/components/admin/FormField';

interface EmailTemplateFormProps {
  initial?: {
    id?: string;
    name?: string;
    category?: string;
    subject?: string;
    body?: string;
    locale?: string;
    active?: boolean;
    order?: number;
  };
  mode: 'create' | 'edit';
}

const LIST_PATH = '/admin/email-templates';

/** Common category suggestions — free text is allowed, these just power a
 *  datalist so admins reuse the same keys the compose UI matches on. */
const CATEGORY_SUGGESTIONS = [
  'erunhii',
  'aylal-juulchlal',
  'programm-hangamj',
  'biznes-udirdlaga',
  'ah-suralcagch',
];

const PLACEHOLDERS = ['{{firstName}}', '{{lastName}}', '{{fullName}}', '{{programName}}'];

export function EmailTemplateForm({ initial = {}, mode }: EmailTemplateFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [name, setName] = useState(initial.name ?? '');
  const [category, setCategory] = useState(initial.category ?? 'erunhii');
  const [subject, setSubject] = useState(initial.subject ?? '');
  const [body, setBody] = useState(initial.body ?? '');
  const [locale, setLocale] = useState(initial.locale ?? 'MN');
  const [active, setActive] = useState(initial.active ?? true);
  const [order, setOrder] = useState<number>(initial.order ?? 0);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const payload = { name, category, subject, body, locale, active, order };
      const url = mode === 'create' ? '/api/email-templates' : `/api/email-templates/${initial.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error ?? 'Хадгалахад алдаа гарлаа.');
        return;
      }
      toast.success(mode === 'create' ? 'Загвар нэмэгдлээ' : 'Хадгалагдлаа');
      router.push(LIST_PATH);
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Card hover={false}>
          <FormField label="Загварын нэр" required>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              placeholder="Жишээ: Аялал жуулчлал — танилцуулга"
            />
          </FormField>

          <FormField
            label="Имэйлийн гарчиг (subject)"
            required
            hint="{{хувьсагч}} ашиглаж болно."
            className="mt-4"
          >
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={inputClasses}
              placeholder="Соёл Эрдэм — Аялал жуулчлалын хөтөлбөрийн мэдээлэл"
            />
          </FormField>

          <FormField
            label="Имэйлийн бие"
            required
            hint="Дараах хувьсагчийг бичвэл автоматаар орлоно:"
            className="mt-4"
          >
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={textareaClasses}
              rows={12}
              placeholder={
                'Сайн байна уу, {{firstName}}.\n\nТаны сонирхсон "{{programName}}" хөтөлбөрийн талаарх мэдээллийг хүргэж байна…'
              }
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {PLACEHOLDERS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setBody((b) => b + p)}
                  className="rounded-button border border-border-light bg-cream-soft px-2 py-1 font-mono text-[11px] text-navy-900 transition-colors hover:border-gold-500"
                >
                  {p}
                </button>
              ))}
            </div>
          </FormField>
        </Card>
      </div>

      <div className="space-y-6">
        <Card hover={false}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">
            Тохиргоо
          </h3>

          <FormField
            label="Ангилал (category)"
            required
            hint="Хөтөлбөрийн чиглэлтэй тааруулна. Compose дээр автоматаар санал болгоно."
          >
            <input
              type="text"
              required
              list="email-template-categories"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClasses}
              placeholder="aylal-juulchlal"
            />
            <datalist id="email-template-categories">
              {CATEGORY_SUGGESTIONS.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </FormField>

          <FormField label="Хэл" className="mt-4">
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className={inputClasses}
            >
              <option value="MN">Монгол (MN)</option>
              <option value="EN">English (EN)</option>
              <option value="JP">日本語 (JP)</option>
            </select>
          </FormField>

          <FormField label="Идэвхтэй эсэх" className="mt-4">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              Compose дээр сонгогдоно
            </label>
          </FormField>

          <FormField label="Эрэмбэ" className="mt-4" hint="Жижиг тоо нь өмнө гарна.">
            <input
              type="number"
              min={0}
              value={order}
              onChange={(e) => setOrder(Number(e.target.value) || 0)}
              className={inputClasses}
            />
          </FormField>
        </Card>

        <Card hover={false}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">
            Үйлдэл
          </h3>
          <div className="space-y-3">
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Save className="h-4 w-4" />}
              iconPosition="left"
              loading={pending}
              className="w-full"
            >
              Хадгалах
            </Button>
            <Link
              href={LIST_PATH}
              className="block text-center text-sm font-semibold text-text-muted hover:text-navy-900"
            >
              Цуцлах
            </Link>
          </div>
        </Card>
      </div>
    </form>
  );
}
