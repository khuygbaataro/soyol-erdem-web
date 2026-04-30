'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses } from '@/components/admin/FormField';

interface Stat {
  id?: string;
  key?: string;
  icon?: string;
  number?: string;
  label?: string;
  order?: number;
  active?: boolean;
}

interface Props {
  initial?: Stat;
  /** When set, PUTs to /api/stats/[id]; otherwise POSTs to /api/stats. */
  id?: string;
}

const ICON_OPTIONS = [
  'GraduationCap',
  'Users',
  'BookOpen',
  'Globe',
  'Trophy',
  'Award',
  'Star',
  'Briefcase',
  'Building2',
  'Calendar',
  'Languages',
  'Library',
  'TrendingUp',
];

export function StatForm({ initial = {}, id }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [key, setKey] = useState(initial.key ?? '');
  const [icon, setIcon] = useState(initial.icon ?? 'GraduationCap');
  const [number, setNumber] = useState(initial.number ?? '');
  const [label, setLabel] = useState(initial.label ?? '');
  const [order, setOrder] = useState(initial.order ?? 0);
  const [active, setActive] = useState(initial.active ?? true);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch(id ? `/api/stats/${id}` : '/api/stats', {
        method: id ? 'PUT' : 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ key, icon, number, label, order, active }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error ?? 'Хадгалахад алдаа гарлаа');
        return;
      }
      toast.success(id ? 'Шинэчиллээ' : 'Үүсгэлээ');
      router.push('/admin/stats');
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="max-w-2xl space-y-6">
      <Card hover={false} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Key" hint="Зөвхөн жижиг үсэг, тоо, зураас. Жнь: history" required>
            <input
              required
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className={inputClasses}
              disabled={!!id}
            />
          </FormField>
          <FormField label="Дараалал">
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className={inputClasses}
            />
          </FormField>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Тоо" hint="32+, 1500+, 40% гэх мэт" required>
            <input
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className={inputClasses}
            />
          </FormField>
          <FormField label="Icon" hint="lucide-react icon-ийн нэр" required>
            <select
              required
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className={inputClasses}
            >
              {ICON_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </FormField>
        </div>
        <FormField label="Тайлбар" required>
          <input
            required
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className={inputClasses}
          />
        </FormField>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          <span>Идэвхтэй (хуудсан дээр харагдана)</span>
        </label>
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
