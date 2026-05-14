import Link from 'next/link';
import {
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';
import { Container } from './Container';
import { Logo } from '@/components/icons/Logo';
import { FOOTER_LINKS, SITE } from '@/lib/constants';

const SOCIAL = [
  { icon: Facebook, href: SITE.contact.facebook, label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

/**
 * Site footer. Three columns:
 *   • Brand block — logo, founding tagline, social.
 *   • Чухал холбоос — partner portals (teacher web, student web, moodle)
 *     and admission entry, per Munkhchimeg's spec.
 *   • Холбоо барих — phone / email / address / hours.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-5">
              <Logo withLabel size={56} invert variant="single" />
            </div>
            <p className="text-sm leading-relaxed text-cream/80">
              {SITE.founded} онд байгуулагдсан, Япон улсын 100% хөрөнгө
              оруулалттай дээд боловсролын сургалтын байгууллага.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-gold-500 hover:text-navy-900"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gold-400">
              Чухал холбоос
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.important.map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-cream/80 transition-colors hover:text-gold-400"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/80 transition-colors hover:text-gold-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gold-400">
              Холбоо барих
            </h3>
            <ul className="space-y-3 text-sm text-cream/80">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>
                  {SITE.contact.phone} / {SITE.contact.phoneSecondary}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="break-all transition-colors hover:text-gold-400"
                >
                  {SITE.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{SITE.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-cream/60 md:flex-row">
          <p>
            © {year} {SITE.fullName}. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <Link
            href="/privacy"
            className="transition-colors hover:text-gold-400"
          >
            Нууцлалын бодлого
          </Link>
        </div>
      </Container>
    </footer>
  );
}
