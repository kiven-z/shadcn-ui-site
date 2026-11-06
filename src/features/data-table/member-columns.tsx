import type { DataTableProps } from '@/components/table/data-table';

import { type Member, STATUS_BADGE_CLASS } from './members';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function createMemberColumns(onEdit: (member: Member) => void): DataTableProps<Member>['columns'] {
  return [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'role', header: 'Role' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <Badge className={STATUS_BADGE_CLASS[status]} variant="outline">
            {status}
          </Badge>
        );
      },
    },
    { accessorKey: 'email', header: 'Email' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <Button size="sm" variant="ghost" onClick={() => onEdit(row.original)}>
          Edit
        </Button>
      ),
    },
  ];
}
