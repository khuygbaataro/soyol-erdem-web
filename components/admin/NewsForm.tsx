'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses, textareaClasses } from '@/components/admin/FormField';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { MultiImageUpload } from '@/components/admin/MultiImageUpload';
import { TranslationFields } from '@/components/admin/TranslationFields';
import { slugify } from '@/lib/admin-helpers';
import { useUploadGuard } from '@/lib/use-upload-guard';

interface NewsFormProps {
  initial?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    body?: string;
    coverImage?: string | null;
    /** Pre-parsed slideshow URLs. Server passes the decoded array. */
    gallery?: string[];
    titleEn?: string | null;
    titleJa?: string | null;
    excerptEn?: string | null;
    excerptJa?: string | null;
    bodyEn?: string | null;
    bodyJa?: string | null;
    category?: string;
    status?: string;
    site?: 'UNIVERSITY' | 'HIGH_SCHOOL';
    publishedAt?: string | null;
  };
  mode: 'create' | 'edit';
  /**
   * Which sub-site this article belongs to. Pre-selected on the form and
   * sent in the POST/PUT body. Also drives the post-save redirect target
   * (university list vs high-school list).
   */
  site?: 'UNIVERSITY' | 'HIGH_SCHOOL';
  /**
   * Override the redirect target after save / cancel. Used by the
   * standalone /high-school/admin shell to keep editors inside their
   * own product instead of bouncing them to the main /admin tree.
   */
  listPath?: string;
}

// Labels match NEWS_CATEGORY_LABEL — keep in sync. Editor renamed
// EVENT → "Нээлттэй ажлын байр" and ANNOUNCEMENT → "Ярилцлага" in
// May 2026; enum values stayed the same so existing rows still resolve.
const CATEGORY_OPTIONS: Array<[string, string]> = [
  ['NEWS', 'Мэдээ'],
  ['EVENT', 'Нээлттэй ажлын байр'],
  ['ANNOUNCEMENT', 'Ярилцлага'],
  ['RESEARCH', 'Эрдэм шинжилгээ'],
  ['ACHIEVEMENT', 'Амжилт'],
  ['PROGRAM', 'Хөтөлбөр'],
];

