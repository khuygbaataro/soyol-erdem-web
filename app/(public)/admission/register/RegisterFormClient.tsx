'use client';

import { useMemo, useRef, useState, useTransition } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Plus,
  Send,
  Trash2,
  Upload,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { SuccessPanel } from './SuccessPanel';

interface ProgramOption {
  id: string;
  name: string;
  degree: string;
}

interface RegisterFormLabels {
  steps: string[];
  /** Template with `{current}` and `{total}` placeholders — kept as
   *  a string so the server can serialise it across the
   *  server→client component boundary. The previous shape (a
   *  function value) tripped Next.js's "Functions cannot be passed
   *  directly to Client Components" RSC rule and crashed the page. */
  stepLabel: string;
  selectPlaceholder: string;
  educationOptions: string[];
  citizenshipMongolian: string;
  citizenshipForeign: string;
  bachelor: string;
  master: string;
  programLabel: string;
  programEmpty: string;
  programEmptyLinkLabel: string;
  lastNameLabel: string;
  lastNamePh: string;
  firstNameLabel: string;
  firstNamePh: string;
  ageLabel?: string;
  agePh?: string;
  educationLevelLabel: string;
  examScoresIntro: string;
  examSubjectPh: string;
  examScorePh: string;
  addSubject: string;
  noExamToggle?: string;
  noExamNote?: string;
  examUploadLabel?: string;
  examUploadHint?: string;
  examUploadCta?: string;
  examUploadRemove?: string;
  phonesIntro: string;
  phonePh: string;
  addPhone: string;
  emailLabel: string;
  emailPh: string;
  removeAria: string;
  prevBtn: string;
  nextBtn: string;
  submitBtn: string;
  validation: {
    citizenship: string;
    degree: string;
    program: string;
    lastName: string;
    firstName: string;
    age?: string;
    education: string;
    examNone: string;
    examFile?: string;
    /** Template with `{subject}` placeholder — same string-not-function
     *  pattern as `stepLabel` above. */
    examNumber: string;
    phone: string;
    email: string;
  };
  errorSubmit: string;
  errorNetwork: string;
  successToast: string;
  successTitle: string;
  successBody: string;
  successAdmissionCta: string;
  successHomeCta: string;
}

interface Props {
  programs: ProgramOption[];
  labels: RegisterFormLabels;
}

type Citizenship = 'MN' | 'FOREIGN';
type Degree = 'BACHELOR' | 'MASTER';

interface ExamFile {
  name: string;
  dataUrl: string;
  /** Зураг бол урьдчилан харуулахад ашиглана. */
  isImage: boolean;
}

interface FormState {
  citizenship: Citizenship | '';
  degree: Degree | '';
  programId: string;
  lastName: string;
  firstName: string;
  /** Элсэгчийн нас — зөвхөн тоо (жиш. "18"). */
  age: string;
  education: string;
  /** ЭЕШ өгөөгүй — оноо, хавсралт хоёулаа шаардагдахгүй болно. */
  noExam: boolean;
  examScores: { subject: string; score: string }[];
  examFile: ExamFile | null;
  phones: string[];
  email: string;
}

const inputClasses =
  'w-full rounded-button border border-border-light bg-white px-4 py-3 text-sm text-text-heading placeholder-text-muted transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];
/** PDF-ийн хязгаар — base64 болгоход хүсэлтийн биеийн хязгаарт багтах ёстой. */
const MAX_PDF_BYTES = 3 * 1024 * 1024;
const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
/** Зургийг илгээхийн өмнө багасгах хамгийн урт тал. */
const IMAGE_MAX_EDGE = 1600;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = () => reject(new Error('read failed'));
    fr.readAsDataURL(file);
  });
}

/**
 * Утаснаас авсан зураг ихэвчлэн 3–8 MB байдаг тул сервер рүү илгээхийн
 * өмнө canvas дээр багасган JPEG болгож шахна. PDF-ийг хэвээр нь үлдээнэ.
 */
async function prepareFile(file: File): Promise<ExamFile> {
  const raw = await readAsDataUrl(file);
  if (file.type === 'application/pdf') {
    return { name: file.name, dataUrl: raw, isImage: false };
  }

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const i = new window.Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error('image decode failed'));
    i.src = raw;
  });

  const scale = Math.min(1, IMAGE_MAX_EDGE / Math.max(img.width, img.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) return { name: file.name, dataUrl: raw, isImage: true };
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return {
    name: file.name,
    dataUrl: canvas.toDataURL('image/jpeg', 0.85),
    isImage: true,
  };
}

