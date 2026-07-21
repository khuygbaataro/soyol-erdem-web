'use client';

import { useState } from 'react';
import { Check, Link2 } from 'lucide-react';
import { toast } from 'sonner';

/** Гэрээний нийтийн холбоосыг clipboard-д хуулна. */
export function ContractLinkButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = `${window.location.origin}/geree/${token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      toast.success('Холбоос хуулагдлаа');
    } catch {
      toast.message('Холбоос', { description: url });
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-button border border-border-light px-2.5 py-1.5 text-xs font-semibold text-text-body transition-colors hover:bg-cream-soft"
      title="Холбоос хуулах"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-600" />
      ) : (
        <Link2 className="h-3.5 w-3.5" />
      )}
      {copied ? 'Хуулагдсан' : 'Холбоос'}
    </button>
  );
}
