import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, Phone } from 'lucide-react';
import { HighSchoolAdmissionForm } from '@/components/ui/HighSchoolAdmissionForm';
import { HIGH_SCHOOL } from '@/lib/constants';

export const metadata = {
  title: 'Элсэлтийн бүртгэл',
  description:
    'Нийслэлийн Ерөнхий боловсролын Соёл Эрдэм сургуулийн онлайн элсэлтийн бүртгэл.',
};

/**
 * Тусдаа, богино элсэлтийн бүртгэлийн хуудас — сошиалд шууд тараахад
 * зориулав. Сайтын толгой / хөл хэсэггүй, зөвхөн бүртгэлийн маягт
 * харагдана: сурагчийн нэр, орох анги, эцэг эхийн нэр, утас, и-мэйл.
 */
export default function HighSchoolBurtgelPage() {
  return (
    <div className="min-h-screen bg-cream-soft py-8">
      <div className="mx-auto w-full max-w-2xl px-4">
        {/* Толгой */}
        <div className="mb-6 text-center">
          <Link href="/high-school" className="inline-flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={HIGH_SCHOOL.name}
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="text-left text-sm font-bold leading-tight text-navy-900">
              Соёл Эрдэм
              <span className="block text-xs font-semibold text-text-muted">
                Ерөнхий боловсролын сургууль
              </span>
            </span>
          </Link>
        </div>

        {/* Маягт */}
        <div className="rounded-card border border-border-light bg-white p-6 shadow-card sm:p-8">
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-500">
              <GraduationCap className="h-4 w-4" />
              Онлайн бүртгэл
            </span>
            <h1 className="mt-3 text-2xl font-bold text-navy-900">
              Элсэлтийн бүртгэл
            </h1>
            <p className="mt-2 text-sm text-text-body">
              Доорх маягтыг бөглөнө үү. Хариуцсан ажилтан тантай удахгүй
              холбогдоно.
            </p>
          </div>

          <HighSchoolAdmissionForm />
        </div>

        {/* Холбоо барих */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-text-body">
          <a
            href={`tel:${HIGH_SCHOOL.contact.phonePrimary.replace(/[\s-]/g, '')}`}
            className="inline-flex items-center gap-1.5 font-semibold text-navy-900 hover:text-gold-500"
          >
            <Phone className="h-4 w-4 text-gold-500" />
            {HIGH_SCHOOL.contact.phonePrimary}
          </a>
          <Link href="/high-school" className="hover:text-navy-900">
            Сургуулийн тухай →
          </Link>
        </div>
      </div>
    </div>
  );
}
