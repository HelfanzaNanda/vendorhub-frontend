'use client'

interface DataTableSkeletonProps {
  columnsCount: number
  rowsCount?: number
}

export function DataTableSkeleton({ columnsCount, rowsCount = 5 }: DataTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rowsCount }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-[var(--border-color)]">
          {Array.from({ length: columnsCount }).map((_, colIndex) => (
            <td key={colIndex} className="p-4">
              <div className="h-4 bg-actionHover rounded animate-pulse w-full max-w-[80%]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}
