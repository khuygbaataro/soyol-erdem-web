import { notFound } from 'next/navigation';
import { Check, ChevronRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { prisma } from '@/lib/prisma';
import { resolveIcon } from '@/lib/icon-map';

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
  const skills = program.skills.split('\n').map((s) => s.trim()).filter(Boolean);

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
              {program.code && <Badge variant="navy">Индекс: {program.code}</Badge>}
            </div>

            <h2 className="text-2xl font-bold text-navy-900">Хөтөлбөрийн зорилго</h2>
            <p className="mt-3 text-base leading-relaxed text-text-body">
              {program.fullDescription}
            </p>

            {skills.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-navy-900">Олгох чадвар</h2>
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
                <h2 className="mt-10 text-2xl font-bold text-navy-900">Хичээлийн хөтөлбөр</h2>
                <p className="mt-3 whitespace-pre-line text-sm text-text-body">{program.curriculum}</p>
              </>
            ) : (
              <>
                <h2 className="mt-10 text-2xl font-bold text-navy-900">Хичээлийн хөтөлбөр</h2>
                <p className="mt-3 text-sm text-text-muted">
                  Дэлгэрэнгүй курсын жагсаалт удахгүй нийтлэгдэнэ.
                </p>
              </>
            )}

            <h2 className="mt-10 text-2xl font-bold text-navy-900">Ажлын боломж</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text-body">
              {program.careerOutlook ||
                'Манай төгсөгчид Япон болон Монголын IT, бизнес, орчуулга, боловсрол, аялал жуулчлалын салбарт амжилттай ажиллаж байна. Төгсөгчдийн 40% Япон улсад суралцаж, ажиллаж байна.'}
            </p>
          </div>

          <aside>
            <div className="sticky top-28">
              <Card hover={false}>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold-500">
                  Онцлох зүйл
                </p>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-text-muted">Хугацаа</dt>
                    <dd className="font-semibold text-navy-900">{program.duration}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-muted">Зэрэг</dt>
                    <dd className="font-semibold text-navy-900">{program.degree}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-text-muted">Сургалтын хэл</dt>
                    <dd className="font-semibold text-navy-900">{program.language}</dd>
                  </div>
                  {program.admissionScore && (
                    <div className="flex items-center justify-between">
                      <dt className="text-text-muted">Элсэлтийн оноо</dt>
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
                    Элсэх
                  </Button>
                  <Button href="/contact" variant="outline" size="md" className="w-full">
                    Холбоо барих
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
