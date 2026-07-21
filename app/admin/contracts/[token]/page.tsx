import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/admin/PageHeader';
import { OfficerSignClient } from '@/components/admin/OfficerSignClient';
import { ContractDocument } from '@/components/geree/ContractDocument';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Гэрээ' };

export default async function AdminContractDetailPage({
  params,
}: {
  params: { token: string };
}) {
  const contract = await prisma.studentContract
    .findUnique({ where: { token: params.token } })
    .catch(() => null);

  if (!contract) notFound();

  const studentName = `${contract.lastName} ${contract.firstName}`.trim() || 'Оюутан';
  const officerSigned = Boolean(contract.schoolSignatureUrl);

  return (
    <>
      <PageHeader
        title={studentName}
        subtitle={`${contract.programName || '—'} · ${contract.classYear}-р анги · ${contract.academicYear}`}
        breadcrumb={[
          { label: 'Хянах самбар', href: '/admin/dashboard' },
          { label: 'Оюутны гэрээ', href: '/admin/contracts' },
          { label: studentName },
        ]}
        action={
          <Link
            href={`/geree/${contract.token}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-button border border-border-light bg-cream-soft px-4 py-2 text-sm font-semibold text-text-body transition-colors hover:bg-cream"
          >
            <ExternalLink className="h-4 w-4 text-gold-500" />
            Элсэгчийн хуудас нээх
          </Link>
        }
      />

      <div className="space-y-6">
        {/* Статус */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-medium text-text-body">Төлөв:</span>
          {contract.status === 'SIGNED' ? (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              Баталгаажсан (элсэгч зурсан)
            </span>
          ) : officerSigned ? (
            <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-200">
              Элсэгчийн гарын үсэг хүлээгдэж буй
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
              Ажилтны гарын үсэг хүлээгдэж буй
            </span>
          )}
        </div>

        {/* Ажилтны гарын үсэг / холбоос — гэрээ баталгаажаагүй үед */}
        {contract.status !== 'SIGNED' && (
          <OfficerSignClient
            token={contract.token}
            initialSchoolRep={contract.schoolRep}
            signed={officerSigned}
          />
        )}

        {/* Гэрээний урьдчилан харах */}
        <div>
          <p className="mb-2 text-sm font-semibold text-text-body">Гэрээний харагдац</p>
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
      </div>
    </>
  );
}
