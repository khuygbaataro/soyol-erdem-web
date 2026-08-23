'use client';

import { useState, useTransition } from 'react';
import { CheckCircle2, Loader2, Lock, Send } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Имэйл илгээх боломжийг түр хаасан эсэх.
 *
 * Илгээх урсгал одоогоор бүрэн ажиллахгүй байгаа тул админ санамсаргүй
 * дарж, оюутанд буруу/дутуу имэйл очихоос сэргийлж хаав. Засагдсаны
 * дараа энэ утгыг `true` болгоход товч шууд эргэж ажиллана — өөр хаана
 * ч засах шаардлагагүй.
 */
const SEND_ENABLED = false;

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
    if (!SEND_ENABLED) return;
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

  // Өмнө нь илгээгдсэн анкетууд түүхээрээ хэвээр харагдана.
  if (sent) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Илгээгдсэн
      </span>
    );
  }

  if (!SEND_ENABLED) {
    return (
      <span
        title="Мэдээлэл илгээх боломжийг түр хугацаанд хаасан байна. Засагдсаны дараа дахин нээгдэнэ."
        className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-button border border-border-light bg-cream-soft px-2.5 py-1.5 text-xs font-semibold text-text-muted"
      >
        <Lock className="h-3.5 w-3.5" />
        Түр хаасан
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
