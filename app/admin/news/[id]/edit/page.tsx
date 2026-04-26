import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/admin/PageHeader';
import { NewsForm } from '@/components/admin/NewsForm';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';

export default async function EditNewsPage({ params }: PageProps) {
  const news = await prisma.news.findUnique({ where: { id: params.id } });
  if (!news) notFound();

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
          category: news.category,
          status: news.status,
          publishedAt: news.publishedAt?.toISOString() ?? null,
        }}
      />
    </>
  );
}
