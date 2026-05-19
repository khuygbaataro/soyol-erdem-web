'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses, textareaClasses } from '@/components/admin/FormField';
import { FileUpload, ImageUpload } from '@/components/admin/ImageUpload';
import { slugify } from '@/lib/admin-helpers';
import { useUploadGuard } from '@/lib/use-upload-guard';

interface RegulationFormProps {
  initial?: {
    id?: string;
    slug?: string;
    title?: string;
    description?: string | null;
    fileUrl?: string;
    coverImage?: string | null;
    status?: string;
    order?: number;
  };
  mode: 'create' | 'edit';
}

const LIST_PATH = '/admin/regulations';

export function RegulationForm({ initial = {}, mode }: RegulationFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { isUploading, onUploadingChange } = useUploadGuard();

  const [title, setTitle] = useState(initial.title ?? '');
  const [slug, setSlug] = useState(initial.slug ?? '');
  const [description, setDescription] = useState(initial.description ?? '');
  const [fileUrl, setFileUrl] = useState(initial.fileUrl ?? '');
  const [coverImage, setCoverImage] = useState(initial.coverImage ?? '');
  const [status, setStatus] = useState(initial.status ?? 'PUBLISHED');
  const [order, setOrder] = useState<number>(initial.order ?? 0);

  function handleTitleChange(v: string) {
    setTitle(v);
    if (mode === 'create' && (!slug || slug === slugify(title))) {
      setSlug(slugify(v));
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!fileUrl) {
      toast.error('PDF файлаа upload хийнэ үү');
      return;
    }
    startTransition(async () => {
      const payload = {
        slug,
        title,
        description: description || undefined,
        fileUrl,
        coverImage: coverImage || undefined,
        status,
        order,
      };
      const url =
        mode === 'create' ? '/api/regulations' : `/api/regulations/${initial.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error ?? 'Хадгалахад алдаа гарлаа');
        return;
      }
      toast.success(mode === 'create' ? 'Журам нэмэгдлээ' : 'Хадгалагдлаа');
      router.push(LIST_PATH);
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Card hover={false}>
          <FormField label="Журмын нэр" required>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={inputClasses}
              placeholder="Жишээ: Суралцах журам"
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
              placeholder="surah-juram"
            />
          </FormField>
          <FormField
            label="Тайлбар"
            className="mt-4"
            hint="Сонгомол. Listing-д 1-2 өгүүлбэр харагдана."
          >
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={textareaClasses}
              rows={3}
              maxLength={500}
            />
          </FormField>
          <FormField
            label="PDF файл"
            required
            className="mt-4"
            hint="Журмын бүтэн PDF (max 50 MB)"
          >
            <FileUpload
              value={fileUrl}
              onChange={setFileUrl}
              folder="regulations"
              hint="Журмын PDF файлаа сонгох"
              onUploadingChange={onUploadingChange}
            />
          </FormField>
          <FormField
            label="Нүүр зураг"
            className="mt-4"
            hint="Заавал биш — байхгүй бол үндсэн дизайн харагдана"
          >
            <ImageUpload
              value={coverImage}
              onChange={setCoverImage}
              folder="misc"
              onUploadingChange={onUploadingChange}
            />
          </FormField>
        </Card>
      </div>

      <div className="space-y-6">
        <Card hover={false}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">
            Тохиргоо
          </h3>
          <FormField label="Статус">
            <div className="flex flex-col gap-2">
              {[
                ['DRAFT', 'Ноорог'],
                ['PUBLISHED', 'Нийтлэх'],
                ['ARCHIVED', 'Архивлах'],
              ].map(([v, label]) => (
                <label key={v} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="status"
                    value={v}
                    checked={status === v}
                    onChange={() => setStatus(v)}
                  />
                  {label}
                </label>
              ))}
            </div>
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
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? 'Зураг/файл ачаалж байна…' : 'Хадгалах'}
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
