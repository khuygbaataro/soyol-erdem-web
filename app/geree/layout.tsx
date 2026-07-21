import Link from 'next/link';
import Image from 'next/image';
import { Toaster } from 'sonner';
import { SITE } from '@/lib/constants';

export const metadata = {
  title: 'Оюутны суралцах гэрээ',
  robots: { index: false, follow: false },
};

/**
 * Онлайн гэрээ / гарын үсэг зурах хэсгийн бие даасан layout. Нийтийн
 * сайтын толгой/хөл хэсгийг оруулахгүй — гэрээнд анхаарлаа төвлөрүүлж,
 * хэвлэх/PDF болгоход цэвэрхэн гарна.
 */
export default function GereeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-soft">
      {/* Print-д нуугдах толгой */}
      <header className="no-print border-b border-border-light bg-white">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt={SITE.name} width={36} height={36} className="h-9 w-9 object-contain" />
            <span className="text-sm font-bold text-navy-900">{SITE.fullName}</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>

      <Toaster richColors position="top-right" />

      {/* Хэвлэх / PDF болгох үеийн стиль */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              .no-print { display: none !important; }
              body { background: #fff !important; }
              main { max-width: none !important; padding: 0 !important; }
              .contract-doc {
                box-shadow: none !important;
                border: none !important;
                max-width: none !important;
                padding: 0 !important;
                font-size: 11px !important;
              }
              @page { size: A4; margin: 14mm; }
            }
          `,
        }}
      />
    </div>
  );
}
