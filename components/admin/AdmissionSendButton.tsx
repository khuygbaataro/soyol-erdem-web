'use client';

import { useState, useTransition } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Per-row quick-send on /admin/admissions: sends the program's info
 * template to the applicant. Once sent, shows an "Илгээгдсэн" badge.
 */
export function AdmissionSendButton({
  submissionId,
  initialSent,
}: {
  submissionId: string;
  initialSent: boolean;
}) {
  const [sent, setSent] = useState(initialSent);
  const [pending, start] = useTransition();

  function send() {
    if (!confirm('Энэ хүнд хөтөлбөрийн мэдээллийн имэйл илгээх үү?')) return;
    start(async () => {
      const res = await fetch('/api/admissions/send', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ submissionId }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(json?.error ?? 'Илгээхэд алдаа гарлаа');
        return;
      }
      setSent(true);
      toast.success('Имэйл илгээгдлээ');
    });
  }

  if (sent) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Илгээгдсэн
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={send}
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-button border border-gold-500/40 bg-gold-500/10 px-2.5 py-1.5 text-xs font-semibold text-navy-900 transition-colors hover:bg-gold-500/20 disabled:opacity-50"
    >
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Send className="h-3.5 w-3.5 text-gold-500" />
      )}
      Мэдээлэл илгээх
    </button>
  );
}
