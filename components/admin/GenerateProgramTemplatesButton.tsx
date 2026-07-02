'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

/**
 * One-click: create a default email template for every program that
 * doesn't have one yet. The admin can then edit each at
 * /admin/email-templates.
 */
export function GenerateProgramTemplatesButton() {
  const router = useRouter();
  const [pending, start] = useTransition();

  function run() {
    start(async () => {
      const res = await fetch('/api/email-templates/generate', { method: 'POST' });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(json?.error ?? 'Алдаа гарлаа');
        return;
      }
      toast.success(
        json.created > 0
          ? `${json.created} хөтөлбөрийн загвар үүслээ`
          : 'Бүх хөтөлбөрт загвар аль хэдийн байна',
      );
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={run}
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-button border border-border-light bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-cream-soft disabled:opacity-50"
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Wand2 className="h-4 w-4 text-gold-500" />
      )}
      {pending ? 'Үүсгэж байна…' : 'Хөтөлбөр бүрээр загвар үүсгэх'}
    </button>
  );
}
