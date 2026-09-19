import { useEffect, useMemo, useState } from 'react';

import { createMemberColumns } from './member-columns';
import { EMPTY_QUERY, fetchMembers, type Member } from './members';

import { DataTable, usePaginationState } from '@/components/ui/data-table';
import { Dialog } from '@/components/ui/dialog';

export function DataTableDemo() {
  const [editing, setEditing] = useState<Member | null>(null);
  const columns = useMemo(() => createMemberColumns(setEditing), []);

  const selectableState = usePaginationState<Member>({
    fetchApi: fetchMembers,
    searchForm: EMPTY_QUERY,
    defaultPageSize: 10,
  });
  const plainState = usePaginationState<Member>({
    fetchApi: fetchMembers,
    searchForm: EMPTY_QUERY,
    defaultPageSize: 10,
  });

  useEffect(() => {
    void selectableState.fetchTableData();
    void plainState.fetchTableData();
  }, [selectableState.fetchTableData, plainState.fetchTableData]);

  function handleEditOpenChange(open: boolean) {
    if (!open) {
      setEditing(null);
    }
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="w-full rounded-xl border bg-card p-4">
        <p className="m-0 mb-3 truncate text-base font-semibold">Members</p>
        <DataTable
          aria-label="Members"
          columns={columns}
          data={selectableState.tableData}
          loading={selectableState.loading}
          pagination={selectableState.pagination}
          rowKey="id"
          selectedKeys={selectableState.selectedKeys}
          selectionMode="multiple"
          onPageCurrentChange={selectableState.handlePageCurrentChange}
          onPageSizeChange={selectableState.handlePageSizeChange}
          onSelectionChange={selectableState.handleSelectionChange}
        />
      </div>

      <div className="w-full rounded-xl border bg-card p-4">
        <p className="m-0 mb-3 truncate text-base font-semibold">Members (no selection)</p>
        <DataTable
          aria-label="Members without selection"
          columns={columns}
          data={plainState.tableData}
          loading={plainState.loading}
          pagination={plainState.pagination}
          rowKey="id"
          onPageCurrentChange={plainState.handlePageCurrentChange}
          onPageSizeChange={plainState.handlePageSizeChange}
        />
      </div>

      <Dialog hideFooter open={editing !== null} title="Edit" onOpenChange={handleEditOpenChange}>
        <p className="text-sm text-muted-foreground">{editing?.email}</p>
      </Dialog>
    </div>
  );
}
