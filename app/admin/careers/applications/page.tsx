import { PageHeader } from '@/components/admin/PageHeader';
import { formatMNDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Илгээгдсэн анкетууд' };

interface ParsedPayload {
  education?: { school?: string; major?: string; degree?: string; year?: string };
  experience?: { org?: string; role?: string; duration?: string; duties?: string };
  teaching?: { university?: string; subjects?: string; research?: string; publications?: string };
  skills?: { digital?: string; languages?: string; tools?: string };
  motivation?: { reason?: string; strengths?: string; availableFrom?: string };
}

function parsePayload(s: string): ParsedPayload {
  try {
    return JSON.parse(s) as ParsedPayload;
  } catch {
    return {};
  }
}

export default async function JobApplicationsPage() {
  const items = await prisma.jobApplication
    .findMany({ orderBy: { createdAt: 'desc' }, take: 100 })
    .catch(() => [] as never[]);

  return (
    <>
      <PageHeader
        title="Илгээгдсэн анкетууд"
        subtitle={`Сүүлийн ${items.length} анкет`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Нээлттэй ажлын байр', href: '/admin/careers' },
          { label: 'Илгээгдсэн анкетууд' },
        ]}
      />

      {items.length === 0 ? (
        <Card hover={false} className="text-center text-sm text-text-muted">
          Одоогоор анкет хүлээн аваагүй байна.
        </Card>
      ) : (
        <div className="space-y-4">
          {items.map((a) => {
            const p = parsePayload(a.payload);
            return (
              <Card key={a.id} hover={false}>
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border-light pb-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-navy-900">
                      {a.fullName}
                    </h3>
                    <p className="mt-0.5 text-xs text-text-muted">
                      {a.email} · {a.phone}
                      {a.birthDate ? ` · ${a.birthDate}` : ''}
                      {a.address ? ` · ${a.address}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="gold">{a.position}</Badge>
                    <span className="text-xs text-text-muted">
                      {formatMNDate(a.createdAt, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  <Block title="Боловсрол">
                    <Line label="Сургууль" value={p.education?.school} />
                    <Line label="Мэргэжил" value={p.education?.major} />
                    <Line label="Зэрэг" value={p.education?.degree} />
                    <Line label="Төгссөн он" value={p.education?.year} />
                  </Block>
                  <Block title="Ажлын туршлага">
                    <Line label="Байгууллага" value={p.experience?.org} />
                    <Line label="Албан тушаал" value={p.experience?.role} />
                    <Line label="Хугацаа" value={p.experience?.duration} />
                    <Line label="Үүрэг" value={p.experience?.duties} />
                  </Block>
                  <Block title="Багшлах туршлага">
                    <Line label="Их сургуульд" value={p.teaching?.university} />
                    <Line label="Хичээлүүд" value={p.teaching?.subjects} />
                    <Line label="Судалгаа" value={p.teaching?.research} />
                    <Line label="Бүтээл" value={p.teaching?.publications} />
                  </Block>
                  <Block title="Ур чадвар">
                    <Line label="Дижитал" value={p.skills?.digital} />
                    <Line label="Хэл" value={p.skills?.languages} />
                    <Line label="Хэрэгсэл" value={p.skills?.tools} />
                  </Block>
                  <Block title="Нэмэлт">
                    <Line label="Шалтгаан" value={p.motivation?.reason} />
                    <Line label="Давуу тал" value={p.motivation?.strengths} />
                    <Line label="Боломжтой" value={p.motivation?.availableFrom} />
                  </Block>
                  <Block title="Хавсралт">
                    {a.cvUrl ? (
                      <a
                        href={a.cvUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="block text-xs font-semibold text-navy-900 underline hover:text-gold-500"
                      >
                        CV — нээх
                      </a>
                    ) : (
                      <p className="text-xs text-text-muted">CV: —</p>
                    )}
                    {a.diplomaUrl ? (
                      <a
                        href={a.diplomaUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-1 block text-xs font-semibold text-navy-900 underline hover:text-gold-500"
                      >
                        Диплом — нээх
                      </a>
                    ) : (
                      <p className="mt-1 text-xs text-text-muted">Диплом: —</p>
                    )}
                  </Block>
                </dl>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-button border border-border-light bg-cream-soft/40 p-3">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-gold-500">
        {title}
      </p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Line({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <p className="text-xs leading-relaxed">
      <span className="font-semibold text-navy-900">{label}: </span>
      <span className="text-text-body">{value}</span>
    </p>
  );
}
