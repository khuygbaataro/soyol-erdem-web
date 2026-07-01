import {
  Award,
  CheckCircle,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Users,
  Mountain,
  Compass,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { getSiteContentMap } from '@/lib/site-content';
import { parseGallery } from '@/lib/gallery';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Шилийн булаг — морин жуулчны бааз',
  description:
    'Соёл Эрдэм Дээд Сургуулийн харьяа Шилийн булаг морин жуулчны бааз. УБ-аас 63 км, 35 жилийн туршлага, 130 хүний багтаамж.',
};

/**
 * /shiliin-bulag — Munkhchimeg-ийн хүсэлтээр шинээр нэмсэн жуулчны
 * бааз танилцуулах хуудас. Бүх агуулга (текст, зураг, утас, имэйл)
 * /admin/site-content → "Шилийн булаг" tab-аас засагдана. SiteContent
 * group `shiliin-bulag`, мөрүүдийг scripts/add-shiliin-bulag.ts seed
 * хийдэг.
 *
 * Бүтэц:
 *   1. Hero (баннер + subtitle)
 *   2. Танилцуулга (intro paragraph)
 *   3. 4 онцлог карт (хүчин чадал / аюулгүй / тав тух / оюутны оролцоо)
 *   4. Зургийн цомог (олон зураг, дараалалтай)
 *   5. Үйл ажиллагаа + Морь унах сургалт
 *   6. Холбоо барих хэсэг (утас, имэйл, байршил)
 */
