'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from './Button';

const inputClasses =
  'w-full rounded-button border border-border-light bg-white px-4 py-3 text-sm text-text-heading placeholder-text-muted transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10';

const labelClasses =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted';

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
  studentNameLabel: 'Сурагчийн овог нэр *',
  studentNamePh: 'С. Сурагчийн нэр',
  gradeLabel: 'Хэддүгээр ангид орох вэ? *',
  gradePh: 'Анги сонгоно уу',
  guardianSection: 'Эцэг эх / Асран хамгаалагчийн мэдээлэл',
  guardianNameLabel: 'Овог нэр *',
  guardianNamePh: 'Б. Эцэг эх',
  phoneLabel: 'Утас *',
  phonePh: '9999-9999',
  emailLabel: 'И-мэйл',
  emailPh: 'email@example.com',
  submitCta: 'Хүсэлт илгээх',
  errorSubmit: 'Илгээхэд алдаа гарлаа. Дахин оролдоно уу.',
  errorNetwork: 'Сүлжээний алдаа. Холболтоо шалгана уу.',
  successTitle: 'Таны бүртгэлийн хүсэлт амжилттай илгээгдлээ.',
  successBody:
    'Хариуцсан ажилтан ажлын 1-2 өдрийн дотор танд утсаар эсвэл и-мэйлээр хариу өгнө.',
  successAgain: 'Дахин бүртгэх',
  requiredNote:
    '* тэмдэгтэй талбарууд заавал бөглөгдөнө. Таны мэдээлэл зөвхөн элсэлтийн зориулалтаар ашиглагдана.',
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
      <div className="rounded-card border border-gold-500/40 bg-gold-500/5 p-8 text-center">
        <p className="text-base font-semibold text-navy-900">
          {labels.successTitle}
        </p>
        <p className="mt-2 text-sm text-text-body">{labels.successBody}</p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-semibold text-navy-900 underline"
        >
          {labels.successAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Section 1 — Student */}
      <fieldset className="space-y-4">
        <legend className="text-[11px] font-bold uppercase tracking-widest text-gold-500">
          {labels.studentSection}
        </legend>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="hs-studentName" className={labelClasses}>
              {labels.studentNameLabel}
            </label>
            <input
              id="hs-studentName"
              name="studentName"
              type="text"
              required
              autoComplete="name"
              className={inputClasses}
              placeholder={labels.studentNamePh}
            />
          </div>
          <div>
            <label htmlFor="hs-enteringGrade" className={labelClasses}>
              {labels.gradeLabel ?? DEFAULT_LABELS.gradeLabel}
            </label>
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
      <fieldset className="space-y-4 border-t border-border-light pt-5">
        <legend className="text-[11px] font-bold uppercase tracking-widest text-gold-500">
          {labels.guardianSection}
        </legend>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="hs-guardianName" className={labelClasses}>
              {labels.guardianNameLabel}
            </label>
            <input
              id="hs-guardianName"
              name="guardianName"
              type="text"
              required
              className={inputClasses}
              placeholder={labels.guardianNamePh}
            />
          </div>
          <div>
            <label htmlFor="hs-phone" className={labelClasses}>
              {labels.phoneLabel}
            </label>
            <input
              id="hs-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={inputClasses}
              placeholder={labels.phonePh}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="hs-email" className={labelClasses}>
              {labels.emailLabel}
            </label>
            <input
              id="hs-email"
              name="email"
              type="email"
              autoComplete="email"
              className={inputClasses}
              placeholder={labels.emailPh}
            />
          </div>
        </div>
      </fieldset>

      {error && (
        <p className="rounded-button border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
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

      <p className="text-center text-xs text-text-muted">{labels.requiredNote}</p>
    </form>
  );
}
