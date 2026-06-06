import dynamicImport from 'next/dynamic';
import { notFound } from 'next/navigation';
import { getSiteContentMap } from '@/lib/site-content';

const NewspaperReader = dynamicImport(
  () =>
    import('@/components/sections/NewspaperReader').then(
      (m) => m.NewspaperReader,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center bg-[#f5efe3] text-navy-900">
        <span className="text-sm font-semibold">Ачаалж байна…</span>
      </div>
    ),
  },
);

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Оюутны гарын авлага — Соёл Эрдэм',
};

export default async function StudentHandbookPage() {
  const content = await getSiteContentMap('student-life');
  const pdfUrl = content.get('student-life.handbook.fileUrl') || '';

  if (!pdfUrl) notFound();

  return (
    <NewspaperReader
      pdfUrl={pdfUrl}
      issueNumber={0}
      issueTitle="Оюутны гарын авлага"
      eyebrow="Соёл Эрдэм · Оюутны гарын авлага"
      showIssueNumber={false}
    />
  );
}
