'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Box, Grid } from '@mui/material'
import { ClipboardList, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react'

import PageHeader from '@/components/shared/PageHeader'
import { DataTable, DataTableColumnHeader, DataTableActions } from '@/components/common/DataTable'
import { useWorklists, useWorklistSummary } from '../hooks'
import type { WorklistFilters, WorklistItem } from '../types'
import { WorkflowCode } from '../enums/workflow-code.enum'
import { WorklistCard } from '../enums/worklist-card.enum'

interface WorklistDashboardProps {
  workflowCode: WorkflowCode
  title: string
}

const CARD_CONFIG = {
  [WorklistCard.NEED_MY_REVIEW]: {
    label: 'Need My Review',
    Icon: ClipboardList,
    colors: {
      borderActive: 'border-info',
      bgActive: 'bg-backgroundPaper',
      textActive: 'text-info',
      iconBgActive: 'bg-infoLight',
      iconColorActive: 'text-info',
      accentStrip: 'bg-info',
    }
  },
  [WorklistCard.IN_PROGRESS]: {
    label: 'In Progress',
    Icon: RefreshCw,
    colors: {
      borderActive: 'border-warning',
      bgActive: 'bg-backgroundPaper',
      textActive: 'text-warning',
      iconBgActive: 'bg-actionSelected',
      iconColorActive: 'text-warning',
      accentStrip: 'bg-warning',
    }
  },
  [WorklistCard.COMPLETED]: {
    label: 'Completed',
    Icon: CheckCircle,
    colors: {
      borderActive: 'border-success',
      bgActive: 'bg-backgroundPaper',
      textActive: 'text-success',
      iconBgActive: 'bg-successLight',
      iconColorActive: 'text-success',
      accentStrip: 'bg-success',
    }
  },
  [WorklistCard.REJECTED]: {
    label: 'Rejected',
    Icon: XCircle,
    colors: {
      borderActive: 'border-error',
      bgActive: 'bg-backgroundPaper',
      textActive: 'text-error',
      iconBgActive: 'bg-errorLight',
      iconColorActive: 'text-error',
      accentStrip: 'bg-error',
    }
  },
  [WorklistCard.OVER_SLA]: {
    label: 'Over SLA',
    Icon: Clock,
    colors: {
      borderActive: 'border-primary',
      bgActive: 'bg-backgroundPaper',
      textActive: 'text-primary',
      iconBgActive: 'bg-primaryLight',
      iconColorActive: 'text-primary',
      accentStrip: 'bg-primary',
    }
  },
}

export function WorklistDashboard({ workflowCode, title }: WorklistDashboardProps) {
  const router = useRouter()

  const [activeFilter, setActiveFilter] = useState<WorklistCard>(WorklistCard.NEED_MY_REVIEW)

  const [filters, setFilters] = useState<WorklistFilters>({
    workflowCode,
    card: activeFilter,
    page: 1,
    limit: 10,
    search: '',
  })

  const [sorting, setSorting] = useState<SortingState>([])

  const { data: summaryData } = useWorklistSummary(workflowCode)
  const { data: listData, isLoading, isError, refetch, isFetching } = useWorklists(filters)

  const worklists = listData?.data || []
  const total = listData?.total || 0

  const handleSortingChange = (updaterOrValue: any) => {
    const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue
    setSorting(newSorting)

    if (newSorting.length > 0) {
      setFilters((prev) => ({
        ...prev,
        sortBy: newSorting[0].id,
        sortDir: newSorting[0].desc ? 'desc' : 'asc',
      }))
    } else {
      setFilters((prev) => ({
        ...prev,
        sortBy: undefined,
        sortDir: undefined,
      }))
    }
  }

  const handleCardClick = (card: WorklistCard) => {
    setActiveFilter(card)
    setFilters((prev) => ({
      ...prev,
      card,
      page: 1,
    }))
  }

  const columns = useMemo<ColumnDef<WorklistItem>[]>(() => {
    const baseRequest = {
      id: 'request',
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Request" />,
      accessorFn: (row: any) => row.requestNo,
      cell: ({ row }: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-textPrimary">{row.original.requestNo}</span>
          <span className="text-xs text-textSecondary mt-0.5">{row.original.submittedDate || '-'}</span>
        </div>
      ),
    }

    const baseVendor = {
      id: 'vendor',
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Vendor" />,
      accessorFn: (row: any) => row.vendorName,
      cell: ({ row }: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-textPrimary">{row.original.vendorName}</span>
          <span className="text-xs text-textSecondary mt-0.5">{(row.original as any).vendorType || '-'}</span>
        </div>
      ),
    }

    const site = {
      accessorKey: 'site',
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Site" />,
    }

    const timelineAssignedDue = {
      id: 'timeline',
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Timeline" />,
      accessorFn: (row: any) => row.assignedDate,
      cell: ({ row }: any) => (
        <div className="flex flex-col text-xs space-y-1 w-32">
          <div className="flex justify-between items-center gap-2">
            <span className="text-textSecondary">Assigned</span>
            <span className="font-medium text-textPrimary">{(row.original as any).assignedDate || '-'}</span>
          </div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-textSecondary">Due</span>
            <span className="font-medium text-textPrimary">{(row.original as any).dueDate || '-'}</span>
          </div>
        </div>
      ),
    }

    const status = {
      id: 'status',
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Status" />,
      accessorFn: (row: any) => row.status,
      cell: ({ row }: any) => (
        <span className="text-sm font-medium text-textPrimary">{row.original.status || '-'}</span>
      )
    }

    const slaPic = {
      id: 'sla',
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="SLA PIC" />,
      accessorFn: (row: any) => (row.original as any).slaPic?.display || (row.original as any).slaPic,
      cell: ({ row }: any) => {
        const slaValue = (row.original as any).slaPic?.display || (row.original as any).slaPic || '';
        if (!slaValue) return '-';
        
        const strVal = slaValue.toString();
        let isOver = false;
        
        if (strVal.includes('/')) {
          const parts = strVal.split('/');
          if (parts.length >= 2) {
             const num1 = parseInt(parts[0]);
             const num2 = parseInt(parts[1]);
             if (!isNaN(num1) && !isNaN(num2) && num1 > num2) {
               isOver = true;
             }
          }
        } else if (strVal.includes('-')) {
          isOver = true;
        }
        
        const formatted = strVal.replace(/DAYs?/i, 'Days').trim();
        
        return (
          <div className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
            isOver ? 'bg-errorLight text-error border border-error' : 'bg-infoLight text-info border border-info'
          }`}>
            {formatted}
          </div>
        );
      },
    }

    const actionCol = {
      id: 'actions',
      header: () => <div className="text-right pr-4">Action</div>,
      cell: ({ row }: any) => (
        <div className="flex justify-end pr-2">
          <DataTableActions
            onView={() => router.push(`/worklist/${workflowCode.toLowerCase()}/${(row.original as any).workflowTransactionId || row.original.requestNo}`)}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }

    switch (activeFilter) {
      case WorklistCard.NEED_MY_REVIEW:
        return [baseRequest, baseVendor, site, timelineAssignedDue, slaPic, actionCol]
      case WorklistCard.IN_PROGRESS:
        return [baseRequest, baseVendor, status, timelineAssignedDue, slaPic, actionCol]
      case WorklistCard.COMPLETED:
        return [
          baseRequest, 
          baseVendor, 
          {
            id: 'completedDate',
            header: ({ column }: any) => <DataTableColumnHeader column={column} title="Completed Date" />,
            accessorFn: (row: any) => (row.original as any).completedDate,
            cell: ({ row }: any) => <span className="text-sm text-textPrimary">{(row.original as any).completedDate || '-'}</span>
          },
          {
            id: 'completedBy',
            header: ({ column }: any) => <DataTableColumnHeader column={column} title="Completed By" />,
            accessorFn: (row: any) => (row.original as any).completedBy,
            cell: ({ row }: any) => <span className="text-sm text-textPrimary">{(row.original as any).completedBy || '-'}</span>
          },
          {
            id: 'duration',
            header: ({ column }: any) => <DataTableColumnHeader column={column} title="Duration" />,
            accessorFn: (row: any) => (row.original as any).duration,
            cell: ({ row }: any) => <span className="text-sm text-textPrimary">{(row.original as any).duration || '-'}</span>
          },
          actionCol
        ]
      case WorklistCard.REJECTED:
        return [
          baseRequest, 
          baseVendor, 
          {
            id: 'rejectedDate',
            header: ({ column }: any) => <DataTableColumnHeader column={column} title="Rejected Date" />,
            accessorFn: (row: any) => (row.original as any).rejectedDate,
            cell: ({ row }: any) => <span className="text-sm text-textPrimary">{(row.original as any).rejectedDate || '-'}</span>
          },
          {
            id: 'rejectedBy',
            header: ({ column }: any) => <DataTableColumnHeader column={column} title="Rejected By" />,
            accessorFn: (row: any) => (row.original as any).rejectedBy,
            cell: ({ row }: any) => <span className="text-sm text-textPrimary">{(row.original as any).rejectedBy || '-'}</span>
          },
          actionCol
        ]
      case WorklistCard.OVER_SLA:
        return [
          baseRequest, 
          baseVendor, 
          status,
          {
            id: 'dueDate',
            header: ({ column }: any) => <DataTableColumnHeader column={column} title="Due Date" />,
            accessorFn: (row: any) => row.dueDate,
            cell: ({ row }: any) => <span className="text-sm font-medium text-error">{(row.original as any).dueDate || '-'}</span>
          },
          slaPic,
          {
            id: 'overBy',
            header: ({ column }: any) => <DataTableColumnHeader column={column} title="Over By" />,
            accessorFn: (row: any) => (row.original as any).overBy,
            cell: ({ row }: any) => <span className="text-sm font-medium text-error">{(row.original as any).overBy || '-'}</span>
          },
          actionCol
        ]
      default:
        return [baseRequest, baseVendor, timelineAssignedDue, actionCol]
    }
  }, [router, workflowCode, activeFilter])

  const renderCard = (card: WorklistCard, value: number | undefined) => {
    const config = CARD_CONFIG[card]
    if (!config) return null
    
    const { label, Icon, colors } = config
    const isActive = activeFilter === card

    return (
      <Grid item xs={12} sm={6} md={2.4} key={card}>
        <div
          onClick={() => handleCardClick(card)}
          className={`relative overflow-hidden cursor-pointer rounded-xl border-2 transition-all duration-300 ease-in-out h-full group flex flex-col shadow-sm ${
            isActive 
              ? `${colors.borderActive} ${colors.bgActive} shadow-md` 
              : 'border-[var(--border-color)] bg-backgroundPaper hover:border-[var(--border-color)] hover:bg-actionHover'
          }`}
        >
          {/* Accent Strip */}
          <div className={`absolute top-0 left-0 w-full h-1 ${isActive ? colors.accentStrip : 'bg-transparent group-hover:bg-actionActive transition-colors'}`} />
          
          <div className="p-5 flex flex-col h-full relative z-10">
            <div className="flex items-start justify-between mb-4">
              <span className={`text-sm font-semibold transition-colors ${isActive ? colors.textActive : 'text-textSecondary group-hover:text-textPrimary'}`}>
                {label}
              </span>
              <div className={`p-2 rounded-lg transition-colors ${isActive ? `${colors.iconBgActive} ${colors.iconColorActive}` : 'bg-actionSelected text-textSecondary group-hover:text-textPrimary'}`}>
                <Icon size={20} strokeWidth={2.5} />
              </div>
            </div>
            <div className="mt-auto">
              <span className={`text-4xl font-bold transition-colors ${isActive ? colors.textActive : 'text-textPrimary'}`}>
                {value !== undefined ? value : '-'}
              </span>
            </div>
          </div>
          {isActive && (
            <div className={`absolute -bottom-8 -right-8 opacity-10 ${colors.textActive} pointer-events-none transition-all duration-500`}>
              <Icon size={120} />
            </div>
          )}
        </div>
      </Grid>
    )
  }

  return (
    <Box className="flex flex-col p-4">
      <PageHeader
        title={title}
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Worklist' },
          { label: title },
        ]}
      />

      <Grid container spacing={2} sx={{ mb: 4, mt: 1 }}>
        {renderCard(WorklistCard.NEED_MY_REVIEW, summaryData?.needMyReview)}
        {renderCard(WorklistCard.IN_PROGRESS, summaryData?.inProgress)}
        {renderCard(WorklistCard.COMPLETED, summaryData?.completed)}
        {renderCard(WorklistCard.REJECTED, summaryData?.rejected)}
        {renderCard(WorklistCard.OVER_SLA, summaryData?.overSla)}
      </Grid>

      <DataTable
        data={worklists}
        columns={columns}
        loading={isLoading || isFetching}
        error={isError ? 'Failed to fetch worklist. Please try again.' : undefined}
        page={filters.page}
        pageSize={filters.limit}
        totalItems={total}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        onPageSizeChange={(limit) => setFilters((prev) => ({ ...prev, page: 1, limit }))}
        search={filters.search}
        onSearch={(search) => setFilters((prev) => ({ ...prev, page: 1, search }))}
        sorting={sorting}
        onSortingChange={handleSortingChange}
        onRefresh={() => refetch()}
      />
    </Box>
  )
}
