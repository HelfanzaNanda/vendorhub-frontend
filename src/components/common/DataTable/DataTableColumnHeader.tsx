'use client'

import type { Column } from '@tanstack/react-table'

import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/utils/cn'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const isSorted = column.getIsSorted()

  const handleSortClick = () => {
    if (isSorted === 'desc') {
      column.clearSorting()
    } else {
      column.toggleSorting(isSorted === 'asc')
    }
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <button
        type="button"
        onClick={handleSortClick}
        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors"
      >
        <span>{title}</span>
        {isSorted === 'desc' ? (
          <ArrowDown className="h-3.5 w-3.5 text-red-600 dark:text-red-500" />
        ) : isSorted === 'asc' ? (
          <ArrowUp className="h-3.5 w-3.5 text-red-600 dark:text-red-500" />
        ) : (
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
        )}
      </button>
    </div>
  )
}
