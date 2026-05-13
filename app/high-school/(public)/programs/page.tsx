import {
  BookOpen,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Languages,
  Network,
  Presentation,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CtaBanner } from '@/components/sections/CtaBanner';

export const metadata = {
  title: 'Ахлах сургуулийн сургалт',
  description:
    'Соёл Эрдэм ахлах сургуулийн ерөнхий боловсролын зэрэгцээ Япон хэл, Төрөлжсөн IT мэргэжлийн хөтөлбөрүүд.',
};

const STRUCTURE = [
  {
    icon: GraduationCap,
    title: 'Ерөнхий боловсролын суурь',
    description:
      'Боловсролын тухай хуулийн дагуу 10–12 анги бүрэн дунд боловсролын стандарт хөтөлбөр — Монгол хэл-уран зохиол, Математик, Хими, Физик, Биологи, Газарзүй, Түүх, Иргэний боловсрол, Биеийн тамир.',
  },
  {
    icon: Languages,
    title: 'Япон хэл, соёл',
    description:
      '10–12 ангид JLPT N5 → N3 түвшинд хүрэхүйц хичээл. Япон ёс заншил, нийгмийн харилцаа, соёлын онцлогийг танилцуулсан хичээлүүд.',
  },
  {
    icon: Code2,
    title: 'Төрөлжсөн IT',
    description:
      'Алгоритм, өгөгдлийн бүтэц, програмчлал, веб болон AI-ийн үндэс — сурагч төвтэй практикаар суралцана.',
  },
];

const JAPANESE_LEVELS: { tag: string; title: string; bullets: string[] }[] = [
  {
    tag: '10-р анги',
    title: 'JLPT N5 (Эхлэн суралцагч)',
    bullets: [
      'Хирагана, катакана үсэг бичих, унших',
      'Үндсэн 100+ кандзи',
      'Энгийн өдөр тутмын хэллэг (өөрийгөө танилцуулах, цаг, хоол)',
      'Япон ёс заншлын танилцуулга, бүх хичээлд 4 цаг/долоо хоног',
    ],
  },
  {
    tag: '11-р анги',
    title: 'JLPT N4 (Дунд эхлэл)',
    bullets: [
      'Кандзи 300+',
      'Илүү нарийвчилсан грамматик, өнгөрсөн-ирээдүй цаг хэлбэр',
      'Япон уран зохиолоос ишлэл, дуу, кино',
      'Хичээлээс гадуур "Bunkyousai" наадамд оролцох',
    ],
  },
  {
    tag: '12-р анги',
    title: 'JLPT N3 → N2 түвшин',
    bullets: [
      'Кандзи 650+',
      'Япон руу солилцоонд явах түвшинд бичгийн болон ярианы орчуулга',
      'Япон их сургуулийн элсэлтийн шалгалтын дасгал',
      'Олон улсын эрх бүхий шалгалтаар чадвараа баталгаажуулна',
    ],
  },
];

const IT_TOPICS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Code2,
    title: 'Алгоритм ба програмчлал',
    body: 'Логик сэтгэлгээний үндэс, Python/JavaScript хэлээр практик дасгал.',
  },
  {
    icon: Database,
    title: 'Өгөгдлийн бүтэц',
    body: 'Жагсаалт, харгалзаа, мод болон график бүтцийн ойлголт.',
  },
  {
    icon: Network,
    title: 'Веб технологи',
    body: 'HTML, CSS, JavaScript ашиглан төсөл хийж, хэрэглэгчийн интерфейс зохиох.',
  },
  {
    icon: Cpu,
    title: 'AI болон өгөгдөл',
    body: 'Хиймэл оюун ухааны үндсэн ойлголт, өгөгдлийн шинжилгээний эхлэн суралцах хичээл.',
  },
];

const STAFF_HIGHLIGHTS = [
  {
    name: 'С. Боожоо',
    role: 'Математикийн багш',
    note: '"Алтан гадас" одонгоор шагнагдсан',
  },
  {
    name: 'Япон хэлний 2 багш',
    role: 'Эх хэлтэн / JLPT N1',
    note: 'Япон-Монголын соёл, орчуулга судлал',
  },
  {
    name: '11+ мэргэжлийн багш',
    role: 'Ерөнхий боловсрол',
    note: 'Боловсролын магистр зэрэгтэй',
  },
];

