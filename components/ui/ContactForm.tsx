'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from './Button';
import { CONTACT_SUBJECTS } from '@/lib/content';

const inputClasses =
  'w-full rounded-button border border-border-light bg-white px-4 py-3 text-sm text-text-heading placeholder-text-muted transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10';

export interface ContactFormLabels {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  errorSubmit: string;
  errorNetwork: string;
  successTitle: string;
  successBody: string;
  successAgain: string;
  /** Localised subject option labels — must keep the same length and
   *  order as CONTACT_SUBJECTS so the backend keeps receiving the
   *  canonical Mongolian value. */
  subjects: string[];
}

const DEFAULT_LABELS: ContactFormLabels = {
  nameLabel: 'Бүтэн нэр *',
  namePlaceholder: 'Б.Бат-Эрдэнэ',
  emailLabel: 'И-мэйл *',
  emailPlaceholder: 'email@example.com',
  phoneLabel: 'Утас',
  phonePlaceholder: '9999-9999',
  subjectLabel: 'Сэдэв *',
  subjectPlaceholder: 'Сэдвээ сонгоно уу',
  messageLabel: 'Зурвас *',
  messagePlaceholder: 'Таны асуулт, санаа...',
  submit: 'Илгээх',
  errorSubmit: 'Илгээхэд алдаа гарлаа. Дахин оролдоно уу.',
  errorNetwork: 'Сүлжээний алдаа.',
  successTitle: 'Таны зурвас амжилттай илгээгдлээ.',
  successBody: 'Бид ажлын 1-2 өдрийн дотор хариу барина.',
  successAgain: 'Дахин илгээх',
  subjects: [...CONTACT_SUBJECTS],
};

/**
 * Client-side contact form with optimistic submission state. The
 * calling server component passes a `labels` bundle so the form stays
 * locale-agnostic. The subject dropdown shows the localised label but
 * submits the canonical Mongolian value so the backend / admin inbox
 * keeps a single source of truth.
 */
export function ContactForm({ labels = DEFAULT_LABELS }: { labels?: ContactFormLabels } = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          subject: fd.get('subject'),
          message: fd.get('message'),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert(labels.errorSubmit);
      }
    } catch {
      alert(labels.errorNetwork);
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
            {labels.nameLabel}
          </label>
          <input id="name" name="name" type="text" required className={inputClasses} placeholder={labels.namePlaceholder} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
            {labels.emailLabel}
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} placeholder={labels.emailPlaceholder} />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
          {labels.phoneLabel}
        </label>
        <input id="phone" name="phone" type="tel" className={inputClasses} placeholder={labels.phonePlaceholder} />
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
          {labels.subjectLabel}
        </label>
        <select id="subject" name="subject" required className={inputClasses} defaultValue="">
          <option value="" disabled>
            {labels.subjectPlaceholder}
          </option>
          {CONTACT_SUBJECTS.map((subj, idx) => (
            <option key={subj} value={subj}>
              {labels.subjects[idx] ?? subj}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
          {labels.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClasses} resize-y`}
          placeholder={labels.messagePlaceholder}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        icon={<Send className="h-4 w-4" />}
        className="w-full"
      >
        {labels.submit}
      </Button>
    </form>
  );
}
