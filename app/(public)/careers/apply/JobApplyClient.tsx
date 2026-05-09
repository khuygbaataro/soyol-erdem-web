'use client';

import { useState, useTransition } from 'react';
import { Check, Send } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/Button';

interface Props {
  positions: string[];
  initialPosition: string;
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
  // Section 1
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  // Section 2
  position: string;
  // Section 3
  education: Education;
  // Section 4
  experience: Experience;
  // Section 5
  teaching: Teaching;
  // Section 6
  skills: Skills;
  // Section 7
  motivation: Motivation;
  cvUrl: string;
  diplomaUrl: string;
}

const inputClasses =
  'w-full rounded-button border border-border-light bg-white px-4 py-2.5 text-sm text-text-heading placeholder-text-muted transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10';
const textareaClasses = `${inputClasses} min-h-[80px] py-2.5 leading-relaxed`;

export function JobApplyClient({ positions, initialPosition }: Props) {
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
      toast.error('Овог, нэр оруулна уу.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      toast.error('И-мэйл хаяг хүчин төгөлдөр биш.');
      return;
    }
    if (data.phone.trim().length < 6) {
      toast.error('Утасны дугаар хүчин төгөлдөр биш.');
      return;
    }
    if (!data.position) {
      toast.error('Ажлын байраа сонгоно уу.');
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
          Манай хүний нөөцийн алба тантай удахгүй холбогдоно. И-мэйл хаягтайгаа
          танилцаж, спам хавтсыг шалгахаа бүү мартаарай.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="/careers" variant="outline" size="md">
            Нээлттэй ажлын байр руу буцах
          </Button>
          <Button href="/" variant="primary" size="md">
            Нүүр хуудас
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-6"
      noValidate
    >
      <Toaster richColors position="top-right" />

      <Section number="1" title="Ерөнхий мэдээлэл">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Овог, нэр" required>
            <input
              className={inputClasses}
              value={data.fullName}
              onChange={(e) => set('fullName', e.target.value)}
              placeholder="Жишээ: Доржийн Тэмүүлэн"
            />
          </Field>
          <Field label="Төрсөн он, сар, өдөр">
            <input
              className={inputClasses}
              type="date"
              value={data.birthDate}
              onChange={(e) => set('birthDate', e.target.value)}
            />
          </Field>
          <Field label="Холбоо барих утас" required>
            <input
              className={inputClasses}
              type="tel"
              value={data.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="9911-2233"
            />
          </Field>
          <Field label="И-мэйл хаяг" required>
            <input
              className={inputClasses}
              type="email"
              value={data.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="example@gmail.com"
            />
          </Field>
          <Field label="Оршин суугаа хаяг" className="sm:col-span-2">
            <input
              className={inputClasses}
              value={data.address}
              onChange={(e) => set('address', e.target.value)}
              placeholder="Жишээ: Сүхбаатар дүүрэг, 1-р хороо…"
            />
          </Field>
        </div>
      </Section>

      <Section number="2" title="Аль ажлын байранд хүсэлт гаргаж байна вэ?">
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

      <Section number="3" title="Боловсролын мэдээлэл">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Төгссөн сургууль">
            <input
              className={inputClasses}
              value={data.education.school}
              onChange={(e) => setNested('education', 'school', e.target.value)}
            />
          </Field>
          <Field label="Мэргэжил">
            <input
              className={inputClasses}
              value={data.education.major}
              onChange={(e) => setNested('education', 'major', e.target.value)}
            />
          </Field>
          <Field label="Боловсролын зэрэг">
            <input
              className={inputClasses}
              value={data.education.degree}
              onChange={(e) => setNested('education', 'degree', e.target.value)}
              placeholder="Бакалавр / Магистр / Доктор"
            />
          </Field>
          <Field label="Төгссөн он">
            <input
              className={inputClasses}
              value={data.education.year}
              onChange={(e) => setNested('education', 'year', e.target.value)}
              placeholder="2020"
            />
          </Field>
        </div>
      </Section>

      <Section number="4" title="Ажлын туршлага">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Өмнө ажиллаж байсан байгууллага">
            <input
              className={inputClasses}
              value={data.experience.org}
              onChange={(e) => setNested('experience', 'org', e.target.value)}
            />
          </Field>
          <Field label="Албан тушаал">
            <input
              className={inputClasses}
              value={data.experience.role}
              onChange={(e) => setNested('experience', 'role', e.target.value)}
            />
          </Field>
          <Field label="Ажилласан хугацаа">
            <input
              className={inputClasses}
              value={data.experience.duration}
              onChange={(e) => setNested('experience', 'duration', e.target.value)}
              placeholder="2018–2024"
            />
          </Field>
          <Field label="Гол үүрэг, хариуцлага" className="sm:col-span-2">
            <textarea
              className={textareaClasses}
              rows={3}
              value={data.experience.duties}
              onChange={(e) => setNested('experience', 'duties', e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <Section number="5" title="Багшлах туршлага">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Их, дээд сургуульд багшилж байсан эсэх">
            <input
              className={inputClasses}
              value={data.teaching.university}
              onChange={(e) => setNested('teaching', 'university', e.target.value)}
              placeholder="Тийм / Үгүй (хаана?)"
            />
          </Field>
          <Field label="Зааж байсан хичээлүүд">
            <input
              className={inputClasses}
              value={data.teaching.subjects}
              onChange={(e) => setNested('teaching', 'subjects', e.target.value)}
            />
          </Field>
          <Field label="Судалгааны чиглэл" className="sm:col-span-2">
            <input
              className={inputClasses}
              value={data.teaching.research}
              onChange={(e) => setNested('teaching', 'research', e.target.value)}
            />
          </Field>
          <Field label="Хэвлүүлсэн бүтээл, илтгэл" className="sm:col-span-2">
            <textarea
              className={textareaClasses}
              rows={3}
              value={data.teaching.publications}
              onChange={(e) => setNested('teaching', 'publications', e.target.value)}
              placeholder="Гарсан бүтээл, эрдэм шинжилгээний илтгэл г.м."
            />
          </Field>
        </div>
      </Section>

      <Section number="6" title="Ур чадвар">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Компьютер, дижитал сургалтын хэрэгсэл" className="sm:col-span-2">
            <input
              className={inputClasses}
              value={data.skills.digital}
              onChange={(e) => setNested('skills', 'digital', e.target.value)}
            />
          </Field>
          <Field label="Гадаад хэлний мэдлэг">
            <input
              className={inputClasses}
              value={data.skills.languages}
              onChange={(e) => setNested('skills', 'languages', e.target.value)}
              placeholder="Япон N2, Англи C1…"
            />
          </Field>
          <Field label="Ашигладаг хэрэгслүүд">
            <input
              className={inputClasses}
              value={data.skills.tools}
              onChange={(e) => setNested('skills', 'tools', e.target.value)}
              placeholder="Moodle, Google Classroom, PowerPoint, Canva…"
            />
          </Field>
        </div>
      </Section>

      <Section number="7" title="Нэмэлт мэдээлэл">
        <div className="grid gap-4">
          <Field label="Манай сургуульд ажиллах хүсэлтэй шалтгаан">
            <textarea
              className={textareaClasses}
              rows={3}
              value={data.motivation.reason}
              onChange={(e) => setNested('motivation', 'reason', e.target.value)}
            />
          </Field>
          <Field label="Өөрийн давуу тал">
            <textarea
              className={textareaClasses}
              rows={3}
              value={data.motivation.strengths}
              onChange={(e) => setNested('motivation', 'strengths', e.target.value)}
            />
          </Field>
          <Field label="Ажилд орох боломжтой хугацаа">
            <input
              className={inputClasses}
              value={data.motivation.availableFrom}
              onChange={(e) => setNested('motivation', 'availableFrom', e.target.value)}
              placeholder="Шууд / 2 долоо хоногийн дараа…"
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="CV-ийн URL (Google Drive, Dropbox…)"
              hint="CV-г онлайн хаягт байршуулаад линкийг энд оруулна уу."
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
              label="Дипломын хуулбарын URL"
              hint="Скан хуулбарыг онлайн хаягт байршуулаад линкийг оруулна."
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
          Анкет илгээх
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
        <span className="font-serif text-lg font-bold text-navy-900">
          {title}
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-text-muted">{hint}</p>}
    </div>
  );
}