export function NewsForm({
  initial = {},
  mode,
  site,
  listPath: listPathOverride,
}: NewsFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { isUploading, onUploadingChange } = useUploadGuard();

  // Resolve which sub-site we're operating on (initial > prop > UNIVERSITY).
  const resolvedSite: 'UNIVERSITY' | 'HIGH_SCHOOL' =
    initial.site ?? site ?? 'UNIVERSITY';
  const isHighSchool = resolvedSite === 'HIGH_SCHOOL';
  const listPath =
    listPathOverride ??
    (isHighSchool ? '/high-school/admin/news' : '/admin/news');

  const [title, setTitle] = useState(initial.title ?? '');
  const [slug, setSlug] = useState(initial.slug ?? '');
  const [excerpt, setExcerpt] = useState(initial.excerpt ?? '');
  const [body, setBody] = useState(initial.body ?? '');
  const [coverImage, setCoverImage] = useState(initial.coverImage ?? '');
  const [gallery, setGallery] = useState<string[]>(initial.gallery ?? []);
  const [titleEn, setTitleEn] = useState(initial.titleEn ?? '');
  const [titleJa, setTitleJa] = useState(initial.titleJa ?? '');
  const [excerptEn, setExcerptEn] = useState(initial.excerptEn ?? '');
  const [excerptJa, setExcerptJa] = useState(initial.excerptJa ?? '');
  const [bodyEn, setBodyEn] = useState(initial.bodyEn ?? '');
  const [bodyJa, setBodyJa] = useState(initial.bodyJa ?? '');
  const [category, setCategory] = useState(initial.category ?? 'NEWS');
  const [status, setStatus] = useState(initial.status ?? 'DRAFT');
  const [publishedAt, setPublishedAt] = useState(
    initial.publishedAt ? initial.publishedAt.slice(0, 10) : '',
  );

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
        title,
        slug,
        excerpt,
        body,
        coverImage: coverImage || undefined,
        gallery: gallery.filter((u) => u.trim().length > 0),
        titleEn: titleEn || undefined,
        titleJa: titleJa || undefined,
        excerptEn: excerptEn || undefined,
        excerptJa: excerptJa || undefined,
        bodyEn: bodyEn || undefined,
        bodyJa: bodyJa || undefined,
        category,
        status,
        site: resolvedSite,
        publishedAt: publishedAt || undefined,
      };
      const url = mode === 'create' ? '/api/news' : `/api/news/${initial.id}`;
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
      toast.success(mode === 'create' ? 'Мэдээ үүсгэгдлээ' : 'Хадгалагдлаа');
      router.push(listPath);
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      {/* Main */}
      <div className="space-y-6">
        <Card hover={false}>
          <FormField label="Гарчиг" required>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={inputClasses}
              placeholder="Жишээ: Шинэ хичээлийн жилийн нээлт"
            />
          </FormField>
          <FormField label="URL slug" required hint="Зөвхөн жижиг үсэг, тоо, зураас (-)" className="mt-4">
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              className={inputClasses}
              placeholder="example-news-slug"
            />
          </FormField>
          <FormField label="Товч агуулга (Excerpt)" required className="mt-4">
            <textarea
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className={textareaClasses}
              rows={3}
              maxLength={500}
              placeholder="Мэдээний 2-3 өгүүлбэр товч тайлбар (max 500 тэмдэгт)"
            />
          </FormField>
          <FormField label="Бүтэн агуулга" required className="mt-4" hint="Энгийн текст эсвэл Markdown.">
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={textareaClasses}
              rows={14}
              placeholder="Мэдээний бүтэн агуулга..."
            />
          </FormField>
          <FormField label="Cover image" className="mt-4" hint="Зураг сонгож upload хийнэ үү.">
            <ImageUpload
              value={coverImage}
              onChange={setCoverImage}
              folder="news"
              onUploadingChange={onUploadingChange}
            />
          </FormField>
          <FormField
            label="Нэмэлт зургийн slideshow"
            className="mt-4"
            hint="Олон зураг нэмбэл мэдээний дотор slideshow болгож харуулна. Сум товчоор дэс дарааллыг өөрчилнө."
          >
            <MultiImageUpload
              value={gallery}
              onChange={setGallery}
              folder="news"
              onUploadingChange={onUploadingChange}
            />
          </FormField>
        </Card>

        <TranslationFields
          fields={[
            {
              key: 'title',
              label: 'Гарчиг',
              enValue: titleEn,
              jaValue: titleJa,
              setEn: setTitleEn,
              setJa: setTitleJa,
            },
            {
              key: 'excerpt',
              label: 'Товч агуулга',
              multiline: true,
              rows: 3,
              enValue: excerptEn,
              jaValue: excerptJa,
              setEn: setExcerptEn,
              setJa: setExcerptJa,
            },
            {
              key: 'body',
              label: 'Бүтэн агуулга',
              multiline: true,
              rows: 12,
              enValue: bodyEn,
              jaValue: bodyJa,
              setEn: setBodyEn,
              setJa: setBodyJa,
            },
          ]}
        />
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card hover={false}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">
            Тохиргоо
          </h3>

          <div
            className={
              isHighSchool
                ? 'mb-4 rounded-button border border-gold-500/30 bg-gold-500/10 px-3 py-2 text-xs font-semibold text-navy-900'
                : 'mb-4 rounded-button border border-border-light bg-cream-soft px-3 py-2 text-xs font-semibold text-text-body'
            }
          >
            {isHighSchool ? 'Соёл Эрдэм сургуулийн мэдээ' : 'Дээд сургуулийн мэдээ'}
          </div>
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
          <FormField label="Ангилал" className="mt-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClasses}
            >
              {CATEGORY_OPTIONS.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Нийтлэх огноо" className="mt-4" hint="Хоосон бол одоогийн огноо.">
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
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
              {isUploading ? 'Зураг ачаалж байна…' : 'Хадгалах'}
            </Button>
            <Link
              href={listPath}
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
