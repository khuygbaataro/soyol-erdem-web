import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { NewsCard } from '@/components/ui/NewsCard';
import { Badge } from '@/components/ui/Badge';
import { AnnualEventSlideshow } from '@/components/sections/AnnualEventSlideshow';
import { prisma } from '@/lib/prisma';
import { localiseNewsCategory } from '@/lib/admin-helpers';
import { parseGallery } from '@/lib/gallery';
import { getServerLocale } from '@/lib/i18n/server';
import { localisedField } from '@/lib/i18n/db';

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
  // University-side detail page only serves UNIVERSITY-scoped articles. The
  // high-school sub-site has its own /high-school/news/[id] route.
  if (
    !article ||
    article.status !== 'PUBLISHED' ||
    article.site !== 'UNIVERSITY'
  ) {
    notFound();
  }

  // increment views (fire-and-forget)
  prisma.news
    .update({ where: { id: article.id }, data: { views: { increment: 1 } } })
    .catch(() => {});

  const related = await prisma.news.findMany({
    where: {
      status: 'PUBLISHED',
      site: 'UNIVERSITY',
      NOT: { id: article.id },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  const date = (article.publishedAt ?? article.createdAt).toISOString().slice(0, 10);
  const gallery = parseGallery(article.gallery);
  const locale = await getServerLocale();
  const title = localisedField(article, 'title', locale);
  const excerpt = localisedField(article, 'excerpt', locale);
  const body = localisedField(article, 'body', locale);
  const backLabel =
    locale === 'EN'
      ? '← Back to all news'
      : locale === 'JP'
        ? '← ニュース一覧に戻る'
        : '← Бүх мэдээ рүү буцах';
  const relatedHeading =
    locale === 'EN'
      ? 'Related news'
      : locale === 'JP'
        ? '関連ニュース'
        : 'Холбоотой мэдээ';

  return (
    <>
      <Section background="white" spacing="sm">
        <Container className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {date}
            </span>
            <Badge variant="gold">
              {localiseNewsCategory(article.category, locale)}
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
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          )}

          {gallery.length > 0 && (
            <div className="mt-6">
              <AnnualEventSlideshow
                images={gallery}
                label={title}
                aspectClassName="aspect-[16/9]"
              />
            </div>
          )}

          <article className="mt-10 space-y-5 text-base leading-relaxed text-text-body">
            <p className="text-lg font-semibold text-navy-900">{excerpt}</p>
            {body.split('\n\n').map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </article>

          <div className="mt-8 border-t border-border-light pt-6 text-sm text-text-muted">
            <Link href="/news" className="font-semibold text-navy-900 hover:text-gold-500">
              {backLabel}
            </Link>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section background="cream-soft">
          <h2 className="mb-8 text-h3 font-bold text-navy-900">{relatedHeading}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <NewsCard
                key={r.id}
                image={
                  r.coverImage ??
                  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=60'
                }
                date={(r.publishedAt ?? r.createdAt).toISOString().slice(0, 10)}
                category={localiseNewsCategory(r.category, locale)}
                title={localisedField(r, 'title', locale)}
                excerpt={localisedField(r, 'excerpt', locale)}
                body={localisedField(r, 'body', locale)}
                href={`/news/${r.slug}`}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
