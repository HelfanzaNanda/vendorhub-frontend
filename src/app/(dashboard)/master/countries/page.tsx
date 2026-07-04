'use client'

import { useState, useMemo } from 'react'

import { useRouter } from 'next/navigation'

import type { ColumnDef, SortingState, RowSelectionState } from '@tanstack/react-table'
import { Box } from '@mui/material'
import { toast } from 'sonner'

import PageHeader from '@/components/shared/PageHeader'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useCountries, useDeleteCountry } from '@/features/country/hooks'
import { countryApi } from '@/features/country/api'
import type { CountryFilters, Country } from '@/features/country/types'
import { DataTable, DataTableColumnHeader, DataTableActions } from '@/components/common/DataTable'
import type { FilterDefinition } from '@/components/common/DataTable'

export default function CountryListPage() {
  const router = useRouter()

  const [filters, setFilters] = useState<CountryFilters>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: 'name',
    sortDir: 'asc',
  })

  const [sorting, setSorting] = useState<SortingState>([
    { id: 'name', desc: false },
  ])

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [deleteId, setDeleteId] = useState<string | number | null>(null)
  const [bulkDeleteRows, setBulkDeleteRows] = useState<Country[] | null>(null)
  const [isBulkDeleting, setIsBulkDeleting] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)

  const filtersDefinition = useMemo<FilterDefinition[]>(
    () => [
      {
        id: 'iso2Code',
        label: 'ISO 2 Code',
        type: 'text',
        placeholder: 'e.g. US',
      },
      {
        id: 'phoneCode',
        label: 'Phone Code',
        type: 'text',
        placeholder: 'e.g. 1',
      },
    ],
    []
  )

  // Queries & Mutations
  const { data, isLoading, isError, refetch, isFetching } = useCountries(filters)
  const { mutate: deleteCountry, isPending: isDeleting } = useDeleteCountry()

  const countries = data?.countries || []
  const total = data?.total || 0

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

  const columns = useMemo<ColumnDef<Country>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
            className="rounded border-zinc-300 dark:border-zinc-700 text-red-600 focus:ring-red-500 cursor-pointer"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(!!e.target.checked)}
            className="rounded border-zinc-300 dark:border-zinc-700 text-red-600 focus:ring-red-500 cursor-pointer"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Country Name" />
        ),
      },
      {
        accessorKey: 'iso2Code',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ISO 2 Code" />
        ),
      },
      {
        accessorKey: 'phoneCode',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Phone Code" />
        ),
        cell: ({ row }) => row.original.phoneCode || '-',
      },
      {
        id: 'actions',
        header: () => <div className="text-right pr-2">Actions</div>,
        cell: ({ row }) => (
          <DataTableActions
            onView={() => router.push(`/master/countries/${row.original.id}`)}
            onEdit={() => router.push(`/master/countries/${row.original.id}/edit`)}
            onDelete={() => setDeleteId(row.original.id)}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [router]
  )

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteCountry(deleteId, {
        onSuccess: () => {
          setDeleteId(null)
        },
      })
    }
  }

  const handleBulkDeleteConfirm = async () => {
    if (!bulkDeleteRows) return
    setIsBulkDeleting(true)

    try {
      await Promise.all(
        bulkDeleteRows.map((row) =>
          countryApi.deleteCountry(row.id)
        )
      )
      toast.success('Selected countries deleted successfully')
      setRowSelection({})
      refetch()
    } catch (err: any) {
      toast.error('Failed to delete some countries')
    } finally {
      setIsBulkDeleting(false)
      setBulkDeleteRows(null)
    }
  }

  const handleExportCSV = async (allRecords: boolean) => {
    if (allRecords) {
      setExportLoading(true)

      try {
        const response = await countryApi.getCountries({
          page: 1,
          limit: 100000,
          search: filters.search,
          sortBy: filters.sortBy,
          sortDir: filters.sortDir,
          iso2Code: filters.iso2Code,
          phoneCode: filters.phoneCode,
        })

        const allCountries = response.data?.countries || []
        const { exportToCSV } = await import('@/utils/export')

        exportToCSV(allCountries, columns, 'countries_all')
        toast.success('Successfully exported all countries to CSV')
      } catch (err) {
        toast.error('Failed to export countries to CSV')
      } finally {
        setExportLoading(false)
      }
    }
  }

  const handleExportExcel = async (allRecords: boolean) => {
    if (allRecords) {
      setExportLoading(true)

      try {
        const response = await countryApi.getCountries({
          page: 1,
          limit: 100000,
          search: filters.search,
          sortBy: filters.sortBy,
          sortDir: filters.sortDir,
          iso2Code: filters.iso2Code,
          phoneCode: filters.phoneCode,
        })

        const allCountries = response.data?.countries || []
        const { exportToExcel } = await import('@/utils/export')

        exportToExcel(allCountries, columns, 'countries_all')
        toast.success('Successfully exported all countries to Excel')
      } catch (err) {
        toast.error('Failed to export countries to Excel')
      } finally {
        setExportLoading(false)
      }
    }
  }

  return (
    <Box className="flex flex-col p-4">
      {/* Header */}
      <PageHeader
        title="Countries"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Master' },
          { label: 'Countries' },
        ]}
        actionLabel="Add Country"
        actionHref="/master/countries/create"
        actionIcon={<i className="ri-add-line" />}
      />

      {/* Reusable Premium DataTable */}
      <DataTable
        data={countries}
        columns={columns}
        loading={isLoading || isFetching}
        error={isError ? 'Failed to fetch countries. Please try again.' : undefined}
        page={filters.page}
        pageSize={filters.limit}
        totalItems={total}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        onPageSizeChange={(limit) => setFilters((prev) => ({ ...prev, page: 1, limit }))}
        search={filters.search}
        onSearch={(search) => setFilters((prev) => ({ ...prev, page: 1, search }))}
        sorting={sorting}
        onSortingChange={handleSortingChange}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        onRefresh={() => refetch()}
        onBulkDelete={(rows) => setBulkDeleteRows(rows)}
        filters={filtersDefinition}
        filterValues={useMemo(() => {
          const rest = { ...filters } as any

          delete rest.page
          delete rest.limit
          delete rest.search
          delete rest.sortBy
          delete rest.sortDir

          return rest
        }, [filters])}
        onFilterChange={(newFilters) => {
          setFilters((prev) => {
            const next = { ...prev } as any
            const keysToKeep = ['page', 'limit', 'search', 'sortBy', 'sortDir']

            Object.keys(next).forEach((k) => {
              if (!keysToKeep.includes(k)) {
                delete next[k]
              }
            })

            return {
              ...next,
              page: 1,
              ...newFilters,
            }
          })
        }}
        onExportCSV={handleExportCSV}
        onExportExcel={handleExportExcel}
        exportLoading={exportLoading}
      />

      {/* Single Delete Confirmation Modal */}
      <ConfirmDialog
        open={deleteId !== null}
        title="Confirm Delete"
        message="Are you sure you want to delete this country? This action is permanent and cannot be undone."
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        confirmColor="error"
      />

      {/* Bulk Delete Confirmation Modal */}
      <ConfirmDialog
        open={bulkDeleteRows !== null}
        title="Confirm Bulk Delete"
        message={`Are you sure you want to delete the ${bulkDeleteRows?.length} selected countries? This action is permanent and cannot be undone.`}
        onClose={() => setBulkDeleteRows(null)}
        onConfirm={handleBulkDeleteConfirm}
        isLoading={isBulkDeleting}
        confirmColor="error"
      />
    </Box>
  )
}
