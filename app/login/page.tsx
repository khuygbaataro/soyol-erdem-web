'use client';

import { Suspense, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { LogIn } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/icons/Logo';

const inputClasses =
  'w-full rounded-button border border-border-light bg-white px-4 py-3 text-sm text-text-heading placeholder-text-muted transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') ?? '/admin/dashboard';
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-cream-soft via-cream to-cream-soft px-4 py-10">
      <Toaster richColors position="top-right" />
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center">
          <Logo withLabel />
        </div>

        <div className="rounded-card border border-border-light bg-white p-8 shadow-card-hover">
          <h1 className="text-h3 font-bold text-navy-900">Хянах самбар</h1>
          <p className="mt-1 text-sm text-text-muted">
            Багш, ажилтан нар нэвтрэх.
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
                placeholder=""
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
                placeholder=""
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
            <Link href="/" className="font-semibold text-navy-900 hover:text-gold-500">
              ← Нийтийн сайт руу буцах
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
