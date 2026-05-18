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
  studentBirthLabel: string;
  studentBirthPh: string;
  currentSchoolLabel: string;
  currentSchoolPh: string;
  currentGpaLabel: string;
  currentGpaPh: string;
  trackLabel: string;
  trackUndecided: string;
  trackJapan: string;
  trackIt: string;
  trackOther: string;
  guardianSection: string;
  guardianNameLabel: string;
  guardianNamePh: string;
  guardianRelLabel: string;
  guardianRelPh: string;
  phoneLabel: string;
  phonePh: string;
  emailLabel: string;
  emailPh: string;
  messageLabel: string;
  messagePh: string;
  submitCta: string;
  errorSubmit: string;
  errorNetwork: string;
  successTitle: string;
  successBody: string;
  successAgain: string;
  requiredNote: string;
}

const DEFAULT_LABELS: HighSchoolAdmissionFormLabels = {
  studentSection: 'Сурагчийн мэдээлэл',
  studentNameLabel: 'Сурагчийн овог нэр *',
  studentNamePh: 'С. Сурагчийн нэр',
  studentBirthLabel: 'Төрсөн он, сар, өдөр',
  studentBirthPh: '2010-05-15',
  currentSchoolLabel: 'Одоо суралцаж буй сургууль (9-р анги)',
  currentSchoolPh: 'Жишээ: 5-р сургууль',
  currentGpaLabel: '9-р ангийн дундаж голч',
  currentGpaPh: '80%',
  trackLabel: 'Сонирхож буй чиглэл',
  trackUndecided: 'Сонгоогүй / Шийдээгүй',
  trackJapan: 'Япон хэл, соёл',
  trackIt: 'Мэдээллийн технологи (IT)',
  trackOther: 'Бусад / Хосолсон',
  guardianSection: 'Эцэг эх / Асран хамгаалагчийн мэдээлэл',
  guardianNameLabel: 'Овог нэр *',
  guardianNamePh: 'Б. Эцэг эх',
  guardianRelLabel: 'Сурагчтай ямар хамааралтай вэ?',
  guardianRelPh: 'Эх / Эцэг / Асран хамгаалагч',
  phoneLabel: 'Утас *',
  phonePh: '9999-9999',
  emailLabel: 'И-мэйл',
  emailPh: 'email@example.com',
  messageLabel: 'Нэмэлт асуулт / тайлбар',
  messagePh: 'Тэтгэлэг, дотуур байр, элсэлтийн талаар асуултаа бичнэ үү...',
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
      studentBirth: String(fd.get('studentBirth') || '').trim(),
      currentSchool: String(fd.get('currentSchool') || '').trim(),
      currentGpa: String(fd.get('currentGpa') || '').trim(),
      track: String(fd.get('track') || '').trim() || undefined,
      guardianName: String(fd.get('guardianName') || '').trim(),
      guardianRel: String(fd.get('guardianRel') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      message: String(fd.get('message') || '').trim(),
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
              className={inputClasses}
              placeholder={labels.studentNamePh}
            />
          </div>
          <div>
            <label htmlFor="hs-studentBirth" className={labelClasses}>
              {labels.studentBirthLabel}
            </label>
            <input
              id="hs-studentBirth"
              name="studentBirth"
              type="text"
              className={inputClasses}
              placeholder={labels.studentBirthPh}
            />
          </div>
          <div>
            <label htmlFor="hs-currentSchool" className={labelClasses}>
              {labels.currentSchoolLabel}
            </label>
            <input
              id="hs-currentSchool"
              name="currentSchool"
              type="text"
              className={inputClasses}
              placeholder={labels.currentSchoolPh}
            />
          </div>
          <div>
            <label htmlFor="hs-currentGpa" className={labelClasses}>
              {labels.currentGpaLabel}
            </label>
            <input
              id="hs-currentGpa"
              name="currentGpa"
              type="text"
              className={inputClasses}
              placeholder={labels.currentGpaPh}
            />
          </div>
        </div>

        <div>
          <label htmlFor="hs-track" className={labelClasses}>
            {labels.trackLabel}
          </label>
          <select
            id="hs-track"
            name="track"
            defaultValue=""
            className={inputClasses}
          >
            <option value="">{labels.trackUndecided}</option>
            <option value="japan">{labels.trackJapan}</option>
            <option value="it">{labels.trackIt}</option>
            <option value="other">{labels.trackOther}</option>
          </select>
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
            <label htmlFor="hs-guardianRel" className={labelClasses}>
              {labels.guardianRelLabel}
            </label>
            <input
              id="hs-guardianRel"
              name="guardianRel"
              type="text"
              className={inputClasses}
              placeholder={labels.guardianRelPh}
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
              className={inputClasses}
              placeholder={labels.phonePh}
            />
          </div>
          <div>
            <label htmlFor="hs-email" className={labelClasses}>
              {labels.emailLabel}
            </label>
            <input
              id="hs-email"
              name="email"
              type="email"
              className={inputClasses}
              placeholder={labels.emailPh}
            />
          </div>
        </div>
      </fieldset>

      {/* Section 3 — Notes */}
      <div className="border-t border-border-light pt-5">
        <label htmlFor="hs-message" className={labelClasses}>
          {labels.messageLabel}
        </label>
        <textarea
          id="hs-message"
          name="message"
          rows={4}
          className={`${inputClasses} resize-y`}
          placeholder={labels.messagePh}
        />
      </div>

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
