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
import { FOOTER_LINKS, HIGH_SCHOOL, SITE } from '@/lib/constants';
import { getServerTranslator } from '@/lib/i18n/server';

const SOCIAL = [
  { icon: Facebook, href: SITE.contact.facebook, label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

interface FooterProps {
  /**
   * Which sub-site's brand block to render. The high-school footer swaps
   * the crest image + label to the dedicated ahlal-logo-new asset.
   * Default: 'university'.
   */
  variant?: 'university' | 'high-school';
  /**
   * Admin-editable overrides for the contact block + tagline. Layouts
   * pre-fetch these from site-content and pass them through so the
   * Footer itself stays a synchronous server component.
   */
  overrides?: {
    tagline?: string;
    phonePrimary?: string;
    phoneSecondary?: string;
    email?: string;
    address?: string;
  };
}

/**
 * Site footer. Three columns:
 *   • Brand block — logo, founding tagline, social.
 *   • Чухал холбоос — partner portals (teacher web, student web, moodle)
 *     and admission entry, per Munkhchimeg's spec.
 *   • Холбоо барих — phone / email / address / hours.
 */
export async function Footer({
  variant = 'university',
  overrides = {},
}: FooterProps = {}) {
  const t = await getServerTranslator();
  const year = new Date().getFullYear();
  const isHighSchool = variant === 'high-school';

  // Sub-site-aware contact block + copyright. Each branch sources its
  // own phone/email/address from the matching constants object so the
  // high-school footer doesn't accidentally inherit the main-university
  // contact info. Admin overrides (when present) take precedence so
  // editors can change the values from /high-school/admin/site-content.
  const phonePrimary =
    overrides.phonePrimary ||
    (isHighSchool ? HIGH_SCHOOL.contact.phonePrimary : SITE.contact.phone);
  const phoneSecondary =
    overrides.phoneSecondary ||
    (isHighSchool
      ? HIGH_SCHOOL.contact.phoneSecondary
      : SITE.contact.phoneSecondary);
  const contactPhone = `${phonePrimary} / ${phoneSecondary}`;
  const contactEmail =
    overrides.email ||
    (isHighSchool ? HIGH_SCHOOL.contact.email : SITE.contact.email);
  // Admin-supplied overrides win. Otherwise the contact address and
  // tagline read from the locale-aware MESSAGES bundle so EN / JP
  // visitors see a translated value, not the literal Mongolian
  // constant. (HighSchool layouts pass `overrides.address` when admin
  // has filled the SiteContent EN/JP slot; if those slots are empty
  // the override resolves to '' and we fall through here.)
  const contactAddress =
    overrides.address ||
    t(
      isHighSchool
        ? 'footer.address.highSchool'
        : 'footer.address.university',
    );
  const tagline =
    overrides.tagline ||
    t(
      isHighSchool
        ? 'footer.tagline.highSchool'
        : 'footer.tagline.university',
    );
  const copyrightName = isHighSchool ? HIGH_SCHOOL.name : SITE.fullName;

  return (
    <footer className="bg-navy-900 text-white">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-5">
              <Logo
                withLabel
                size={56}
                invert
                variant="single"
                src={isHighSchool ? '/ahlal-logo-new.png' : '/logo.png'}
                alt={t(
                  isHighSchool
                    ? 'brand.highSchoolLogoAlt'
                    : 'brand.universityLogoAlt',
                )}
                label={t('brand.short')}
              />
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-cream/80">
              {tagline}
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
              {t('footer.importantLinks')}
            </h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.important
                .filter(
                  // High-school footer hides the teacher / student web
                  // portals — those belong to the main university only.
                  (link) =>
                    !isHighSchool ||
                    (link.labelKey !== 'footer.link.teacherWeb' &&
                      link.labelKey !== 'footer.link.studentWeb'),
                )
                .map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-cream/80 transition-colors hover:text-gold-400"
                    >
                      {t(link.labelKey)}
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/80 transition-colors hover:text-gold-400"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gold-400">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3 text-sm text-cream/80">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{contactPhone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="break-all transition-colors hover:text-gold-400"
                >
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span className="whitespace-pre-line">{contactAddress}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-cream/60 md:flex-row">
          <p>
            © {year} {copyrightName}. {t('footer.copyright')}
          </p>
          <Link
            href="/privacy"
            className="transition-colors hover:text-gold-400"
          >
            {t('footer.privacy')}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
