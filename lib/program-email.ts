/**
 * Shared logic linking admission programs to their email templates.
 *
 * Each program gets its own template, keyed by `EmailTemplate.category`.
 * We prefer an explicit `department` (so several programs can share one
 * template if the admin sets it) and fall back to the unique `slug` so
 * every program gets a distinct template out of the box.
 *
 * Used by:
 *   - /api/email-templates/generate  (create a template per program)
 *   - /api/admissions/send           (find the template for an anket)
 *   - /admin/messages/[id]           (auto-suggest in the compose UI)
 */

export interface ProgramLite {
  name: string;
  slug: string;
  department: string | null;
}

export function categoryForProgram(p: {
  department: string | null;
  slug: string;
}): string {
  const dep = p.department?.trim();
  return dep && dep.length > 0 ? dep : p.slug;
}

/** Default content generated for a program that has no template yet. */
export function defaultProgramTemplate(p: ProgramLite): {
  name: string;
  subject: string;
  body: string;
} {
  return {
    name: `${p.name} — танилцуулга`,
    subject: `Соёл Эрдэм — "${p.name}" хөтөлбөрийн мэдээлэл`,
    body:
      'Сайн байна уу, {{firstName}}.\n\n' +
      'Соёл Эрдэм Дээд Сургуулийг сонирхсонд баярлалаа. Таны сонирхсон ' +
      '"{{programName}}" хөтөлбөрийн талаарх мэдээллийг хүргэж байна:\n\n' +
      '• Хөтөлбөрийн зорилго, эзэмших чадвар\n' +
      '• Элсэлтийн шаардлага, бүрдүүлэх материал\n' +
      '• Сургалтын төлбөр, тэтгэлэгийн боломж\n\n' +
      'Нэмэлт асуулт байвал энэ имэйлд хариу бичих эсвэл +976 7011-8584 ' +
      'дугаараар холбогдоно уу.\n\n' +
      'Хүндэтгэсэн,\nСоёл Эрдэм Дээд Сургууль — Элсэлтийн алба',
  };
}
