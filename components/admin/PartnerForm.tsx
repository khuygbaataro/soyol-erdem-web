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
import { useUploadGuard } from '@/lib/use-upload-guard';

const TYPE_LABELS: Record<string, string> = {
  'japan-university': 'Япон их сургууль',
  'japan-highschool': 'Япон ахлах сургууль',
  domestic: 'Дотоод байгуулл.',
};

interface Initial {
  id?: string;
  type?: string;
  name?: string;
  nameJp?: string | null;
  logo?: string | null;
  headline?: string | null;
  location?: string | null;
  partnerSince?: string | null;
  detail?: string | null;
  url?: string | null;
  activities?: string | null;
  active?: boolean;
  order?: number;
}

export function PartnerForm({
  initial = {},
  mode,
  site = 'UNIVERSITY',
  listPath = '/admin/partners',
}: {
  initial?: Initial;
  mode: 'create' | 'edit';
  /** Which sub-site this partner belongs to. Sent on create. */
  site?: 'UNIVERSITY' | 'HIGH_SCHOOL';
  /** Redirect + cancel target. */
  listPath?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { isUploading, onUploadingChange } = useUploadGuard();

  const [type, setType]               = useState(initial.type         ?? 'japan-university');
  const [name, setName]               = useState(initial.name         ?? '');
  const [nameJp, setNameJp]           = useState(initial.nameJp       ?? '');
  const [logo, setLogo]               = useState(initial.logo         ?? '');
  const [headline, setHeadline]       = useState(initial.headline     ?? '');
  const [location, setLocation]       = useState(initial.location     ?? '');
  const [partnerSince, setPartnerSince] = useState(initial.partnerSince ?? '');
  const [detail, setDetail]           = useState(initial.detail       ?? '');
  const [url, setUrl]                 = useState(initial.url          ?? '');
  const [activities, setActivities]   = useState(initial.activities   ?? '');
  const [active, setActive]           = useState(initial.active       ?? true);
  const [order, setOrder]             = useState(String(initial.order ?? 0));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const payload = { site, type, name, nameJp: nameJp || undefined, logo: logo || undefined, headline: headline || undefined, location: location || undefined, partnerSince: partnerSince || undefined, detail: detail || undefined, url: url || undefined, activities: activities || undefined, active, order: Number(order) };
      const endpoint = mode === 'create' ? '/api/partners' : `/api/partners/${initial.id}`;
      const res = await fetch(endpoint, { method: mode === 'create' ? 'POST' : 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) { toast.error('Хадгалахад алдаа гарлаа'); return; }
      toast.success(mode === 'create' ? 'Нэмэгдлээ' : 'Хадгалагдлаа');
      router.push(listPath);
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card hover={false} className="space-y-4">
        <FormField label="Төрөл" required>
          <select value={type} onChange={(e) => setType(e.target.value)} className={inputClasses} required>
            {Object.entries(TYPE_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Монгол нэр" required>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} placeholder="Сэйжо их сургууль" />
        </FormField>

        <FormField label="Японы нэр" hint="Кана/кандж + латин хэлбэрт. Жишээ: 星城大学 / Seijoh University">
          <input value={nameJp} onChange={(e) => setNameJp(e.target.value)} className={inputClasses} placeholder="星城大学 / Seijoh University" />
        </FormField>

        <FormField label="Хөнгөлөлт / badge" hint='Карт дээрх алтан тэмдэгт текст. Жишээ: "50% хөнгөлөлт (их сургууль)"'>
          <input value={headline} onChange={(e) => setHeadline(e.target.value)} className={inputClasses} placeholder="50% хөнгөлөлт (их сургууль)" />
        </FormField>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Байршил">
            <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClasses} placeholder="Япон, Токио" />
          </FormField>
          <FormField label="Хамтарсан цагаасаа">
            <input value={partnerSince} onChange={(e) => setPartnerSince(e.target.value)} className={inputClasses} placeholder="2005 оны 9 сар" />
          </FormField>
        </div>

        <FormField label="Тайлбар (карт дотор)" hint="Хэдэн % хөнгөлөлт, ямар мэргэжлээр гэх мэт.">
          <textarea value={detail} onChange={(e) => setDetail(e.target.value)} rows={4} className={textareaClasses} />
        </FormField>

        {type === 'domestic' && (
          <FormField label="Хамтарсан үйл ажиллагаа" hint="Мөр тус бүр тусдаа жагсаалт болно.">
            <textarea value={activities} onChange={(e) => setActivities(e.target.value)} rows={4} className={textareaClasses} placeholder={'"Япон киноны өдөрлөг"\n"Явган аялал"'} />
          </FormField>
        )}

        {type === 'domestic' && (
          <FormField label="Вэбийн хаяг">
            <input value={url} onChange={(e) => setUrl(e.target.value)} className={inputClasses} placeholder="https://mn.emb-japan.go.jp" />
          </FormField>
        )}

        <FormField label="Logo зураг">
          <ImageUpload value={logo} onChange={setLogo} folder="misc" onUploadingChange={onUploadingChange} />
        </FormField>
      </Card>

      <div className="space-y-6">
        <Card hover={false}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">Тохиргоо</h3>
          <FormField label="Дараалал" hint="Жагсаалтад харагдах дараалал.">
            <input type="number" min={0} value={order} onChange={(e) => setOrder(e.target.value)} className={inputClasses} />
          </FormField>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
            <span className="font-semibold text-navy-900">Идэвхтэй (вэб дээр харагдана)</span>
          </label>
        </Card>

        <Card hover={false}>
          <Button type="submit" variant="primary" size="md" icon={<Save className="h-4 w-4" />} iconPosition="left" loading={pending} disabled={isUploading} className="w-full">
            {isUploading ? 'Зураг ачаалж байна…' : 'Хадгалах'}
          </Button>
          <Link href={listPath} className="mt-3 block text-center text-sm font-semibold text-text-muted hover:text-navy-900">
            Цуцлах
          </Link>
        </Card>
      </div>
    </form>
  );
}
