'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, MailOpen } from 'lucide-react';
import { toast } from 'sonner';

interface MarkReadToggleProps {
  id: string;
  initialRead: boolean;
}

/**
 * Single-click toggle for the `read` flag on a contact submission. The
 * server route auto-marks read on view, so on the detail page the button
 * is mostly used to push a message back to "unread" if the editor wants
 * to come back to it later.
 */
export function MarkReadToggle({ id, initialRead }: MarkReadToggleProps) {
  const router = useRouter();
  const [read, setRead] = useState(initialRead);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !read;
    startTransition(async () => {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ read: next }),
      });
      if (!res.ok) {
        toast.error('Шинэчлэхэд алдаа гарлаа');
        return;
      }
      setRead(next);
      toast.success(next ? 'Уншсан болголоо' : 'Шинэ зурвас болголоо');
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-button border border-border-light bg-white px-3 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-cream-soft disabled:opacity-50"
    >
      {read ? (
        <>
          <Mail className="h-4 w-4" />
          Шинэ болгох
        </>
      ) : (
        <>
          <MailOpen className="h-4 w-4" />
          Уншсан болгох
        </>
      )}
    </button>
  );
}
