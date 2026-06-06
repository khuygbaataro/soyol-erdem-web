import { Check, Download, FileText, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ResearchJournalsList } from '@/components/sections/ResearchJournalsList';
import { getSiteContentMap } from '@/lib/site-content';
import { prisma } from '@/lib/prisma';
import { localiseResearchType } from '@/lib/admin-helpers';
import { RESEARCH_AREAS, RESEARCH_DEPARTMENTS } from '@/lib/content';
import { RESEARCH_JOURNALS } from '@/lib/research-journals';
import { getServerLocale } from '@/lib/i18n/server';
import { RESEARCH_CONTENT } from '@/lib/i18n/content';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Эрдэм шинжилгээ',
};

export default async function ResearchPage() {
  const [banners, researchContent, researchItems, locale] = await Promise.all([
    getSiteContentMap('banners'),
    getSiteContentMap('research'),
    prisma.research
      .findMany({
        where: { status: 'PUBLISHED' },
        orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
        take: 9,
      })
      .catch(() => []),
    getServerLocale(),
  ]);

  const c = RESEARCH_CONTENT[locale];

  const get = (key: string, fallback: string) =>
    researchContent.get(key) || fallback;

  const banner =
    banners.get('page.research.banner') || '/erdem_shinjilgee_banner.png';

  // Hero + intro — DB overrides fallback to translation bundle.
  const heroTitle    = get('research.hero.title',    c.heroTitle);
  const heroSubtitle = get('research.hero.subtitle', c.heroSubtitle);
  const intro        = get('research.intro',         c.intro);

  // Areas section titles.
  const areasTitle    = get('research.areas.title',    c.areasTitle);
  const areasSubtitle = get('research.areas.subtitle', c.areasSubtitle);

  // Areas — DB title/description take priority; icons stay static.
  const areas = RESEARCH_AREAS.map((a, idx) => ({
    icon: a.icon,
    title:       get(`research.area.${idx + 1}.title`,       c.areas[idx]?.title ?? a.title),
    description: get(`research.area.${idx + 1}.description`, c.areas[idx]?.description ?? a.description),
  }));

  // Departments section titles.
  const departmentsTitle    = get('research.departments.title',    c.departmentsTitle);
  const departmentsSubtitle = get('research.departments.subtitle', c.departmentsSubtitle);

  // Department titles + topic lists.
  const departments = [1, 2, 3].map((i) => {
    const adminTitle  = researchContent.get(`research.dept.${i}.title`)  || '';
    const adminTopics = researchContent.get(`research.dept.${i}.topics`) || '';
    const title = adminTitle || c.departments[i - 1]?.title || RESEARCH_DEPARTMENTS[i - 1]?.title || '';
    const topics: string[] = adminTopics
      ? adminTopics.split('\n').map((t) => t.trim()).filter(Boolean)
      : c.departments[i - 1]?.topics ?? RESEARCH_DEPARTMENTS[i - 1]?.topics ?? [];
    return { title, topics };
  });

  // Highlights section titles.
  const highlightsTitle    = get('research.highlights.title',    c.highlightsTitle);
  const highlightsSubtitle = get('research.highlights.subtitle', c.highlightsSubtitle);

  const highlights = [1, 2, 3].map((i) => {
    const admin = researchContent.get(`research.highlight.${i}`) || '';
    return admin || c.highlights[i - 1] || '';
  });

  // Feed section titles.
  const feedTitle    = get('research.feed.title',    c.feedTitle);
  const feedSubtitle = get('research.feed.subtitle', c.feedSubtitle);

  // Journal covers — language-agnostic image uploads.
  const journalCovers = new Map(
    RESEARCH_JOURNALS.map((j) => [
      j.id,
      researchContent.get(`research.journal.${j.id}.cover`) || j.cover || null,
    ]),
  );

  // Journal section titles.
  const journalsTitle    = get('research.journals.title',    c.journalsTitle);
  const journalsSubtitle = get('research.journals.subtitle', c.journalsSubtitle);

  // Date formatter aligned to the current locale.
  const dateLocale = locale === 'EN' ? 'en-US' : locale === 'JP' ? 'ja-JP' : 'mn-MN';

  return (
    <>
      <PageHero
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumb={[
          { label: c.breadcrumbHome, href: '/' },
          { label: c.breadcrumbThis },
        ]}
        backgroundImage={banner}
      />

      {/* Intro */}
      <Section background="white" spacing="sm">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-text-body">{intro}</p>
        </div>
      </Section>

      {/* Top-level priorities — 3 headline cards */}
      <Section background="cream-soft">
        <SectionTitle title={areasTitle} subtitle={areasSubtitle} />
        <div className="grid gap-6 md:grid-cols-3">
          {areas.map((a) => {
            const Icon = a.icon;
            return (
              <Card key={a.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold leading-snug text-navy-900">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {a.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Per-department research focus — 3 columns of bulleted lists */}
      <Section background="white">
        <SectionTitle
          title={departmentsTitle}
          subtitle={departmentsSubtitle}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments
            .filter((d) => d.title || d.topics.length > 0)
            .map((d, idx) => (
              <article
                key={`${d.title}-${idx}`}
                className="flex h-full flex-col rounded-card border border-border-light bg-white p-6 shadow-card"
              >
                <h3 className="mb-4 border-b border-gold-500/40 pb-3 text-sm font-bold uppercase tracking-wider text-navy-900">
                  {d.title}
                </h3>
                <ul className="space-y-2.5">
                  {d.topics.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-2 text-sm text-text-body"
                    >
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
        </div>
      </Section>

      {/* Highlights — research-professor teams + CISCO + Moodle */}
      <Section background="cream-soft">
        <SectionTitle
          title={highlightsTitle}
          subtitle={highlightsSubtitle}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {highlights
            .filter((h) => h.trim().length > 0)
            .map((h, idx) => (
              <Card key={`${h.slice(0, 30)}-${idx}`} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <Sparkles className="h-5 w-5" />
                </span>
                <p className="whitespace-pre-line text-sm leading-relaxed text-text-body">
                  {h}
                </p>
              </Card>
            ))}
        </div>
      </Section>

      {/* Research items feed — admin-managed via /admin/research. Sits
          between Онцлох үйл ажиллагаа and Эрдэм шинжилгээний сэтгүүл so
          new publications + announcements land here automatically. */}
      {researchItems.length > 0 && (
        <Section background="white">
          <SectionTitle title={feedTitle} subtitle={feedSubtitle} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {researchItems.map((r) => (
              <Card key={r.id} className="flex h-full flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="navy">
                    {localiseResearchType(r.type, locale)}
                  </Badge>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-500">
                    {r.area}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-lg font-bold leading-snug text-navy-900">
                  {r.title}
                </h3>
                <p className="mt-2 text-xs text-text-muted">{r.authors}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-body line-clamp-4">
                  {r.abstract}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border-light pt-4">
                  <span className="text-xs text-text-muted">
                    {r.publishedAt
                      ? new Date(r.publishedAt).toLocaleDateString(dateLocale, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : ''}
                  </span>
                  {r.fileUrl ? (
                    <a
                      href={r.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 transition-colors hover:text-gold-500"
                    >
                      <Download className="h-3.5 w-3.5" />
                      {c.download}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                      <FileText className="h-3.5 w-3.5" />
                      {c.publishing}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Journals */}
      <Section background="white">
        <SectionTitle title={journalsTitle} subtitle={journalsSubtitle} />
        <ResearchJournalsList journals={RESEARCH_JOURNALS} covers={journalCovers} />
      </Section>
    </>
  );
}
