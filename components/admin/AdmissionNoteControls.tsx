'use client';

import { useState, useTransition } from 'react';
import { Loader2, PhoneCall } from 'lucide-react';
import { toast } from 'sonner';

type Likelihood = '' | 'HIGH' | 'MID' | 'LOW';

const LIKELIHOODS: { value: Likelihood; label: string }[] = [
  { value: '', label: '— магадлал —' },
  { value: 'HIGH', label: 'Өндөр' },
  { value: 'MID', label: 'Дунд' },
  { value: 'LOW', label: 'Бага' },
];

// Сонгосон түвшингээр select-ийн өнгө өөрчлөгдөнө — хурдан ялгаж харахад.
const LIKELIHOOD_CLASS: Record<Likelihood, string> = {
  '': 'border-border-light bg-white text-text-muted',
  HIGH: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  MID: 'border-amber-300 bg-amber-50 text-amber-700',
  LOW: 'border-red-300 bg-red-50 text-red-700',
};

/**
 * Inline admission follow-up controls on /admin/admissions:
 *   • "Утсаар ярьсан" toggle
 *   • enrollment-likelihood select (Өндөр / Дунд / Бага)
 * Both save immediately via PATCH /api/admissions/status.
 */
export function AdmissionNoteControls({
  submissionId,
  initialCalled,
  initialLikelihood,
}: {
  submissionId: string;
  initialCalled: boolean;
  initialLikelihood: Likelihood;
}) {
  const [called, setCalled] = useState(initialCalled);
  const [likelihood, setLikelihood] = useState<Likelihood>(initialLikelihood);
  const [pending, start] = useTransition();

  function save(
    next: { called?: boolean; enrollLikelihood?: Likelihood },
    revert: () => void,
  ) {
    start(async () => {
      const res = await fetch('/api/admissions/status', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ submissionId, ...next }),
      });
      if (!res.ok) {
        toast.error('Хадгалахад алдаа гарлаа');
        revert();
      }
    });
  }

  function toggleCalled() {
    const prev = called;
    const v = !called;
    setCalled(v);
    save({ called: v }, () => setCalled(prev));
  }

  function changeLikelihood(v: Likelihood) {
    const prev = likelihood;
    setLikelihood(v);
    save({ enrollLikelihood: v }, () => setLikelihood(prev));
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleCalled}
        disabled={pending}
        aria-pressed={called}
        title={called ? 'Утсаар ярьсан' : 'Утсаар ярьсан гэж тэмдэглэх'}
        className={
          'inline-flex items-center gap-1.5 rounded-button border px-2.5 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 ' +
          (called
            ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
            : 'border-border-light bg-white text-text-muted hover:bg-cream-soft hover:text-navy-900')
        }
      >
        {pending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <PhoneCall className="h-3.5 w-3.5" />
        )}
        {called ? 'Ярьсан' : 'Ярьсан?'}
      </button>

      <select
        value={likelihood}
        onChange={(e) => changeLikelihood(e.target.value as Likelihood)}
        disabled={pending}
        title="Сургуульд элсэх магадлал"
        className={
          'rounded-button border px-2 py-1.5 text-xs font-semibold transition-colors disabled:opacity-50 ' +
          LIKELIHOOD_CLASS[likelihood]
        }
      >
        {LIKELIHOODS.map((l) => (
          <option key={l.value} value={l.value}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
