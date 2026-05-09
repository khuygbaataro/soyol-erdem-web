'use client';

import { useMemo, useState, useTransition } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Send,
  Trash2,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ProgramOption {
  id: string;
  name: string;
  degree: string;
}

interface Props {
  programs: ProgramOption[];
}

type Citizenship = 'MN' | 'FOREIGN';
type Degree = 'BACHELOR' | 'MASTER';

interface FormState {
  citizenship: Citizenship | '';
  degree: Degree | '';
  programId: string;
  lastName: string;
  firstName: string;
  education: string;
  examScores: { subject: string; score: string }[];
  phones: string[];
  email: string;
}

const STEPS = [
  { n: 1, label: 'Иргэншил' },
  { n: 2, label: 'Зэрэг' },
  { n: 3, label: 'Хөтөлбөр' },
  { n: 4, label: 'Овог, нэр' },
  { n: 5, label: 'Боловсрол' },
  { n: 6, label: 'ЭЕШ-ын оноо' },
  { n: 7, label: 'Утас' },
  { n: 8, label: 'И-мэйл' },
] as const;

const EDUCATION_OPTIONS = [
  'Бүрэн дунд боловсрол',
  'Тусгай мэргэжлийн дунд (МСҮТ / коллеж)',
  'Бакалавр',
  'Магистр',
  'Доктор',
];

const inputClasses =
  'w-full rounded-button border border-border-light bg-white px-4 py-3 text-sm text-text-heading placeholder-text-muted transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10';

/**
 * Eight-step wizard. Each step renders one chunk of the form; "Next"
 * runs lightweight validation locally and only when all steps pass do
 * we POST to /api/admission-applications. Success swaps the wizard for
 * a confirmation panel.
 */
