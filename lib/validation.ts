import { z } from 'zod';

const slugRegex = /^[a-z0-9-]+$/;

export const newsSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().regex(slugRegex, 'Зөвхөн жижиг үсэг, тоо, зураас (-)').min(3),
  excerpt: z.string().min(10).max(500),
  body: z.string().min(20),
  coverImage: z.string().url().optional().or(z.literal('')),
  category: z.enum(['NEWS', 'EVENT', 'ANNOUNCEMENT', 'RESEARCH', 'ACHIEVEMENT', 'PROGRAM']),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  /** Which sub-site the article belongs to. Defaults to UNIVERSITY. */
  site: z.enum(['UNIVERSITY', 'HIGH_SCHOOL']).optional(),
  publishedAt: z.string().optional().or(z.literal('')),
});
export type NewsInput = z.infer<typeof newsSchema>;

export const librarySchema = z.object({
  title: z.string().min(2).max(300),
  author: z.string().min(2).max(200),
  isbn: z.string().optional().or(z.literal('')),
  language: z.enum(['MN', 'JP', 'EN', 'OTHER']),
  category: z.string().min(2).max(100),
  publisher: z.string().optional().or(z.literal('')),
  publishYear: z.coerce.number().int().min(1500).max(2100).optional(),
  totalCopies: z.coerce.number().int().min(1).max(9999),
  availableCopies: z.coerce.number().int().min(0).max(9999),
  coverImage: z.string().url().optional().or(z.literal('')),
  description: z.string().max(2000).optional().or(z.literal('')),
  shelfLocation: z.string().max(50).optional().or(z.literal('')),
});
export type LibraryInput = z.infer<typeof librarySchema>;

export const researchSchema = z.object({
  title: z.string().min(5).max(300),
  slug: z.string().regex(slugRegex).min(3),
  abstract: z.string().min(20),
  authors: z.string().min(2),
  type: z.enum(['ARTICLE', 'CONFERENCE', 'BOOK', 'THESIS', 'PROJECT']),
  area: z.string().min(2),
  fileUrl: z.string().url().optional().or(z.literal('')),
  publishedAt: z.string().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});
export type ResearchInput = z.infer<typeof researchSchema>;

export const programSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().regex(slugRegex).min(3),
  code: z.string().optional().or(z.literal('')),
  degree: z.string().min(2),
  duration: z.string().min(2),
  shortDescription: z.string().min(10).max(500),
  fullDescription: z.string().min(20),
  skills: z.string().min(0), // newline-separated
  curriculum: z.string().optional().or(z.literal('')),
  language: z.string().min(2),
  admissionScore: z.coerce.number().int().min(0).max(900).optional(),
  active: z.coerce.boolean().or(z.literal('on').transform(() => true)).optional(),
  icon: z.string().min(2),
  order: z.coerce.number().int().min(0).max(999),
});
export type ProgramInput = z.infer<typeof programSchema>;

export const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  role: z.enum(['ADMIN', 'EDITOR', 'LIBRARIAN', 'RESEARCHER']),
  active: z.coerce.boolean().or(z.literal('on').transform(() => true)).optional(),
});
export type UserInput = z.infer<typeof userSchema>;

export const settingsSchema = z.object({
  schoolName: z.string().min(2),
  email: z.string().email(),
  phonePrimary: z.string().min(4),
  phoneSecondary: z.string().optional().or(z.literal('')),
  address: z.string().min(5),
  facebookUrl: z.string().url().optional().or(z.literal('')),
  workingHours: z.string().min(2),
});
export type SettingsInput = z.infer<typeof settingsSchema>;

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal('')),
  subject: z.string().min(2),
  message: z.string().min(5).max(2000),
});
export type ContactInput = z.infer<typeof contactSchema>;

/* Admission application — 8-step wizard at /admission/register.
 *
 * Stored in `ContactSubmission` (no separate DB table yet so we don't need
 * to ship a migration); the structured fields are formatted into a
 * Markdown message body the admin can read in the contact panel.
 */
export const admissionApplicationSchema = z.object({
  citizenship: z.enum(['MN', 'FOREIGN']),
  degree: z.enum(['BACHELOR', 'MASTER']),
  programId: z.string().min(1, 'Хөтөлбөр сонгоно уу'),
  programName: z.string().min(1),
  lastName: z.string().min(1, 'Овог оруулна уу').max(80),
  firstName: z.string().min(1, 'Нэр оруулна уу').max(80),
  education: z.string().min(1, 'Боловсролын түвшин сонгоно уу'),
  examScores: z
    .array(
      z.object({
        subject: z.string().min(1, 'Хичээл оруулна уу').max(80),
        score: z
          .string()
          .min(1, 'Оноо оруулна уу')
          .regex(/^\d{1,4}(?:[.,]\d{1,2})?$/, 'Оноо тоогоор бичнэ үү')
          .max(10),
      }),
    )
    .min(1, 'Дор хаяж нэг хичээл оруулна уу')
    .max(3),
  phones: z
    .array(z.string().min(6, 'Утасны дугаар хүчин төгөлдөр биш').max(20))
    .min(1, 'Утасны дугаар оруулна уу')
    .max(3),
  email: z.string().email('И-мэйл хаяг хүчин төгөлдөр биш'),
});
export type AdmissionApplicationInput = z.infer<typeof admissionApplicationSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export type LoginInput = z.infer<typeof loginSchema>;

