'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses, textareaClasses } from '@/components/admin/FormField';

interface LibraryFormProps {
  initial?: any;
  mode: 'create' | 'edit';
}

export function LibraryForm({ initial = {}, mode }: LibraryFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState(initial.title ?? '');
  const [author, setAuthor] = useState(initial.author ?? '');
  const [isbn, setIsbn] = useState(initial.isbn ?? '');
  const [language, setLanguage] = useState(initial.language ?? 'MN');
  const [category, setCategory] = useState(initial.category ?? '');
  const [publisher, setPublisher] = useState(initial.publisher ?? '');
  const [publishYear, setPublishYear] = useState<string>(initial.publishYear?.toString() ?? '');
  const [totalCopies, setTotalCopies] = useState<string>(initial.totalCopies?.toString() ?? '1');
  const [availableCopies, setAvailableCopies] = useState<string>(initial.availableCopies?.toString() ?? '1');
  const [coverImage, setCoverImage] = useState(initial.coverImage ?? '');
  const [description, setDescription] = useState(initial.description ?? '');
  const [shelfLocation, setShelfLocation] = useState(initial.shelfLocation ?? '');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const payload = {
        title,
        author,
        isbn: isbn || undefined,
        language,
        category,
        publisher: publisher || undefined,
        publishYear: publishYear ? Number(publishYear) : undefined,
        totalCopies: Number(totalCopies),
        availableCopies: Number(availableCopies),
        coverImage: coverImage || undefined,
        description: description || undefined,
        shelfLocation: shelfLocation || undefined,
      };
      const url = mode === 'create' ? '/api/library' : `/api/library/${initial.id}`;
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
      toast.success(mode === 'create' ? 'Ном нэмэгдлээ' : 'Хадгалагдлаа');
      router.push('/admin/library');
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card hover={false} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Гарчиг" required>
            <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClasses} />
          </FormField>
          <FormField label="Зохиогч" required>
            <input required value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClasses} />
          </FormField>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="ISBN">
            <input value={isbn} onChange={(e) => setIsbn(e.target.value)} className={inputClasses} placeholder="978-..." />
          </FormField>
          <FormField label="Хэвлэлийн газар">
            <input value={publisher} onChange={(e) => setPublisher(e.target.value)} className={inputClasses} />
          </FormField>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <FormField label="Хэвлэсэн он">
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className={inputClasses}
              min={1500}
              max={2100}
              placeholder="2024"
            />
          </FormField>
          <FormField label="Ангилал" required>
            <input required value={category} onChange={(e) => setCategory(e.target.value)} className={inputClasses} placeholder="Япон хэл" />
          </FormField>
          <FormField label="Тавиурын байршил">
            <input value={shelfLocation} onChange={(e) => setShelfLocation(e.target.value)} className={inputClasses} placeholder="A-12-3" />
          </FormField>
        </div>
        <FormField label="Тайлбар">
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={textareaClasses} />
        </FormField>
        <FormField label="Cover image URL" hint="Зургийн URL.">
          <input type="url" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className={inputClasses} />
        </FormField>
      </Card>

      <div className="space-y-6">
        <Card hover={false}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">Тохиргоо</h3>
          <FormField label="Хэл" required>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className={inputClasses}>
              <option value="MN">Монгол</option>
              <option value="JP">Япон</option>
              <option value="EN">Англи</option>
              <option value="OTHER">Бусад</option>
            </select>
          </FormField>
          <div className="mt-4 grid gap-3 grid-cols-2">
            <FormField label="Нийт ширхэг" required>
              <input
                type="number"
                required
                min={1}
                value={totalCopies}
                onChange={(e) => setTotalCopies(e.target.value)}
                className={inputClasses}
              />
            </FormField>
            <FormField label="Үлдэгдэл" required>
              <input
                type="number"
                required
                min={0}
                value={availableCopies}
                onChange={(e) => setAvailableCopies(e.target.value)}
                className={inputClasses}
              />
            </FormField>
          </div>
        </Card>

        <Card hover={false}>
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
          <Link href="/admin/library" className="mt-3 block text-center text-sm font-semibold text-text-muted hover:text-navy-900">
            Цуцлах
          </Link>
        </Card>
      </div>
    </form>
  );
}
