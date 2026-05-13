import {
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { HIGH_SCHOOL } from '@/lib/constants';

export const metadata = {
  title: 'Ахлах сургуультай холбоо барих',
  description:
    'Соёл Эрдэм ахлах сургуулийн утас, и-мэйл, хаяг, ажиллах цаг.',
};

export default function HighSchoolContactPage() {
  return (
    <>
      <PageHero
        title="ХОЛБОО БАРИХ"
        subtitle="Лавлах, элсэлт, хамтын ажиллагааны санал — бидэнтэй чөлөөтэй холбоо барина уу."
        breadcrumb={[
          { label: 'Их сургууль', href: '/' },
          { label: 'Ахлах сургууль', href: '/high-school' },
          { label: 'Холбоо барих' },
        ]}
      />

      <Section background="white" spacing="md">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact details */}
          <div className="space-y-6">
            <SectionTitle title="ТАНТАЙ ХОЛБОГДОХ" align="left" />

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
                    Утас (Сургуулийн дугаар)
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
                    Утас (Гар утас)
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
                    И-мэйл
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
                    Хаяг
                  </p>
                  <p className="mt-1 text-base font-semibold text-navy-900">
                    Улаанбаатар хот, Сүхбаатар дүүрэг,
                    <br />
                    1-р хороо, Олимпийн гудамж
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-card border border-border-light bg-white p-5 shadow-card">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    Ажиллах цаг
                  </p>
                  <p className="mt-1 text-base font-semibold text-navy-900">
                    Даваа–Баасан, 08:00–17:00
                  </p>
                  <p className="mt-0.5 text-xs text-text-muted">
                    Бямба, Ням — амрах өдөр
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Send-a-message info */}
          <div className="space-y-6">
            <SectionTitle title="МЭДЭЭЛЭЛ ИЛГЭЭХ" align="left" />

            <div className="rounded-card bg-gradient-to-br from-navy-900 via-[#243454] to-[#1c2745] p-8 text-white">
              <Send className="h-8 w-8 text-gold-400" />
              <h3 className="mt-4 font-serif text-xl font-bold">
                Хамтын ажиллагаа, элсэлт, лавлах
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/85">
                Их сургуультай хамтран ажилладаг ерөнхий лавлах формыг
                ашиглан санал хүсэлтээ илгээж болно. Тус формыг хариуцсан
                ажилтан тантай 24 цагийн дотор холбоо барина.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/contact" variant="accent" size="md">
                  Лавлах форм
                </Button>
                <Button
                  href={`mailto:${HIGH_SCHOOL.contact.email}`}
                  variant="outline"
                  size="md"
                  className="border-white/40 text-white hover:bg-white/10 hover:text-white"
                >
                  Шууд и-мэйл
                </Button>
              </div>
            </div>

            <div className="rounded-card border border-border-light bg-cream-soft p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Calendar className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-900">
                Элсэлтийн бэлтгэлийн тойм
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-body">
                2026-2027 оны хичээлийн жилийн элсэлт нээлттэй. Шаардлага,
                бүрдүүлэх материал, хугацааны мэдээллийг элсэлтийн хуудаснаас
                үзнэ үү.
              </p>
              <div className="mt-4">
                <Button
                  href="/high-school/admission"
                  variant="primary"
                  size="md"
                >
                  Элсэлтийн мэдээлэл
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
