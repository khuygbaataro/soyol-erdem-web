'use client';

import { useState, useTransition } from 'react';
import { Check, Send } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/Button';

interface JobApplyLabels {
  submitCta: string;
  errorRequired: { name: string; email: string; phone: string; position: string };
  errorSubmit: string;
  errorNetwork: string;
  successToast: string;
  successTitle: string;
  successBody: string;
  successBackCta: string;
  successHomeCta: string;
  sections: {
    general: string;
    position: string;
    education: string;
    experience: string;
    teaching: string;
    skills: string;
    extra: string;
  };
  fields: {
    fullName: string;
    fullNamePh: string;
    birth: string;
    phone: string;
    phonePh: string;
    email: string;
    emailPh: string;
    address: string;
    addressPh: string;
    eduSchool: string;
    eduMajor: string;
    eduDegree: string;
    eduDegreePh: string;
    eduYear: string;
    eduYearPh: string;
    expOrg: string;
    expRole: string;
    expDuration: string;
    expDurationPh: string;
    expDuties: string;
    tchUniversity: string;
    tchUniversityPh: string;
    tchSubjects: string;
    tchResearch: string;
    tchPublications: string;
    tchPublicationsPh: string;
    skDigital: string;
    skLanguages: string;
    skLanguagesPh: string;
    skTools: string;
    skToolsPh: string;
    motReason: string;
    motStrengths: string;
    motAvailable: string;
    motAvailablePh: string;
    cvUrl: string;
    cvUrlHint: string;
    diplomaUrl: string;
    diplomaUrlHint: string;
  };
  required: string;
}

interface Props {
  positions: string[];
  initialPosition: string;
  labels: JobApplyLabels;
}

interface Education {
  school: string;
  major: string;
  degree: string;
  year: string;
}
interface Experience {
  org: string;
  role: string;
  duration: string;
  duties: string;
}
interface Teaching {
  university: string;
  subjects: string;
  research: string;
  publications: string;
}
interface Skills {
  digital: string;
  languages: string;
  tools: string;
}
interface Motivation {
  reason: string;
  strengths: string;
  availableFrom: string;
}

interface FormState {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  position: string;
  education: Education;
  experience: Experience;
  teaching: Teaching;
  skills: Skills;
  motivation: Motivation;
  cvUrl: string;
  diplomaUrl: string;
}

const inputClasses =
  'w-full rounded-button border border-border-light bg-white px-4 py-2.5 text-sm text-text-heading placeholder-text-muted transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10';
const textareaClasses = `${inputClasses} min-h-[80px] py-2.5 leading-relaxed`;

