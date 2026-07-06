'use client';

import { useState, useTransition } from 'react';
import { Loader2, Minus, PhoneCall, PhoneMissed } from 'lucide-react';
import { toast } from 'sonner';

type Likelihood = '' | 'HIGH' | 'MID' | 'LOW';

const LIKELIHOODS: { value: Likelihood; label: string }[] = [
  { value: '', label: '— магадлал —' },
  { value: 'HIGH', label: 'Өндөр' },
  { value: 'MID', label: 'Дунд' },
  { value: 'LOW', label: 'Бага' },
];

const LIKELIHOOD_CLASS: Record<Likelihood, string> = {
  '': 'border-border-light bg-white text-text-muted',
  HIGH: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  MID: 'border-amber-300 bg-amber-50 text-amber-700',
  LOW: 'border-red-300 bg-red-50 text-red-700',
};

/**
 * Inline admission follow-up controls on /admin/admissions:
 *   • "Ярьсан?" — successfully phoned toggle
 *   • "Аваагүй" — increments the no-answer counter (shows "N удаа аваагүй")
 *   • enrollment-likelihood select
 *   • free-text note
 * Everything saves immediately via PATCH /api/admissions/status.
 */
export function AdmissionNoteControls({
  submissionId,
  initialCalled,
  initialLikelihood,
  initialNoAnswerCount,
  initialNote,
}: {
  submissionId: string;
  initialCalled: boolean;
  initialLikelihood: Likelihood;
  initialNoAnswerCount: number;
  initialNote: string;
}) {
  const [called, setCalled] = useState(initialCalled);
  const [likelihood, setLikelihood] = useState<Likelihood>(initialLikelihood);
  const [noAnswer, setNoAnswer] = useState(initialNoAnswerCount);
  const [note, setNote] = useState(initialNote);
  const [savedNote, setSavedNote] = useState(initialNote);
  const [pending, start] = useTransition();

  function save(
    body: Record<string, unknown>,
    revert: () => void,
    okMsg?: string,
  ) {
    start(async () => {
      const res = await fetch('/api/admissions/status', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ submissionId, ...body }),
      });
      if (!res.ok) {
        toast.error('Хадгалахад алдаа гарлаа');
        revert();
        return;
      }
      if (okMsg) toast.success(okMsg);
    });
  }

  function toggleCalled() {
    const prev = called;
    const v = !called;
    setCalled(v);
    save({ called: v }, () => setCalled(prev));
  }

  function addNoAnswer() {
    const prev = noAnswer;
    setNoAnswer((n) => n + 1);
    save({ noAnswer: true }, () => setNoAnswer(prev));
  }

  function removeNoAnswer() {
    if (noAnswer <= 0) return;
    const prev = noAnswer;
    setNoAnswer((n) => Math.max(0, n - 1));
    save({ decrementNoAnswer: true }, () => setNoAnswer(prev));
  }

  function changeLikelihood(v: Likelihood) {
    const prev = likelihood;
    setLikelihood(v);
    save({ enrollLikelihood: v }, () => setLikelihood(prev));
  }

  function saveNoteIfChanged() {
    if (note === savedNote) return;
    const prev = savedNote;
    setSavedNote(note);
    save({ callNote: note }, () => setSavedNote(prev), 'Тэмдэглэл хадгалагдлаа');
  }

  return (
    <div className="flex min-w-[280px] flex-col gap-1.5">
      <div className="flex flex-wrap items-center gap-1.5">
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
          <PhoneCall className="h-3.5 w-3.5" />
          {called ? 'Ярьсан' : 'Ярьсан?'}
        </button>

        <div className="inline-flex items-center">
          <button
            type="button"
            onClick={addNoAnswer}
            disabled={pending}
            title="Залгасан ч утсаа аваагүй — тоог нэмнэ"
            className={
              'inline-flex items-center gap-1.5 border border-border-light bg-white px-2.5 py-1.5 text-xs font-semibold text-text-muted transition-colors hover:bg-cream-soft hover:text-navy-900 disabled:opacity-50 ' +
              (noAnswer > 0 ? 'rounded-l-button border-r-0' : 'rounded-button')
            }
          >
            <PhoneMissed className="h-3.5 w-3.5" />
            Аваагүй{noAnswer > 0 ? ` (${noAnswer})` : ''}
          </button>
          {noAnswer > 0 && (
            <button
              type="button"
              onClick={removeNoAnswer}
              disabled={pending}
              title="Андуурч дарсан бол нэгээр хас"
              aria-label="Аваагүй тоог хасах"
              className="inline-flex items-center rounded-r-button border border-border-light bg-white px-1.5 py-1.5 text-text-muted transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

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

        {pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-text-muted" />}
      </div>

      {noAnswer > 0 && !called && (
        <span className="text-[11px] font-medium text-amber-700">
          Нийт {noAnswer} удаа залгаад утсаа аваагүй
        </span>
      )}

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onBlur={saveNoteIfChanged}
        placeholder="Тэмдэглэл… (ж: маргааш 10 цагт дахин залгах)"
        maxLength={2000}
        rows={3}
        className="w-full resize-y rounded-button border border-border-light bg-white px-2.5 py-2 text-xs leading-relaxed text-text-heading placeholder-text-muted focus:border-navy-900 focus:outline-none"
      />
    </div>
  );
}
