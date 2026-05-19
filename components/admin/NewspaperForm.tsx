'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses } from '@/components/admin/FormField';
import { FileUpload, ImageUpload } from '@/components/admin/ImageUpload';
import { useUploadGuard } from '@/lib/use-upload-guard';

interface NewspaperFormProps {
  initial?: {
    id?: string;
    issueNumber?: number;
    title?: string | null;
    publishedAt?: string | null;
    fileUrl?: string;
    coverImage?: string | null;
    status?: string;
  };
  mode: 'create' | 'edit';
}

export function NewspaperForm({ initial = {}, mode }: NewspaperFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { isUploading, onUploadingChange } = useUploadGuard();

  const [issueNumber, setIssueNumber] = useState(
    initial.issueNumber ? String(initial.issueNumber) : '',
  );
  const [title, setTitle] = useState(initial.title ?? '');
  const [publishedAt, setPublishedAt] = useState(
    initial.publishedAt ? initial.publishedAt.slice(0, 10) : '',
  );
  const [fileUrl, setFileUrl] = useState(initial.fileUrl ?? '');
  const [coverImage, setCoverImage] = useState(initial.coverImage ?? '');
  const [status, setStatus] = useState(initial.status ?? 'PUBLISHED');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!fileUrl) {
      toast.error('PDF файлаа upload хийнэ үү');
      return;
    }
    startTransition(async () => {
      const payload = {
        issueNumber: Number(issueNumber),
        title: title || undefined,
        publishedAt: publishedAt || undefined,
        fileUrl,
        coverImage: coverImage || undefined,
        status,
      };
      const url = mode === 'create' ? '/api/newspapers' : `/api/newspapers/${initial.id}`;
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
      toast.success(mode === 'create' ? 'Хэвлэл нэмэгдлээ' : 'Хадгалагдлаа');
      router.push('/admin/newspapers');
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <Card hover={false}>
          <FormField label="Дугаар" required hint="62, 63, 64 …">
            <input
              type="number"
              required
              min={1}
              max={99999}
              value={issueNumber}
              onChange={(e) => setIssueNumber(e.target.value)}
              className={inputClasses}
              placeholder="76"
            />
          </FormField>
          <FormField
            label="Гарчиг (заавал биш)"
            className="mt-4"
            hint="Дугаараас гадна нэмэлт гарчиг (e.g. 'Сургуулийн 30 жилийн ой')"
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClasses}
              maxLength={200}
              placeholder=""
            />
          </FormField>
          <FormField label="Гарсан огноо" className="mt-4">
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className={inputClasses}
            />
          </FormField>
          <FormField
            label="PDF файл"
            required
            className="mt-4"
            hint="Сонин хэвлэлийн бүтэн PDF (max 50 MB)"
          >
            <FileUpload
              value={fileUrl}
              onChange={setFileUrl}
              folder="newspapers"
              hint="Сонин хэвлэлийн PDF файлаа сонгох"
              onUploadingChange={onUploadingChange}
            />
          </FormField>
          <FormField
            label="Нүүр зураг"
            className="mt-4"
            hint="Заавал биш — байхгүй бол default дизайн харагдана"
          >
            <ImageUpload value={coverImage} onChange={setCoverImage} folder="misc" onUploadingChange={onUploadingChange} />
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
              href="/admin/newspapers"
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