/**
 * Eight-step wizard. Each step renders one chunk of the form; "Next"
 * runs lightweight validation locally and only when all steps pass do
 * we POST to /api/admission-applications. Success swaps the wizard for
 * a confirmation panel. All labels arrive pre-localised from the
 * server page so this component stays locale-agnostic.
 */
export function RegisterFormClient({ programs, labels }: Props) {
  const [step, setStep] = useState(1);
  const totalSteps = labels.steps.length;
  const [pending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [fileBusy, setFileBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<FormState>({
    citizenship: '',
    degree: '',
    programId: '',
    lastName: '',
    firstName: '',
    age: '',
    education: '',
    noExam: false,
    examScores: [{ subject: '', score: '' }],
    examFile: null,
    phones: [''],
    email: '',
  });

  // Filter the program dropdown by selected degree so a master applicant
  // doesn't see undergraduate programmes (and vice versa). We compare
  // against both the canonical Mongolian and the localised label so
  // the filter works for every locale.
  const visiblePrograms = useMemo(() => {
    if (!data.degree) return programs;
    const wantMn = data.degree === 'BACHELOR' ? 'Бакалавр' : 'Магистр';
    const wantLoc =
      data.degree === 'BACHELOR' ? labels.bachelor : labels.master;
    return programs.filter(
      (p) => p.degree.includes(wantMn) || p.degree.includes(wantLoc),
    );
  }, [programs, data.degree, labels.bachelor, labels.master]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  /** ЭЕШ-ийн алхмын дугаар. */
  const EXAM_STEP = 6;
  /**
   * Аль хэдийн бакалаврын зэрэгтэй элсэгчээс ЭЕШ асуух шаардлагагүй тул
   * 6-р алхмыг бүхэлд нь алгасна. educationOptions-ийн 2-р индекс нь бүх
   * хэл дээр "Бакалавр" тул энэ шалгалт хэлнээс хамаарахгүй.
   */
  const skipExam = data.education === labels.educationOptions[2];

  /** Сонгосон файлыг шалгаж, шахаад төлөвт хадгална. */
  async function pickFile(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error('Зөвхөн зураг (JPG, PNG) эсвэл PDF хавсаргана уу.');
      return;
    }
    const isPdf = file.type === 'application/pdf';
    const limit = isPdf ? MAX_PDF_BYTES : MAX_IMAGE_BYTES;
    if (file.size > limit) {
      toast.error(
        isPdf
          ? 'PDF файл 3 MB-аас бага байх шаардлагатай.'
          : 'Зураг хэт том байна. Өөр зураг сонгоно уу.',
      );
      return;
    }
    setFileBusy(true);
    try {
      set('examFile', await prepareFile(file));
    } catch {
      toast.error('Файлыг уншиж чадсангүй. Дахин оролдоно уу.');
    } finally {
      setFileBusy(false);
    }
  }

  function validateStep(n: number): string | null {
    switch (n) {
      case 1:
        return data.citizenship ? null : labels.validation.citizenship;
      case 2:
        return data.degree ? null : labels.validation.degree;
      case 3:
        return data.programId ? null : labels.validation.program;
      case 4:
        if (!data.lastName.trim()) return labels.validation.lastName;
        if (!data.firstName.trim()) return labels.validation.firstName;
        {
          const n = Number(data.age.trim());
          if (!/^\d{1,3}$/.test(data.age.trim()) || n < 14 || n > 99)
            return labels.validation.age ?? 'Насаа зөв оруулна уу (14–99).';
        }
        return null;
      case 5:
        return data.education ? null : labels.validation.education;
      case 6: {
        // Бакалаврын зэрэгтэй эсвэл "ЭЕШ өгөөгүй" сонгосон бол энэ
        // алхмын шаардлага бүхэлдээ хасагдана.
        if (skipExam || data.noExam) return null;
        const valid = data.examScores.filter(
          (s) => s.subject.trim() && s.score.trim(),
        );
        if (valid.length === 0) return labels.validation.examNone;
        for (const s of valid) {
          if (!/^\d{1,4}([.,]\d{1,2})?$/.test(s.score.trim()))
            return labels.validation.examNumber.replace('{subject}', s.subject);
        }
        // ЭЕШ өгсөн бол үнэлгээний хуудсыг заавал хавсаргана.
        if (!data.examFile)
          return (
            labels.validation.examFile ??
            'ЭЕШ-ийн үнэлгээний хуудсаа хавсаргана уу.'
          );
        return null;
      }
      case 7: {
        const valid = data.phones.filter((p) => p.trim().length >= 6);
        return valid.length > 0 ? null : labels.validation.phone;
      }
      case 8: {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
          return labels.validation.email;
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
    setStep((s) => {
      const target = s + 1;
      // Бакалаврын зэрэгтэй бол ЭЕШ-ийн алхмыг үсэрч өнгөрнө
      const skipped = skipExam && target === EXAM_STEP ? target + 1 : target;
      return Math.min(totalSteps, skipped);
    });
  }
  function prev() {
    setStep((s) => {
      const target = s - 1;
      const skipped = skipExam && target === EXAM_STEP ? target - 1 : target;
      return Math.max(1, skipped);
    });
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
        age: data.age.trim(),
        education: data.education,
        noExam: data.noExam || skipExam,
        // ЭЕШ өгөөгүй бол оноо, хавсралт хоёуланг нь илгээхгүй.
        examScores: data.noExam || skipExam
          ? []
          : data.examScores
              .filter((s) => s.subject.trim() && s.score.trim())
              .map((s) => ({
                subject: s.subject.trim(),
                score: s.score.trim(),
              })),
        examFile:
          !data.noExam && !skipExam && data.examFile
            ? { name: data.examFile.name, dataUrl: data.examFile.dataUrl }
            : undefined,
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
      <>
        <Toaster richColors position="top-right" />
        <SuccessPanel
          title={labels.successTitle}
          body={labels.successBody}
          admissionCta={labels.successAdmissionCta}
          homeCta={labels.successHomeCta}
        />
      </>
    );
  }

  // The "no programmes published yet" empty state contains an inline
  // link. We split the template on the {link} marker so the React tree
  // can render an actual <a> in the middle.
  const programEmptyParts = labels.programEmpty.split('{link}');

  return (
    <div className="rounded-card border border-border-light bg-white shadow-card">
      <Toaster richColors position="top-right" />

      {/* Stepper */}
      <div className="border-b border-border-light px-4 py-4 sm:px-6 sm:py-5">
        {/* Гар утсан дээр 8 дугуй багтахгүй тул зөвхөн одоогийн алхмыг харуулна */}
        <div className="mb-3 flex items-center justify-between gap-3 sm:hidden">
          <span className="min-w-0 truncate text-sm font-bold text-navy-900">
            {labels.steps[step - 1]}
          </span>
          <span className="shrink-0 rounded-full bg-cream px-2.5 py-1 text-[11px] font-bold text-text-muted">
            {step} / {totalSteps}
          </span>
        </div>

        <div className="hidden items-center justify-between gap-2 overflow-x-auto sm:flex">
          {labels.steps.map((label, idx) => {
            const n = idx + 1;
            const isActive = n === step;
            const isDone = n < step;
            return (
              <button
                key={n}
                type="button"
                disabled={skipExam && n === EXAM_STEP}
                onClick={() => {
                  if (n < step && !(skipExam && n === EXAM_STEP)) setStep(n);
                }}
                className={cn(
                  'flex shrink-0 flex-col items-center gap-1 rounded-md px-2 py-1 text-[11px] transition-colors',
                  isActive && 'text-navy-900',
                  !isActive && !isDone && 'text-text-muted',
                  isDone && 'text-emerald-600 hover:text-navy-900',
                  skipExam && n === EXAM_STEP && 'opacity-40',
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
                  {isDone ? <Check className="h-3.5 w-3.5" /> : n}
                </span>
                <span className="hidden whitespace-nowrap font-semibold sm:inline">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border-light">
          <div
            className="h-full rounded-full bg-gold-500 transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-6 sm:px-10 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-500">
          {labels.stepLabel
            .replace('{current}', String(step))
            .replace('{total}', String(totalSteps))}
        </p>
        <h2 className="mt-1 text-h3 font-bold text-navy-900">
          {labels.steps[step - 1]}
        </h2>

        <div className="mt-6 space-y-5">
          {step === 1 && (
            <Choice
              name="citizenship"
              value={data.citizenship}
              onChange={(v) => set('citizenship', v as Citizenship)}
              options={[
                { value: 'MN', label: labels.citizenshipMongolian },
                { value: 'FOREIGN', label: labels.citizenshipForeign },
              ]}
            />
          )}

          {step === 2 && (
            <Choice
              name="degree"
              value={data.degree}
              onChange={(v) => {
                set('degree', v as Degree);
                set('programId', '');
              }}
              options={[
                { value: 'BACHELOR', label: labels.bachelor },
                { value: 'MASTER', label: labels.master },
              ]}
            />
          )}

          {step === 3 && (
            <div>
              <label
                htmlFor="programId"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted"
              >
                {labels.programLabel}
              </label>
              {visiblePrograms.length === 0 ? (
                <p className="rounded-button border border-border-light bg-cream-soft p-4 text-sm text-text-body">
                  {programEmptyParts[0]}
                  <a
                    href="/contact"
                    className="font-semibold text-navy-900 underline"
                  >
                    {labels.programEmptyLinkLabel}
                  </a>
                  {programEmptyParts[1] ?? ''}
                </p>
              ) : (
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {visiblePrograms.map((p) => (
                    <OptionCard
                      key={p.id}
                      selected={data.programId === p.id}
                      onSelect={() => set('programId', p.id)}
                      title={p.name}
                      subtitle={p.degree}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="lastName"
                label={labels.lastNameLabel}
                value={data.lastName}
                onChange={(v) => set('lastName', v)}
                placeholder={labels.lastNamePh}
              />
              <Field
                id="firstName"
                label={labels.firstNameLabel}
                value={data.firstName}
                onChange={(v) => set('firstName', v)}
                placeholder={labels.firstNamePh}
              />
              <Field
                id="age"
                label={labels.ageLabel ?? 'Нас'}
                value={data.age}
                onChange={(v) => set('age', v.replace(/\D/g, '').slice(0, 3))}
                placeholder={labels.agePh ?? '18'}
                inputMode="numeric"
              />
            </div>
          )}

          {step === 5 && (
            <div>
              <label
                htmlFor="education"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted"
              >
                {labels.educationLevelLabel}
              </label>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {labels.educationOptions.map((opt) => (
                  <OptionCard
                    key={opt}
                    selected={data.education === opt}
                    onSelect={() => {
                      const isBachelor = opt === labels.educationOptions[2];
                      setData((d) => ({
                        ...d,
                        education: opt,
                        noExam: isBachelor ? true : d.noExam,
                        examScores: isBachelor
                          ? [{ subject: '', score: '' }]
                          : d.examScores,
                        examFile: isBachelor ? null : d.examFile,
                      }));
                    }}
                    title={opt}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              {/* ЭЕШ өгөөгүй сонголт — идэвхжвэл доорх шаардлагууд бүгд хасагдана */}
              <label
                className={cn(
                  'mb-5 flex cursor-pointer items-start gap-3 rounded-card border-2 p-4 transition-colors',
                  data.noExam
                    ? 'border-navy-900 bg-navy-900/5'
                    : 'border-border-light bg-white hover:border-navy-900/40',
                )}
              >
                <input
                  type="checkbox"
                  checked={data.noExam}
                  onChange={(e) => set('noExam', e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-border-medium text-navy-900 focus:ring-navy-900"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-navy-900">
                    {labels.noExamToggle ?? 'ЭЕШ өгөөгүй'}
                  </span>
                  {data.noExam && labels.noExamNote && (
                    <span className="mt-1 block text-xs leading-relaxed text-text-body">
                      {labels.noExamNote}
                    </span>
                  )}
                </span>
              </label>

              {!data.noExam && (
                <>
              <p className="mb-3 text-sm text-text-body">
                {labels.examScoresIntro}
              </p>
              <div className="space-y-3">
                {data.examScores.map((s, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[1fr_84px_auto] gap-2 sm:grid-cols-[1fr_120px_auto] sm:gap-3"
                  >
                    <input
                      type="text"
                      value={s.subject}
                      onChange={(e) => {
                        const arr = [...data.examScores];
                        arr[idx] = { ...arr[idx], subject: e.target.value };
                        set('examScores', arr);
                      }}
                      placeholder={labels.examSubjectPh}
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
                      placeholder={labels.examScorePh}
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
                      aria-label={labels.removeAria}
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
                    {labels.addSubject}
                  </button>
                )}
              </div>

              {/* ЭЕШ-ийн үнэлгээний хуудас — зураг эсвэл PDF */}
              <div className="mt-6 border-t border-border-light pt-5">
                <p className="text-sm font-semibold text-navy-900">
                  {labels.examUploadLabel ?? 'ЭЕШ-ийн үнэлгээний хуудас (заавал биш)'}
                </p>
                <p className="mt-0.5 text-xs text-text-muted">
                  {labels.examUploadHint ?? 'Зураг эсвэл PDF · 3 MB хүртэл'}
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,application/pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    e.target.value = '';
                    if (f) void pickFile(f);
                  }}
                  className="hidden"
                />

                {data.examFile ? (
                  <div className="mt-3 flex items-center gap-3 rounded-button border border-border-light bg-cream-soft p-3">
                    {data.examFile.isImage ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={data.examFile.dataUrl}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded object-cover"
                      />
                    ) : (
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-white text-navy-900">
                        <FileText className="h-6 w-6" />
                      </span>
                    )}
                    <span className="min-w-0 flex-1 truncate text-sm text-text-body">
                      {data.examFile.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => set('examFile', null)}
                      className="shrink-0 rounded-button p-2 text-text-muted hover:bg-white hover:text-red-600"
                      aria-label={labels.examUploadRemove ?? 'Файл устгах'}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={fileBusy}
                    className="mt-3 inline-flex items-center gap-2 rounded-button border border-border-medium bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-navy-900 disabled:opacity-50"
                  >
                    <Upload className="h-4 w-4" />
                    {fileBusy
                      ? '…'
                      : (labels.examUploadCta ?? 'Файл сонгох')}
                  </button>
                )}
              </div>
                </>
              )}
            </div>
          )}

          {step === 7 && (
            <div>
              <p className="mb-3 text-sm text-text-body">{labels.phonesIntro}</p>
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
                      placeholder={labels.phonePh}
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
                      aria-label={labels.removeAria}
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
                    {labels.addPhone}
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 8 && (
            <Field
              id="email"
              label={labels.emailLabel}
              type="email"
              value={data.email}
              onChange={(v) => set('email', v)}
              placeholder={labels.emailPh}
            />
          )}
        </div>

        {/* Nav */}
        <div className="mt-8 grid grid-cols-2 items-center gap-3 border-t border-border-light pt-6 sm:flex sm:flex-wrap sm:justify-between">
          <Button
            type="button"
            onClick={prev}
            variant="outline"
            size="md"
            icon={<ArrowLeft className="h-4 w-4" />}
            iconPosition="left"
            disabled={step === 1}
            className="w-full sm:w-auto"
          >
            {labels.prevBtn}
          </Button>

          {step < totalSteps ? (
            <Button
              type="button"
              onClick={next}
              variant="primary"
              size="md"
              icon={<ArrowRight className="h-4 w-4" />}
              className="w-full sm:w-auto"
            >
              {labels.nextBtn}
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
              className="w-full sm:w-auto"
            >
              {labels.submitBtn}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Small reusable bits ────────────────────────────────────────── */

/**
 * Сонголтын карт — dropdown-ы оронд шууд харагдах, хуруугаар дарахад
 * тохиромжтой том товч. Хөтөлбөр болон боловсролын түвшинд ашиглана.
 */
function OptionCard({
  selected,
  onSelect,
  title,
  subtitle,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  subtitle?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'group flex w-full items-center gap-3 rounded-card border-2 px-4 py-3.5 text-left transition-all',
        selected
          ? 'border-navy-900 bg-navy-900 text-white shadow-card'
          : 'border-border-light bg-white text-navy-900 hover:border-navy-900/50 hover:bg-cream-soft',
      )}
    >
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          selected ? 'border-white bg-white' : 'border-border-medium bg-white',
        )}
      >
        {selected && <Check className="h-3 w-3 text-navy-900" strokeWidth={3} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold leading-snug">{title}</span>
        {subtitle && (
          <span
            className={cn(
              'mt-0.5 block text-xs',
              selected ? 'text-white/70' : 'text-text-muted',
            )}
          >
            {subtitle}
          </span>
        )}
      </span>
    </button>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: 'numeric' | 'tel' | 'email' | 'text';
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
        inputMode={inputMode}
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
