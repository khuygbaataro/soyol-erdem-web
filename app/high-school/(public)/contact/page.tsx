import { Calendar, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { HIGH_SCHOOL } from '@/lib/constants';
import { getServerLocale } from '@/lib/i18n/server';
import { getSiteContentMap } from '@/lib/site-content';
import { HS_CONTACT_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Ахлах сургуультай холбоо барих',
  description: 'Соёл Эрдэм ахлах сургуулийн утас, и-мэйл, хаяг, ажиллах цаг.',
};

export default async function HighSchoolContactPage() {
  const [locale, site] = await Promise.all([
    getServerLocale(),
    getSiteContentMap('ahlah-contact'),
  ]);
  const c = HS_CONTACT_CONTENT[locale];
  const heroImage = site.get('ahlah-contact.hero.image') || undefined;

  return (
    <>
      <PageHero
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbUniversity, href: '/' },
          { label: c.breadcrumbHs, href: '/high-school' },
          { label: c.breadcrumbThis },
        ]}
        backgroundImage={heroImage}
      />

      <Section background="white" spacing="md">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact details */}
          <div className="space-y-6">
            <SectionTitle title={c.contactsTitle} align="left" />

            <div className="space-y-4">
              <a
                href={`tel:${HIGH_SCHOOL.contact.phonePrimary.replace('-', '')}`}
                className="group flex items-start gap-4 rounded-card border border-border-light bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-500/40 hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    {c.phonePrimaryLabel}
                  </p>
                  <p className="mt-1 font-serif text-xl font-bold text-navy-900 group-hover:text-gold-500">
                    {HIGH_SCHOOL.contact.phonePrimary}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${HIGH_SCHOOL.contact.phoneSecondary.replace('-', '')}`}
                className="group flex items-start gap-4 rounded-card border border-border-light bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-500/40 hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    {c.phoneSecondaryLabel}
                  </p>
                  <p className="mt-1 font-serif text-xl font-bold text-navy-900 group-hover:text-gold-500">
                    {HIGH_SCHOOL.contact.phoneSecondary}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${HIGH_SCHOOL.contact.email}`}
                className="group flex items-start gap-4 rounded-card border border-border-light bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-gold-500/40 hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    {c.emailLabel}
                  </p>
                  <p className="mt-1 break-all font-serif text-xl font-bold text-navy-900 group-hover:text-gold-500">
                    {HIGH_SCHOOL.contact.email}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-card border border-border-light bg-white p-5 shadow-card">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    {c.addressLabel}
                  </p>
                  <p className="mt-1 whitespace-pre-line text-base font-semibold text-navy-900">
                    {c.addressLine}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-card border border-border-light bg-white p-5 shadow-card">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    {c.hoursLabel}
                  </p>
                  <p className="mt-1 text-base font-semibold text-navy-900">
                    {c.hoursValue}
                  </p>
                  <p className="mt-0.5 text-xs text-text-muted">{c.hoursWeekend}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Send-a-message info */}
          <div className="space-y-6">
            <SectionTitle title={c.messageTitle} align="left" />

            <div className="rounded-card border border-border-light bg-white p-7 shadow-card">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Send className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-serif text-xl font-bold text-navy-900">
                {c.messageCardTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-body">
                {c.messageCardBody}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/contact" variant="accent" size="md">
                  {c.messageFormCta}
                </Button>
                <Button
                  href={`mailto:${HIGH_SCHOOL.contact.email}`}
                  variant="outline"
                  size="md"
                >
                  {c.messageEmailCta}
                </Button>
              </div>
            </div>

            <div className="rounded-card border border-border-light bg-cream-soft p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Calendar className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-900">
                {c.admissionPreviewTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                {c.admissionPreviewBody}
              </p>
              <div className="mt-4">
                <Button href="/high-school/admission" variant="primary" size="md">
                  {c.admissionPreviewCta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
