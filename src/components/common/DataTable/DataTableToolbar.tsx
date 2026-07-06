'use client'

import { useState, useEffect, useRef } from 'react'

import type { Table } from '@tanstack/react-table'
import { Search, RotateCw, SlidersHorizontal, Download, Eye, X, Loader2 } from 'lucide-react'
import { AppReactDatepicker } from '@/components/common/AppReactDatepicker'

import type { FilterDefinition } from './DataTable'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  search?: string
  onSearch?: (value: string) => void
  onRefresh?: () => void

  filters?: FilterDefinition[]
  filterValues?: Record<string, any>
  onFilterChange?: (values: Record<string, any>) => void

  onExportCSV?: (allRecords: boolean) => void
  onExportExcel?: (allRecords: boolean) => void
  exportLoading?: boolean
}

export function DataTableToolbar<TData>({
  table,
  search = '',
  onSearch,
  onRefresh,
  filters = [],
  filterValues = {},
  onFilterChange,
  onExportCSV,
  onExportExcel,
  exportLoading = false,
}: DataTableToolbarProps<TData>) {
  const [value, setValue] = useState(search)
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false)
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [openMultiSelectId, setOpenMultiSelectId] = useState<string | null>(null)

  const onSearchRef = useRef(onSearch)

  useEffect(() => {
    onSearchRef.current = onSearch
  }, [onSearch])

  // Sync search input value from props
  useEffect(() => {
    setValue(search)
  }, [search])

  // Debounced search trigger
  useEffect(() => {
    // Only trigger if the internal value actually differs from the external prop
    if (value !== search) {
      const handler = setTimeout(() => {
        if (onSearchRef.current) {
          onSearchRef.current(value)
        }
      }, 400)

      return () => clearTimeout(handler)
    }
  }, [value, search])

  const handleFilterValueChange = (id: string, val: any) => {
    if (!onFilterChange) return
    const next = { ...filterValues }

    if (val === '' || val === undefined || (Array.isArray(val) && val.length === 0)) {
      delete next[id]
    } else {
      next[id] = val
    }

    onFilterChange(next)
  }

  const handleDateRangeChange = (id: string, field: 'start' | 'end', val: string) => {
    if (!onFilterChange) return
    const next = { ...filterValues }
    const current = next[id] || {}
    const updated = { ...current, [field]: val }
    
    if (!updated.start && !updated.end) {
      delete next[id]
    } else {
      next[id] = updated
    }

    onFilterChange(next)
  }

  const handleResetFilters = () => {
    if (onFilterChange) {
      onFilterChange({})
    }
  }

  const hasActiveFilters = Object.keys(filterValues).length > 0

  return (
    <div className="flex flex-col w-full border-b border-[var(--border-color)] bg-backgroundPaper text-textPrimary">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-textSecondary">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search items..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-9 w-full rounded border border-[var(--border-color)] bg-transparent pl-9 pr-4 text-sm text-textPrimary placeholder-textDisabled focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded border border-[var(--border-color)] text-sm font-medium text-textPrimary bg-transparent hover:bg-actionHover transition-colors cursor-pointer"
            >
              <RotateCw className="h-4 w-4 text-textSecondary" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          )}

          {filters.length > 0 && (
            <button
              type="button"
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className={`inline-flex items-center gap-1.5 h-9 px-3 rounded border border-[var(--border-color)] text-sm font-medium transition-colors cursor-pointer ${
                isFilterPanelOpen || hasActiveFilters
                  ? 'bg-red-50 dark:bg-red-950/20 text-primary border-primary/50'
                  : 'bg-transparent text-textPrimary hover:bg-actionHover'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter</span>
              {hasActiveFilters && (
                <span className="ml-1 px-1.5 py-0.5 text-2xs font-bold bg-primary text-white rounded-full">
                  {Object.keys(filterValues).length}
                </span>
              )}
            </button>
          )}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 h-9 px-2 rounded border border-dashed border-[var(--border-color)] text-sm font-medium text-textSecondary bg-transparent hover:bg-actionHover transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* Export Dropdown */}
          {(onExportCSV || onExportExcel) && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsExportOpen(!isExportOpen)}
                disabled={exportLoading}
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded border border-[var(--border-color)] text-sm font-medium text-textPrimary bg-transparent hover:bg-actionHover transition-colors cursor-pointer disabled:opacity-50"
              >
                {exportLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <Download className="h-4 w-4 text-textSecondary" />
                )}
                <span>Export</span>
              </button>

              {isExportOpen && (
                <>
                  <div className="fixed inset-0 z-20" onClick={() => setIsExportOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 rounded border border-[var(--border-color)] bg-backgroundPaper shadow-lg z-30 py-1 text-textPrimary">
                    <div className="px-3 py-1.5 border-b border-[var(--border-color)] text-xs font-semibold text-textSecondary uppercase tracking-wider">
                      Export Formats
                    </div>
                    {onExportCSV && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            onExportCSV(false)
                            setIsExportOpen(false)
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-actionHover cursor-pointer border-0 bg-transparent text-textPrimary"
                        >
                          Export CSV (Current Page)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onExportCSV(true)
                            setIsExportOpen(false)
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-actionHover cursor-pointer border-0 bg-transparent text-textPrimary"
                        >
                          Export CSV (All Records)
                        </button>
                      </>
                    )}
                    <div className="border-t border-[var(--border-color)] my-1" />
                    {onExportExcel && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            onExportExcel(false)
                            setIsExportOpen(false)
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-actionHover cursor-pointer border-0 bg-transparent text-textPrimary"
                        >
                          Export Excel (Current Page)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onExportExcel(true)
                            setIsExportOpen(false)
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-actionHover cursor-pointer border-0 bg-transparent text-textPrimary"
                        >
                          Export Excel (All Records)
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Column Visibility Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsVisibilityOpen(!isVisibilityOpen)}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded border border-[var(--border-color)] text-sm font-medium text-textPrimary bg-transparent hover:bg-actionHover transition-colors cursor-pointer"
            >
              <Eye className="h-4 w-4 text-textSecondary" />
              <span className="hidden sm:inline">Columns</span>
            </button>

            {isVisibilityOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsVisibilityOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 rounded border border-[var(--border-color)] bg-backgroundPaper shadow-lg z-30 py-1 text-textPrimary">
                  <div className="px-3 py-1.5 border-b border-[var(--border-color)] text-xs font-semibold text-textSecondary uppercase tracking-wider">
                    Toggle Columns
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {table
                      .getAllColumns()
                      .filter((col) => col.getCanHide())
                      .map((col) => {
                        return (
                          <label
                            key={col.id}
                            className="flex items-center gap-2 px-3 py-1.5 hover:bg-actionHover cursor-pointer select-none"
                          >
                            <input
                              type="checkbox"
                              checked={col.getIsVisible()}
                              onChange={(e) => col.toggleVisibility(!!e.target.checked)}
                              className="rounded border-[var(--border-color)] text-primary focus:ring-primary cursor-pointer"
                            />
                            <span className="text-sm text-textPrimary capitalize">
                              {col.id}
                            </span>
                          </label>
                        )
                      })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Collapsible Filter Panel */}
      {isFilterPanelOpen && filters.length > 0 && (
        <div className="border-t border-[var(--border-color)] bg-backgroundDefault/50 p-4 transition-all duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filters.map((filter) => {
              return (
                <div key={filter.id} className="flex flex-col gap-1.5 relative">
                  <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider select-none">
                    {filter.label}
                  </label>

                  {/* Render based on filter type */}
                  {filter.type === 'text' && (
                    <input
                      type="text"
                      placeholder={filter.placeholder || `Search ${filter.label}...`}
                      value={filterValues[filter.id] || ''}
                      onChange={(e) => handleFilterValueChange(filter.id, e.target.value)}
                      className="h-9 w-full rounded border border-[var(--border-color)] bg-backgroundPaper px-3 text-sm text-textPrimary placeholder-textDisabled focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  )}

                  {filter.type === 'select' && (
                    <select
                      value={filterValues[filter.id] || ''}
                      onChange={(e) => handleFilterValueChange(filter.id, e.target.value)}
                      className="h-9 w-full rounded border border-[var(--border-color)] bg-backgroundPaper px-3 text-sm text-textPrimary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                    >
                      <option value="">All</option>
                      {filter.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {filter.type === 'multi-select' && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenMultiSelectId(openMultiSelectId === filter.id ? null : filter.id)}
                        className="flex items-center justify-between h-9 w-full rounded border border-[var(--border-color)] bg-backgroundPaper px-3 text-sm text-textPrimary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-left cursor-pointer"
                      >
                        <span className="truncate">
                          {(() => {
                            const selected = filterValues[filter.id] || []

                            if (selected.length === 0) return filter.placeholder || 'Select options...'

                            if (selected.length === 1) {
                              const match = filter.options?.find(o => String(o.value) === String(selected[0]))

                              
return match ? match.label : selected[0]
                            }

                            
return `${selected.length} Selected`
                          })()}
                        </span>
                        <SlidersHorizontal className="h-3.5 w-3.5 text-textSecondary" />
                      </button>

                      {openMultiSelectId === filter.id && (
                        <>
                          <div className="fixed inset-0 z-20" onClick={() => setOpenMultiSelectId(null)} />
                          <div className="absolute left-0 mt-1 w-full rounded border border-[var(--border-color)] bg-backgroundPaper shadow-lg z-30 max-h-48 overflow-y-auto py-1">
                            {filter.options?.map((opt) => {
                              const selected = filterValues[filter.id] || []
                              const isChecked = selected.includes(opt.value)

                              return (
                                <label
                                  key={opt.value}
                                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-actionHover cursor-pointer select-none text-sm text-textPrimary"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                      const next = isChecked
                                        ? selected.filter((x: any) => x !== opt.value)
                                        : [...selected, opt.value]

                                      handleFilterValueChange(filter.id, next.length > 0 ? next : undefined)
                                    }}
                                    className="rounded border-[var(--border-color)] text-primary focus:ring-primary cursor-pointer"
                                  />
                                  <span>{opt.label}</span>
                                </label>
                              )
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {filter.type === 'date' && (
                    <AppReactDatepicker
                      value={filterValues[filter.id] ? [new Date(filterValues[filter.id])] : []}
                      onChange={(dates: Date[]) => {
                        if (dates.length > 0) {
                          // Format to YYYY-MM-DD for standard input values
                          const d = dates[0]
                          const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
                          handleFilterValueChange(filter.id, formatted)
                        } else {
                          handleFilterValueChange(filter.id, '')
                        }
                      }}
                      className="h-9 w-full rounded border border-[var(--border-color)] bg-backgroundPaper px-3 text-sm text-textPrimary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                    />
                  )}

                  {filter.type === 'date-range' && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-full">
                        <AppReactDatepicker
                          value={(filterValues[filter.id] as any)?.start ? [new Date((filterValues[filter.id] as any).start)] : []}
                          onChange={(dates: Date[]) => {
                            if (dates.length > 0) {
                              const d = dates[0]
                              const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
                              handleDateRangeChange(filter.id, 'start', formatted)
                            } else {
                              handleDateRangeChange(filter.id, 'start', '')
                            }
                          }}
                          className="h-9 w-full rounded border border-[var(--border-color)] bg-backgroundPaper px-2 text-xs text-textPrimary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                        />
                      </div>
                      <span className="text-textSecondary text-xs select-none">to</span>
                      <div className="w-full">
                        <AppReactDatepicker
                          value={(filterValues[filter.id] as any)?.end ? [new Date((filterValues[filter.id] as any).end)] : []}
                          onChange={(dates: Date[]) => {
                            if (dates.length > 0) {
                              const d = dates[0]
                              const formatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
                              handleDateRangeChange(filter.id, 'end', formatted)
                            } else {
                              handleDateRangeChange(filter.id, 'end', '')
                            }
                          }}
                          className="h-9 w-full rounded border border-[var(--border-color)] bg-backgroundPaper px-2 text-xs text-textPrimary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
