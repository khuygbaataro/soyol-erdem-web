'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import {
  CheckCircle2,
  Loader2,
  Send,
  Sparkles,
  Wand2,
  XCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FormField, inputClasses, textareaClasses } from '@/components/admin/FormField';
import { renderTemplate } from '@/lib/template';
import { formatMNDate } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  category: string;
  subject: string;
  body: string;
  locale: string;
}

export interface SentEmail {
  id: string;
  toEmail: string;
  subject: string;
  status: string;
  errorText: string | null;
  aiAssisted: boolean;
  createdAt: string;
}

interface ComposeEmailProps {
  submissionId: string;
  toEmail: string;
  toName: string;
  defaultSubject: string;
  /** Applicant's original message — fed to the AI as context. */
  submissionText: string;
  /** Parsed program name (from the anket) for {{programName}}. */
  programName: string;
  /** department of the applicant's program → pre-select matching template. */
  suggestedCategory: string | null;
  initialSent: SentEmail[];
}

type Locale = 'MN' | 'EN' | 'JP';

export function ComposeEmail({
  submissionId,
  toEmail,
  toName,
  defaultSubject,
  submissionText,
  programName,
  suggestedCategory,
  initialSent,
}: ComposeEmailProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [templateId, setTemplateId] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState('');
  const [locale, setLocale] = useState<Locale>('MN');
  const [aiUsed, setAiUsed] = useState(false);
  const [aiBusy, setAiBusy] = useState<null | 'draft' | 'refine'>(null);
  const [sent, setSent] = useState<SentEmail[]>(initialSent);
  const [pending, startTransition] = useTransition();

  // Placeholder values for template rendering. The anket stores the name as
  // "Овог Нэр", so best-effort split: first token = last name, rest = first.
  const vars = useMemo(() => {
    const parts = toName.trim().split(/\s+/).filter(Boolean);
    const lastName = parts[0] ?? toName;
    const firstName = parts.length > 1 ? parts.slice(1).join(' ') : (parts[0] ?? toName);
    return {
      fullName: toName,
      firstName,
      lastName,
      programName: programName || '',
    };
  }, [toName, programName]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/email-templates?active=1')
      .then((r) => (r.ok ? r.json() : { data: [] }))
      .then((json) => {
        if (cancelled) return;
        const list: Template[] = json.data ?? [];
        setTemplates(list);
        // Auto-suggest: first template whose category matches the program's
        // department. Admin can still change it.
        if (suggestedCategory) {
          const match = list.find((t) => t.category === suggestedCategory);
          if (match) applyTemplate(match);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyTemplate(t: Template) {
    setTemplateId(t.id);
    setSubject(renderTemplate(t.subject, vars));
    setBody(renderTemplate(t.body, vars));
    if (t.locale === 'EN' || t.locale === 'JP' || t.locale === 'MN') {
      setLocale(t.locale);
    }
  }

  function onSelectTemplate(id: string) {
    const t = templates.find((x) => x.id === id);
    if (t) applyTemplate(t);
    else {
      setTemplateId('');
    }
  }

  async function runAi(mode: 'draft' | 'refine') {
    setAiBusy(mode);
    try {
      const selected = templates.find((t) => t.id === templateId);
      const res = await fetch('/api/ai/draft', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          mode,
          submissionText,
          templateBody: selected ? renderTemplate(selected.body, vars) : '',
          currentText: body,
          locale,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(json?.error ?? 'AI боловсруулахад алдаа гарлаа');
        return;
      }
      setBody(json.text ?? '');
      setAiUsed(true);
      toast.success(mode === 'draft' ? 'AI ноорог бэлэн боллоо' : 'AI сайжруулав');
    } finally {
      setAiBusy(null);
    }
  }

  function send() {
    if (!subject.trim() || !body.trim()) {
      toast.error('Гарчиг ба агуулгыг бөглөнө үү');
      return;
    }
    startTransition(async () => {
      const res = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contactSubmissionId: submissionId,
          to: toEmail,
          toName,
          subject,
          body,
          templateId: templateId || undefined,
          aiAssisted: aiUsed,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(json?.error ?? 'Имэйл илгээхэд алдаа гарлаа');
        // A failed attempt is still logged server-side — reflect it.
        if (json?.data) setSent((s) => [json.data as SentEmail, ...s]);
        return;
      }
      toast.success(`${toEmail} рүү имэйл илгээгдлээ`);
      setSent((s) => [json.data as SentEmail, ...s]);
      setAiUsed(false);
    });
  }

  const aiDisabled = aiBusy !== null || pending;

  return (
    <Card hover={false}>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
          <Send className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-navy-900">
          Имэйлээр хариулах
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <FormField label="Загвар сонгох" hint="Хөтөлбөрийн чиглэлээр автоматаар санал болгоно.">
          <select
            value={templateId}
            onChange={(e) => onSelectTemplate(e.target.value)}
            className={inputClasses}
          >
            <option value="">— Загвар сонгох —</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} ({t.category})
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Хэл">
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as Locale)}
            className={inputClasses}
          >
            <option value="MN">MN</option>
            <option value="EN">EN</option>
            <option value="JP">JP</option>
          </select>
        </FormField>
      </div>

      <FormField label="Хэнд" className="mt-4">
        <input value={`${toName} <${toEmail}>`} readOnly className={inputClasses} />
      </FormField>

      <FormField label="Гарчиг" required className="mt-4">
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClasses}
        />
      </FormField>

      <FormField label="Агуулга" required className="mt-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={textareaClasses}
          rows={12}
          placeholder="Имэйлийн текст. AI-аар зохиох эсвэл загвар сонгоно уу."
        />
      </FormField>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => runAi('draft')}
          disabled={aiDisabled}
          className="inline-flex items-center gap-1.5 rounded-button border border-border-light bg-white px-3 py-2 text-xs font-semibold text-navy-900 transition-colors hover:bg-cream-soft disabled:opacity-50"
        >
          {aiBusy === 'draft' ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Sparkles className="h-3.5 w-3.5 text-gold-500" />
          )}
          AI-аар бичих
        </button>
        <button
          type="button"
          onClick={() => runAi('refine')}
          disabled={aiDisabled || !body.trim()}
          className="inline-flex items-center gap-1.5 rounded-button border border-border-light bg-white px-3 py-2 text-xs font-semibold text-navy-900 transition-colors hover:bg-cream-soft disabled:opacity-50"
        >
          {aiBusy === 'refine' ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Wand2 className="h-3.5 w-3.5 text-gold-500" />
          )}
          AI-аар сайжруулах
        </button>

        <div className="ml-auto">
          <Button
            type="button"
            variant="primary"
            size="md"
            icon={<Send className="h-4 w-4" />}
            iconPosition="left"
            loading={pending}
            disabled={aiDisabled}
            onClick={send}
          >
            Илгээх
          </Button>
        </div>
      </div>

      {/* Sent history for this submission */}
      <div className="mt-6 border-t border-border-light pt-5">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
          Илгээсэн имэйл ({sent.length})
        </h4>
        {sent.length === 0 ? (
          <p className="text-xs text-text-muted">Одоогоор энэ хүнд имэйл илгээгээгүй.</p>
        ) : (
          <ul className="space-y-2">
            {sent.map((m) => (
              <li
                key={m.id}
                className="flex items-start gap-3 rounded-card border border-border-light bg-cream-soft/50 px-3 py-2.5"
              >
                {m.status === 'SENT' ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-navy-900">
                    {m.subject}
                  </p>
                  <p className="text-xs text-text-muted">
                    {m.toEmail} ·{' '}
                    {formatMNDate(new Date(m.createdAt), {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                    {m.aiAssisted && ' · AI'}
                  </p>
                  {m.status !== 'SENT' && m.errorText && (
                    <p className="mt-0.5 text-xs text-red-600">{m.errorText}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
