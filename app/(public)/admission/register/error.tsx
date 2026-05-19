'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Mail, Phone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/layout/Section';

/**
 * Local error boundary for /admission/register. When the server-side
 * rendering of the registration wizard throws for any reason, Next.js
 * mounts this component instead of the default blank "Application
 * error" page — giving prospective applicants a clear, friendly
 * fallback with direct contact channels (so they can still register
 * by phone/email even when the form is down).
 *
 * Renders the `digest` so the editor can match it against the Vercel
 * function log to track down the underlying server error.
 */
export default function AdmissionRegisterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[admission/register] failed to render', error);
  }, [error]);

  return (
    <Section background="cream-soft" spacing="md">
      <div className="mx-auto max-w-2xl rounded-card border border-red-200 bg-white p-8 shadow-card md:p-12">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="font-serif text-2xl font-bold text-navy-900">
              Цахим бүртгэлийн форм түр ажиллахгүй байна
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-text-body">
              Бид одоо засаж байна. Та доорх хувилбараар бүртгүүлэх боломжтой:
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-3 text-sm">
          <li className="flex items-start gap-3 rounded-card border border-border-light bg-cream-soft/60 p-4">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                Утсаар бүртгүүлэх
              </p>
              <a
                href="tel:+97670118584"
                className="mt-1 block font-bold text-navy-900 hover:text-gold-500"
              >
                7011-8584
              </a>
              <a
                href="tel:+97670118589"
                className="mt-0.5 block text-sm text-text-body hover:text-gold-500"
              >
                7011-8589 (элсэлтийн алба)
              </a>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-card border border-border-light bg-cream-soft/60 p-4">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                И-мэйлээр бүртгүүлэх
              </p>
              <a
                href="mailto:soyolerdem.daigaku@gmail.com"
                className="mt-1 block break-all font-bold text-navy-900 hover:text-gold-500"
              >
                soyolerdem.daigaku@gmail.com
              </a>
            </div>
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            onClick={reset}
            variant="primary"
            size="md"
            icon={<RefreshCw className="h-4 w-4" />}
            iconPosition="left"
          >
            Дахин оролдох
          </Button>
          <Link
            href="/admission"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-gold-500"
          >
            Элсэлтийн хуудас руу буцах
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 border-t border-border-light pt-4 text-[11px] text-text-muted">
            Алдааны код:{' '}
            <code className="rounded bg-cream-soft px-1.5 py-0.5 font-mono text-text-body">
              {error.digest}
            </code>
          </p>
        )}
      </div>
    </Section>
  );
}
