'use client';

import { Suspense, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { LogIn, School } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/Button';

const inputClasses =
  'w-full rounded-button border border-border-light bg-white px-4 py-3 text-sm text-text-heading placeholder-text-muted transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10';

export default function HighSchoolLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  // Default landing inside the high-school admin shell so editors who
  // signed in here never accidentally end up in the main university admin.
  const callbackUrl =
    params.get('callbackUrl') ?? '/high-school/admin/dashboard';
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        toast.error('Имэйл эсвэл нууц үг буруу байна.');
        return;
      }
      toast.success('Тавтай морил!');
      router.push(callbackUrl);
      router.refresh();
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0f1f3a] via-[#162a52] to-[#0f1f3a] px-4 py-10">
      <Toaster richColors position="top-right" />
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-3 text-white">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/40">
            <School className="h-6 w-6" />
          </span>
          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-400">
              Соёл Эрдэм
            </p>
            <p className="font-serif text-lg font-bold leading-tight">
              Ахлах сургууль · Хянах самбар
            </p>
          </div>
        </div>

        <div className="rounded-card border border-white/10 bg-white p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45)]">
          <h1 className="text-h3 font-bold text-navy-900">Нэвтрэх</h1>
          <p className="mt-1 text-sm text-text-muted">
            Ахлах сургуулийн редактор, ажилтан нар нэвтэрнэ.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted"
              >
                И-мэйл
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
                placeholder="editor@soyolerdem.edu.mn"
                autoComplete="email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted"
              >
                Нууц үг
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={pending}
              icon={<LogIn className="h-4 w-4" />}
              iconPosition="left"
              className="w-full"
            >
              Нэвтрэх
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-text-muted">
            <Link
              href="/high-school"
              className="font-semibold text-navy-900 hover:text-gold-500"
            >
              ← Ахлах сургуулийн сайт руу буцах
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-white/50">
          Их сургуулийн админ нь{' '}
          <Link href="/login" className="text-gold-400 hover:text-gold-300">
            /login
          </Link>{' '}
          хаягт байна.
        </p>
      </div>
    </div>
  );
}
