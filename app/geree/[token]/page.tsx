import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { formatMNDate } from '@/lib/utils';
import { ContractDocument } from '@/components/geree/ContractDocument';
import { ContractSignClient } from '@/components/geree/ContractSignClient';
import { PrintButton } from '@/components/geree/PrintButton';

export const dynamic = 'force-dynamic';

export default async function GereePage({
  params,
}: {
  params: { token: string };
}) {
  const contract = await prisma.studentContract
    .findUnique({ where: { token: params.token } })
    .catch(() => null);

  if (!contract) notFound();

  // Аль хэдийн гарын үсэг зурсан бол — баталгаажсан гэрээ + PDF татах.
  if (contract.status === 'SIGNED') {
    return (
      <div className="space-y-6">
        <div className="no-print flex flex-col gap-4 rounded-card border border-emerald-200 bg-emerald-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
            <div>
              <h1 className="text-lg font-bold text-navy-900">
                Гэрээ баталгаажсан
              </h1>
              <p className="text-sm text-text-body">
                {contract.signedAt
                  ? `${formatMNDate(contract.signedAt, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}-нд гарын үсэг зурсан.`
                  : 'Гарын үсэг зурсан.'}
              </p>
            </div>
          </div>
          <PrintButton />
        </div>

        <div className="rounded-card border border-border-light bg-white shadow-sm">
          <ContractDocument
            fields={{
              academicYear: contract.academicYear,
              contractNo: contract.contractNo,
              lastName: contract.lastName,
              firstName: contract.firstName,
              regNumber: contract.regNumber,
              programName: contract.programName,
              classYear: contract.classYear,
              phone: contract.phone,
              schoolRep: contract.schoolRep,
              schoolSignatureUrl: contract.schoolSignatureUrl,
              signatureUrl: contract.signatureUrl,
              signedAt: contract.signedAt,
            }}
          />
        </div>
      </div>
    );
  }

  // Гарын үсэг зураагүй — бөглөх, унших, зурах урсгал.
  return (
    <div className="space-y-6">
      <div className="rounded-card border border-border-light bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-navy-900">
          Оюутан суралцах, суралцуулах гэрээ
        </h1>
        <p className="mt-1 text-sm text-text-body">
          {contract.academicYear} оны хичээлийн жил ·{' '}
          <span className="font-medium">
            {`${contract.lastName} ${contract.firstName}`.trim() || 'Оюутан'}
          </span>
        </p>
        <p className="mt-3 text-sm text-text-muted">
          Мэдээллээ шалгаж, гэрээтэй бүрэн танилцсаны дараа доор гарын үсгээ
          зурж баталгаажуулна уу.
        </p>
      </div>

      <ContractSignClient
        contract={{
          token: contract.token,
          academicYear: contract.academicYear,
          contractNo: contract.contractNo,
          lastName: contract.lastName,
          firstName: contract.firstName,
          regNumber: contract.regNumber,
          programName: contract.programName,
          classYear: contract.classYear,
          phone: contract.phone,
          email: contract.email,
          schoolRep: contract.schoolRep,
          schoolSignatureUrl: contract.schoolSignatureUrl,
        }}
      />
    </div>
  );
}
