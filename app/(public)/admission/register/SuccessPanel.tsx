'use client';

import { useState } from 'react';
import {
  BadgeCheck,
  Check,
  Copy,
  FileSignature,
  Landmark,
  Mail,
  PhoneCall,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

/** Суудал баталгаажуулах төлбөрийн мэдээлэл. */
const SEAT_FEE = '250,000₮';
const BANK_NAME = 'Худалдаа Хөгжлийн банк';
const ACCOUNT = '499034349';
const IBAN = '300004000499034349';

/** Хуулж авах боломжтой мөр — данс, IBAN гэх мэт. */
function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  /**
   * Facebook / Messenger-ийн дотоод хөтөч дээр navigator.clipboard
   * ихэвчлэн хаалттай байдаг тул execCommand-аар нөхөж, аль нэг нь
   * бүтсэн тохиолдолд л "хуулагдлаа" гэж харуулна.
   */
  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, value.length);
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-button border border-border-light bg-white px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
          {label}
        </p>
        <p className="truncate font-mono text-sm font-bold text-navy-900 sm:text-base">
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`${label} хуулах`}
        className={
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-button transition-colors ' +
          (copied
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-cream-soft text-text-muted hover:bg-cream hover:text-navy-900')
        }
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

/**
 * Анкет амжилттай илгээгдсэний дараах дэлгэц. Зөвхөн "илгээгдлээ" гэж
 * хэлэхээс гадна дараагийн алхмыг — суудал баталгаажуулах төлбөр, түүний
 * дараа онлайн гэрээ имэйлээр очих — тодорхой зааж өгнө.
 */
export function SuccessPanel({
  title,
  body,
  admissionCta,
  homeCta,
}: {
  title: string;
  body: string;
  admissionCta: string;
  homeCta: string;
}) {
  return (
    <div className="overflow-hidden rounded-card border border-border-light bg-white shadow-card">
      {/* Амжилттай илгээгдсэн */}
      <div className="border-b border-border-light bg-emerald-50/60 px-5 py-8 text-center sm:px-10">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="h-7 w-7" />
        </span>
        <h2 className="mt-4 text-xl font-bold text-navy-900 sm:text-2xl">{title}</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-text-body">
          {body}
        </p>
      </div>

      {/* Дараагийн алхам — төлбөр */}
      <div className="px-5 py-7 sm:px-10 sm:py-9">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-900">
            1
          </span>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gold-500">
            Дараагийн алхам
          </p>
        </div>

        <h3 className="mt-3 text-lg font-bold text-navy-900 sm:text-xl">
          Суудлаа баталгаажуулах
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-body">
          Суудал баталгаажуулах{' '}
          <strong className="font-bold text-navy-900">{SEAT_FEE}</strong> төлбөрийг
          доорх данс руу шилжүүлснээр таны элсэлт баталгаажиж, гэрээ байгуулах
          дараагийн шатанд шилжинэ.
        </p>

        {/* Дансны мэдээлэл */}
        <div className="mt-5 rounded-card border border-navy-900/10 bg-cream-soft p-4 sm:p-5">
          <div className="flex items-center gap-2 border-b border-border-light pb-3">
            <Landmark className="h-4 w-4 shrink-0 text-gold-500" />
            <p className="text-sm font-bold text-navy-900">{BANK_NAME}</p>
          </div>

          <div className="mt-3 space-y-2">
            <CopyRow label="Дансны дугаар" value={ACCOUNT} />
            <CopyRow label="IBAN" value={IBAN} />
            <CopyRow label="Шилжүүлэх дүн" value={SEAT_FEE} />
          </div>

          <div className="mt-3 rounded-button border border-gold-500/40 bg-gold-500/10 px-3 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
              Гүйлгээний утга
            </p>
            <p className="mt-0.5 text-sm font-semibold text-navy-900">
              Өөрийн нэр, утасны дугаар
            </p>
            <p className="mt-0.5 text-xs text-text-body">
              Жишээ: <span className="font-medium">Ганбаатар Түшиг 96968786</span>
            </p>
          </div>
        </div>

        {/* Төлбөрийн дараа */}
        <div className="mt-6 border-t border-border-light pt-6">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
              2
            </span>
            <p className="text-[11px] font-bold uppercase tracking-widest text-navy-900">
              Төлбөр төлсний дараа
            </p>
          </div>

          <ul className="mt-4 space-y-3">
            <li className="flex gap-3">
              <FileSignature className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
              <p className="text-sm leading-relaxed text-text-body">
                <strong className="font-semibold text-navy-900">
                  Онлайн гэрээг таны и-мэйл хаяг руу илгээнэ.
                </strong>{' '}
                Та гэрээгээ уншаад цахимаар гарын үсгээ зурснаар элсэлт
                бүрэн баталгаажна.
              </p>
            </li>
            <li className="flex gap-3">
              <PhoneCall className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
              <p className="text-sm leading-relaxed text-text-body">
                <strong className="font-semibold text-navy-900">
                  Төлбөр төлсөн тухайгаа мэдэгдэх шаардлагагүй.
                </strong>{' '}
                Төлбөр орсон даруйд Сургалтын албанаас тантай холбогдож
                дараагийн алхмуудыг зааж өгнө.
              </p>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
              <p className="text-sm leading-relaxed text-text-body">
                И-мэйл ирээгүй бол{' '}
                <strong className="font-semibold text-navy-900">спам (Spam)</strong>{' '}
                хавтсаа шалгаарай.
              </p>
            </li>
          </ul>
        </div>

        {/* Сануулга */}
        <div className="mt-6 flex items-start gap-2.5 rounded-button bg-navy-900/5 px-4 py-3">
          <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-navy-900" />
          <p className="text-xs leading-relaxed text-text-body">
            Суудал баталгаажуулах төлбөр нь сургалтын төлбөрийн нэг хэсэг бөгөөд
            элсэлтийн үед таны суудлыг хадгална.
          </p>
        </div>

        {/* Товчнууд */}
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Button href="/admission" variant="outline" size="md" className="w-full">
            {admissionCta}
          </Button>
          <Button href="/" variant="primary" size="md" className="w-full">
            {homeCta}
          </Button>
        </div>
      </div>
    </div>
  );
}
