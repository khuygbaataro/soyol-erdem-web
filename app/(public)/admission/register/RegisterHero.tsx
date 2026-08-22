import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Phone } from 'lucide-react';
import { SITE } from '@/lib/constants';

const YEARS = new Date().getFullYear() - SITE.founded;

/**
 * Зөвхөн /admission/register хуудсанд зориулсан hero.
 *
 * Нийтийн `PageHero` нь стоק зураган дээр гарчгаа тавьдаг тул жижиг
 * дэлгэцэн дээр текст уншихад хүндрэлтэй байсан. Энд зургийг бүрэн
 * орлуулж, брэндийн navy дэвсгэр дээр сургуулийн тамгыг усан тэмдэг
 * болгон ашиглав — гарчиг ямар ч дэлгэцэн дээр цэвэр уншигдана.
 *
 * Мобайл: нэг баганаар — тамга бүдэг дэвсгэр, доор нь залгах карт.
 * Компьютер: хоёр багана — зүүнд гарчиг, баруунд тамга + итгэл төрүүлэх
 * мэдээлэл (33 жил, япон соёл, утас).
 */
export function RegisterHero({
  title,
  subtitle,
  breadcrumbHome,
  breadcrumbAdmission,
  breadcrumbThis,
}: {
  title: string;
  subtitle: string;
  breadcrumbHome: string;
  breadcrumbAdmission: string;
  breadcrumbThis: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      {/* Гүн, зөөлөн градиент — хавтгай өнгийг амьдруулна */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_15%_0%,rgba(61,90,126,0.55)_0%,rgba(30,58,95,0)_60%)]"
      />
      {/* Тамга — усан тэмдэг */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 opacity-[0.07] lg:block"
      >
        <Image src="/logo.png" alt="" fill className="object-contain" sizes="420px" />
      </div>

      <div className="relative mx-auto max-w-container px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        {/* Мөр — компьютер дээр 2 багана */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* Зүүн: гарчиг */}
          <div className="min-w-0">
            {/* Breadcrumb */}
            <nav
              aria-label="breadcrumb"
              className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/55"
            >
              <Link href="/" className="transition-colors hover:text-white">
                {breadcrumbHome}
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <Link href="/admission" className="transition-colors hover:text-white">
                {breadcrumbAdmission}
              </Link>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="font-semibold text-gold-400">{breadcrumbThis}</span>
            </nav>

            {/* Улирлын тэмдэг */}
            <span className="mt-5 inline-flex items-center rounded-full border border-gold-500/50 bg-gold-500/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-400 sm:text-[11px]">
              2026–2027 оны элсэлт
            </span>

            {/* Гарчиг */}
            <h1 className="mt-4 font-display text-[26px] font-extrabold uppercase leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            {/* Алтан зураас */}
            <span className="mt-4 block h-[3px] w-16 rounded-full bg-gold-500 sm:w-20" />

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              {subtitle}
            </p>
          </div>

          {/* Баруун: итгэл төрүүлэх хэсэг — компьютер */}
          <div className="hidden shrink-0 text-center lg:block">
            <div className="relative mx-auto h-36 w-36 xl:h-44 xl:w-44">
              <Image
                src="/logo.png"
                alt={SITE.fullName}
                fill
                className="object-contain drop-shadow-lg"
                sizes="176px"
              />
            </div>
            <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">
              {SITE.founded} оноос хойш · {YEARS} жил
            </p>
            <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-white/70">
              Япон, Монголын соёлтой дээд сургууль
            </p>
            <div className="mt-5 border-t border-white/15 pt-4">
              <p className="text-[11px] uppercase tracking-widest text-white/45">
                Асуулт байвал
              </p>
              <a
                href={`tel:${SITE.contact.phone.replace(/[\s-]/g, '')}`}
                className="mt-1 inline-block text-lg font-bold text-white transition-colors hover:text-gold-400"
              >
                {SITE.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Гар утас: тусламжийн зурвас — hero-гийн доор наалдсан цагаан карт */}
      <div className="relative border-t border-white/10 bg-white lg:hidden">
        <div className="mx-auto flex max-w-container items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
              Тусламж хэрэгтэй юу?
            </p>
            <p className="truncate text-base font-bold text-navy-900">
              {SITE.contact.phone}
            </p>
          </div>
          <a
            href={`tel:${SITE.contact.phone.replace(/[\s-]/g, '')}`}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-button border-2 border-navy-900 px-4 text-sm font-bold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white"
          >
            <Phone className="h-4 w-4" />
            Залгах
          </a>
        </div>
      </div>

      {/* Гар утас: итгэлийн зурвас */}
      <div className="relative bg-cream lg:hidden">
        <div className="mx-auto flex max-w-container flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2.5 text-[11px] sm:px-6">
          <span className="font-bold uppercase tracking-wider text-navy-900">
            {SITE.founded} оноос хойш · {YEARS} жил
          </span>
          <span className="text-gold-500">•</span>
          <span className="text-text-body">Япон, Монголын соёлтой</span>
        </div>
      </div>
    </section>
  );
}
