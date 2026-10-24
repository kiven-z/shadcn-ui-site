import type { DataTablePagination as DataTablePaginationValue } from './types.ts';

import { useTranslation } from 'react-i18next';

import { DEFAULT_PAGE_SIZES } from './constants.ts';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataTablePaginationProps {
  pagination: DataTablePaginationValue;
  onPageCurrentChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

type PageItem = number | 'ellipsis';

/**
 * 生成带省略号的页码序列。
 */
function buildPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: PageItem[] = [1];

  if (currentPage > 3) {
    items.push('ellipsis');
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (currentPage < totalPages - 2) {
    items.push('ellipsis');
  }

  items.push(totalPages);

  return items;
}

/**
 * 把 total / pageSize / currentPage 编成分页控件，含每页条数。
 */
export function DataTablePagination({ pagination, onPageCurrentChange, onPageSizeChange }: DataTablePaginationProps) {
  const { t } = useTranslation();
  const { currentPage, pageSize, total } = pagination;
  const pageSizes = pagination.pageSizes ?? DEFAULT_PAGE_SIZES;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startItem = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  return (
    <div className="flex w-full flex-wrap items-center gap-3">
      <Select
        value={String(pageSize)}
        onValueChange={(value) => {
          onPageSizeChange?.(Number(value));
        }}
      >
        <SelectTrigger aria-label={t('table.pageSizeLabel')} className="w-36" size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {pageSizes.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {t('table.pageSize', { size })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Pagination className="mx-0 min-w-0 flex-1 justify-start sm:justify-end">
        <PaginationContent className="flex-wrap">
          <PaginationItem>
            <span className="me-2 text-sm text-muted-foreground">
              {t('table.summary', { start: startItem, end: endItem, total })}
            </span>
          </PaginationItem>
          <PaginationItem>
            {currentPage <= 1 ? (
              <Button disabled size="default" variant="ghost">
                {t('table.previous')}
              </Button>
            ) : (
              <PaginationPrevious
                href="#"
                text={t('table.previous')}
                onClick={(event) => {
                  event.preventDefault();
                  onPageCurrentChange?.(currentPage - 1);
                }}
              />
            )}
          </PaginationItem>
          {buildPageItems(currentPage, totalPages).map((item, index) =>
            item === 'ellipsis' ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <Button
                  size="icon"
                  variant={item === currentPage ? 'outline' : 'ghost'}
                  onClick={() => onPageCurrentChange?.(item)}
                >
                  {item}
                </Button>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            {currentPage >= totalPages ? (
              <Button disabled size="default" variant="ghost">
                {t('table.next')}
              </Button>
            ) : (
              <PaginationNext
                href="#"
                text={t('table.next')}
                onClick={(event) => {
                  event.preventDefault();
                  onPageCurrentChange?.(currentPage + 1);
                }}
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
