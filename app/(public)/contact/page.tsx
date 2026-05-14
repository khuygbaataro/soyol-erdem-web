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
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/ui/ContactForm';
import { CONTACT_INFO } from '@/lib/content';

export const metadata = {
  title: 'Холбоо барих',
};

const SOCIAL = [
  { icon: Facebook, label: 'Facebook', href: CONTACT_INFO.facebook },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

export default function ContactPage() {
  return (
    <>
      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
          {/* Contact info */}
          <div>
            <h2 className="text-h2 font-bold text-navy-900">
              Бидэнтэй холбогдоорой
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-gold-500" />

            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Хаяг
                  </p>
                  <p className="mt-1 text-text-body">{CONTACT_INFO.addressFull}</p>
                </div>
              </li>
              {CONTACT_INFO.phones.map((p) => (
                <li key={p.number} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      {p.type}
                    </p>
                    <a
                      href={`tel:${p.number.replace('-', '')}`}
                      className="mt-1 block text-base font-semibold text-navy-900 hover:text-gold-500"
                    >
                      {p.number}
                    </a>
                  </div>
                </li>
              ))}
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    И-мэйл
                  </p>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="mt-1 block break-all text-text-body hover:text-gold-500"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Цагийн хуваарь
                  </p>
                  <p className="mt-1 text-text-body">{CONTACT_INFO.weekdays}</p>
                  <p className="text-text-muted">{CONTACT_INFO.weekend}</p>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light bg-white text-navy-900 transition-colors hover:border-gold-500 hover:bg-gold-500 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="p-8" hover={false}>
            <h2 className="text-h3 font-bold text-navy-900">Зурвас илгээх</h2>
            <p className="mt-2 text-sm text-text-muted">
              Бид ажлын 1-2 өдрийн дотор хариу барина.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Card>
        </div>
      </Section>

      {/* Map */}
      <Section background="cream-soft" spacing="sm">
        <div className="aspect-[16/7] w-full overflow-hidden rounded-image border border-border-light bg-white">
          {/* TODO: replace with real Google Maps API key */}
          <iframe
            src={CONTACT_INFO.mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Соёл Эрдэм газрын зураг"
          />
        </div>
      </Section>
    </>
  );
}
