import { Badge } from '@/components/ui/Badge';
import type { ContentStatus, Role } from '@prisma/client';

const STATUS_LABEL: Record<ContentStatus, string> = {
  DRAFT: 'Ноорог',
  PUBLISHED: 'Нийтлэгдсэн',
  ARCHIVED: 'Архивласан',
};

const STATUS_VARIANT: Record<ContentStatus, 'gold' | 'navy' | 'cream' | 'outline'> = {
  DRAFT: 'cream',
  PUBLISHED: 'navy',
  ARCHIVED: 'outline',
};

export function StatusBadge({ status }: { status: ContentStatus }) {
  return <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>;
}

const ROLE_LABEL: Record<Role, string> = {
  ADMIN: 'Захирагч',
  EDITOR: 'Редактор',
  LIBRARIAN: 'Номын санч',
  RESEARCHER: 'Судлаач',
};

export function RoleBadge({ role }: { role: Role }) {
  return <Badge variant={role === 'ADMIN' ? 'gold' : 'cream'}>{ROLE_LABEL[role]}</Badge>;
}
