import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { OrgChart } from '@/components/sections/OrgChart';

export const metadata = {
  title: 'Бүтэц, зохион байгуулалт',
};

export default function StructurePage() {
  return (
    <>
      <PageHero
        title="Бүтэц, зохион байгуулалт"
        subtitle="Удирдах зөвлөл, Эрдмийн зөвлөл, Захирал, Чанарын үнэлгээний алба болон 4 үндсэн чиглэл."
        breadcrumb={[
          { label: 'Нүүр', href: '/' },
          { label: 'Сургуулийн тухай', href: '/about' },
          { label: 'Бүтэц, зохион байгуулалт' },
        ]}
      />

      <Section background="cream-soft">
        <OrgChart />
      </Section>

      <CtaBanner
        title="Бидний тухай дэлгэрэнгүй танилцах уу?"
        ctaLabel="Захирлын мэндчилгээ"
        ctaHref="/about/director-message"
        secondary={{ label: 'Үүсгэн байгуулагч', href: '/about/founder' }}
      />
    </>
  );
}
