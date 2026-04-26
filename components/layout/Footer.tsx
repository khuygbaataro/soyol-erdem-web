import Link from 'next/link';
import {
  Clock,
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
 * Site footer with brand block, link columns, contact info and legal row.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5">
              <Logo withLabel size={56} invert />
            </div>
            <p className="text-sm leading-relaxed text-cream/80">
              Япон улсын хөрөнгө оруулалттай дээд сургууль. {SITE.founded} оноос хойш
              Монголд тэргүүлэгч япон судлалын төв.
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
              Холбоо
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/80 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gold-400">
              Тусламж
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/80 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{SITE.workingHours}</span>
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
