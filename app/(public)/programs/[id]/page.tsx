import { notFound } from 'next/navigation';
import { Check, ChevronRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { prisma } from '@/lib/prisma';
import { resolveIcon } from '@/lib/icon-map';
import { getServerLocale } from '@/lib/i18n/server';
import { localisedField } from '@/lib/i18n/db';

interface PageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps) {
  const program = await prisma.program.findUnique({ where: { slug: params.id } });
  return program
    ? { title: program.name, description: program.shortDescription }
    : { title: 'Мэргэжил' };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const program = await prisma.program.findUnique({ where: { slug: params.id } });
  if (!program || !program.active) notFound();

  const Icon = resolveIcon(program.icon);
  const locale = await getServerLocale();
  const name = localisedField(program, 'name', locale);
  const fullDescription = localisedField(program, 'fullDescription', locale);
  const skillsRaw = localisedField(program, 'skills', locale);
  const skills = skillsRaw.split('\n').map((s) => s.trim()).filter(Boolean);
  const careerOutlook = localisedField(program, 'careerOutlook', locale);

  // i18n labels for section headings + sidebar.
  const labels =
    locale === 'EN'
      ? {
          objective: 'Program objective',
          skills: 'What you\'ll learn',
          curriculum: 'Curriculum',
          curriculumEmpty: 'Detailed course list coming soon.',
          career: 'Career outlook',
          careerEmpty:
            'Our graduates work in Japanese and Mongolian IT, business, translation, education, and tourism. About 40% of alumni go on to study or work in Japan.',
          highlight: 'At a glance',
          duration: 'Duration',
          degree: 'Degree',
          language: 'Medium of instruction',
          admissionScore: 'Admission score',
          applyCta: 'Apply',
          contactCta: 'Contact',
          indexLabel: 'Code',
        }
      : locale === 'JP'
        ? {
            objective: 'プログラムの目標',
            skills: '身につく能力',
            curriculum: 'カリキュラム',
            curriculumEmpty: '詳細な授業一覧は近日公開予定です。',
            career: '進路・キャリア',
            careerEmpty:
              '本学の卒業生は日本・モンゴルのIT、ビジネス、通訳、教育、観光業界で活躍しています。卒業生の約40%が日本で学び・働いています。',
            highlight: '概要',
            duration: '期間',
            degree: '学位',
            language: '使用言語',
            admissionScore: '入学基準点',
            applyCta: '出願する',
            contactCta: 'お問い合わせ',
            indexLabel: 'コード',
          }
        : {
            objective: 'Хөтөлбөрийн зорилго',
            skills: 'Олгох чадвар',
            curriculum: 'Хичээлийн хөтөлбөр',
            curriculumEmpty: 'Дэлгэрэнгүй курсын жагсаалт удахгүй нийтлэгдэнэ.',
            career: 'Ажлын боломж',
            careerEmpty:
              'Манай төгсөгчид Япон болон Монголын IT, бизнес, орчуулга, боловсрол, аялал жуулчлалын салбарт амжилттай ажиллаж байна. Төгсөгчдийн 40% Япон улсад суралцаж, ажиллаж байна.',
            highlight: 'Онцлох зүйл',
            duration: 'Хугацаа',
            degree: 'Зэрэг',
            language: 'Сургалтын хэл',
            admissionScore: 'Элсэлтийн оноо',
            applyCta: 'Элсэх',
            contactCta: 'Холбоо барих',
            indexLabel: 'Индекс',
          };

  return (
    <>
      <Section background="white">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/10 text-gold-500">
                <Icon className="h-6 w-6" />
              </span>
              <Badge variant="cream">{program.degree}</Badge>
              <Badge variant="outline">{program.duration}</Badge>
              {program.code && (
                <Badge variant="navy">
                  {labels.indexLabel}: {program.code}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold text-navy-900">{name}</h1>

            <h2 className="mt-8 text-2xl font-bold text-navy-900">{labels.objective}</h2>
            <p className="mt-3 text-base leading-relaxed text-text-body">
              {fullDescription}
            </p>

            {skills.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-navy-900">{labels.skills}</h2>
                <ul className="mt-4 space-y-3">
                  {skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-3 text-text-body">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {program.curriculum ? (
              <>
                <h2 className="mt-10 text-2xl font-bold text-navy-900">{labels.curriculum}</h2>
                <p className="mt-3 whitespace-pre-line text-sm text-text-body">{program.curriculum}</p>
              </>
            ) : (
              <>
                <h2 className="mt-10 text-2xl font-bold text-navy-900">{labels.curriculum}</h2>
                <p className="mt-3 text-sm text-text-muted">{labels.curriculumEmpty}</p>
              </>
            )}

            <h2 className="mt-10 text-2xl font-bold text-navy-900">{labels.career}</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text-body">
              {careerOutlook || labels.careerEmpty}
            </p>
          </div>

          <aside>
            <div className="sticky top-28">
              <Card hover={false}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-500">
                  {labels.highlight}
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-text-muted">{labels.duration}</dt>
                    <dd className="font-semibold text-navy-900">{program.duration}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-muted">{labels.degree}</dt>
                    <dd className="font-semibold text-navy-900">{program.degree}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-muted">{labels.language}</dt>
                    <dd className="font-semibold text-navy-900">{program.language}</dd>
                  </div>
                  {program.admissionScore && (
                    <div className="flex items-center justify-between">
                      <dt className="text-text-muted">{labels.admissionScore}</dt>
                      <dd className="font-semibold text-navy-900">{program.admissionScore}+</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-6 space-y-3">
                  <Button
                    href="/admission"
                    variant="accent"
                    size="md"
                    icon={<ChevronRight className="h-4 w-4" />}
                    className="w-full"
                  >
                    {labels.applyCta}
                  </Button>
                  <Button href="/contact" variant="outline" size="md" className="w-full">
                    {labels.contactCta}
                  </Button>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
