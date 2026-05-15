'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from './Button';

const inputClasses =
  'w-full rounded-button border border-border-light bg-white px-4 py-3 text-sm text-text-heading placeholder-text-muted transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10';

const labelClasses =
  'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted';

/**
 * Public-facing admission inquiry form for the high-school's 10th-grade
 * intake. Submits to /api/high-school/applications; the record then
 * surfaces in /high-school/admin/applications as an inbox item.
 */
export function HighSchoolAdmissionForm() {
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
        setError(data?.error || 'Илгээхэд алдаа гарлаа. Дахин оролдоно уу.');
      }
    } catch {
      setError('Сүлжээний алдаа. Холболтоо шалгана уу.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-gold-500/40 bg-gold-500/5 p-8 text-center">
        <p className="text-base font-semibold text-navy-900">
          Таны бүртгэлийн хүсэлт амжилттай илгээгдлээ.
        </p>
        <p className="mt-2 text-sm text-text-body">
          Хариуцсан ажилтан ажлын 1-2 өдрийн дотор танд утсаар эсвэл
          и-мэйлээр хариу өгнө.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-semibold text-navy-900 underline"
        >
          Дахин бүртгэх
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Section 1 — Student */}
      <fieldset className="space-y-4">
        <legend className="text-[11px] font-bold uppercase tracking-widest text-gold-500">
          Сурагчийн мэдээлэл
        </legend>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="hs-studentName" className={labelClasses}>
              Сурагчийн овог нэр *
            </label>
            <input
              id="hs-studentName"
              name="studentName"
              type="text"
              required
              className={inputClasses}
              placeholder="С. Сурагчийн нэр"
            />
          </div>
          <div>
            <label htmlFor="hs-studentBirth" className={labelClasses}>
              Төрсөн он, сар, өдөр
            </label>
            <input
              id="hs-studentBirth"
              name="studentBirth"
              type="text"
              className={inputClasses}
              placeholder="2010-05-15"
            />
          </div>
          <div>
            <label htmlFor="hs-currentSchool" className={labelClasses}>
              Одоо суралцаж буй сургууль (9-р анги)
            </label>
            <input
              id="hs-currentSchool"
              name="currentSchool"
              type="text"
              className={inputClasses}
              placeholder="Жишээ: 5-р сургууль"
            />
          </div>
          <div>
            <label htmlFor="hs-currentGpa" className={labelClasses}>
              9-р ангийн дундаж голч
            </label>
            <input
              id="hs-currentGpa"
              name="currentGpa"
              type="text"
              className={inputClasses}
              placeholder="80%"
            />
          </div>
        </div>

        <div>
          <label htmlFor="hs-track" className={labelClasses}>
            Сонирхож буй чиглэл
          </label>
          <select
            id="hs-track"
            name="track"
            defaultValue=""
            className={inputClasses}
          >
            <option value="">Сонгоогүй / Шийдээгүй</option>
            <option value="japan">Япон хэл, соёл</option>
            <option value="it">Мэдээллийн технологи (IT)</option>
            <option value="other">Бусад / Хосолсон</option>
          </select>
        </div>
      </fieldset>

      {/* Section 2 — Parent / guardian */}
      <fieldset className="space-y-4 border-t border-border-light pt-5">
        <legend className="text-[11px] font-bold uppercase tracking-widest text-gold-500">
          Эцэг эх / Асран хамгаалагчийн мэдээлэл
        </legend>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="hs-guardianName" className={labelClasses}>
              Овог нэр *
            </label>
            <input
              id="hs-guardianName"
              name="guardianName"
              type="text"
              required
              className={inputClasses}
              placeholder="Б. Эцэг эх"
            />
          </div>
          <div>
            <label htmlFor="hs-guardianRel" className={labelClasses}>
              Сурагчтай ямар хамааралтай вэ?
            </label>
            <input
              id="hs-guardianRel"
              name="guardianRel"
              type="text"
              className={inputClasses}
              placeholder="Эх / Эцэг / Асран хамгаалагч"
            />
          </div>
          <div>
            <label htmlFor="hs-phone" className={labelClasses}>
              Утас *
            </label>
            <input
              id="hs-phone"
              name="phone"
              type="tel"
              required
              className={inputClasses}
              placeholder="9999-9999"
            />
          </div>
          <div>
            <label htmlFor="hs-email" className={labelClasses}>
              И-мэйл
            </label>
            <input
              id="hs-email"
              name="email"
              type="email"
              className={inputClasses}
              placeholder="email@example.com"
            />
          </div>
        </div>
      </fieldset>

      {/* Section 3 — Notes */}
      <div className="border-t border-border-light pt-5">
        <label htmlFor="hs-message" className={labelClasses}>
          Нэмэлт асуулт / тайлбар
        </label>
        <textarea
          id="hs-message"
          name="message"
          rows={4}
          className={`${inputClasses} resize-y`}
          placeholder="Тэтгэлэг, дотуур байр, элсэлтийн талаар асуултаа бичнэ үү..."
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
        Хүсэлт илгээх
      </Button>

      <p className="text-center text-xs text-text-muted">
        * тэмдэгтэй талбарууд заавал бөглөгдөнө. Таны мэдээлэл зөвхөн
        элсэлтийн зориулалтаар ашиглагдана.
      </p>
    </form>
  );
}
