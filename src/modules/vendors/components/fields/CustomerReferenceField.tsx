'use client'

import React, { useState, useMemo } from 'react'

import { useFormContext } from 'react-hook-form'
import { Box, Button, Typography, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'

import type { FieldSchema } from '../../schemas/types'
import { customerReferenceModalSchema } from '../../schemas/local/capability.schema'
import { DataTable, DataTableColumnHeader, DataTableActions } from '@/components/common/DataTable'
import DynamicForm from '../DynamicForm'

export default function CustomerReferenceField({ field }: { field: FieldSchema }) {
  return <LocalCustomerReferenceTable field={field} />
}

function LocalCustomerReferenceTable({ field }: { field: FieldSchema }) {
  const { watch, setValue, register, formState: { errors } } = useFormContext()
  
  // Explicitly register the field so react-hook-form knows it exists
  React.useEffect(() => {
    register(field.name)
  }, [register, field.name])
  
  const items = watch(field.name) || []
  
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  
  const handleOpenModal = (index: number | null) => {
    if (index !== null) {
      setEditIndex(index)
      setModalMode('update')
    } else {
      setEditIndex(null)
      setModalMode('create')
    }

    setModalOpen(true)
  }

  const handleDelete = (index: number) => {
    const newItems = [...items]

    newItems.splice(index, 1)
    setValue(field.name, newItems, { shouldDirty: true, shouldValidate: true })
  }

  const handleFormSubmit = (data: any) => {
    const newItems = [...items]
    
    if (modalMode === 'update' && editIndex !== null) {
      newItems[editIndex] = { ...items[editIndex], ...data }
    } else {
      newItems.push({
        ...data,
        id: data.id || crypto.randomUUID()
      })
    }
    
    setValue(field.name, newItems, { shouldDirty: true, shouldValidate: true })
    setModalOpen(false)
  }

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Customer Name" />,
      cell: ({ row }: any) => row.original.name || '-',
    },
    {
      accessorKey: 'year',
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Year" />,
      cell: ({ row }: any) => row.original.year || '-',
    },
    {
      accessorKey: 'projectValue',
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Project Value" />,
      cell: ({ row }: any) => {
        const val = row.original.projectValue

        if (!val) return '-'
        
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(Number(val))
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-right pr-2">Actions</div>,
      cell: ({ row }: any) => (
        <DataTableActions
          onEdit={() => handleOpenModal(row.index)}
          onDelete={() => handleDelete(row.index)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [items])

  const fieldError = errors[field.name] as any

  return (
    <Box className="w-full mt-4 flex flex-col gap-4 border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50/50 dark:bg-zinc-900/20">
      <Box className="flex justify-between items-center">
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Customer References
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage customer references to support your competency.
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<i className="ri-add-line" />}
          onClick={() => handleOpenModal(null)}
        >
          Add Reference
        </Button>
      </Box>

      {fieldError?.message && (
        <Typography color="error" variant="body2">
          {fieldError.message}
        </Typography>
      )}

      <DataTable
        data={items}
        columns={columns}
        loading={false}
        page={1}
        pageSize={10}
        totalItems={items.length}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        enableRowSelection={false}
      />

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="flex justify-between items-center p-4">
          <Typography component="span" variant="h6" fontWeight="bold">
            {modalMode === 'create' ? 'Add' : 'Edit'} Customer Reference
          </Typography>
          <IconButton onClick={() => setModalOpen(false)}>
            <i className="ri-close-line" />
          </IconButton>
        </DialogTitle>
        <DialogContent className="p-0">
          <DynamicForm
            schema={customerReferenceModalSchema}
            mode={modalMode}
            defaultValues={modalMode === 'update' && editIndex !== null ? items[editIndex] : undefined}
            onSubmit={handleFormSubmit}
            onCancel={() => setModalOpen(false)}
            showDraftButtons={false}
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}
