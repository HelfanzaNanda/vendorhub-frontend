'use client'

import { useTransition, useState, useEffect, useMemo } from 'react'

// eslint-disable-next-line import/named
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import type { ColumnDef, SortingState, RowSelectionState } from '@tanstack/react-table'
import { AlertCircle, RotateCw, Trash } from 'lucide-react'

import { cn } from '@/utils/cn'

import { DataTableToolbar } from './DataTableToolbar'
import { DataTablePagination } from './DataTablePagination'
import { DataTableEmpty } from './DataTableEmpty'
import { DataTableLoading } from './DataTableLoading'
import { DataTableSkeleton } from './DataTableSkeleton'

export interface FilterOption {
  label: string
  value: string | number
}

export type FilterType = 'text' | 'select' | 'multi-select' | 'date' | 'date-range'

export interface FilterDefinition {
  id: string
  label: string
  type: FilterType
  placeholder?: string
  options?: FilterOption[]
}

interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]

  loading?: boolean
  error?: string

  page: number
  pageSize: number
  totalItems: number

  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void

  search?: string
  onSearch?: (value: string) => void

  sorting?: SortingState
  onSortingChange?: (sorting: SortingState | ((prev: SortingState) => SortingState)) => void

  rowSelection?: RowSelectionState
  onRowSelectionChange?: (selection: RowSelectionState | ((prev: RowSelectionState) => RowSelectionState)) => void
  onSelectedRowsChange?: (selectedRows: T[]) => void

  toolbar?: boolean
  emptyMessage?: string

  onRefresh?: () => void
  onBulkDelete?: (selectedRows: T[]) => void

  filters?: FilterDefinition[]
  filterValues?: Record<string, any>
  onFilterChange?: (values: Record<string, any>) => void

  onExportCSV?: (allRecords: boolean) => void
  onExportExcel?: (allRecords: boolean) => void
  exportLoading?: boolean

  getRowId?: (row: T) => string
  enableRowSelection?: boolean
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  error,
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  search,
  onSearch,
  sorting,
  onSortingChange,
  rowSelection,
  onRowSelectionChange,
  onSelectedRowsChange,
  toolbar = true,
  emptyMessage,
  onRefresh,
  onBulkDelete,
  filters,
  filterValues = {},
  onFilterChange,
  onExportCSV,
  onExportExcel,
  exportLoading = false,
  getRowId,
  enableRowSelection,
}: DataTableProps<T>) {
  const [, startTransition] = useTransition()

  // Keep a cache of selected row objects across pages
  const [selectedRowsCache, setSelectedRowsCache] = useState<Record<string, T>>({})

  // Update selectedRowsCache when rowSelection or data changes
  useEffect(() => {
    setSelectedRowsCache((prev) => {
      const next = { ...prev }
      let changed = false

      // Add newly selected items from data to cache
      data.forEach((item: any) => {
        const id = String(item.id || item.uuid || item._id)

        if (rowSelection && rowSelection[id]) {
          if (!next[id]) {
            next[id] = item
            changed = true
          }
        }
      })

      // Clean up items that are no longer selected
      Object.keys(next).forEach((id) => {
        if (!rowSelection || !rowSelection[id]) {
          delete next[id]
          changed = true
        }
      })

      return changed ? next : prev
    })
  }, [data, rowSelection])

  // Expose selected rows
  const selectedRows = useMemo(() => {
    return Object.values(selectedRowsCache)
  }, [selectedRowsCache])

  // Call onSelectedRowsChange when selection updates
  useEffect(() => {
    onSelectedRowsChange?.(selectedRows)
  }, [selectedRows, onSelectedRowsChange])

  // Initialize TanStack table
  const table = useReactTable({
    data,
    columns,
    state: {
      ...(sorting !== undefined && { sorting }),
      ...(rowSelection !== undefined && { rowSelection }),
    },
    enableRowSelection: enableRowSelection ?? !!onRowSelectionChange,
    getRowId: getRowId || ((row: any) => {
      const id = row.id || row.uuid || row._id
      if (!id) {
        console.warn('DataTable: Row is missing a unique id. Please provide a stable unique id for each row or use the getRowId prop.')
      }
      return String(id)
    }),
    onSortingChange: (updater) => {
      startTransition(() => {
        onSortingChange?.(updater)
      })
    },
    onRowSelectionChange: (updater) => {
      startTransition(() => {
        onRowSelectionChange?.(updater)
      })
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
  })

  const columnsCount = table.getAllColumns().length

  const handleExportCSV = (allRecords: boolean) => {
    if (allRecords) {
      onExportCSV?.(true)
    } else {
      import('@/utils/export').then(({ exportToCSV }) => {
        exportToCSV(data, columns, 'export')
      })
    }
  }

  const handleExportExcel = (allRecords: boolean) => {
    if (allRecords) {
      onExportExcel?.(true)
    } else {
      import('@/utils/export').then(({ exportToExcel }) => {
        exportToExcel(data, columns, 'export')
      })
    }
  }

  return (
    <div className="w-full rounded-md border border-[var(--border-color)] bg-backgroundPaper shadow-sm overflow-hidden flex flex-col transition-all duration-300">
      {/* Bulk Actions Toolbar */}
      {selectedRows.length > 0 && onBulkDelete && (
        <div className="flex items-center justify-between px-4 py-3 bg-red-50 dark:bg-red-950/20 border-b border-[var(--border-color)] transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-red-700 dark:text-red-300">
              Selected {selectedRows.length} {selectedRows.length === 1 ? 'row' : 'rows'}
            </span>
            <button
              type="button"
              onClick={() => {
                if (onRowSelectionChange) {
                  onRowSelectionChange({})
                }
              }}
              className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 underline cursor-pointer bg-transparent border-0 p-0"
            >
              Clear selection
            </button>
          </div>
          <button
            type="button"
            onClick={() => onBulkDelete(selectedRows)}
            disabled={selectedRows.length === 0}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded bg-red-600 hover:bg-red-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-800 disabled:text-zinc-500 dark:disabled:text-zinc-500 text-xs font-semibold text-white transition-colors cursor-pointer border-0"
          >
            <Trash className="h-3.5 w-3.5" />
            Delete Selected
          </button>
        </div>
      )}

      {/* Optional Toolbar */}
      {toolbar && (
        <DataTableToolbar
          table={table}
          search={search}
          onSearch={(val) => {
            startTransition(() => {
              onSearch?.(val)
            })
          }}
          onRefresh={onRefresh}
          filters={filters}
          filterValues={filterValues}
          onFilterChange={onFilterChange}
          onExportCSV={handleExportCSV}
          onExportExcel={handleExportExcel}
          exportLoading={exportLoading}
        />
      )}

      {/* Main Table Area */}
      <div className="relative overflow-x-auto flex-1 max-h-[600px] scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        <table className="w-full border-collapse text-left text-sm text-textPrimary min-w-[600px]">
          {/* Sticky Header */}
          <thead className="sticky top-0 bg-backgroundDefault border-b border-[var(--border-color)] z-10 transition-colors">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSelectCol = header.column.id === 'select'
                  const isActionsCol = header.column.id === 'actions'

                  return (
                    <th
                      key={header.id}
                      className={cn(
                        'px-4 py-3 font-semibold text-xs text-textSecondary uppercase tracking-wider',
                        isSelectCol && 'sticky left-0 bg-backgroundDefault z-20 w-12 border-r border-[var(--border-color)]',
                        isActionsCol && 'sticky right-0 bg-backgroundDefault z-20 w-16 border-l border-[var(--border-color)] text-right'
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[var(--border-color)] bg-backgroundPaper transition-colors">
            {error ? (
              <tr>
                <td colSpan={columnsCount} className="p-8">
                  <div className="flex flex-col items-center justify-center space-y-3 text-red-500 dark:text-red-400">
                    <AlertCircle className="h-10 w-10 animate-bounce" />
                    <div className="text-sm font-semibold">{error}</div>
                    {onRefresh && (
                      <button
                        type="button"
                        onClick={onRefresh}
                        className="inline-flex items-center gap-1.5 h-8 px-3 rounded bg-red-50 dark:bg-red-950/30 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors border-0"
                      >
                        <RotateCw className="h-3.5 w-3.5" />
                        Retry
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : loading && data.length === 0 ? (
              <DataTableSkeleton columnsCount={columnsCount} rowsCount={pageSize} />
            ) : data.length === 0 ? (
              <DataTableEmpty message={emptyMessage} colSpan={columnsCount} />
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    'hover:bg-actionHover transition-colors',
                    row.getIsSelected() && 'bg-actionSelected'
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isSelectCol = cell.column.id === 'select'
                    const isActionsCol = cell.column.id === 'actions'

                    return (
                      <td
                        key={cell.id}
                        className={cn(
                          'px-4 py-3.5 text-textPrimary font-medium max-w-[300px] truncate',
                          isSelectCol && 'sticky left-0 bg-backgroundPaper z-10 w-12 border-r border-[var(--border-color)]',
                          isActionsCol && 'sticky right-0 bg-backgroundPaper z-10 w-16 border-l border-[var(--border-color)] text-right'
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Dynamic Loading Overlay during refetches */}
        {loading && data.length > 0 && <DataTableLoading />}
      </div>

      {/* Pagination Controls */}
      {!error && (
        <DataTablePagination
          table={table}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  )
}