/* SiteContent — bulk update by key (admin form submits all fields at once) */
export const siteContentItemSchema = z.object({
  key: z.string().min(2).max(120),
  value: z.string().max(5000), // empty allowed (clears optional images)
});
export const siteContentBulkSchema = z.object({
  items: z.array(siteContentItemSchema).min(1).max(100),
});
export type SiteContentItemInput = z.infer<typeof siteContentItemSchema>;
export type SiteContentBulkInput = z.infer<typeof siteContentBulkSchema>;

/* Regulation — school regulations / rules PDFs */
export const regulationSchema = z.object({
  slug: z
    .string()
    .regex(slugRegex, 'Зөвхөн жижиг үсэг, тоо, зураас (-)')
    .min(2)
    .max(80),
  title: z.string().min(2).max(200),
  description: z.string().max(500).optional().or(z.literal('')),
  fileUrl: z.string().url(),
  coverImage: z.string().url().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  order: z.coerce.number().int().min(0).max(999),
});
export type RegulationInput = z.infer<typeof regulationSchema>;

/* Newspaper — school newspaper PDF issues */
export const newspaperSchema = z.object({
  issueNumber: z.coerce.number().int().min(1).max(99999),
  title: z.string().max(200).optional().or(z.literal('')),
  publishedAt: z.string().optional().or(z.literal('')),
  fileUrl: z.string().url(),
  coverImage: z.string().url().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});
export type NewspaperInput = z.infer<typeof newspaperSchema>;

/* JobOpening — admin CRUD */
export const jobOpeningSchema = z.object({
  slug: z
    .string()
    .regex(slugRegex, 'Зөвхөн жижиг үсэг, тоо, зураас (-)')
    .min(2)
    .max(80),
  title: z.string().min(2).max(160),
  description: z.string().max(500).optional().or(z.literal('')),
  active: z.coerce.boolean().or(z.literal('on').transform(() => true)).optional(),
  order: z.coerce.number().int().min(0).max(999),
});
export type JobOpeningInput = z.infer<typeof jobOpeningSchema>;

/* Job application — public 7-section form. The bulky free-text fields
 * live inside `payload` so this schema doesn't grow into a beast; the
 * top-level columns mirror what the admin needs to skim a list. */
export const jobApplicationSchema = z.object({
  position: z.string().min(2).max(120),
  fullName: z.string().min(2).max(120),
  birthDate: z.string().max(40).optional().or(z.literal('')),
  phone: z.string().min(6, 'Утасны дугаар хүчин төгөлдөр биш').max(40),
  email: z.string().email('И-мэйл хаяг хүчин төгөлдөр биш'),
  address: z.string().max(300).optional().or(z.literal('')),
  payload: z.object({
    education: z.object({
      school: z.string().max(200).optional().or(z.literal('')),
      major: z.string().max(200).optional().or(z.literal('')),
      degree: z.string().max(120).optional().or(z.literal('')),
      year: z.string().max(20).optional().or(z.literal('')),
    }),
    experience: z.object({
      org: z.string().max(200).optional().or(z.literal('')),
      role: z.string().max(160).optional().or(z.literal('')),
      duration: z.string().max(120).optional().or(z.literal('')),
      duties: z.string().max(1000).optional().or(z.literal('')),
    }),
    teaching: z.object({
      university: z.string().max(200).optional().or(z.literal('')),
      subjects: z.string().max(500).optional().or(z.literal('')),
      research: z.string().max(500).optional().or(z.literal('')),
      publications: z.string().max(1000).optional().or(z.literal('')),
    }),
    skills: z.object({
      digital: z.string().max(500).optional().or(z.literal('')),
      languages: z.string().max(500).optional().or(z.literal('')),
      tools: z.string().max(500).optional().or(z.literal('')),
    }),
    motivation: z.object({
      reason: z.string().max(1500).optional().or(z.literal('')),
      strengths: z.string().max(1000).optional().or(z.literal('')),
      availableFrom: z.string().max(80).optional().or(z.literal('')),
    }),
  }),
  cvUrl: z.string().url().optional().or(z.literal('')),
  diplomaUrl: z.string().url().optional().or(z.literal('')),
});
export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;

/* Stat */
export const statSchema = z.object({
  key: z.string().regex(slugRegex, 'Зөвхөн жижиг үсэг, тоо, зураас (-)').min(2).max(40),
  icon: z.string().min(2),
  number: z.string().min(1).max(20),
  label: z.string().min(2).max(80),
  order: z.coerce.number().int().min(0).max(999),
  active: z.coerce.boolean().or(z.literal('on').transform(() => true)).optional(),
});
export type StatInput = z.infer<typeof statSchema>;