export function RegisterFormClient({ programs }: Props) {
  const [step, setStep] = useState(1);
  const [pending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FormState>({
    citizenship: '',
    degree: '',
    programId: '',
    lastName: '',
    firstName: '',
    education: '',
    examScores: [{ subject: '', score: '' }],
    phones: [''],
    email: '',
  });

  // Filter the program dropdown by selected degree so a master applicant
  // doesn't see undergraduate programs (and vice versa).
  const visiblePrograms = useMemo(() => {
    if (!data.degree) return programs;
    const want = data.degree === 'BACHELOR' ? 'Бакалавр' : 'Магистр';
    return programs.filter((p) => p.degree.includes(want));
  }, [programs, data.degree]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function validateStep(n: number): string | null {
    switch (n) {
      case 1:
        return data.citizenship ? null : 'Иргэншлээ сонгоно уу.';
      case 2:
        return data.degree ? null : 'Боловсролын зэргээ сонгоно уу.';
      case 3:
        return data.programId ? null : 'Хөтөлбөр сонгоно уу.';
      case 4:
        if (!data.lastName.trim()) return 'Овог оруулна уу.';
        if (!data.firstName.trim()) return 'Нэр оруулна уу.';
        return null;
      case 5:
        return data.education ? null : 'Боловсролын түвшин сонгоно уу.';
      case 6: {
        const valid = data.examScores.filter(
          (s) => s.subject.trim() && s.score.trim(),
        );
        if (valid.length === 0)
          return 'Дор хаяж нэг хичээлийн оноо оруулна уу.';
        for (const s of valid) {
          if (!/^\d{1,4}([.,]\d{1,2})?$/.test(s.score.trim()))
            return `"${s.subject}" — оноо тоогоор бичигдсэн байх ёстой.`;
        }
        return null;
      }
      case 7: {
        const valid = data.phones.filter((p) => p.trim().length >= 6);
        return valid.length > 0
          ? null
          : 'Дор хаяж нэг утасны дугаар оруулна уу.';
      }
      case 8: {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
          return 'И-мэйл хаяг хүчин төгөлдөр биш байна.';
        return null;
      }
      default:
        return null;
    }
  }

  function next() {
    const err = validateStep(step);
    if (err) {
      toast.error(err);
      return;
    }
    setStep((s) => Math.min(STEPS.length, s + 1));
  }
  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function submit() {
    const err = validateStep(step);
    if (err) {
      toast.error(err);
      return;
    }
    startTransition(async () => {
      const program = programs.find((p) => p.id === data.programId);
      const payload = {
        citizenship: data.citizenship,
        degree: data.degree,
        programId: data.programId,
        programName: program?.name ?? data.programId,
        lastName: data.lastName.trim(),
        firstName: data.firstName.trim(),
        education: data.education,
        examScores: data.examScores
          .filter((s) => s.subject.trim() && s.score.trim())
          .map((s) => ({
            subject: s.subject.trim(),
            score: s.score.trim(),
          })),
        phones: data.phones.map((p) => p.trim()).filter(Boolean),
        email: data.email.trim(),
      };
      try {
        const res = await fetch('/api/admission-applications', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const j = await res.json().catch(() => null);
          toast.error(j?.error ?? 'Илгээхэд алдаа гарлаа.');
          return;
        }
        setSubmitted(true);
        toast.success('Анкет амжилттай илгээгдлээ!');
      } catch {
        toast.error('Сүлжээний алдаа. Дахин оролдоно уу.');
      }
    });
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-emerald-200 bg-white p-10 text-center shadow-card">
        <Toaster richColors position="top-right" />
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-h3 font-bold text-navy-900">
          Анкет амжилттай илгээгдлээ
        </h2>
        <p className="mt-3 text-sm text-text-body">
          Манай элсэлтийн алба тантай удахгүй холбогдоно. И-мэйл
          хаягтайгаа танилцаж, спам хавтсыг шалгахаа бүү мартаарай.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/admission" variant="outline" size="md">
            Элсэлтийн хуудас руу буцах
          </Button>
          <Button href="/" variant="primary" size="md">
            Нүүр хуудас
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border-light bg-white shadow-card">
      <Toaster richColors position="top-right" />

      {/* Stepper */}
      <div className="border-b border-border-light px-6 py-5">
        <div className="flex items-center justify-between gap-2 overflow-x-auto">
          {STEPS.map((s) => {
            const isActive = s.n === step;
            const isDone = s.n < step;
            return (
              <button
                key={s.n}
                type="button"
                onClick={() => {
                  // Allow jumping back to completed steps; jumping
                  // forward requires using "Next" so validation runs.
                  if (s.n < step) setStep(s.n);
                }}
                className={cn(
                  'flex shrink-0 flex-col items-center gap-1 rounded-md px-2 py-1 text-[11px] transition-colors',
                  isActive && 'text-navy-900',
                  !isActive && !isDone && 'text-text-muted',
                  isDone && 'text-emerald-600 hover:text-navy-900',
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                <span
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold',
                    isActive && 'border-navy-900 bg-navy-900 text-white',
                    isDone && 'border-emerald-500 bg-emerald-500 text-white',
                    !isActive &&
                      !isDone &&
                      'border-border-medium bg-white text-text-muted',
                  )}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : s.n}
                </span>
                <span className="hidden whitespace-nowrap font-semibold sm:inline">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border-light">
          <div
            className="h-full rounded-full bg-gold-500 transition-all duration-300"
            style={{ width: `${(step / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-7 sm:px-10 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-500">
          Алхам {step} / {STEPS.length}
        </p>
        <h2 className="mt-1 text-h3 font-bold text-navy-900">
          {STEPS[step - 1].label}
        </h2>

        <div className="mt-6 space-y-5">
          {step === 1 && (
            <Choice
              name="citizenship"
              value={data.citizenship}
              onChange={(v) => set('citizenship', v as Citizenship)}
              options={[
                { value: 'MN', label: 'Монгол улсын иргэн' },
                { value: 'FOREIGN', label: 'Гадаадын иргэн' },
              ]}
            />
          )}

          {step === 2 && (
            <Choice
              name="degree"
              value={data.degree}
              onChange={(v) => {
                set('degree', v as Degree);
                // Reset program selection if degree changes — the
                // dropdown options will repopulate.
                set('programId', '');
              }}
              options={[
                { value: 'BACHELOR', label: 'Бакалавр' },
                { value: 'MASTER', label: 'Магистр' },
              ]}
            />
          )}

          {step === 3 && (
            <div>
              <label
                htmlFor="programId"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted"
              >
                Хөтөлбөр
              </label>
              {visiblePrograms.length === 0 ? (
                <p className="rounded-button border border-border-light bg-cream-soft p-4 text-sm text-text-body">
                  Энэ зэрэгт хамаарах хөтөлбөр одоохондоо нийтлэгдээгүй
                  байна. Та <a href="/contact" className="font-semibold text-navy-900 underline">бидэнтэй холбогдоно</a> уу.
                </p>
              ) : (
                <select
                  id="programId"
                  value={data.programId}
                  onChange={(e) => set('programId', e.target.value)}
                  className={inputClasses}
                >
                  <option value="">— сонгох —</option>
                  {visiblePrograms.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.degree})
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="lastName"
                label="Овог"
                value={data.lastName}
                onChange={(v) => set('lastName', v)}
                placeholder="Жишээ: Доржийн"
              />
              <Field
                id="firstName"
                label="Нэр"
                value={data.firstName}
                onChange={(v) => set('firstName', v)}
                placeholder="Жишээ: Тэмүүлэн"
              />
            </div>
          )}

          {step === 5 && (
            <div>
              <label
                htmlFor="education"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted"
              >
                Боловсролын түвшин
              </label>
              <select
                id="education"
                value={data.education}
                onChange={(e) => set('education', e.target.value)}
                className={inputClasses}
              >
                <option value="">— сонгох —</option>
                {EDUCATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}

          {step === 6 && (
            <div>
              <p className="mb-3 text-sm text-text-body">
                Дээд тал нь 3 хичээлийн оноог оруулна уу.
              </p>
              <div className="space-y-3">
                {data.examScores.map((s, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_120px_auto] gap-3">
                    <input
                      type="text"
                      value={s.subject}
                      onChange={(e) => {
                        const arr = [...data.examScores];
                        arr[idx] = { ...arr[idx], subject: e.target.value };
                        set('examScores', arr);
                      }}
                      placeholder="Хичээл (Монгол хэл, Математик, …)"
                      className={inputClasses}
                    />
                    <input
                      type="text"
                      inputMode="decimal"
                      value={s.score}
                      onChange={(e) => {
                        const arr = [...data.examScores];
                        arr[idx] = { ...arr[idx], score: e.target.value };
                        set('examScores', arr);
                      }}
                      placeholder="Оноо"
                      className={inputClasses}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (data.examScores.length === 1) return;
                        set(
                          'examScores',
                          data.examScores.filter((_, i) => i !== idx),
                        );
                      }}
                      disabled={data.examScores.length === 1}
                      aria-label="Устгах"
                      className="flex h-12 w-12 items-center justify-center rounded-button text-text-muted hover:bg-cream-soft hover:text-navy-900 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {data.examScores.length < 3 && (
                  <button
                    type="button"
                    onClick={() =>
                      set('examScores', [
                        ...data.examScores,
                        { subject: '', score: '' },
                      ])
                    }
                    className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-500"
                  >
                    <Plus className="h-4 w-4" />
                    Хичээл нэмэх
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 7 && (
            <div>
              <p className="mb-3 text-sm text-text-body">
                Дээд тал нь 3 утасны дугаар оруулна уу.
              </p>
              <div className="space-y-3">
                {data.phones.map((p, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_auto] gap-3">
                    <input
                      type="tel"
                      value={p}
                      onChange={(e) => {
                        const arr = [...data.phones];
                        arr[idx] = e.target.value;
                        set('phones', arr);
                      }}
                      placeholder="9911-2233"
                      className={inputClasses}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (data.phones.length === 1) return;
                        set(
                          'phones',
                          data.phones.filter((_, i) => i !== idx),
                        );
                      }}
                      disabled={data.phones.length === 1}
                      aria-label="Устгах"
                      className="flex h-12 w-12 items-center justify-center rounded-button text-text-muted hover:bg-cream-soft hover:text-navy-900 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {data.phones.length < 3 && (
                  <button
                    type="button"
                    onClick={() => set('phones', [...data.phones, ''])}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-gold-500"
                  >
                    <Plus className="h-4 w-4" />
                    Утас нэмэх
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 8 && (
            <Field
              id="email"
              label="И-мэйл хаяг"
              type="email"
              value={data.email}
              onChange={(v) => set('email', v)}
              placeholder="example@gmail.com"
            />
          )}
        </div>

        {/* Nav */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border-light pt-6">
          <Button
            type="button"
            onClick={prev}
            variant="outline"
            size="md"
            icon={<ArrowLeft className="h-4 w-4" />}
            iconPosition="left"
            disabled={step === 1}
          >
            Өмнөх
          </Button>

          {step < STEPS.length ? (
            <Button
              type="button"
              onClick={next}
              variant="primary"
              size="md"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Дараагийн
            </Button>
          ) : (
            <Button
              type="button"
              onClick={submit}
              variant="accent"
              size="md"
              loading={pending}
              icon={<Send className="h-4 w-4" />}
              iconPosition="left"
            >
              Анкет илгээх
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Small reusable bits ────────────────────────────────────────── */

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClasses}
      />
    </div>
  );
}

function Choice({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <label
            key={opt.value}
            className={cn(
              'flex cursor-pointer items-center gap-3 rounded-card border-2 px-5 py-4 text-sm font-semibold transition-colors',
              active
                ? 'border-navy-900 bg-navy-900 text-white'
                : 'border-border-light bg-white text-navy-900 hover:border-navy-900',
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={active}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-full border-2',
                active ? 'border-white bg-white' : 'border-border-medium bg-white',
              )}
            >
              {active && <span className="h-2.5 w-2.5 rounded-full bg-navy-900" />}
            </span>
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}
