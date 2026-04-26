'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from './Button';
import { CONTACT_SUBJECTS } from '@/lib/content';

const inputClasses =
  'w-full rounded-button border border-border-light bg-white px-4 py-3 text-sm text-text-heading placeholder-text-muted transition-colors focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/10';

/**
 * Client-side contact form with optimistic submission state.
 * TODO: wire up to API endpoint in Prompt 3.
 */
export function ContactForm() {
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
        alert('Илгээхэд алдаа гарлаа. Дахин оролдоно уу.');
      }
    } catch {
      alert('Сүлжээний алдаа.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-card border border-gold-500/40 bg-gold-500/5 p-8 text-center">
        <p className="text-base font-semibold text-navy-900">
          Таны зурвас амжилттай илгээгдлээ.
        </p>
        <p className="mt-2 text-sm text-text-body">
          Бид ажлын 1-2 өдрийн дотор хариу барина.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-semibold text-navy-900 underline"
        >
          Дахин илгээх
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
            Бүтэн нэр *
          </label>
          <input id="name" name="name" type="text" required className={inputClasses} placeholder="Б.Бат-Эрдэнэ" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
            И-мэйл *
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} placeholder="email@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
          Утас
        </label>
        <input id="phone" name="phone" type="tel" className={inputClasses} placeholder="9999-9999" />
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
          Сэдэв *
        </label>
        <select id="subject" name="subject" required className={inputClasses} defaultValue="">
          <option value="" disabled>
            Сэдвээ сонгоно уу
          </option>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-muted">
          Зурвас *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClasses} resize-y`}
          placeholder="Таны асуулт, санаа..."
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
        Илгээх
      </Button>
    </form>
  );
}
