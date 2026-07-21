'use client';

import { useState, useTransition } from 'react';
import { Check, Copy, FileSignature, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

/**
 * /admin/admissions мөр дэх "Гэрээ" товч: анкетаас оюутны гэрээ үүсгэж
 * (эсвэл аль хэдийн үүссэнийг сэргээж), нийтийн холбоосыг clipboard-д
 * хуулна. Дараа нь ажилтан оюутанд илгээнэ.
 */
export function AdmissionContractButton({
  submissionId,
}: {
  submissionId: string;
}) {
  const [copied, setCopied] = useState(false);
  const [pending, start] = useTransition();

  function createAndCopy() {
    start(async () => {
      try {
        const res = await fetch('/api/geree', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ contactSubmissionId: submissionId }),
        });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.path) {
          toast.error(json?.error ?? 'Гэрээ үүсгэхэд алдаа гарлаа');
          return;
        }
        const url = `${window.location.origin}${json.path}`;
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
          toast.success(
            json.reused ? 'Холбоос хуулагдлаа (өмнө үүссэн)' : 'Гэрээ үүсгэж, холбоос хуулагдлаа',
          );
        } catch {
          toast.success('Гэрээ бэлэн боллоо', { description: url });
        }
      } catch {
        toast.error('Сүлжээний алдаа гарлаа');
      }
    });
  }

  return (
    <button
      type="button"
      onClick={createAndCopy}
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-button border border-navy-900/20 bg-navy-900/5 px-2.5 py-1.5 text-xs font-semibold text-navy-900 transition-colors hover:bg-navy-900/10 disabled:opacity-50"
      title="Оюутны гэрээ үүсгэж холбоос хуулах"
    >
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-600" />
      ) : (
        <FileSignature className="h-3.5 w-3.5" />
      )}
      {copied ? 'Хуулагдсан' : 'Гэрээ'}
    </button>
  );
}
