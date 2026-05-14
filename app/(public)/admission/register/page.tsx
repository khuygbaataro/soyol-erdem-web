import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { prisma } from '@/lib/prisma';
import { getSiteContentMap } from '@/lib/site-content';
import { RegisterFormClient } from './RegisterFormClient';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Элсэлтийн цахим бүртгэл',
  description:
    'Соёл Эрдэм Дээд Сургуулийн 2026-2027 оны хичээлийн жилийн элсэлтийн цахим бүртгэлийн анкет.',
};

export default async function AdmissionRegisterPage() {
  // Pull the program list so the form's "Хөтөлбөр" step has the real
  // catalog instead of a hard-coded placeholder.
  const [programs, banners] = await Promise.all([
    prisma.program
      .findMany({
        where: { active: true },
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
        select: { id: true, name: true, degree: true },
      })
      .catch(() => []),
    getSiteContentMap('banners'),
  ]);

  return (
    <>
      <PageHero
        title="ЭЛСЭЛТИЙН ЦАХИМ БҮРТГЭЛ"
        subtitle="Доорх 8 алхамтай анкетыг бөглөнө үү. Бүх асуултанд хариулсны дараа таны бүртгэл бидэнд илгээгдэнэ."
        breadcrumb={[
          { label: 'Нүүр', href: '/' },
          { label: 'Элсэлт', href: '/admission' },
          { label: 'Цахим бүртгэл' },
        ]}
        backgroundImage={banners.get('page.admission-register.banner') || undefined}
      />
      <Section background="cream-soft">
        <div className="mx-auto max-w-3xl">
          <RegisterFormClient programs={programs} />
        </div>
      </Section>
    </>
  );
}
