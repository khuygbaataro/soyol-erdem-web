'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses } from '@/components/admin/FormField';

export default function NewUserPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('EDITOR');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, active: true }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error ?? 'Үүсгэхэд алдаа гарлаа');
        return;
      }
      toast.success('Хэрэглэгч үүсгэгдлээ');
      router.push('/admin/users');
      router.refresh();
    });
  }

  return (
    <>
      <PageHeader
        title="Шинэ хэрэглэгч"
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Хэрэглэгч', href: '/admin/users' },
          { label: 'Шинэ' },
        ]}
      />

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card hover={false} className="space-y-4">
          <FormField label="Нэр" required>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} placeholder="Б.Бат-Эрдэнэ" />
          </FormField>
          <FormField label="И-мэйл" required>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} placeholder="user@soyolerdem.edu.mn" />
          </FormField>
          <FormField label="Нууц үг" required hint="Хамгийн багадаа 6 тэмдэгт.">
            <input required type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={inputClasses} />
          </FormField>
        </Card>

        <div className="space-y-6">
          <Card hover={false}>
            <FormField label="Эрх" required>
              <select value={role} onChange={(e) => setRole(e.target.value)} className={inputClasses}>
                <option value="ADMIN">Захирагч (бүх эрх)</option>
                <option value="EDITOR">Редактор (мэдээ)</option>
                <option value="LIBRARIAN">Номын санч</option>
                <option value="RESEARCHER">Судлаач</option>
              </select>
            </FormField>
          </Card>

          <Card hover={false}>
            <Button type="submit" variant="primary" size="md" icon={<Save className="h-4 w-4" />} iconPosition="left" loading={pending} className="w-full">
              Үүсгэх
            </Button>
            <Link href="/admin/users" className="mt-3 block text-center text-sm font-semibold text-text-muted hover:text-navy-900">
              Цуцлах
            </Link>
          </Card>
        </div>
      </form>
    </>
  );
}
