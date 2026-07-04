'use client'

import type { Table } from '@tanstack/react-table'

import { Select, MenuItem, type SelectChangeEvent } from '@mui/material'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { cn } from '@/utils/cn'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  page: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export function DataTablePagination<TData>({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps<TData>) {
  const totalPages = Math.ceil(totalItems / pageSize)
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const endItem = Math.min(page * pageSize, totalItems)

  const getPageNumbers = () => {
    const pageNumbers: number[] = []
    const maxVisible = 5
    let start = Math.max(1, page - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-t border-[var(--border-color)] bg-backgroundPaper text-textPrimary text-sm">
      {/* Left side: Range Info */}
      <div className="text-textSecondary">
        Showing <span className="font-semibold text-textPrimary">{startItem}</span>–
        <span className="font-semibold text-textPrimary">{endItem}</span> of{' '}
        <span className="font-semibold text-textPrimary">{totalItems}</span> entries
      </div>

      {/* Right side: Controls */}
      <div className="flex flex-wrap items-center gap-4 md:gap-6">
        {/* Page size selector */}
        <div className="flex items-center space-x-2">
          <span className="text-textSecondary text-xs">Rows per page:</span>
          <Select
            size="small"
            value={pageSize}
            onChange={(e: SelectChangeEvent<number>) => onPageSizeChange(Number(e.target.value))}
            sx={{
              height: 32,
              '& .MuiSelect-select': {
                py: 0,
                pl: 1,
                pr: 3,
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.875rem'
              }
            }}
          >
            {[10, 25, 50, 100].map((size) => (
              <MenuItem key={size} value={size} sx={{ fontSize: '0.875rem' }}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* Buttons Controls */}
        <div className="flex items-center space-x-1">
          {/* First Page */}
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={page <= 1}
            className="h-8 w-8 rounded flex items-center justify-center border border-[var(--border-color)] text-textSecondary hover:bg-actionHover disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>

          {/* Previous Page */}
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="h-8 w-8 rounded flex items-center justify-center border border-[var(--border-color)] text-textSecondary hover:bg-actionHover disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Page numbers */}
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={cn(
                'h-8 w-8 rounded flex items-center justify-center border text-xs font-medium transition-colors cursor-pointer',
                page === pageNum
                  ? 'bg-primary text-white border-primary'
                  : 'border-[var(--border-color)] text-textSecondary hover:bg-actionHover'
              )}
            >
              {pageNum}
            </button>
          ))}

          {/* Next Page */}
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="h-8 w-8 rounded flex items-center justify-center border border-[var(--border-color)] text-textSecondary hover:bg-actionHover disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Last Page */}
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={page >= totalPages}
            className="h-8 w-8 rounded flex items-center justify-center border border-[var(--border-color)] text-textSecondary hover:bg-actionHover disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