export default function HighSchoolProgramsPage() {
  return (
    <>
      <PageHero
        title="СУРГАЛТ"
        subtitle="Ерөнхий боловсролын суурь + Япон хэл, соёл + Төрөлжсөн мэдээллийн технологи."
        breadcrumb={[
          { label: 'Их сургууль', href: '/' },
          { label: 'Ахлах сургууль', href: '/high-school' },
          { label: 'Сургалт' },
        ]}
      />

      {/* Structure */}
      <Section background="white" spacing="md">
        <SectionTitle
          title="СУРГАЛТЫН БҮТЭЦ"
          subtitle="Ерөнхий боловсролын тогтсон стандартыг япон хэл, соёл болон IT-ийн төрөлжсөн хөтөлбөртэй хослуулсан."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {STRUCTURE.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {s.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Japanese language detail */}
      <Section background="cream-soft" spacing="md" id="yapon-hel">
        <div className="mb-10">
          <Badge variant="gold" className="mb-3">
            Япон хэл, соёл
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-navy-900 md:text-4xl">
            Япон хэлний түвшинт хөтөлбөр
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gold-500" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-body">
            Сургуулийн төгсөгчид Япон руу үргэлжлүүлэн суралцах, япон
            байгууллагад ажиллах түвшинд хүрэхэд тулгуурлан 3 жилд JLPT N5-аас
            N3-N2 хүртэлх түвшинд хүргэх системтэй хөтөлбөртэй. Долоо хоногт 4
            цагийн япон хэлний хичээл явагдана.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {JAPANESE_LEVELS.map((l) => (
            <Card key={l.title} className="flex h-full flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                {l.tag}
              </span>
              <h3 className="mt-1 text-lg font-bold text-navy-900">
                {l.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {l.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-text-body"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* IT detail */}
      <Section background="white" spacing="md" id="it">
        <div className="mb-10">
          <Badge variant="gold" className="mb-3">
            Төрөлжсөн IT
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-navy-900 md:text-4xl">
            Мэдээллийн технологийн төрөлжсөн анги
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gold-500" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-body">
            10–11 ангид сурагч төвтэй, оролцоонд тулгуурласан аргачлалаар
            программчлал, веб технологи, AI, өгөгдлийн шинжилгээний
            ойлголтуудыг тус сургуулийн дэргэдэх IT-Digital-AI мэргэжлийн
            сургуультай хамтран заана. Эх сургууль СЭДС-ын Программ хангамжийн
            мэргэжилтэй 2+2 хөтөлбөрөөр шууд үргэлжлүүлэн суралцаж болно.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {IT_TOPICS.map((t) => {
            const Icon = t.icon;
            return (
              <Card key={t.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-900 text-gold-400">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-bold text-navy-900">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {t.body}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Teachers */}
      <Section background="cream-soft" spacing="md" id="bagsh">
        <div className="mb-10">
          <Badge variant="gold" className="mb-3">
            Багш нар
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-navy-900 md:text-4xl">
            Мэргэжлийн багш нар
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gold-500" />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-body">
            Бид мэргэжлийн ур чадвар, тогтсон арга зүй, япон хэл соёлын мэдлэг
            хосолсон чанартай багшийн бүрэлдэхүүнтэй. 100% багш нар нь
            мэргэжлийн үнэмлэхтэй, олон жилийн туршлагатай.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {STAFF_HIGHLIGHTS.map((s) => (
            <div
              key={s.name}
              className="flex items-start gap-4 rounded-card border border-border-light bg-white p-6 shadow-card"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                <Presentation className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-navy-900">{s.name}</h3>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-gold-500">
                  {s.role}
                </p>
                <p className="mt-2 text-sm text-text-body">{s.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 rounded-card bg-navy-900 px-6 py-8 text-white md:grid-cols-4">
          {[
            { v: '11+', l: 'Мэргэжлийн багш' },
            { v: '2', l: 'Япон хэлний багш' },
            { v: '100%', l: 'Мэргэжлийн үнэмлэхтэй' },
            { v: '50+', l: 'Япон зочин багш (СЭДС)' },
          ].map((x) => (
            <div key={x.l} className="text-center">
              <p className="font-serif text-3xl font-bold text-gold-400 md:text-4xl">
                {x.v}
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/75">
                {x.l}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Resources / labs */}
      <Section background="white" spacing="md">
        <SectionTitle title="СУРГАЛТЫН ОРЧИН" align="left" />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Cpu,
              title: 'IT кабинет',
              body: 'Орчин үеийн компьютер, дэлгэц, сүлжээний техник хангамжтай суралцагч төвтэй кабинет.',
            },
            {
              icon: BookOpen,
              title: 'Номын сан',
              body: 'Япон, монгол хэл дээрх 5000+ номтой; сурагчид JLPT номон материалаар бэлтгэнэ.',
            },
            {
              icon: Users,
              title: 'Хими, физикийн лаборатори',
              body: 'Бодит туршилт хийх боломжтой шинжлэх ухааны лабораторийн өрөөнүүдтэй.',
            },
          ].map((x) => {
            const Icon = x.icon;
            return (
              <Card key={x.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold text-navy-900">{x.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-body">
                  {x.body}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      <CtaBanner
        title="Япон хэл, IT, чанартай боловсрол"
        subtitle="2026-2027 оны хичээлийн жилийн элсэлт нээлттэй."
        ctaLabel="Элсэлтийн мэдээлэл"
        ctaHref="/high-school/admission"
        secondary={{ label: 'Холбоо барих', href: '/high-school/contact' }}
      />
    </>
  );
}
