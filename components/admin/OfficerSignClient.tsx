'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, PenLine } from 'lucide-react';
import { toast } from 'sonner';
import { SignaturePad } from '@/components/geree/SignaturePad';
import { ContractLinkButton } from './ContractLinkButton';

/**
 * Админ дахь ажилтны гарын үсэг зурах хэсэг. Ажилтан нэрээ бичиж, гарын
 * үсгээ зураад хадгалснаар оюутанд илгээх холбоос идэвхжинэ.
 */
export function OfficerSignClient({
  token,
  initialSchoolRep,
  signed,
}: {
  token: string;
  initialSchoolRep: string;
  signed: boolean;
}) {
  const router = useRouter();
  const [schoolRep, setSchoolRep] = useState(initialSchoolRep);
  const [signature, setSignature] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(!signed);

  async function save() {
    if (!schoolRep.trim()) {
      toast.error('Ажилтны нэрээ бичнэ үү');
      return;
    }
    if (!signature) {
      toast.error('Гарын үсгээ зурна уу');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/geree/${token}/officer`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ schoolRep, schoolSignature: signature }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(json?.error ?? 'Хадгалахад алдаа гарлаа');
        return;
      }
      toast.success('Ажилтны гарын үсэг хадгалагдлаа');
      setEditing(false);
      router.refresh();
    } catch {
      toast.error('Сүлжээний алдаа гарлаа');
    } finally {
      setSaving(false);
    }
  }

  // Ажилтан аль хэдийн зурсан бол — амжилтын мессеж + холбоос.
  if (signed && !editing) {
    return (
      <div className="rounded-card border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
          <div className="flex-1">
            <h2 className="text-base font-bold text-navy-900">
              Ажилтны гарын үсэг зурагдсан
            </h2>
            <p className="mt-1 text-sm text-text-body">
              Одоо доорх холбоосыг элсэгч рүү илгээнэ үү. Элсэгч өөрийн гарын
              үсгээ зурж баталгаажуулна.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <ContractLinkButton token={token} />
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-1.5 rounded-button border border-border-light px-3 py-1.5 text-xs font-semibold text-text-body transition-colors hover:bg-white"
              >
                <PenLine className="h-3.5 w-3.5" />
                Гарын үсэг дахин зурах
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border-light bg-white p-6 shadow-sm">
      <h2 className="flex items-center gap-2 text-base font-bold text-navy-900">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-navy-900">
          1
        </span>
        Элсэлтийн албаны ажилтан гарын үсгээ зурах
      </h2>
      <p className="mt-1 text-sm text-text-muted">
        Нэрээ бичиж, гарын үсгээ зураад хадгална уу. Үүний дараа элсэгчид
        илгээх холбоос гарч ирнэ.
      </p>

      <label className="mt-4 block">
        <span className="mb-1 block text-sm font-medium text-text-body">
          Ажилтны овог нэр
        </span>
        <input
          type="text"
          value={schoolRep}
          onChange={(e) => setSchoolRep(e.target.value)}
          disabled={saving}
          placeholder="Жишээ: Хуягбаатар"
          className="w-full rounded-button border border-border-light bg-cream-soft px-3 py-2 text-sm text-navy-900 outline-none focus:border-gold-500 focus:bg-white disabled:opacity-60 sm:max-w-md"
        />
      </label>

      <div className="mt-4">
        <span className="mb-1 block text-sm font-medium text-text-body">
          Гарын үсэг
        </span>
        <SignaturePad onChange={setSignature} disabled={saving} />
      </div>

      <button
        type="button"
        onClick={save}
        disabled={saving}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-button bg-navy-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-navy-800 disabled:opacity-60"
      >
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Хадгалж байна…
          </>
        ) : (
          <>
            <PenLine className="h-4 w-4" />
            Гарын үсэг хадгалах
          </>
        )}
      </button>
    </div>
  );
}
