'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface DeleteButtonProps {
  endpoint: string;
  label?: string;
  redirectTo?: string;
  confirmMessage?: string;
  className?: string;
}

/**
 * Inline DELETE button with confirm + sonner toast feedback.
 */
export function DeleteButton({
  endpoint,
  label,
  redirectTo,
  confirmMessage = 'Та энэ бичлэгийг устгахдаа итгэлтэй байна уу?',
  className,
}: DeleteButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [armed, setArmed] = useState(false);

  function handleClick() {
    if (!armed) {
      setArmed(true);
      setTimeout(() => setArmed(false), 4000);
      return;
    }
    if (!confirm(confirmMessage)) return;
    startTransition(async () => {
      const res = await fetch(endpoint, { method: 'DELETE' });
      if (!res.ok) {
        toast.error('Устгахад алдаа гарлаа');
        return;
      }
      toast.success('Устгагдлаа');
      if (redirectTo) router.push(redirectTo);
      else router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-button px-2.5 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50',
        armed
          ? 'bg-red-50 text-red-600 ring-1 ring-red-200'
          : 'text-text-muted hover:bg-cream-soft hover:text-red-600',
        className,
      )}
    >
      <Trash2 className="h-3.5 w-3.5" />
      {armed ? 'Дарж баталгаажуул' : (label ?? 'Устгах')}
    </button>
  );
}
