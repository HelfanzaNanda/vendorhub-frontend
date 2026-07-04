'use client'

import { Loader2 } from 'lucide-react'

export function DataTableLoading() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-backgroundPaper/50 backdrop-blur-[1px] transition-all">
      <div className="flex flex-col items-center gap-2 rounded border border-[var(--border-color)] bg-backgroundPaper p-4 shadow-md text-textPrimary">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="text-xs font-medium text-textSecondary">Loading data...</span>
      </div>
    </div>
  )
}
