'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses, textareaClasses } from '@/components/admin/FormField';

interface Props {
  initial?: any;
}

export function SettingsForm({ initial = {} }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [schoolName, setSchoolName] = useState(initial.schoolName ?? 'Соёл Эрдэм Дээд Сургууль');
  const [email, setEmail] = useState(initial.email ?? '');
  const [phonePrimary, setPhonePrimary] = useState(initial.phonePrimary ?? '');
  const [phoneSecondary, setPhoneSecondary] = useState(initial.phoneSecondary ?? '');
  const [address, setAddress] = useState(initial.address ?? '');
  const [facebookUrl, setFacebookUrl] = useState(initial.facebookUrl ?? '');
  const [workingHours, setWorkingHours] = useState(initial.workingHours ?? '');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          schoolName,
          email,
          phonePrimary,
          phoneSecondary: phoneSecondary || undefined,
          address,
          facebookUrl: facebookUrl || undefined,
          workingHours,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error ?? 'Хадгалахад алдаа гарлаа');
        return;
      }
      toast.success('Тохиргоо хадгалагдлаа');
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-6">
      <Card hover={false} className="space-y-4">
        <FormField label="Сургуулийн нэр" required>
          <input required value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className={inputClasses} />
        </FormField>
        <FormField label="И-мэйл" required>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} />
        </FormField>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Утас (үндсэн)" required>
            <input required value={phonePrimary} onChange={(e) => setPhonePrimary(e.target.value)} className={inputClasses} />
          </FormField>
          <FormField label="Утас (нэмэлт)">
            <input value={phoneSecondary} onChange={(e) => setPhoneSecondary(e.target.value)} className={inputClasses} />
          </FormField>
        </div>
        <FormField label="Хаяг" required>
          <textarea required rows={3} value={address} onChange={(e) => setAddress(e.target.value)} className={textareaClasses} />
        </FormField>
        <FormField label="Facebook URL">
          <input type="url" value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} className={inputClasses} />
        </FormField>
        <FormField label="Ажлын цаг" required>
          <input required value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} className={inputClasses} />
        </FormField>
      </Card>

      <Button type="submit" variant="primary" size="md" icon={<Save className="h-4 w-4" />} iconPosition="left" loading={pending}>
        Хадгалах
      </Button>
    </form>
  );
}