export default async function ShiliinBulagPage() {
  const site = await getSiteContentMap('shiliin-bulag');

  // Hero
  const heroImage = site.get('shiliin-bulag.hero.image') || '/shiliin-bulag/hero.jpg';
  const heroSubtitle = site.get('shiliin-bulag.hero.subtitle') || '';

  // Intro
  const introTitle = site.get('shiliin-bulag.intro.title') || '';
  const introBody = site.get('shiliin-bulag.intro.body') || '';

  // 4 онцлог карт
  const FEATURE_ICONS = [Users, Award, Sparkles, CheckCircle] as const;
  const features = [1, 2, 3, 4]
    .map((i, idx) => ({
      title: site.get(`shiliin-bulag.feature.${i}.title`) || '',
      body: site.get(`shiliin-bulag.feature.${i}.body`) || '',
      Icon: FEATURE_ICONS[idx] ?? Sparkles,
    }))
    .filter((f) => f.title.trim().length > 0);

  // Үйл ажиллагаа
  const activitiesTitle = site.get('shiliin-bulag.activities.title') || '';
  const activities = (site.get('shiliin-bulag.activities.items') || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  // Морь унах
  const horsemanshipTitle = site.get('shiliin-bulag.horsemanship.title') || '';
  const horsemanshipBody = site.get('shiliin-bulag.horsemanship.body') || '';

  // Цомог — олон зурагтай JSON массив key. Админ шинэ "Олон зураг"
  // widget-ээр хараахан хадгалаагүй бол хуучин 6 slot руу fallback хийнэ
  // (self-healing migration хараахан ажиллаагүй үед ч зураг алдагдахгүй).
  const galleryJson = site.get('shiliin-bulag.gallery.images');
  const gallery = galleryJson
    ? parseGallery(galleryJson)
    : [1, 2, 3, 4, 5, 6]
        .map((i) => site.get(`shiliin-bulag.gallery.${i}.image`) || '')
        .filter((url) => url.trim().length > 0);

  // Холбоо барих
  const contactTitle = site.get('shiliin-bulag.contact.title') || 'Холбоо барих';
  const phone1 = site.get('shiliin-bulag.contact.phone1') || '';
  const phone2 = site.get('shiliin-bulag.contact.phone2') || '';
  const email = site.get('shiliin-bulag.contact.email') || '';
  const location = site.get('shiliin-bulag.contact.location') || '';
  const partner = site.get('shiliin-bulag.contact.partner') || '';

  return (
    <>
      <PageHero
        title="ШИЛИЙН БУЛАГ"
        subtitle={heroSubtitle}
        breadcrumb={[
          { label: 'Нүүр', href: '/' },
          { label: 'Шилийн булаг' },
        ]}
        backgroundImage={heroImage}
      />

      {/* Танилцуулга */}
      {(introTitle || introBody) && (
        <Section background="white" spacing="md">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em] text-gold-500 ring-1 ring-gold-500/30">
              <Mountain className="h-3.5 w-3.5" />
              Соёл Эрдэм · Жуулчны бааз
            </span>
            {introTitle && (
              <h2 className="mt-5 font-serif text-2xl font-bold leading-tight text-navy-900 md:text-3xl">
                {introTitle}
              </h2>
            )}
            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-gold-500" />
            {introBody && (
              <p className="mt-5 whitespace-pre-line text-left text-base leading-relaxed text-text-body md:text-[15.5px]">
                {introBody}
              </p>
            )}
          </div>
        </Section>
      )}

      {/* 4 онцлог карт */}
      {features.length > 0 && (
        <Section background="cream-soft" spacing="md">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, idx) => {
              const Icon = f.Icon;
              return (
                <Card
                  key={`${idx}-${f.title.slice(0, 20)}`}
                  className="flex h-full flex-col"
                >
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-gold-400 ring-2 ring-gold-500/30">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-bold text-navy-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-body">
                    {f.body}
                  </p>
                </Card>
              );
            })}
          </div>
        </Section>
      )}

      {/* Зургийн цомог */}
      {gallery.length > 0 && (
        <Section background="white" spacing="md">
          <SectionTitle title="Зургаар үзэх" />
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {gallery.map((url, idx) => (
              <div
                key={`${idx}-${url}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-card bg-cream-soft shadow-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Шилийн булаг ${idx + 1}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Үйл ажиллагаа + Морь унах */}
      {(activities.length > 0 || horsemanshipBody) && (
        <Section background="cream-soft" spacing="md">
          <div className="grid gap-6 lg:grid-cols-2">
            {activities.length > 0 && (
              <article className="rounded-card border border-border-light bg-white p-7 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Compass className="h-5 w-5" />
                  </span>
                  <h2 className="font-serif text-xl font-bold text-navy-900">
                    {activitiesTitle || 'Юу хийж болох вэ?'}
                  </h2>
                </div>
                <div className="mt-4 h-1 w-10 rounded-full bg-gold-500" />
                <ul className="mt-5 space-y-3">
                  {activities.map((a, i) => (
                    <li
                      key={`${i}-${a.slice(0, 20)}`}
                      className="flex items-start gap-3 text-sm leading-relaxed text-text-body"
                    >
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )}

            {horsemanshipBody && (
              <article className="rounded-card border border-border-light bg-white p-7 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <h2 className="font-serif text-xl font-bold text-navy-900">
                    {horsemanshipTitle || 'Морь унах сургалт'}
                  </h2>
                </div>
                <div className="mt-4 h-1 w-10 rounded-full bg-gold-500" />
                <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-text-body">
                  {horsemanshipBody}
                </p>
              </article>
            )}
          </div>
        </Section>
      )}

      {/* Холбоо барих */}
      <Section background="white" spacing="md">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-serif text-2xl font-bold text-navy-900 md:text-3xl">
            {contactTitle}
          </h2>
          <div className="mt-3 h-1 w-12 rounded-full bg-gold-500" />
          {partner && (
            <p className="mt-3 text-sm text-text-muted">
              Хамтрагч: <span className="font-semibold text-navy-900">{partner}</span>
            </p>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {phone1 && (
              <ContactCard
                Icon={Phone}
                label="Утас"
                value={phone1}
                href={`tel:${phone1.replace(/[^+\d]/g, '')}`}
              />
            )}
            {phone2 && (
              <ContactCard
                Icon={Phone}
                label="Утас"
                value={phone2}
                href={`tel:${phone2.replace(/[^+\d]/g, '')}`}
              />
            )}
            {email && (
              <ContactCard
                Icon={Mail}
                label="Имэйл"
                value={email}
                href={`mailto:${email}`}
              />
            )}
            {location && (
              <ContactCard
                Icon={MapPin}
                label="Байршил"
                value={location}
              />
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactCard({
  Icon,
  label,
  value,
  href,
}: {
  Icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="rounded-card border border-border-light bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold-500/50 hover:shadow-card">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            {label}
          </p>
          <p className="mt-1 break-words font-serif text-base font-bold leading-tight text-navy-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} className="block">
        {inner}
      </a>
    );
  }
  return inner;
}
