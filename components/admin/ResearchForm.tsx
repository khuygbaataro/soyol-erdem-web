'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses, textareaClasses } from '@/components/admin/FormField';
import { FileUpload } from '@/components/admin/ImageUpload';
import { slugify } from '@/lib/admin-helpers';
import { useUploadGuard } from '@/lib/use-upload-guard';

interface Props {
  initial?: any;
  mode: 'create' | 'edit';
}

export function ResearchForm({ initial = {}, mode }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { isUploading, onUploadingChange } = useUploadGuard();

  const [title, setTitle] = useState(initial.title ?? '');
  const [slug, setSlug] = useState(initial.slug ?? '');
  const [abstract, setAbstract] = useState(initial.abstract ?? '');
  const [authors, setAuthors] = useState(initial.authors ?? '');
  const [type, setType] = useState(initial.type ?? 'ARTICLE');
  const [area, setArea] = useState(initial.area ?? 'Япон судлал');
  const [fileUrl, setFileUrl] = useState(initial.fileUrl ?? '');
  const [publishedAt, setPublishedAt] = useState(initial.publishedAt ? initial.publishedAt.slice(0, 10) : '');
  const [status, setStatus] = useState(initial.status ?? 'DRAFT');

  function handleTitleChange(v: string) {
    setTitle(v);
    if (mode === 'create' && (!slug || slug === slugify(title))) setSlug(slugify(v));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const payload = { title, slug, abstract, authors, type, area, fileUrl: fileUrl || undefined, publishedAt: publishedAt || undefined, status };
      const url = mode === 'create' ? '/api/research' : `/api/research/${initial.id}`;
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error ?? 'Хадгалахад алдаа гарлаа');
        return;
      }
      toast.success(mode === 'create' ? 'Нийтлэл нэмэгдлээ' : 'Хадгалагдлаа');
      router.push('/admin/research');
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card hover={false} className="space-y-4">
        <FormField label="Гарчиг" required>
          <input required value={title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClasses} />
        </FormField>
        <FormField label="Slug" required>
          <input required value={slug} onChange={(e) => setSlug(slugify(e.target.value))} className={inputClasses} />
        </FormField>
        <FormField label="Зохиогчид" required hint="Таслалаар тусгаарлана уу.">
          <input required value={authors} onChange={(e) => setAuthors(e.target.value)} className={inputClasses} placeholder="Б.Бат, С.Цэцэг" />
        </FormField>
        <FormField label="Хураангуй (Abstract)" required>
          <textarea required value={abstract} onChange={(e) => setAbstract(e.target.value)} rows={6} className={textareaClasses} />
        </FormField>
        <FormField label="PDF файл" hint="Эрдэм шинжилгээний PDF-г upload хийнэ үү.">
          <FileUpload value={fileUrl} onChange={setFileUrl} folder="research" onUploadingChange={onUploadingChange} />
        </FormField>
      </Card>

      <div className="space-y-6">
        <Card hover={false}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">Тохиргоо</h3>
          <FormField label="Төрөл">
            <select value={type} onChange={(e) => setType(e.target.value)} className={inputClasses}>
              <option value="ARTICLE">Нийтлэл</option>
              <option value="CONFERENCE">Хурал</option>
              <option value="BOOK">Ном</option>
              <option value="THESIS">Дипломын ажил</option>
              <option value="PROJECT">Төсөл</option>
            </select>
          </FormField>
          <FormField label="Хэсэг" className="mt-4">
            <input value={area} onChange={(e) => setArea(e.target.value)} className={inputClasses} placeholder="Япон судлал" />
          </FormField>
          <FormField label="Статус" className="mt-4">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClasses}>
              <option value="DRAFT">Ноорог</option>
              <option value="PUBLISHED">Нийтлэгдсэн</option>
              <option value="ARCHIVED">Архивласан</option>
            </select>
          </FormField>
          <FormField label="Нийтэлсэн огноо" className="mt-4">
            <input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} className={inputClasses} />
          </FormField>
        </Card>

        <Card hover={false}>
          <Button type="submit" variant="primary" size="md" icon={<Save className="h-4 w-4" />} iconPosition="left" loading={pending} disabled={isUploading} className="w-full">
            {isUploading ? 'Файл ачаалж байна…' : 'Хадгалах'}
          </Button>
          <Link href="/admin/research" className="mt-3 block text-center text-sm font-semibold text-text-muted hover:text-navy-900">
            Цуцлах
          </Link>
        </Card>
      </div>
    </form>
  );
}
