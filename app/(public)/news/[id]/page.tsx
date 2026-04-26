import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { NewsCard } from '@/components/ui/NewsCard';
import { Badge } from '@/components/ui/Badge';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { prisma } from '@/lib/prisma';
import { NEWS_CATEGORY_LABEL } from '@/lib/admin-helpers';

interface PageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps) {
  const n = await prisma.news.findUnique({ where: { slug: params.id } });
  return n
    ? { title: n.title, description: n.excerpt }
    : { title: 'Мэдээ' };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const article = await prisma.news.findUnique({
    where: { slug: params.id },
    include: { author: { select: { name: true } } },
  });
  if (!article || article.status !== 'PUBLISHED') notFound();

  // increment views (fire-and-forget)
  prisma.news
    .update({ where: { id: article.id }, data: { views: { increment: 1 } } })
    .catch(() => {});

  const related = await prisma.news.findMany({
    where: { status: 'PUBLISHED', NOT: { id: article.id } },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  const date = (article.publishedAt ?? article.createdAt).toISOString().slice(0, 10);

  return (
    <>
      <PageHero
        title={article.title}
        breadcrumb={[
          { label: 'Нүүр', href: '/' },
          { label: 'Мэдээ', href: '/news' },
          {
            label:
              article.title.slice(0, 40) + (article.title.length > 40 ? '…' : ''),
          },
        ]}
      />

      <Section background="white" spacing="sm">
        <Container className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {date}
            </span>
            <Badge variant="gold">
              {NEWS_CATEGORY_LABEL[article.category] ?? article.category}
            </Badge>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {article.author.name}
            </span>
          </div>

          {article.coverImage && (
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-image bg-cream-soft">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          )}

          <article className="mt-10 space-y-5 text-base leading-relaxed text-text-body">
            <p className="text-lg font-semibold text-navy-900">{article.excerpt}</p>
            {article.body.split('\n\n').map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </article>

          <div className="mt-8 border-t border-border-light pt-6 text-sm text-text-muted">
            <Link href="/news" className="font-semibold text-navy-900 hover:text-gold-500">
              ← Бүх мэдээ рүү буцах
            </Link>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section background="cream-soft">
          <h2 className="mb-8 text-h3 font-bold text-navy-900">Холбоотой мэдээ</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <NewsCard
                key={r.id}
                image={
                  r.coverImage ??
                  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=60'
                }
                date={(r.publishedAt ?? r.createdAt).toISOString().slice(0, 10)}
                category={NEWS_CATEGORY_LABEL[r.category] ?? r.category}
                title={r.title}
                excerpt={r.excerpt}
                href={`/news/${r.slug}`}
              />
            ))}
          </div>
        </Section>
      )}

      <CtaBanner
        title="Манай сургуулийг сонгож, ирээдүйгээ эндээс эхэл"
        ctaLabel="Элсэх"
        ctaHref="/admission"
      />
    </>
  );
}
