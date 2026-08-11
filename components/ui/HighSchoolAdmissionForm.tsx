'use client';

import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { Button } from './Button';

const inputClasses =
  'w-full rounded-lg border border-border-medium bg-white px-4 py-3.5 text-base text-text-heading transition-colors focus:border-navy-900 focus:outline-none focus:ring-4 focus:ring-navy-900/10 sm:text-sm';

const labelClasses = 'mb-2 block text-sm font-semibold text-navy-900';

/** Шаардлагатай талбарын од. Орчуулгын мөр дэх ' *'-ыг тусад нь рендерлэнэ. */
function FieldLabel({
  htmlFor,
  text,
}: {
  htmlFor: string;
  text: string;
}) {
  const required = /\s*\*$/.test(text);
  return (
    <label htmlFor={htmlFor} className={labelClasses}>
      {text.replace(/\s*\*$/, '')}
      {required && <span className="ml-0.5 text-gold-500">*</span>}
    </label>
  );
}

export interface HighSchoolAdmissionFormLabels {
  studentSection: string;
  studentNameLabel: string;
  studentNamePh: string;
  /** Аль ангид орох — богиносгосон формын үндсэн талбар. */
  gradeLabel?: string;
  gradePh?: string;
  guardianSection: string;
  guardianNameLabel: string;
  guardianNamePh: string;
  phoneLabel: string;
  phonePh: string;
  emailLabel: string;
  emailPh: string;
  submitCta: string;
  errorSubmit: string;
  errorNetwork: string;
  successTitle: string;
  successBody: string;
  successAgain: string;
  requiredNote: string;
  /* — Богиносгосон формд ашиглагдахаа больсон талбарууд. Орчуулгын
     файлд хэвээр байгаа тул optional болгож үлдээв. — */
  studentBirthLabel?: string;
  studentBirthPh?: string;
  currentSchoolLabel?: string;
  currentSchoolPh?: string;
  currentGpaLabel?: string;
  currentGpaPh?: string;
  trackLabel?: string;
  trackUndecided?: string;
  trackJapan?: string;
  trackIt?: string;
  trackOther?: string;
  guardianRelLabel?: string;
  guardianRelPh?: string;
  messageLabel?: string;
  messagePh?: string;
}

const DEFAULT_LABELS: HighSchoolAdmissionFormLabels = {
  studentSection: 'Сурагчийн мэдээлэл',
  studentNameLabel: 'Сурагчийн овог, нэр *',
  studentNamePh: '',
  gradeLabel: 'Хэддүгээр ангид элсэх вэ? *',
  gradePh: 'Анги сонгох',
  guardianSection: 'Эцэг эх / Асран хамгаалагч',
  guardianNameLabel: 'Эцэг эхийн овог, нэр *',
  guardianNamePh: '',
  phoneLabel: 'Холбоо барих утас *',
  phonePh: '',
  emailLabel: 'И-мэйл хаяг',
  emailPh: '',
  submitCta: 'Бүртгүүлэх',
  errorSubmit: 'Илгээхэд алдаа гарлаа. Дахин оролдоно уу.',
  errorNetwork: 'Сүлжээний алдаа. Холболтоо шалгана уу.',
  successTitle: 'Бүртгэл амжилттай илгээгдлээ',
  successBody:
    'Элсэлт хариуцсан ажилтан ажлын 1–2 өдрийн дотор тантай утсаар холбогдоно. Баярлалаа!',
  successAgain: 'Дахин бүртгүүлэх',
  requiredNote:
    'Таны мэдээлэл зөвхөн элсэлтийн зориулалтаар ашиглагдана.',
};

/** 1–12-р анги. */
const GRADES = Array.from({ length: 12 }, (_, i) => String(i + 1));

/**
 * Public-facing admission inquiry form for the high-school's 10th-grade
 * intake. Submits to /api/high-school/applications; the record then
 * surfaces in /high-school/admin/applications as an inbox item. Labels
 * are passed in by the calling server component so the form stays
 * locale-agnostic.
 */
export function HighSchoolAdmissionForm({
  labels = DEFAULT_LABELS,
}: { labels?: HighSchoolAdmissionFormLabels } = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      studentName: String(fd.get('studentName') || '').trim(),
      enteringGrade: String(fd.get('enteringGrade') || '').trim(),
      guardianName: String(fd.get('guardianName') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      email: String(fd.get('email') || '').trim(),
    };

    try {
      const res = await fetch('/api/high-school/applications', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        (e.currentTarget as HTMLFormElement).reset();
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || labels.errorSubmit);
      }
    } catch {
      setError(labels.errorNetwork);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </span>
        <p className="mt-4 text-lg font-bold text-navy-900">
          {labels.successTitle}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-body">
          {labels.successBody}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-semibold text-navy-900 underline underline-offset-4 hover:text-gold-500"
        >
          {labels.successAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section 1 — Student */}
      <fieldset>
        <legend className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-500">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/15 text-[11px] font-bold text-gold-500">
            1
          </span>
          {labels.studentSection}
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="hs-studentName" text={labels.studentNameLabel} />
            <input
              id="hs-studentName"
              name="studentName"
              type="text"
              required
              autoComplete="name"
              className={inputClasses}
            />
          </div>
          <div>
            <FieldLabel
              htmlFor="hs-enteringGrade"
              text={labels.gradeLabel ?? DEFAULT_LABELS.gradeLabel!}
            />
            <select
              id="hs-enteringGrade"
              name="enteringGrade"
              required
              defaultValue=""
              className={inputClasses}
            >
              <option value="" disabled>
                {labels.gradePh ?? DEFAULT_LABELS.gradePh}
              </option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}-р анги
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* Section 2 — Parent / guardian */}
      <fieldset className="border-t border-border-light pt-6">
        <legend className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-500">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/15 text-[11px] font-bold text-gold-500">
            2
          </span>
          {labels.guardianSection}
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="hs-guardianName" text={labels.guardianNameLabel} />
            <input
              id="hs-guardianName"
              name="guardianName"
              type="text"
              required
              className={inputClasses}
            />
          </div>
          <div>
            <FieldLabel htmlFor="hs-phone" text={labels.phoneLabel} />
            <input
              id="hs-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              required
              autoComplete="tel"
              className={inputClasses}
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="hs-email" text={labels.emailLabel} />
            <input
              id="hs-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              className={inputClasses}
            />
          </div>
        </div>
      </fieldset>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        icon={<Send className="h-4 w-4" />}
        className="w-full"
      >
        {labels.submitCta}
      </Button>

      <p className="text-center text-xs leading-relaxed text-text-muted">
        {labels.requiredNote}
      </p>
    </form>
  );
}
