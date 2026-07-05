'use client'

import { useState, useMemo } from 'react'

import type { SortingState, RowSelectionState } from '@tanstack/react-table'
import { Box, Card, CardContent, Typography, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'

import type { DatatableConfig } from '../schemas/types'
import { useCrudTable } from '../hooks/useCrudTable'
import { DataTable, DataTableColumnHeader, DataTableActions } from '@/components/common/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import DynamicForm from './DynamicForm'

interface VendorCrudTableProps {
  config: DatatableConfig
}

export default function VendorCrudTable({ config }: VendorCrudTableProps) {
  // Listing query and search states
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  // Modal and CRUD states
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create')
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  
  // Delete states
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<any | null>(null)
  const [bulkDeleteRows, setBulkDeleteRows] = useState<any[] | null>(null)
  const [isBulkDeleting, setIsBulkDeleting] = useState(false)

  // Memoize filters sent to API
  const filters = useMemo(() => {
    const base: Record<string, any> = {
      page,
      limit: pageSize,
      search,
      sortBy: sorting[0]?.id || undefined,
      sortDir: sorting[0]?.id ? (sorting[0].desc ? 'desc' : 'asc') : undefined,
    }
    
    // Auto-filter by personnel type if using personnel endpoint
    if (config.apiEndpoint.startsWith('/vendor-personnel-temp')) {
      base.personnelTypeCode = config.id
    }
    
    return base
  }, [page, pageSize, search, sorting, config.apiEndpoint, config.id])

  // CRUD Hook using the datatable specific apiEndpoint
  const {
    rows,
    total,
    isLoading,
    isError,
    refetch,
    isFetching,
    createMutation,
    updateMutation,
    deleteMutation,
    isCreating,
    isUpdating,
    isDeleting,
  } = useCrudTable<any>(config.apiEndpoint, filters)

  // Build columns definition dynamically
  const columns = useMemo(() => {
    const list: any[] = []

    // 1. Bulk Selection Checkbox
    if (config.canDelete) {
      list.push({
        id: 'select',
        header: ({ table }: any) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
            className="rounded border-zinc-300 dark:border-zinc-700 text-red-600 focus:ring-red-500 cursor-pointer"
          />
        ),
        cell: ({ row }: any) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={(e) => row.toggleSelected(!!e.target.checked)}
            className="rounded border-zinc-300 dark:border-zinc-700 text-red-600 focus:ring-red-500 cursor-pointer"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      })
    }

    // 2. Fields accessor columns
    config.columns.forEach((col) => {
      list.push({
        accessorKey: col.accessorKey,
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title={col.header} />
        ),
        cell: ({ row }: any) => {
          const val = row.original[col.accessorKey]

          if (val === undefined || val === null) return '-'
          
          if (col.cell === 'currency') {
            return new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(Number(val))
          }
          
          if (col.cell === 'percentage') {
            return `${val}%`
          }
          
          if (col.cell === 'date') {
            return val ? new Date(val).toLocaleDateString('id-ID') : '-'
          }
          
          return String(val)
        },
      })
    })

    // 3. Row action column
    list.push({
      id: 'actions',
      header: () => <div className="text-right pr-2">Actions</div>,
      cell: ({ row }: any) => (
        <DataTableActions
          onView={() => {
            setSelectedItem(row.original)
            setModalMode('view')
            setModalOpen(true)
          }}
          onEdit={() => {
            setSelectedItem(row.original)
            setModalMode('edit')
            setModalOpen(true)
          }}
          onDelete={config.canDelete ? () => {
            setItemToDelete(row.original)
            setDeleteConfirmOpen(true)
          } : undefined}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    })

    return list
  }, [config])

  // Mutation Handlers
  const handleFormSubmit = (data: any) => {
    const payload = { ...data }
    
    // Automatically attach personnelTypeCode if this is personnel table
    if (config.apiEndpoint.startsWith('/vendor-personnel-temp')) {
      payload.personnelTypeCode = config.id
    }

    if (modalMode === 'create') {
      createMutation.mutate(payload, {
        onSuccess: () => {
          setModalOpen(false)
          refetch()
        },
      })
    } else if (modalMode === 'edit' && selectedItem) {
      // Inject source into the update payload so backend knows whether it's from MASTER or TEMP
      const updateData = { ...payload, source: selectedItem.source }
      
      updateMutation.mutate(
        { id: selectedItem.id, data: updateData },
        {
          onSuccess: () => {
            setModalOpen(false)
            setSelectedItem(null)
            refetch()
          },
        }
      )
    }
  }

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      deleteMutation.mutate(
        { id: itemToDelete.id, data: { source: itemToDelete.source } }, 
        {
          onSuccess: () => {
          setDeleteConfirmOpen(false)
          setItemToDelete(null)
          refetch()
        },
      })
    }
  }

  const handleBulkDeleteConfirm = async () => {
    if (!bulkDeleteRows) return
    setIsBulkDeleting(true)

    try {
      const { createCrudService } = await import('../services/vendorCrud.service')
      const service = createCrudService(config.apiEndpoint)
      
      await Promise.all(bulkDeleteRows.map((row) => service.remove(row.id, { source: row.source })))
      setRowSelection({})
      refetch()
    } catch {
      // Handled by service or generic UI catch
    } finally {
      setIsBulkDeleting(false)
      setBulkDeleteRows(null)
    }
  }

  return (
    <Box className="flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col gap-4">
          <Box className="flex justify-between items-center flex-wrap gap-2">
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {config.title}
              </Typography>
              {config.description && (
                <Typography variant="body2" color="text.secondary">
                  {config.description}
                </Typography>
              )}
            </Box>
            <Button
              variant="contained"
              startIcon={<i className="ri-add-line" />}
              onClick={() => {
                setSelectedItem(null)
                setModalMode('create')
                setModalOpen(true)
              }}
            >
              Add New
            </Button>
          </Box>

          <DataTable
            data={rows}
            columns={columns}
            loading={isLoading || isFetching}
            error={isError ? 'Failed to load records. Please try again.' : undefined}
            page={page}
            pageSize={pageSize}
            totalItems={total}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size)
              setPage(1)
            }}
            search={search}
            onSearch={(val) => {
              setSearch(val)
              setPage(1)
            }}
            sorting={sorting}
            onSortingChange={setSorting}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
            onRefresh={() => refetch()}
            onBulkDelete={(rows) => setBulkDeleteRows(rows)}
          />
        </CardContent>
      </Card>

      {/* Modal Dialog for Create/Edit/View */}
      {config.modalFormSchema && (
        <Dialog
          open={modalOpen}
          onClose={() => !isCreating && !isUpdating && setModalOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle className="flex justify-between items-center p-4">
            <Typography component="span" variant="h6" fontWeight="bold">
              {modalMode === 'create' ? 'Add' : modalMode === 'edit' ? 'Edit' : 'View'}{' '}
              {config.title}
            </Typography>
            <IconButton onClick={() => setModalOpen(false)}>
              <i className="ri-close-line" />
            </IconButton>
          </DialogTitle>
          <DialogContent className="p-0">
            <DynamicForm
              schema={config.modalFormSchema}
              mode={modalMode === 'view' ? 'view' : modalMode === 'create' ? 'create' : 'update'}
              defaultValues={
                selectedItem
                  ? { ...selectedItem }
                  : config.apiEndpoint.startsWith('/vendor-personnel-temp')
                    ? { personnelTypeCode: config.id }
                    : undefined
              }
              onSubmit={handleFormSubmit}
              onCancel={() => setModalOpen(false)}
              showDraftButtons={false}
              isLoading={isCreating || isUpdating}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this record? This action cannot be undone."
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        confirmColor="error"
      />

      {/* Bulk Delete Confirmation Dialog */}
      <ConfirmDialog
        open={bulkDeleteRows !== null}
        title="Confirm Bulk Delete"
        message={`Are you sure you want to delete the ${bulkDeleteRows?.length} selected records?`}
        onClose={() => setBulkDeleteRows(null)}
        onConfirm={handleBulkDeleteConfirm}
        isLoading={isBulkDeleting}
        confirmColor="error"
      />
    </Box>
  )
}
