'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormField, inputClasses, textareaClasses } from '@/components/admin/FormField';
import { TranslationFields } from '@/components/admin/TranslationFields';
import { slugify } from '@/lib/admin-helpers';

interface Props {
  initial?: any;
  mode: 'create' | 'edit';
}

const ICON_OPTIONS = [
  'Languages', 'Map', 'Globe', 'TrendingUp', 'Presentation', 'Code2',
  'GraduationCap', 'BookOpen', 'Briefcase', 'Building2', 'Users', 'Award',
];

export function ProgramForm({ initial = {}, mode }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [name, setName] = useState(initial.name ?? '');
  const [slug, setSlug] = useState(initial.slug ?? '');
  const [code, setCode] = useState(initial.code ?? '');
  const [degree, setDegree] = useState(initial.degree ?? 'Бакалавр');
  const [duration, setDuration] = useState(initial.duration ?? '4 жил');
  const [shortDescription, setShortDescription] = useState(initial.shortDescription ?? '');
  const [fullDescription, setFullDescription] = useState(initial.fullDescription ?? '');
  const [skills, setSkills] = useState(initial.skills ?? '');
  const [curriculum, setCurriculum] = useState(initial.curriculum ?? '');
  const [careerOutlook, setCareerOutlook] = useState(initial.careerOutlook ?? '');
  const [nameEn, setNameEn] = useState(initial.nameEn ?? '');
  const [nameJa, setNameJa] = useState(initial.nameJa ?? '');
  const [shortDescriptionEn, setShortDescriptionEn] = useState(initial.shortDescriptionEn ?? '');
  const [shortDescriptionJa, setShortDescriptionJa] = useState(initial.shortDescriptionJa ?? '');
  const [fullDescriptionEn, setFullDescriptionEn] = useState(initial.fullDescriptionEn ?? '');
  const [fullDescriptionJa, setFullDescriptionJa] = useState(initial.fullDescriptionJa ?? '');
  const [skillsEn, setSkillsEn] = useState(initial.skillsEn ?? '');
  const [skillsJa, setSkillsJa] = useState(initial.skillsJa ?? '');
  const [careerOutlookEn, setCareerOutlookEn] = useState(initial.careerOutlookEn ?? '');
  const [careerOutlookJa, setCareerOutlookJa] = useState(initial.careerOutlookJa ?? '');
  const [language, setLanguage] = useState(initial.language ?? 'Япон, Монгол');
  const [admissionScore, setAdmissionScore] = useState<string>(initial.admissionScore?.toString() ?? '');
  const [department, setDepartment] = useState(initial.department ?? '');
  const [active, setActive] = useState(initial.active ?? true);
  const [icon, setIcon] = useState(initial.icon ?? 'Languages');
  const [order, setOrder] = useState<string>(initial.order?.toString() ?? '0');

  function handleNameChange(v: string) {
    setName(v);
    if (mode === 'create' && (!slug || slug === slugify(name))) setSlug(slugify(v));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const payload = {
        name, slug, code: code || undefined, degree, duration,
        shortDescription, fullDescription, skills, curriculum: curriculum || undefined,
        careerOutlook: careerOutlook || undefined,
        nameEn: nameEn || undefined,
        nameJa: nameJa || undefined,
        shortDescriptionEn: shortDescriptionEn || undefined,
        shortDescriptionJa: shortDescriptionJa || undefined,
        fullDescriptionEn: fullDescriptionEn || undefined,
        fullDescriptionJa: fullDescriptionJa || undefined,
        skillsEn: skillsEn || undefined,
        skillsJa: skillsJa || undefined,
        careerOutlookEn: careerOutlookEn || undefined,
        careerOutlookJa: careerOutlookJa || undefined,
        language, admissionScore: admissionScore ? Number(admissionScore) : undefined,
        department: department || undefined,
        active, icon, order: Number(order),
      };
      const url = mode === 'create' ? '/api/programs' : `/api/programs/${initial.id}`;
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(data?.error ?? 'Хадгалахад алдаа гарлаа');
        return;
      }
      toast.success(mode === 'create' ? 'Сургалт нэмэгдлээ' : 'Хадгалагдлаа');
      router.push('/admin/programs');
      router.refresh();
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card hover={false} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Нэр" required>
            <input required value={name} onChange={(e) => handleNameChange(e.target.value)} className={inputClasses} />
          </FormField>
          <FormField label="Slug" required>
            <input required value={slug} onChange={(e) => setSlug(slugify(e.target.value))} className={inputClasses} />
          </FormField>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <FormField label="Код">
            <input value={code} onChange={(e) => setCode(e.target.value)} className={inputClasses} placeholder="023101" />
          </FormField>
          <FormField label="Зэрэг" required>
            <select value={degree} onChange={(e) => setDegree(e.target.value)} className={inputClasses}>
              <option>Бакалавр</option>
              <option>Магистр</option>
              <option>Доктор</option>
            </select>
          </FormField>
          <FormField label="Хугацаа" required>
            <input required value={duration} onChange={(e) => setDuration(e.target.value)} className={inputClasses} placeholder="4 жил" />
          </FormField>
        </div>
        <FormField
          label="Товч тайлбар"
          required
          hint="Мэргэжлийн картан дээр (жагсаалт хуудсанд) болон banner-ын subtitle-д харагдана. 2–3 өгүүлбэр."
        >
          <textarea required value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} rows={3} className={textareaClasses} />
        </FormField>
        <FormField
          label="Хөтөлбөрийн зорилго"
          required
          hint="Дэлгэрэнгүй хуудасны эхний хэсэг — энэ мэргэжлийн зорилго, бэлтгэх мэргэжилтний онцлог."
        >
          <textarea required value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} rows={6} className={textareaClasses} />
        </FormField>
        <FormField
          label="Олгох чадвар"
          hint="Дэлгэрэнгүй хуудсанд жагсаалт болж харагдана. Мөр бүрт НЭГ чадвар бичнэ үү."
        >
          <textarea value={skills} onChange={(e) => setSkills(e.target.value)} rows={5} className={textareaClasses} placeholder="JLPT N1, N2 түвшний япон хэлний мэдлэг&#10;Аман ба бичгийн орчуулгын ур чадвар" />
        </FormField>
        <FormField
          label="Хичээлийн хөтөлбөр"
          hint="Курс, кредит, жил тутмын модулиудын товч жагсаалт (нэмэлт)."
        >
          <textarea value={curriculum} onChange={(e) => setCurriculum(e.target.value)} rows={4} className={textareaClasses} />
        </FormField>
        <FormField
          label="Ажлын боломж"
          hint="Энэ мэргэжлээр төгсөгчид ямар ажил хийдэг, аль салбарт ажилладаг тухай тайлбар."
        >
          <textarea
            value={careerOutlook}
            onChange={(e) => setCareerOutlook(e.target.value)}
            rows={5}
            className={textareaClasses}
            placeholder="Манай төгсөгчид Япон болон Монголын IT, бизнес, орчуулга..."
          />
        </FormField>

        <TranslationFields
          fields={[
            { key: 'name', label: 'Нэр', enValue: nameEn, jaValue: nameJa, setEn: setNameEn, setJa: setNameJa },
            { key: 'shortDescription', label: 'Товч тайлбар', multiline: true, rows: 3, enValue: shortDescriptionEn, jaValue: shortDescriptionJa, setEn: setShortDescriptionEn, setJa: setShortDescriptionJa },
            { key: 'fullDescription', label: 'Хөтөлбөрийн зорилго', multiline: true, rows: 6, enValue: fullDescriptionEn, jaValue: fullDescriptionJa, setEn: setFullDescriptionEn, setJa: setFullDescriptionJa },
            { key: 'skills', label: 'Олгох чадвар', multiline: true, rows: 5, enValue: skillsEn, jaValue: skillsJa, setEn: setSkillsEn, setJa: setSkillsJa },
            { key: 'careerOutlook', label: 'Ажлын боломж', multiline: true, rows: 5, enValue: careerOutlookEn, jaValue: careerOutlookJa, setEn: setCareerOutlookEn, setJa: setCareerOutlookJa },
          ]}
        />
      </Card>

      <div className="space-y-6">
        <Card hover={false}>
          <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-navy-900">Онцлох зүйл</h3>
          <p className="mb-4 text-xs text-text-muted">
            Дэлгэрэнгүй хуудасны баруун талын талбарт харагдана.
          </p>
          <FormField label="Сургалтын хэл" required>
            <input required value={language} onChange={(e) => setLanguage(e.target.value)} className={inputClasses} />
          </FormField>
          <FormField label="Элсэлтийн оноо" className="mt-4" hint="ЭЕШ-ийн доод оноо.">
            <input type="number" min={0} max={900} value={admissionScore} onChange={(e) => setAdmissionScore(e.target.value)} className={inputClasses} placeholder="600" />
          </FormField>
          <FormField
            label="Имэйл ангилал (department)"
            className="mt-4"
            hint="Элсэлтийн имэйл загвартай тааруулна. Ж: aylal-juulchlal, programm-hangamj."
          >
            <input value={department} onChange={(e) => setDepartment(e.target.value)} className={inputClasses} placeholder="programm-hangamj" />
          </FormField>
          <FormField label="Дүрс (Lucide icon)" className="mt-4">
            <select value={icon} onChange={(e) => setIcon(e.target.value)} className={inputClasses}>
              {ICON_OPTIONS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Дараалал" className="mt-4">
            <input type="number" min={0} value={order} onChange={(e) => setOrder(e.target.value)} className={inputClasses} />
          </FormField>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
            <span className="font-semibold text-navy-900">Идэвхтэй (нийтэд харагдана)</span>
          </label>
        </Card>

        <Card hover={false}>
          <Button type="submit" variant="primary" size="md" icon={<Save className="h-4 w-4" />} iconPosition="left" loading={pending} className="w-full">
            Хадгалах
          </Button>
          <Link href="/admin/programs" className="mt-3 block text-center text-sm font-semibold text-text-muted hover:text-navy-900">
            Цуцлах
          </Link>
        </Card>
      </div>
    </form>
  );
}
