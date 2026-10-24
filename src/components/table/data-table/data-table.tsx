import type { ReactNode } from 'react';
import type { DataTableColumn, DataTableProps, DataTableSelection } from './types.ts';

import {
  FlexRender,
  createColumnHelper,
  createCoreRowModel,
  rowSelectionFeature,
  tableFeatures,
  useTable,
  type RowSelectionState,
} from '@tanstack/react-table';
import { Loader2Icon } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DataTablePagination } from './data-table-pagination.tsx';

import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

const tableFeatureSet = tableFeatures({
  rowSelectionFeature,
  coreRowModel: createCoreRowModel(),
});

function resolveRowId<T extends object>(row: T, rowKey: DataTableProps<T>['rowKey']): string {
  if (typeof rowKey === 'function') {
    return String(rowKey(row));
  }

  return String(row[rowKey]);
}

function selectionToRowState(selection: DataTableSelection | undefined): RowSelectionState {
  if (selection == null || selection === 'all') {
    return {};
  }

  const next: RowSelectionState = {};

  for (const key of selection) {
    next[String(key)] = true;
  }

  return next;
}

function rowStateToSelection(state: RowSelectionState): DataTableSelection {
  return new Set(Object.keys(state).filter((key) => state[key]));
}

function resolveCellContent<T extends object>(column: DataTableColumn<T>, row: T, index: number): ReactNode {
  const value = column.accessor == null ? undefined : row[column.accessor];

  if (column.render) {
    return column.render({ row, value, index });
  }

  if (value == null) {
    return null;
  }

  return value as ReactNode;
}

/**
 * L0 表格：列配置驱动的表体 + 受控分页（TanStack Table + shadcn Table）。
 */
export function DataTable<T extends object>({
  'aria-label': ariaLabel,
  className,
  columns,
  data,
  fill = false,
  loading = false,
  pagination = null,
  rowKey,
  selectionMode = 'none',
  selectedKeys,
  onSelectionChange,
  onPageCurrentChange,
  onPageSizeChange,
}: DataTableProps<T>) {
  const { t } = useTranslation();
  const showSelection = selectionMode !== 'none';

  const columnHelper = useMemo(() => createColumnHelper<typeof tableFeatureSet, T>(), []);

  const tableColumns = useMemo(() => {
    const dataColumns = columns.map((column) =>
      columnHelper.display({
        id: column.id,
        header: () => column.label,
        cell: ({ row }) => resolveCellContent(column, row.original, row.index),
      })
    );

    if (!showSelection) {
      return dataColumns;
    }

    return [
      columnHelper.display({
        id: '__select',
        header: ({ table }) =>
          selectionMode === 'multiple' ? (
            <Checkbox
              aria-label={t('table.selectAll')}
              checked={
                table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? 'indeterminate' : false
              }
              onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked === true)}
            />
          ) : null,
        cell: ({ row }) => (
          <Checkbox
            aria-label={t('table.selectRow', { name: resolveRowId(row.original, rowKey) })}
            checked={row.getIsSelected()}
            onCheckedChange={(checked) => row.toggleSelected(checked === true)}
          />
        ),
      }),
      ...dataColumns,
    ];
  }, [columnHelper, columns, rowKey, selectionMode, showSelection, t]);

  const table = useTable({
    features: tableFeatureSet,
    data,
    columns: tableColumns,
    getRowId: (row) => resolveRowId(row, rowKey),
    enableRowSelection: showSelection,
    enableMultiRowSelection: selectionMode === 'multiple',
    state: {
      rowSelection: selectionToRowState(selectedKeys),
    },
    onRowSelectionChange: (updater) => {
      if (!onSelectionChange) {
        return;
      }

      const previous = selectionToRowState(selectedKeys);
      const next = typeof updater === 'function' ? updater(previous) : updater;

      onSelectionChange(rowStateToSelection(next));
    },
  });

  return (
    <div className={cn('relative min-w-0', fill && 'flex h-full min-h-0 flex-1 flex-col')}>
      <div
        aria-label={ariaLabel}
        className={cn(
          'overflow-auto rounded-lg border',
          fill ? 'h-full min-h-0' : 'max-h-[min(70vh,40rem)]',
          className
        )}
        role="region"
      >
        <Table className="min-w-160">
          <TableHeader className="sticky top-0 z-10 bg-muted/80 backdrop-blur-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{header.isPlaceholder ? null : <FlexRender header={header} />}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell className="h-24 text-center text-muted-foreground" colSpan={tableColumns.length}>
                  {t('table.empty')}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {pagination ? (
        <div className="mt-3">
          <DataTablePagination
            pagination={pagination}
            onPageCurrentChange={onPageCurrentChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      ) : null}
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60">
          <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : null}
    </div>
  );
}
