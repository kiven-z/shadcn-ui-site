import type { PageResult } from '@/components/ui/data-table';

export interface Member {
  id: number;
  name: string;
  role: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  email: string;
}

const ROLES = ['CEO', 'CTO', 'CMO', 'CFO', 'Engineer', 'Designer', 'Product Manager'] as const;
const STATUSES: Member['status'][] = ['Active', 'On Leave', 'Inactive'];

const MEMBERS: Member[] = Array.from({ length: 80 }, (_, index) => {
  const id = index + 1;

  return {
    id,
    name: `Member ${id}`,
    role: ROLES[index % ROLES.length],
    status: STATUSES[index % STATUSES.length],
    email: `member${id}@acme.com`,
  };
});

export const STATUS_BADGE_CLASS: Record<Member['status'], string> = {
  Active: 'border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  'On Leave': 'border-transparent bg-amber-500/15 text-amber-700 dark:text-amber-400',
  Inactive: 'border-transparent bg-destructive/10 text-destructive',
};

export const EMPTY_QUERY: Record<string, never> = {};

export async function fetchMembers(query: { pageIndex: number; pageSize: number }): Promise<PageResult<Member>> {
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 280);
  });

  const start = (query.pageIndex - 1) * query.pageSize;

  return {
    list: MEMBERS.slice(start, start + query.pageSize),
    total: MEMBERS.length,
    pageNo: query.pageIndex,
    pageSize: query.pageSize,
  };
}
