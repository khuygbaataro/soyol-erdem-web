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
import { TranslationFields } from '@/components/admin/TranslationFields';
import { STAFF_POSITION_KEYS } from '@/lib/constants';
import { useUploadGuard } from '@/lib/use-upload-guard';

interface StaffFormProps {
  initial?: {
    id?: string;
    positionKey?: string;
    position?: string;
    name?: string;
    degree?: string | null;
    photo?: string | null;
    bio?: string | null;
    positionEn?: string | null;
    positionJa?: string | null;
    degreeEn?: string | null;
    degreeJa?: string | null;
    bioEn?: string | null;
    bioJa?: string | null;
    email?: string | null;
    phone?: string | null;
    active?: boolean;
    order?: number;
  };
  mode: 'create' | 'edit';
  /** Optional override of the position-key dropdown options. Defaults to
   *  the university `STAFF_POSITION_KEYS`. Used by the HS admin shell to
   *  show only `hs-*` entries. */
  positionKeys?: readonly { readonly key: string; readonly label: string }[];
  /** Where to redirect after submit + cancel link target.
   *  Defaults to '/admin/staff'. */
  listPath?: string;
}

export function StaffForm({
  initial = {},
  mode,
  positionKeys,
  listPath = '/admin/staff',
}: StaffFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { isUploading, onUploadingChange } = useUploadGuard();

  const keys = positionKeys ?? STAFF_POSITION_KEYS;

  // Determine if the initial positionKey is a custom (not-in-list) key.
  const isInitialCustom =
    !!initial.positionKey && !keys.some((k) => k.key === initial.positionKey);

  const [dropdownVal, setDropdownVal] = useState(
    isInitialCustom ? '__custom__' : (initial.positionKey ?? ''),
  );
  const [positionKey, setPositionKey] = useState(initial.positionKey ?? '');
  const [position, setPosition] = useState(initial.position ?? '');
  const [name, setName] = useState(initial.name ?? '');
  const [degree, setDegree] = useState(initial.degree ?? '');
  const [photo, setPhoto] = useState(initial.photo ?? '');
  const [bio, setBio] = useState(initial.bio ?? '');
  const [positionEn, setPositionEn] = useState(initial.positionEn ?? '');
  const [positionJa, setPositionJa] = useState(initial.positionJa ?? '');
  const [degreeEn, setDegreeEn] = useState(initial.degreeEn ?? '');
  const [degreeJa, setDegreeJa] = useState(initial.degreeJa ?? '');
  const [bioEn, setBioEn] = useState(initial.bioEn ?? '');
  const [bioJa, setBioJa] = useState(initial.bioJa ?? '');
  const [email, setEmail] = useState(initial.email ?? '');
  const [phone, setPhone] = useState(initial.phone ?? '');
  const [active, setActive] = useState(initial.active ?? true);
  const [order, setOrder] = useState<string>(initial.order?.toString() ?? '0');

  function handleDropdownChange(v: string) {
    setDropdownVal(v);
    if (v === '__custom__') {
      setPositionKey('');
    } else {
      setPositionKey(v);
      // Auto-fill `position` label when a predefined key is selected.
      const match = keys.find((k) => k.key === v);
      if (match && (!position || keys.some((k) => k.label === position))) {
        setPosition(match.label);
      }
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!positionKey) {
      toast.error(dropdownVal === '__custom__' ? 'Chart node key оруулна уу' : 'Албан тушаал сонгоно уу');
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
        positionEn: positionEn || undefined,
        positionJa: positionJa || undefined,
        degreeEn: degreeEn || undefined,
        degreeJa: degreeJa || undefined,
        bioEn: bioEn || undefined,
        bioJa: bioJa || undefined,
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
      router.push(listPath);
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
            required={dropdownVal !== '__custom__'}
            value={dropdownVal}
            onChange={(e) => handleDropdownChange(e.target.value)}
            className={inputClasses}
          >
            <option value="">-- Сонгоно уу --</option>
            {keys.map((k) => (
              <option key={k.key} value={k.key}>
                {k.label}
              </option>
            ))}
            <option value="__custom__">＋ Шинэ нэмэх…</option>
          </select>
          {dropdownVal === '__custom__' && (
            <input
              required
              value={positionKey}
              onChange={(e) => setPositionKey(e.target.value.trim().toLowerCase().replace(/\s+/g, '-'))}
              className={`${inputClasses} mt-2`}
              placeholder="Жишээ: quality-dept  (латин үсэг, зураас)"
            />
          )}
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
          <ImageUpload
            value={photo}
            onChange={setPhoto}
            folder="misc"
            onUploadingChange={onUploadingChange}
          />
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

        <TranslationFields
          fields={[
            { key: 'position', label: 'Албан тушаалын нэр', enValue: positionEn, jaValue: positionJa, setEn: setPositionEn, setJa: setPositionJa },
            { key: 'degree', label: 'Зэрэг', enValue: degreeEn, jaValue: degreeJa, setEn: setDegreeEn, setJa: setDegreeJa },
            { key: 'bio', label: 'Богино намтар', multiline: true, rows: 4, enValue: bioEn, jaValue: bioJa, setEn: setBioEn, setJa: setBioJa },
          ]}
        />
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
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? 'Зураг ачаалж байна…' : 'Хадгалах'}
          </Button>
          <Link
            href={listPath}
            className="mt-3 block text-center text-sm font-semibold text-text-muted hover:text-navy-900"
          >
            Цуцлах
          </Link>
        </Card>
      </div>
    </form>
  );
}
