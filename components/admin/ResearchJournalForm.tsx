'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses } from '@/components/admin/FormField';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { FileUpload } from '@/components/admin/ImageUpload';
import { useUploadGuard } from '@/lib/use-upload-guard';

interface Initial {
  id?: string;
  slug?: string;
  title?: string;
  subtitle?: string;
  volume?: number;
  year?: number;
  issue?: string;
  fileUrl?: string;
  cover?: string | null;
  active?: boolean;
  order?: number;
}

export function ResearchJournalForm({ initial = {}, mode }: { initial?: Initial; mode: 'create' | 'edit' }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { isUploading, onUploadingChange } = useUploadGuard();

  const nextVol = (initial.volume ?? 0) + (mode === 'create' ? 1 : 0);
  const [slug, setSlug]           = useState(initial.slug     ?? '');
  const [title, setTitle]         = useState(initial.title    ?? '');
  const [subtitle, setSubtitle]   = useState(initial.subtitle ?? '');
  const [volume, setVolume]       = useState(String(initial.volume ?? nextVol));
  const [year, setYear]           = useState(String(initial.year ?? new Date().getFullYear()));
  const [issue, setIssue]         = useState(initial.issue    ?? '№1');
  const [fileUrl, setFileUrl]     = useState(initial.fileUrl  ?? '');
  const [cover, setCover]         = useState(initial.cover    ?? '');
  const [active, setActive]       = useState(initial.active   ?? true);
  const [order, setOrder]         = useState(String(initial.order ?? 0));

  // Auto-generate slug and titles from volume/year/issue
  function autoFill(v: string, y: string, i: string) {
    const n = i.replace('№', 'n').replace(/\s/g, '');
    const s = `sp-${y}-${n}`;
    setSlug(s);
    setTitle(`${v}-р боть`);
    setSubtitle(`${y} он · ${i}`);
    setOrder(v);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!fileUrl) { toast.error('PDF файл оруулна уу'); return; }
    startTransition(async () => {
      const payload = { slug, title, subtitle, volume: Number(volume), year: Number(year), issue, fileUrl, cover: cover || undefined, active, order: Number(order) };
      const url = mode === 'create' ? '/api/research-journals' : `/api/research-journals/${initial.id}`;
      const res = await fetch(url, { method: mode === 'create' ? 'POST' : 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) { toast.error('Хадгалахад алдаа гарлаа'); return; }
      toast.success(mode === 'create' ? 'Шинэ боть нэмэгдлээ' : 'Хадгалагдлаа');
      router.push('/admin/research-journals');
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card hover={false} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField label="Боть дугаар" required>
            <input type="number" min={1} required value={volume} onChange={e => { setVolume(e.target.value); autoFill(e.target.value, year, issue); }} className={inputClasses} placeholder="6" />
          </FormField>
          <FormField label="Он" required>
            <input type="number" min={2000} required value={year} onChange={e => { setYear(e.target.value); autoFill(volume, e.target.value, issue); }} className={inputClasses} />
          </FormField>
          <FormField label="Дугаар" required hint='№1, №2 г.м.'>
            <input required value={issue} onChange={e => { setIssue(e.target.value); autoFill(volume, year, e.target.value); }} className={inputClasses} />
          </FormField>
        </div>

        <FormField label="Slug (URL)" required hint='Автомат үүсгэнэ. Жишээ: sp-2026-n2'>
          <input required value={slug} onChange={e => setSlug(e.target.value)} className={inputClasses} placeholder="sp-2026-n2" />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Гарчиг" required>
            <input required value={title} onChange={e => setTitle(e.target.value)} className={inputClasses} placeholder="6-р боть" />
          </FormField>
          <FormField label="Дэд гарчиг" required>
            <input required value={subtitle} onChange={e => setSubtitle(e.target.value)} className={inputClasses} placeholder="2026 он · №2" />
          </FormField>
        </div>

        <FormField label="PDF файл" required hint="Сэтгүүлийн PDF файл (max 50 MB)">
          <FileUpload value={fileUrl} onChange={setFileUrl} folder="journals" hint="PDF файл сонгох (max 50 MB)" onUploadingChange={onUploadingChange} />
        </FormField>

        <FormField label="Нүүр зураг" hint="Сэтгүүлийн нүүр зураг (карт дээр харагдана)">
          <ImageUpload value={cover} onChange={setCover} folder="misc" onUploadingChange={onUploadingChange} />
        </FormField>
      </Card>

      <div className="space-y-6">
        <Card hover={false}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">Тохиргоо</h3>
          <FormField label="Дараалал">
            <input type="number" min={0} value={order} onChange={e => setOrder(e.target.value)} className={inputClasses} />
          </FormField>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} />
            <span className="font-semibold text-navy-900">Идэвхтэй (вэб дээр харагдана)</span>
          </label>
        </Card>
        <Card hover={false}>
          <Button type="submit" variant="primary" size="md" icon={<Save className="h-4 w-4" />} iconPosition="left" loading={pending} disabled={isUploading} className="w-full">
            {isUploading ? 'Файл ачаалж байна…' : 'Хадгалах'}
          </Button>
          <Link href="/admin/research-journals" className="mt-3 block text-center text-sm font-semibold text-text-muted hover:text-navy-900">
            Цуцлах
          </Link>
        </Card>
      </div>
    </form>
  );
}
