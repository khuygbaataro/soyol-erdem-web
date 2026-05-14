import { Section } from '@/components/layout/Section';
import { prisma } from '@/lib/prisma';
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
  const programs = await prisma.program
    .findMany({
      where: { active: true },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
      select: { id: true, name: true, degree: true },
    })
    .catch(() => []);

  return (
    <>
      <Section background="cream-soft">
        <div className="mx-auto max-w-3xl">
          <RegisterFormClient programs={programs} />
        </div>
      </Section>
    </>
  );
}
