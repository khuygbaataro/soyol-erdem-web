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

/**
 * Match an anket's free-text program name to a Program row. Exact match
 * first, then substring either way (e.g. anket "Аялал жуулчлалын менежмент"
 * → program "Аялал жуулчлал"), so small wording differences on the
 * application form still resolve to the right template.
 */
export function matchProgram<T extends { name: string }>(
  programName: string,
  programs: T[],
): T | null {
  const target = programName.trim().toLowerCase();
  if (!target) return null;

  const exact = programs.find((p) => p.name.trim().toLowerCase() === target);
  if (exact) return exact;

  // Anket name contains a program name — prefer the longest (most specific).
  const contained = programs
    .filter((p) => {
      const n = p.name.trim().toLowerCase();
      return n.length > 0 && target.includes(n);
    })
    .sort((a, b) => b.name.length - a.name.length);
  if (contained[0]) return contained[0];

  // A program name contains the anket name.
  const wider = programs.find((p) => p.name.trim().toLowerCase().includes(target));
  return wider ?? null;
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
