import {
  CONTRACT_CLOSING,
  CONTRACT_SECTIONS,
  CONTRACT_TITLE,
  DIRECTOR_APPROVAL,
  buildPreamble,
} from '@/lib/contract';

export interface ContractDocumentFields {
  academicYear: string;
  contractNo?: string | null;
  lastName: string;
  firstName: string;
  regNumber: string;
  programName: string;
  classYear: string;
  phone: string;
  schoolRep: string;
  signatureUrl?: string | null;
  signedAt?: Date | string | null;
}

/** "2026 оны 07 сарын 21-ний өдөр" хэлбэрээр огноо. */
function formatContractDate(value?: Date | string | null): string {
  if (!value) return '20___ оны ___ сарын ___-ний өдөр';
  const d = typeof value === 'string' ? new Date(value) : value;
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${d.getFullYear()} оны ${mm} сарын ${d.getDate()}-ний өдөр`;
}

function DashOr({ value }: { value: string }) {
  const v = value.trim();
  return <span>{v || '.....................'}</span>;
}

/**
 * Гэрээний албан ёсны бичвэрийг рендерлэнэ. Цэвэр presentational —
 * онлайн гарын үсэг зурах хуудсанд амьд урьдчилан харах, гарын үсэг
 * зурсны дараах хэвлэх хувилбар хоёуланд ашиглагдана. Хук эсвэл сервер
 * талын API ашиглахгүй тул сервер, client component хоёуланд орж болно.
 */
export function ContractDocument({ fields }: { fields: ContractDocumentFields }) {
  return (
    <article className="contract-doc mx-auto max-w-[820px] bg-white px-8 py-10 text-[13.5px] leading-relaxed text-neutral-900 sm:px-12 sm:py-12">
      {/* Батлав + гэрчилгээний толгой */}
      <p className="text-right text-[12px] font-semibold tracking-wide text-neutral-700">
        {DIRECTOR_APPROVAL}
      </p>

      <h1 className="mt-6 text-center text-[17px] font-bold uppercase leading-snug tracking-wide">
        {CONTRACT_TITLE}
      </h1>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2 text-[12.5px] text-neutral-700">
        <span>Улаанбаатар хот</span>
        <span>
          №&nbsp;
          <span className="font-medium">{fields.contractNo?.trim() || '____'}</span>
        </span>
        <span>{formatContractDate(fields.signedAt)}</span>
      </div>

      {/* Удиртгал */}
      <p className="mt-6 text-justify">
        {buildPreamble({
          lastName: fields.lastName,
          firstName: fields.firstName,
          regNumber: fields.regNumber,
          schoolRep: fields.schoolRep,
        })}
      </p>

      {/* Бүлгүүд */}
      {CONTRACT_SECTIONS.map((section) => (
        <section key={section.heading} className="mt-6 break-inside-avoid">
          <h2 className="mb-2 text-[14px] font-bold">{section.heading}</h2>
          <div className="space-y-2">
            {section.clauses.map((clause, i) => (
              <p key={i} className="text-justify">
                {clause}
              </p>
            ))}
          </div>
        </section>
      ))}

      <p className="mt-6 font-medium">{CONTRACT_CLOSING}</p>

      {/* Гарын үсгийн блок */}
      <div className="mt-8 break-inside-avoid">
        <p className="font-semibold">Гэрээ байгуулсан:</p>
        <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Сургууль */}
          <div className="space-y-1">
            <p className="font-semibold">СЭДС-ийг төлөөлж:</p>
            <p>Элсэлтийн албаны ажилтан</p>
            <p>
              Овог, нэр: <DashOr value={fields.schoolRep} />
            </p>
            <div className="pt-6">
              <p className="border-t border-neutral-400 pt-1 text-[12px] text-neutral-600">
                Гарын үсэг
              </p>
            </div>
          </div>

          {/* Оюутан */}
          <div className="space-y-1">
            <p className="font-semibold">Оюутан:</p>
            <p>
              Мэргэжил: <DashOr value={fields.programName} />
            </p>
            <p>
              Анги: <DashOr value={fields.classYear} />
              {'  |  '}РД: <DashOr value={fields.regNumber} />
            </p>
            <p>
              Овог: <DashOr value={fields.lastName} />
            </p>
            <p>
              Нэр: <DashOr value={fields.firstName} />
            </p>
            <p>
              Утас: <DashOr value={fields.phone} />
            </p>
            <div className="pt-2">
              {fields.signatureUrl ? (
                <div className="border-b border-neutral-400 pb-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={fields.signatureUrl}
                    alt="Оюутны гарын үсэг"
                    className="h-16 w-auto max-w-[220px] object-contain"
                  />
                </div>
              ) : (
                <div className="h-16" />
              )}
              <p className="border-t border-neutral-400 pt-1 text-[12px] text-neutral-600">
                Гарын үсэг
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
