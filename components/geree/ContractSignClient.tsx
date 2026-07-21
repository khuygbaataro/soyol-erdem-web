'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, PenLine } from 'lucide-react';
import { toast } from 'sonner';
import { ContractDocument } from './ContractDocument';
import { SignaturePad } from './SignaturePad';

export interface SignableContract {
  token: string;
  academicYear: string;
  contractNo: string | null;
  lastName: string;
  firstName: string;
  regNumber: string;
  programName: string;
  classYear: string;
  phone: string;
  email: string;
  schoolRep: string;
}

const FIELDS: {
  key: 'lastName' | 'firstName' | 'regNumber' | 'programName' | 'classYear' | 'phone' | 'email';
  label: string;
  placeholder?: string;
}[] = [
  { key: 'lastName', label: 'Овог' },
  { key: 'firstName', label: 'Нэр' },
  { key: 'regNumber', label: 'Регистрийн дугаар (РД)', placeholder: 'АА00112233' },
  { key: 'programName', label: 'Мэргэжил' },
  { key: 'classYear', label: 'Анги (курс)', placeholder: '1' },
  { key: 'phone', label: 'Утасны дугаар' },
  { key: 'email', label: 'И-мэйл (заавал биш)' },
];

export function ContractSignClient({ contract }: { contract: SignableContract }) {
  const router = useRouter();
  const [f, setF] = useState({
    lastName: contract.lastName,
    firstName: contract.firstName,
    regNumber: contract.regNumber,
    programName: contract.programName,
    classYear: contract.classYear,
    phone: contract.phone,
    email: contract.email,
  });
  const [signedName, setSignedName] = useState(
    `${contract.lastName} ${contract.firstName}`.trim(),
  );
  const [signature, setSignature] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function set<K extends keyof typeof f>(key: K, value: string) {
    setF((prev) => ({ ...prev, [key]: value }));
  }

  async function submit() {
    if (!f.lastName.trim() || !f.firstName.trim()) {
      toast.error('Овог, нэрээ бөглөнө үү');
      return;
    }
    if (!f.regNumber.trim()) {
      toast.error('Регистрийн дугаараа оруулна уу');
      return;
    }
    if (!signedName.trim()) {
      toast.error('Баталгаажуулах нэрээ бичнэ үү');
      return;
    }
    if (!agreed) {
      toast.error('Гэрээг зөвшөөрсөн тэмдэглэгээг хийнэ үү');
      return;
    }
    if (!signature) {
      toast.error('Гарын үсгээ зурна уу');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/geree/${contract.token}/sign`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...f, signedName, agreed, signature }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(json?.error ?? 'Хадгалахад алдаа гарлаа');
        return;
      }
      toast.success('Гэрээ амжилттай баталгаажлаа');
      router.refresh();
    } catch {
      toast.error('Сүлжээний алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* 1. Мэдээлэл шалгах */}
      <section className="rounded-card border border-border-light bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-navy-900">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-900">
            1
          </span>
          Мэдээллээ шалгах
        </h2>
        <p className="mt-1 text-sm text-text-muted">
          Доорх мэдээлэл гэрээнд хэвлэгдэнэ. Шаардлагатай бол засаж болно.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <label key={field.key} className="block">
              <span className="mb-1 block text-sm font-medium text-text-body">
                {field.label}
              </span>
              <input
                type="text"
                value={f[field.key]}
                placeholder={field.placeholder}
                onChange={(e) => set(field.key, e.target.value)}
                disabled={submitting}
                className="w-full rounded-button border border-border-light bg-cream-soft px-3 py-2 text-sm text-navy-900 outline-none focus:border-gold-500 focus:bg-white disabled:opacity-60"
              />
            </label>
          ))}
        </div>
      </section>

      {/* 2. Гэрээг унших */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-navy-900">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-900">
            2
          </span>
          Гэрээтэй танилцах
        </h2>
        <div className="max-h-[520px] overflow-y-auto rounded-card border border-border-light shadow-sm">
          <ContractDocument
            fields={{
              academicYear: contract.academicYear,
              contractNo: contract.contractNo,
              lastName: f.lastName,
              firstName: f.firstName,
              regNumber: f.regNumber,
              programName: f.programName,
              classYear: f.classYear,
              phone: f.phone,
              schoolRep: contract.schoolRep,
              signatureUrl: null,
              signedAt: null,
            }}
          />
        </div>
      </section>

      {/* 3. Гарын үсэг зурах */}
      <section className="rounded-card border border-border-light bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-bold text-navy-900">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-900">
            3
          </span>
          Гарын үсэг зурж баталгаажуулах
        </h2>

        <div className="mt-4">
          <span className="mb-1 block text-sm font-medium text-text-body">
            Гарын үсэг
          </span>
          <SignaturePad onChange={setSignature} disabled={submitting} />
        </div>

        <label className="mt-4 block">
          <span className="mb-1 block text-sm font-medium text-text-body">
            Овог нэрээ бүтнээр бичнэ үү (баталгаажуулалт)
          </span>
          <input
            type="text"
            value={signedName}
            onChange={(e) => setSignedName(e.target.value)}
            disabled={submitting}
            className="w-full rounded-button border border-border-light bg-cream-soft px-3 py-2 text-sm text-navy-900 outline-none focus:border-gold-500 focus:bg-white disabled:opacity-60 sm:max-w-md"
          />
        </label>

        <label className="mt-4 flex items-start gap-3">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            disabled={submitting}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-border-light text-gold-500 focus:ring-gold-500"
          />
          <span className="text-sm text-text-body">
            Би энэхүү гэрээг бүрэн уншиж, танилцаж, агуулгыг хүлээн зөвшөөрч
            байна. Гарын үсэг зурснаар гэрээ хүчин төгөлдөр болохыг ойлгож байна.
          </span>
        </label>

        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-button bg-navy-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-800 disabled:opacity-60 sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Хадгалж байна…
            </>
          ) : (
            <>
              <PenLine className="h-4 w-4" />
              Гэрээг баталгаажуулах
            </>
          )}
        </button>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-text-muted">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
          Баталгаажуулсны дараа гэрээгээ PDF болгон татаж авах боломжтой.
        </p>
      </section>
    </div>
  );
}
