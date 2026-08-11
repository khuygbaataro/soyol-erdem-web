import Link from 'next/link';
import Image from 'next/image';
import {
  Award,
  GraduationCap,
  Handshake,
  Languages,
  Music,
  Phone,
} from 'lucide-react';
import { HighSchoolAdmissionForm } from '@/components/ui/HighSchoolAdmissionForm';
import { HIGH_SCHOOL } from '@/lib/constants';

export const metadata = {
  title: 'Элсэлтийн бүртгэл',
  description:
    'Япон хэлний төрөлжсөн сургалттай Соёл Эрдэм сургуулийн 1–12-р ангийн онлайн элсэлтийн бүртгэл.',
};

/** Сургуулийн хамгийн чухал 4 онцлог — бүртгэл хийхийн өмнө товч танилцуулна. */
const HIGHLIGHTS = [
  {
    icon: Languages,
    title: 'Япон хэл системтэй',
    body: 'Анхан шатнаас ахисан түвшин хүртэл — сонсох, ярих, унших, бичих чадварыг зэрэг хөгжүүлнэ.',
  },
  {
    icon: Award,
    title: 'JLPT-д бэлтгэнэ',
    body: 'Япон хэлний түвшин тогтоох шалгалтад бэлтгэж, япон хэлээр харилцах чадвартай төгсөнө.',
  },
  {
    icon: Handshake,
    title: 'Япон улстай хамтын ажиллагаа',
    body: 'Япон улсын сургуулиудтай хамтран ажиллаж, солилцооны хөтөлбөрт хамрагдах боломжтой.',
  },
  {
    icon: Music,
    title: 'Авьяас хөгжүүлэх дугуйлан',
    body: 'Шатар, морин хуур, ятга, бишгүүр, бүжгийн дугуйланд үнэ төлбөргүй хамрагдана.',
  },
];

/**
 * Тусдаа, богино элсэлтийн бүртгэлийн хуудас — сошиалд шууд тараахад
 * зориулав. Сайтын толгой / хөл хэсэггүй: сургуулийн товч танилцуулга,
 * дараа нь 5 талбартай бүртгэлийн маягт.
 */
export default function HighSchoolBurtgelPage() {
  return (
    <div className="min-h-screen bg-cream-soft">
      {/* Толгой */}
      <header className="border-b border-border-light bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/high-school" className="flex min-w-0 items-center gap-2.5">
            <Image
              src="/logo.png"
              alt={HIGH_SCHOOL.name}
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
            />
            <span className="min-w-0 text-left">
              <span className="block truncate text-sm font-bold leading-tight text-navy-900">
                Соёл Эрдэм
              </span>
              <span className="block truncate text-[11px] font-medium text-text-muted">
                Ерөнхий боловсролын сургууль
              </span>
            </span>
          </Link>
          <a
            href={`tel:${HIGH_SCHOOL.contact.phonePrimary.replace(/[\s-]/g, '')}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-button bg-navy-900 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-800 sm:px-4 sm:text-sm"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{HIGH_SCHOOL.contact.phonePrimary}</span>
            <span className="sm:hidden">Залгах</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Танилцуулга */}
        <section className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-gold-500 sm:text-xs">
            <GraduationCap className="h-4 w-4" />
            2026–2027 оны элсэлт
          </span>
          <h1 className="mt-4 text-2xl font-bold leading-tight text-navy-900 sm:text-3xl md:text-4xl">
            Япон хэлний төрөлжсөн
            <span className="block text-gold-500">Соёл Эрдэм сургууль</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-body sm:text-base">
            Ерөнхий боловсролын хөтөлбөр дээр нэмээд япон хэл, соёлыг
            системтэй эзэмшүүлдэг сургууль. <strong className="font-semibold text-navy-900">1–12-р ангид</strong>{' '}
            элсэлт авч байна.
          </p>
        </section>

        {/* Онцлог */}
        <section className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
          {HIGHLIGHTS.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.title}
                className="flex gap-3 rounded-card border border-border-light bg-white p-4 shadow-card"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/10">
                  <Icon className="h-5 w-5 text-gold-500" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-navy-900">{h.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-text-body">
                    {h.body}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Маягт */}
        <section
          id="burtgel"
          className="mt-8 rounded-card border border-border-light bg-white p-5 shadow-card sm:mt-12 sm:p-8"
        >
          <div className="mb-6 border-b border-border-light pb-5 text-center">
            <h2 className="text-xl font-bold text-navy-900 sm:text-2xl">
              Онлайн бүртгэл
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-body">
              Доорх маягтыг бөглөхөд л хангалттай. Элсэлт хариуцсан ажилтан
              тантай ажлын 1–2 өдрийн дотор утсаар холбогдоно.
            </p>
          </div>

          <HighSchoolAdmissionForm />
        </section>

        {/* Хөл */}
        <footer className="mt-8 flex flex-col items-center gap-2 text-center text-sm text-text-body">
          <p>
            Асуух зүйл байвал{' '}
            <a
              href={`tel:${HIGH_SCHOOL.contact.phonePrimary.replace(/[\s-]/g, '')}`}
              className="font-semibold text-navy-900 hover:text-gold-500"
            >
              {HIGH_SCHOOL.contact.phonePrimary}
            </a>{' '}
            эсвэл{' '}
            <a
              href={`tel:${HIGH_SCHOOL.contact.phoneSecondary.replace(/[\s-]/g, '')}`}
              className="font-semibold text-navy-900 hover:text-gold-500"
            >
              {HIGH_SCHOOL.contact.phoneSecondary}
            </a>
          </p>
          <Link
            href="/high-school"
            className="text-xs font-semibold text-text-muted underline underline-offset-4 hover:text-navy-900"
          >
            Сургуулийн дэлгэрэнгүй танилцуулга →
          </Link>
        </footer>
      </main>
    </div>
  );
}
