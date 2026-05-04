import { notFound, redirect } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { NewsForm } from '@/components/admin/NewsForm';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Мэдээ засах' };

export default async function EditHighSchoolAdminNewsPage({ params }: PageProps) {
  const news = await prisma.news.findUnique({ where: { id: params.id } });
  if (!news) notFound();

  // Editors signed in to the high-school admin should never end up
  // editing university content. Bounce them to the main admin (which
  // they may or may not be allowed into, but their auth cookie is
  // shared so any role-gated action will still respect the role).
  if (news.site !== 'HIGH_SCHOOL') {
    redirect(`/admin/news/${news.id}/edit`);
  }

  return (
    <>
      <PageHeader
        title="Мэдээ засах"
        subtitle={news.title}
        breadcrumb={[
          { label: 'Самбар', href: '/high-school/admin/dashboard' },
          { label: 'Мэдээ', href: '/high-school/admin/news' },
          { label: 'Засах' },
        ]}
      />
      <NewsForm
        mode="edit"
        site="HIGH_SCHOOL"
        listPath="/high-school/admin/news"
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
