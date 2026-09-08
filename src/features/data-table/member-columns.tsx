import type { DataTableColumn } from '@/components/ui/data-table';

import { type Member, STATUS_BADGE_CLASS } from './members';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { addDialog } from '@/components/ui/dialog';

export const memberColumns: DataTableColumn<Member>[] = [
  { id: 'name', accessor: 'name', label: 'Name', isRowHeader: true },
  { id: 'role', accessor: 'role', label: 'Role' },
  {
    id: 'status',
    accessor: 'status',
    label: 'Status',
    render: ({ row }) => (
      <Badge className={STATUS_BADGE_CLASS[row.status]} variant="outline">
        {row.status}
      </Badge>
    ),
  },
  { id: 'email', accessor: 'email', label: 'Email' },
  {
    id: 'actions',
    label: 'Actions',
    render: ({ row }) => (
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          addDialog({
            title: 'Edit',
            hideFooter: true,
            content: <p className="text-sm text-muted-foreground">{row.email}</p>,
          });
        }}
      >
        Edit
      </Button>
    ),
  },
];
