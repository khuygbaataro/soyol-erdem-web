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
import { STAFF_POSITION_KEYS } from '@/lib/constants';

interface StaffFormProps {
  initial?: {
    id?: string;
    positionKey?: string;
    position?: string;
    name?: string;
    degree?: string | null;
    photo?: string | null;
    bio?: string | null;
    email?: string | null;
    phone?: string | null;
    active?: boolean;
    order?: number;
  };
  mode: 'create' | 'edit';
}

export function StaffForm({ initial = {}, mode }: StaffFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [positionKey, setPositionKey] = useState(initial.positionKey ?? '');
  const [position, setPosition] = useState(initial.position ?? '');
  const [name, setName] = useState(initial.name ?? '');
  const [degree, setDegree] = useState(initial.degree ?? '');
  const [photo, setPhoto] = useState(initial.photo ?? '');
  const [bio, setBio] = useState(initial.bio ?? '');
  const [email, setEmail] = useState(initial.email ?? '');
  const [phone, setPhone] = useState(initial.phone ?? '');
  const [active, setActive] = useState(initial.active ?? true);
  const [order, setOrder] = useState<string>(initial.order?.toString() ?? '0');

  function handleKeyChange(v: string) {
    setPositionKey(v);
    // Auto-fill `position` from the predefined label if it's blank or
    // matches the previous key's label (so admin doesn't have to retype).
    const match = STAFF_POSITION_KEYS.find((k) => k.key === v);
    if (match && (!position || STAFF_POSITION_KEYS.some((k) => k.label === position))) {
      setPosition(match.label);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!positionKey) {
      toast.error('Албан тушаал сонгоно уу');
      return;
    }
    startTransition(async () => {
      const payload = {
        positionKey,
        position,
        name,
        degree: degree || undefined,
        photo: photo || undefined,
        bio: bio || undefined,
        email: email || undefined,
        phone: phone || undefined,
        active,
        order: Number(order),
      };
      const url = mode === 'create' ? '/api/staff' : `/api/staff/${initial.id}`;
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
      toast.success(mode === 'create' ? 'Ажилтны мэдээлэл нэмэгдлээ' : 'Хадгалагдлаа');
      router.push('/admin/staff');
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card hover={false} className="space-y-4">
        <FormField
          label="Албан тушаал (chart node)"
          required
          hint="Бүтэц зураг дээрх алин нод дээр энэ ажилтны мэдээлэл харагдахыг сонго."
        >
          <select
            required
            value={positionKey}
            onChange={(e) => handleKeyChange(e.target.value)}
            className={inputClasses}
          >
            <option value="">-- Сонгоно уу --</option>
            {STAFF_POSITION_KEYS.map((k) => (
              <option key={k.key} value={k.key}>
                {k.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Албан тушаалын нэр"
          required
          hint='Modal-д "Албан тушаал" хэсэгт харагдана.'
        >
          <input
            required
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className={inputClasses}
            placeholder="Захирал, Сургалтын албаны эрхлэгч..."
          />
        </FormField>

        <FormField label="Бүтэн нэр" required>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            placeholder="Т. Дорждагва"
          />
        </FormField>

        <FormField
          label="Зэрэг"
          hint="Жишээ: Бакалавр, Магистр (MS), Магистр (MBA), Доктор (PhD)."
        >
          <input
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className={inputClasses}
            placeholder="Доктор (PhD), Дэд профессор"
          />
        </FormField>

        <FormField label="Зураг" hint="Profile зураг (1:1 хэмжээтэй тохиромжтой).">
          <ImageUpload value={photo} onChange={setPhoto} folder="misc" />
        </FormField>

        <FormField label="Богино намтар" hint="Modal-ны доод хэсэгт харагдана.">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className={textareaClasses}
            placeholder="Эрдэм шинжилгээний чиглэл, туршлага, гэх мэт."
          />
        </FormField>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="И-мэйл">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              placeholder="name@soyolerdem.edu.mn"
            />
          </FormField>
          <FormField label="Утас">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClasses}
              placeholder="7011-8584"
            />
          </FormField>
        </div>
      </Card>

      <div className="space-y-6">
        <Card hover={false}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-navy-900">
            Тохиргоо
          </h3>
          <FormField label="Дараалал" hint="Хүснэгтэн дэх жагсаалтад нөлөөлнө.">
            <input
              type="number"
              min={0}
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className={inputClasses}
            />
          </FormField>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            <span className="font-semibold text-navy-900">
              Идэвхтэй (бүтэц зураг дээр харагдана)
            </span>
          </label>
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
          <Link
            href="/admin/staff"
            className="mt-3 block text-center text-sm font-semibold text-text-muted hover:text-navy-900"
          >
            Цуцлах
          </Link>
        </Card>
      </div>
    </form>
  );
}
