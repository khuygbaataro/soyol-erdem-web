import { notFound, redirect } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { NewsForm } from '@/components/admin/NewsForm';
import { prisma } from '@/lib/prisma';
import { parseGallery } from '@/lib/news-gallery';

interface PageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';

export default async function EditNewsPage({ params }: PageProps) {
  const news = await prisma.news.findUnique({ where: { id: params.id } });
  if (!news) notFound();

  // High-school articles are managed in the standalone /high-school/admin
  // shell. If someone lands here with an HS article id (an old bookmark,
  // a stale link), bounce them to the right editor.
  if (news.site === 'HIGH_SCHOOL') {
    redirect(`/high-school/admin/news/${news.id}/edit`);
  }

  return (
    <>
      <PageHeader
        title="Мэдээ засах"
        subtitle={news.title}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Мэдээ', href: '/admin/news' },
          { label: 'Засах' },
        ]}
      />
      <NewsForm
        mode="edit"
        initial={{
          id: news.id,
          title: news.title,
          slug: news.slug,
          excerpt: news.excerpt,
          body: news.body,
          coverImage: news.coverImage,
          gallery: parseGallery(news.gallery),
          category: news.category,
          status: news.status,
          site: news.site,
          publishedAt: news.publishedAt?.toISOString() ?? null,
        }}
      />
    </>
  );
}
