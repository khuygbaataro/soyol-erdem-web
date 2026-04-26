'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  ChevronRight,
  Globe2,
  GraduationCap,
  Languages,
  Library,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { NumberedCard } from '@/components/ui/NumberedCard';
import { StatBlock } from '@/components/ui/StatBlock';
import { NewsCard } from '@/components/ui/NewsCard';
import { ProgramCard } from '@/components/ui/ProgramCard';
import { TimelineStep } from '@/components/ui/TimelineStep';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { LanguageSwitch } from '@/components/ui/LanguageSwitch';
import type { Language } from '@/lib/constants';

const NEWS_PLACEHOLDER =
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=60';
const NEWS_PLACEHOLDER_2 =
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=60';
const NEWS_PLACEHOLDER_3 =
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=60';

export default function ShowcasePage() {
  const [lang, setLang] = useState<Language>('MN');

  return (
    <>
      <Section background="cream-soft" spacing="sm">
        <Breadcrumb
          items={[
            { label: 'Нүүр', href: '/' },
            { label: 'Component Showcase' },
          ]}
          className="mb-4"
        />
        <h1 className="text-h1 font-bold text-navy-900">Component Showcase</h1>
        <p className="mt-3 max-w-2xl text-text-body">
          Соёл-Эрдэм-ийн дизайн системийн бүх reusable component энд жагссан.
          Prompt 2 болон Prompt 3-д хэрэглэгдэх бэлэн bricks.
        </p>
      </Section>

      {/* 1. Buttons */}
      <Section background="white">
        <SectionTitle
          title="Buttons"
          subtitle="Primary, accent, outline — гурван variant + 3 хэмжээ"
          align="left"
        />
        <div className="space-y-6">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-4">
              <span className="w-10 text-xs font-semibold uppercase text-text-muted">
                {size}
              </span>
              <Button variant="primary" size={size}>
                Primary
              </Button>
              <Button
                variant="accent"
                size={size}
                icon={<ChevronRight className="h-4 w-4" />}
              >
                Accent
              </Button>
              <Button variant="outline" size={size}>
                Outline
              </Button>
              <Button variant="primary" size={size} loading>
                Loading
              </Button>
              <Button variant="primary" size={size} disabled>
                Disabled
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* 2. Cards */}
      <Section background="cream-soft">
        <SectionTitle
          title="Cards"
          subtitle="Энгийн Card + NumberedCard (active / inactive)"
          align="left"
        />
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <h3 className="mb-2 text-lg font-semibold text-text-heading">
              Энгийн Card
            </h3>
            <p className="text-sm text-text-body">
              Цагаан background, hover үед дээш нэг pixel өргөгдөж сүүдрээ
              гүнзгийрүүлнэ.
            </p>
          </Card>
          <NumberedCard
            number="01"
            icon={GraduationCap}
            title="Бакалаврын сургалт"
            description="Японы стандартын дагуу бэлтгэгдсэн 4 жилийн хөтөлбөрүүд."
            href="/programs"
          />
          <NumberedCard
            number="02"
            icon={Languages}
            title="Япон хэлний төв"
            description="JLPT N1-N5 түвшний бүх ангиуд, нативе багштай дадлага."
            isActive
            href="/programs"
          />
        </div>
      </Section>

      {/* 3. Section Title */}
      <Section background="white">
        <SectionTitle
          title="Section Title — gold underline"
          subtitle="Энэ нь бүх section-ийн стандарт гарчиг. Дор нь 64px алтлаг зурлага."
        />
      </Section>

      {/* 4. Stat Blocks */}
      <Section background="navy" spacing="md">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <StatBlock icon={Users} number="1,200+" label="Идэвхтэй оюутан" />
          <StatBlock icon={Trophy} number="32" label="Жилийн туршлага" />
          <StatBlock icon={Globe2} number="40+" label="Хамтрагч сургууль" />
          <StatBlock icon={Award} number="98%" label="Ажил эрхлэлт" />
        </div>
      </Section>

      {/* 5. News Cards */}
      <Section background="cream-soft">
        <SectionTitle title="News Cards" subtitle="3 баганын grid" align="left" />
        <div className="grid gap-6 md:grid-cols-3">
          <NewsCard
            image={NEWS_PLACEHOLDER}
            date="2025.04.20"
            category="Мэдээ"
            title="Шинэ хичээлийн жилийн нээлтийн ёслол боллоо"
            excerpt="Соёл-Эрдэм Дээд Сургуулийн 32 дахь хичээлийн жилийн нээлтийн ёслол өчигдөр амжилттай зохион байгуулагдлаа."
            href="/news/1"
          />
          <NewsCard
            image={NEWS_PLACEHOLDER_2}
            date="2025.04.15"
            category="Эрдэм шинжилгээ"
            title="Япон-Монголын соёлын солилцооны симпозиум"
            excerpt="Олон улсын эрдэмтэн судлаачдыг оролцуулсан 3 хоногийн симпозиум хоёр улсын хамтын ажиллагааг бэхжүүллээ."
            href="/news/2"
          />
          <NewsCard
            image={NEWS_PLACEHOLDER_3}
            date="2025.04.10"
            category="Тэтгэлэг"
            title="MEXT тэтгэлгийн шинэ боломж нээгдлээ"
            excerpt="2025 онд Япон улсын засгийн газрын тэтгэлгээр сурах оюутны квот нэмэгдэж 25 болсон."
            href="/news/3"
          />
        </div>
      </Section>

      {/* 6. Program Cards */}
      <Section background="white">
        <SectionTitle title="Program Cards" align="left" />
        <div className="grid gap-6 md:grid-cols-3">
          <ProgramCard
            icon={Languages}
            name="Япон хэл, орчуулга"
            degree="Бакалавр"
            description="Япон хэлний 4 ур чадварыг сайжруулж, орчуулга, аман орчуулгын мэргэжилтэн бэлтгэнэ."
            href="/programs/japanese"
          />
          <ProgramCard
            icon={Briefcase}
            name="Олон улсын бизнес"
            degree="Бакалавр"
            description="Япон корпорацийн соёл, менежмент, маркетингийн ур чадвар эзэмшсэн мэргэжилтэн."
            href="/programs/business"
          />
          <ProgramCard
            icon={Building2}
            name="Аялал жуулчлал"
            degree="Бакалавр"
            description="Япон зочдод үйлчилгээ үзүүлэх дэлхийн жишгийн hospitality мэргэжилтэн."
            href="/programs/tourism"
          />
        </div>
      </Section>

      {/* 7. Timeline */}
      <Section background="cream-soft">
        <SectionTitle title="Timeline — 5 алхам" />
        <div className="flex items-start justify-between gap-2">
          <TimelineStep
            number={1}
            title="Бүртгэл"
            description="Онлайн материал илгээх"
            isActive
          />
          <TimelineStep
            number={2}
            title="Тест"
            description="Япон хэл + ярилцлага"
            isActive
          />
          <TimelineStep
            number={3}
            title="Шалгаруулалт"
            description="Оноо нийтлэгдэнэ"
          />
          <TimelineStep
            number={4}
            title="Гэрээ"
            description="Сургалтын гэрээ байгуулах"
          />
          <TimelineStep
            number={5}
            title="Хичээл"
            description="9-р сард эхэлнэ"
            isLast
          />
        </div>
      </Section>

      {/* 8. Feature Cards */}
      <Section background="white">
        <SectionTitle title="Feature Cards" align="left" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={Library}
            title="Орчин үеийн номын сан"
            description="20,000+ ном, цахим хэвлэл бүхий уншлагын танхим."
          />
          <FeatureCard
            icon={Globe2}
            title="Япон дахь дадлага"
            description="40+ хамтрагч сургуулиар оюутан солилцоо."
          />
          <FeatureCard
            icon={BookOpen}
            title="Япон хэлний төв"
            description="JLPT шалгалт өгөх албан ёсны төв."
          />
          <FeatureCard
            icon={Sparkles}
            title="Тэтгэлэг"
            description="MEXT, JASSO, дотоодын тэтгэлэгт хамрагдах боломж."
          />
        </div>
      </Section>

      {/* 9. Breadcrumb */}
      <Section background="cream-soft">
        <SectionTitle title="Breadcrumb" align="left" />
        <Breadcrumb
          items={[
            { label: 'Нүүр', href: '/' },
            { label: 'Сургалт', href: '/programs' },
            { label: 'Япон хэл, орчуулга' },
          ]}
        />
      </Section>

      {/* 10. Badges */}
      <Section background="white">
        <SectionTitle title="Badges" align="left" />
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="gold">Шинэ</Badge>
          <Badge variant="navy">Тэтгэлэг</Badge>
          <Badge variant="cream">Бакалавр</Badge>
          <Badge variant="outline">Магистр</Badge>
        </div>
      </Section>

      {/* 11. Language Switch */}
      <Section background="cream-soft" spacing="sm">
        <SectionTitle title="Language Switch" align="left" />
        <div className="flex items-center gap-6">
          <LanguageSwitch currentLang={lang} onChange={setLang} />
          <span className="text-sm text-text-muted">
            Идэвхтэй: <strong className="text-navy-900">{lang}</strong>
          </span>
        </div>
      </Section>

      <Section background="navy" spacing="md">
        <div className="text-center">
          <h2 className="text-h2 font-bold text-white">Дараагийн алхам</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-500" />
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Бүх component бэлэн. Одоо <strong>PROMPT_2</strong>-ыг өгч public
            хуудсуудаа үүсгэе.
          </p>
          <Button
            href="/"
            variant="accent"
            size="lg"
            className="mt-6"
            icon={<ArrowRight className="h-5 w-5" />}
          >
            Нүүр рүү буцах
          </Button>
        </div>
      </Section>
    </>
  );
}
