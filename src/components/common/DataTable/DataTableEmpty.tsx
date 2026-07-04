'use client'

import { Inbox } from 'lucide-react'

interface DataTableEmptyProps {
  message?: string
  colSpan: number
}

export function DataTableEmpty({ message = 'No data available', colSpan }: DataTableEmptyProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="h-48 text-center p-8">
        <div className="flex flex-col items-center justify-center space-y-3 text-textDisabled">
          <Inbox className="h-10 w-10 stroke-[1.5]" />
          <div className="text-sm font-medium text-textSecondary">{message}</div>
        </div>
      </td>
    </tr>
  )
}
