'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses, textareaClasses } from '@/components/admin/FormField';
import { slugify } from '@/lib/admin-helpers';

interface JobOpeningFormProps {
  initial?: {
    id?: string;
    slug?: string;
    title?: string;
    description?: string | null;
    titleEn?: string | null;
    titleJa?: string | null;
    descriptionEn?: string | null;
    descriptionJa?: string | null;
    active?: boolean;
    order?: number;
  };
  mode: 'create' | 'edit';
}

const LIST_PATH = '/admin/careers';

export function JobOpeningForm({ initial = {}, mode }: JobOpeningFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState(initial.title ?? '');
  const [slug, setSlug] = useState(initial.slug ?? '');
  const [description, setDescription] = useState(initial.description ?? '');
  const [titleEn, setTitleEn] = useState(initial.titleEn ?? '');
  const [titleJa, setTitleJa] = useState(initial.titleJa ?? '');
  const [descriptionEn, setDescriptionEn] = useState(initial.descriptionEn ?? '');
  const [descriptionJa, setDescriptionJa] = useState(initial.descriptionJa ?? '');
  const [active, setActive] = useState(initial.active ?? true);
  const [order, setOrder] = useState<number>(initial.order ?? 0);

  function handleTitleChange(v: string) {
    setTitle(v);
    if (mode === 'create' && (!slug || slug === slugify(title))) {
      setSlug(slugify(v));
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const payload = {
        slug,
        title,
        description: description || undefined,
        titleEn: titleEn || undefined,
        titleJa: titleJa || undefined,
        descriptionEn: descriptionEn || undefined,
        descriptionJa: descriptionJa || undefined,
        active,
        order,
      };
      const url =
        mode === 'create'
          ? '/api/job-openings'
          : `/api/job-openings/${initial.id}`;
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
      toast.success(mode === 'create' ? 'Нэмэгдлээ' : 'Хадгалагдлаа');
      router.push(LIST_PATH);
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Card hover={false}>
          <FormField label="Албан тушаал" required>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={inputClasses}
              placeholder="Жишээ: Япон хэлний багш"
            />
          </FormField>
          <FormField
            label="URL slug"
            required
            hint="Жижиг үсэг, тоо, зураас (-)"
            className="mt-4"
          >
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              className={inputClasses}
              placeholder="japanese-teacher"
            />
          </FormField>
          <FormField
            label="Тайлбар"
            hint="Сонгомол. Listing-д товч 1-2 өгүүлбэр харагдана."
            className="mt-4"
          >
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={textareaClasses}
              rows={4}
              maxLength={500}
            />
          </FormField>
        </Card>

        {/*
          Орчуулгын блок (EN / JP) — News-ийн админ форм-ын адил
          сонгомол. Хоосон үлдэхэд public хуудас МN-аас fallback хийнэ.
          Хэрэглэгчийн locale-ийг солих үед энд бичсэн утга яг тэр
          хэлээр харагдана.
        */}
        <Card hover={false}>
          <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-navy-900">
            Орчуулга — Англи (English)
          </h3>
          <p className="mb-4 text-xs text-text-muted">
            Сонгомол. Хоосон бол EN locale дээр МN утга харагдана.
          </p>
          <FormField label="Албан тушаал — EN">
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className={inputClasses}
              placeholder="e.g. Japanese-language instructor"
              maxLength={160}
            />
          </FormField>
          <FormField label="Тайлбар — EN" className="mt-4">
            <textarea
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              className={textareaClasses}
              rows={4}
              maxLength={500}
              placeholder="Optional 1-2 sentence summary in English."
            />
          </FormField>
        </Card>

        <Card hover={false}>
          <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-navy-900">
            Орчуулга — Япон (日本語)
          </h3>
          <p className="mb-4 text-xs text-text-muted">
            Сонгомол. Хоосон бол JP locale дээр МN утга харагдана.
          </p>
          <FormField label="Албан тушаал — JP (日本語)">
            <input
              type="text"
              value={titleJa}
              onChange={(e) => setTitleJa(e.target.value)}
              className={inputClasses}
              placeholder="例: 日本語教員"
              maxLength={160}
            />
          </FormField>
          <FormField label="Тайлбар — JP (日本語)" className="mt-4">
            <textarea
              value={descriptionJa}
              onChange={(e) => setDescriptionJa(e.target.value)}
              className={textareaClasses}
              rows={4}
              maxLength={500}
              placeholder="任意：1〜2文の要約（日本語）"
            />
          </FormField>
        </Card>
      </div>

      <div className="space-y-6">
        <Card hover={false}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">
            Тохиргоо
          </h3>
          <FormField label="Идэвхтэй эсэх">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              Public сайтад харуулах
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
