'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FileSignature, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

/**
 * /admin/admissions мөр дэх "Гэрээ" товч: анкетаас оюутны гэрээ үүсгэж
 * (эсвэл аль хэдийн үүссэнийг сэргээж), ажилтныг гэрээний хуудас руу
 * аваачна. Тэнд ажилтан гарын үсгээ зураад, дараа нь элсэгчид илгээх
 * холбоосоо авна.
 */
export function AdmissionContractButton({
  submissionId,
}: {
  submissionId: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function createAndOpen() {
    start(async () => {
      try {
        const res = await fetch('/api/geree', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ contactSubmissionId: submissionId }),
        });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.token) {
          toast.error(json?.error ?? 'Гэрээ үүсгэхэд алдаа гарлаа');
          return;
        }
        router.push(`/admin/contracts/${json.token}`);
      } catch {
        toast.error('Сүлжээний алдаа гарлаа');
      }
    });
  }

  return (
    <button
      type="button"
      onClick={createAndOpen}
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-button border border-navy-900/20 bg-navy-900/5 px-2.5 py-1.5 text-xs font-semibold text-navy-900 transition-colors hover:bg-navy-900/10 disabled:opacity-50"
      title="Оюутны гэрээ үүсгэж гарын үсэг зурах"
    >
      {pending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <FileSignature className="h-3.5 w-3.5" />
      )}
      Гэрээ
    </button>
  );
}
