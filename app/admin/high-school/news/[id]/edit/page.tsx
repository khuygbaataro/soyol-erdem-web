import { notFound, redirect } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { NewsForm } from '@/components/admin/NewsForm';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Ахлах сургууль · Мэдээ засах' };

export default async function EditHighSchoolNewsPage({ params }: PageProps) {
  const news = await prisma.news.findUnique({ where: { id: params.id } });
  if (!news) notFound();

  // Guard: editing university news from the high-school admin should send
  // the editor to the right list so they don't lose their bearings.
  if (news.site !== 'HIGH_SCHOOL') {
    redirect(`/admin/news/${news.id}/edit`);
  }

  return (
    <>
      <PageHeader
        title="Мэдээ засах"
        subtitle={news.title}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Ахлах сургууль', href: '/admin/high-school' },
          { label: 'Мэдээ', href: '/admin/high-school/news' },
          { label: 'Засах' },
        ]}
      />
      <NewsForm
        mode="edit"
        site="HIGH_SCHOOL"
        initial={{
          id: news.id,
          title: news.title,
          slug: news.slug,
          excerpt: news.excerpt,
          body: news.body,
          coverImage: news.coverImage,
          category: news.category,
          status: news.status,
          site: news.site,
          publishedAt: news.publishedAt?.toISOString() ?? null,
        }}
      />
    </>
  );
}