export function JobApplyClient({ positions, initialPosition, labels }: Props) {
  const [pending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FormState>({
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    position:
      initialPosition && positions.includes(initialPosition)
        ? initialPosition
        : positions[0] ?? '',
    education: { school: '', major: '', degree: '', year: '' },
    experience: { org: '', role: '', duration: '', duties: '' },
    teaching: {
      university: '',
      subjects: '',
      research: '',
      publications: '',
    },
    skills: { digital: '', languages: '', tools: '' },
    motivation: { reason: '', strengths: '', availableFrom: '' },
    cvUrl: '',
    diplomaUrl: '',
  });

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }
  function setNested<S extends 'education' | 'experience' | 'teaching' | 'skills' | 'motivation'>(
    section: S,
    field: keyof FormState[S],
    value: string,
  ) {
    setData((d) => ({
      ...d,
      [section]: { ...(d[section] as object), [field]: value },
    }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.fullName.trim()) {
      toast.error(labels.errorRequired.name);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      toast.error(labels.errorRequired.email);
      return;
    }
    if (data.phone.trim().length < 6) {
      toast.error(labels.errorRequired.phone);
      return;
    }
    if (!data.position) {
      toast.error(labels.errorRequired.position);
      return;
    }

    startTransition(async () => {
      const payload = {
        position: data.position,
        fullName: data.fullName.trim(),
        birthDate: data.birthDate.trim(),
        phone: data.phone.trim(),
        email: data.email.trim(),
        address: data.address.trim(),
        cvUrl: data.cvUrl.trim(),
        diplomaUrl: data.diplomaUrl.trim(),
        payload: {
          education: data.education,
          experience: data.experience,
          teaching: data.teaching,
          skills: data.skills,
          motivation: data.motivation,
        },
      };
      try {
        const res = await fetch('/api/job-applications', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const j = await res.json().catch(() => null);
          toast.error(j?.error ?? labels.errorSubmit);
          return;
        }
        setSubmitted(true);
        toast.success(labels.successToast);
      } catch {
        toast.error(labels.errorNetwork);
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
          {labels.successTitle}
        </h2>
        <p className="mt-3 text-sm text-text-body">{labels.successBody}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/careers" variant="outline" size="md">
            {labels.successBackCta}
          </Button>
          <Button href="/" variant="primary" size="md">
            {labels.successHomeCta}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <Toaster richColors position="top-right" />

      <Section number="1" title={labels.sections.general}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={labels.fields.fullName} required requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.fullName}
              onChange={(e) => set('fullName', e.target.value)}
              placeholder={labels.fields.fullNamePh}
            />
          </Field>
          <Field label={labels.fields.birth} requiredMark={labels.required}>
            <input
              className={inputClasses}
              type="date"
              value={data.birthDate}
              onChange={(e) => set('birthDate', e.target.value)}
            />
          </Field>
          <Field label={labels.fields.phone} required requiredMark={labels.required}>
            <input
              className={inputClasses}
              type="tel"
              value={data.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder={labels.fields.phonePh}
            />
          </Field>
          <Field label={labels.fields.email} required requiredMark={labels.required}>
            <input
              className={inputClasses}
              type="email"
              value={data.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder={labels.fields.emailPh}
            />
          </Field>
          <Field label={labels.fields.address} requiredMark={labels.required} className="sm:col-span-2">
            <input
              className={inputClasses}
              value={data.address}
              onChange={(e) => set('address', e.target.value)}
              placeholder={labels.fields.addressPh}
            />
          </Field>
        </div>
      </Section>

      <Section number="2" title={labels.sections.position}>
        <div className="grid gap-3 sm:grid-cols-2">
          {positions.map((p) => {
            const active = p === data.position;
            return (
              <label
                key={p}
                className={`flex cursor-pointer items-center gap-3 rounded-button border-2 px-4 py-3 text-sm font-semibold transition-colors ${
                  active
                    ? 'border-navy-900 bg-navy-900 text-white'
                    : 'border-border-light bg-white text-navy-900 hover:border-navy-900'
                }`}
              >
                <input
                  type="radio"
                  name="position"
                  value={p}
                  checked={active}
                  onChange={() => set('position', p)}
                  className="sr-only"
                />
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                    active ? 'border-white bg-white' : 'border-border-medium bg-white'
                  }`}
                >
                  {active && <span className="h-2 w-2 rounded-full bg-navy-900" />}
                </span>
                {p}
              </label>
            );
          })}
        </div>
      </Section>

      <Section number="3" title={labels.sections.education}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={labels.fields.eduSchool} requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.education.school}
              onChange={(e) => setNested('education', 'school', e.target.value)}
            />
          </Field>
          <Field label={labels.fields.eduMajor} requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.education.major}
              onChange={(e) => setNested('education', 'major', e.target.value)}
            />
          </Field>
          <Field label={labels.fields.eduDegree} requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.education.degree}
              onChange={(e) => setNested('education', 'degree', e.target.value)}
              placeholder={labels.fields.eduDegreePh}
            />
          </Field>
          <Field label={labels.fields.eduYear} requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.education.year}
              onChange={(e) => setNested('education', 'year', e.target.value)}
              placeholder={labels.fields.eduYearPh}
            />
          </Field>
        </div>
      </Section>

      <Section number="4" title={labels.sections.experience}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={labels.fields.expOrg} requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.experience.org}
              onChange={(e) => setNested('experience', 'org', e.target.value)}
            />
          </Field>
          <Field label={labels.fields.expRole} requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.experience.role}
              onChange={(e) => setNested('experience', 'role', e.target.value)}
            />
          </Field>
          <Field label={labels.fields.expDuration} requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.experience.duration}
              onChange={(e) => setNested('experience', 'duration', e.target.value)}
              placeholder={labels.fields.expDurationPh}
            />
          </Field>
          <Field label={labels.fields.expDuties} requiredMark={labels.required} className="sm:col-span-2">
            <textarea
              className={textareaClasses}
              rows={3}
              value={data.experience.duties}
              onChange={(e) => setNested('experience', 'duties', e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section number="5" title={labels.sections.teaching}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={labels.fields.tchUniversity} requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.teaching.university}
              onChange={(e) => setNested('teaching', 'university', e.target.value)}
              placeholder={labels.fields.tchUniversityPh}
            />
          </Field>
          <Field label={labels.fields.tchSubjects} requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.teaching.subjects}
              onChange={(e) => setNested('teaching', 'subjects', e.target.value)}
            />
          </Field>
          <Field label={labels.fields.tchResearch} requiredMark={labels.required} className="sm:col-span-2">
            <input
              className={inputClasses}
              value={data.teaching.research}
              onChange={(e) => setNested('teaching', 'research', e.target.value)}
            />
          </Field>
          <Field label={labels.fields.tchPublications} requiredMark={labels.required} className="sm:col-span-2">
            <textarea
              className={textareaClasses}
              rows={3}
              value={data.teaching.publications}
              onChange={(e) => setNested('teaching', 'publications', e.target.value)}
              placeholder={labels.fields.tchPublicationsPh}
            />
          </Field>
        </div>
      </Section>

      <Section number="6" title={labels.sections.skills}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={labels.fields.skDigital} requiredMark={labels.required} className="sm:col-span-2">
            <input
              className={inputClasses}
              value={data.skills.digital}
              onChange={(e) => setNested('skills', 'digital', e.target.value)}
            />
          </Field>
          <Field label={labels.fields.skLanguages} requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.skills.languages}
              onChange={(e) => setNested('skills', 'languages', e.target.value)}
              placeholder={labels.fields.skLanguagesPh}
            />
          </Field>
          <Field label={labels.fields.skTools} requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.skills.tools}
              onChange={(e) => setNested('skills', 'tools', e.target.value)}
              placeholder={labels.fields.skToolsPh}
            />
          </Field>
        </div>
      </Section>

      <Section number="7" title={labels.sections.extra}>
        <div className="grid gap-4">
          <Field label={labels.fields.motReason} requiredMark={labels.required}>
            <textarea
              className={textareaClasses}
              rows={3}
              value={data.motivation.reason}
              onChange={(e) => setNested('motivation', 'reason', e.target.value)}
            />
          </Field>
          <Field label={labels.fields.motStrengths} requiredMark={labels.required}>
            <textarea
              className={textareaClasses}
              rows={3}
              value={data.motivation.strengths}
              onChange={(e) => setNested('motivation', 'strengths', e.target.value)}
            />
          </Field>
          <Field label={labels.fields.motAvailable} requiredMark={labels.required}>
            <input
              className={inputClasses}
              value={data.motivation.availableFrom}
              onChange={(e) => setNested('motivation', 'availableFrom', e.target.value)}
              placeholder={labels.fields.motAvailablePh}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label={labels.fields.cvUrl}
              hint={labels.fields.cvUrlHint}
              requiredMark={labels.required}
            >
              <input
                className={inputClasses}
                type="url"
                value={data.cvUrl}
                onChange={(e) => set('cvUrl', e.target.value)}
                placeholder="https://drive.google.com/…"
              />
            </Field>
            <Field
              label={labels.fields.diplomaUrl}
              hint={labels.fields.diplomaUrlHint}
              requiredMark={labels.required}
            >
              <input
                className={inputClasses}
                type="url"
                value={data.diplomaUrl}
                onChange={(e) => set('diplomaUrl', e.target.value)}
                placeholder="https://drive.google.com/…"
              />
            </Field>
          </div>
        </div>
      </Section>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          loading={pending}
          icon={<Send className="h-4 w-4" />}
          iconPosition="left"
        >
          {labels.submitCta}
        </Button>
      </div>
    </form>
  );
}

/* ─── Bits ──────────────────────────────────────────────────── */

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-card border border-border-light bg-white p-6 shadow-card sm:p-8">
      <legend className="mb-5 inline-flex items-center gap-3 px-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-gold-400">
          {number}
        </span>
        <span className="font-serif text-lg font-bold text-navy-900">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  hint,
  required,
  requiredMark = '*',
  className,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  requiredMark?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
        {label} {required && <span className="text-red-500">{requiredMark}</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-text-muted">{hint}</p>}
    </div>
  );
}
