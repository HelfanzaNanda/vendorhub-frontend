'use client'

import React, { useState, useMemo } from 'react'

import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
  IconButton
} from '@mui/material'

import type { FieldSchema } from '../../schemas/types'
import { useLookup } from '../../hooks/useLookup'
import { DataTable, DataTableColumnHeader } from '@/components/common/DataTable'

export default function IndustryClassificationField({ field }: { field: FieldSchema }) {
  const { watch, setValue, formState: { errors } } = useFormContext()
  const items: any[] = watch(field.name) || []
  const fieldError = errors[field.name] as any

  // Search input state for the Autocomplete
  const [searchValue, setSearchValue] = useState<any>(null)

  // Fetch options for the autocomplete
  const { options, isLoading } = useLookup('industry-classifications')

  const handleSelect = (event: any, newValue: any) => {
    if (!newValue) {
      setSearchValue(null)
      return
    }

    // Check for duplicates
    const isDuplicate = items.some(
      (item) => item.industryClassificationId === newValue.value
    )

    if (isDuplicate) {
      toast.error('This Industry Classification has already been added. Please select a different Industry Classification.')
    } else {
      const newItem = {
        industryClassificationId: newValue.value,
        number: newValue.data?.label || '',
        title: newValue.data?.name || '',
        description: newValue.data?.description || '',
      }

      setValue(field.name, [...items, newItem], { shouldValidate: true })
    }

    // Always clear the search box after selection
    setSearchValue(null)
  }

  const handleRemove = (index: number) => {
    const newItems = [...items]
    newItems.splice(index, 1)
    setValue(field.name, newItems, { shouldValidate: true })
  }

  const columns = useMemo(() => [
    {
      accessorKey: 'number',
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Number" />,
      cell: ({ row }: any) => row.original.number || '-',
    },
    {
      accessorKey: 'title',
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Title" />,
      cell: ({ row }: any) => row.original.title || '-',
    },
    {
      accessorKey: 'description',
      header: ({ column }: any) => <DataTableColumnHeader column={column} title="Description" />,
      cell: ({ row }: any) => (
        <span className="line-clamp-2" title={row.original.description}>
          {row.original.description || '-'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-right pr-2">Actions</div>,
      cell: ({ row }: any) => (
        <div className="flex justify-end">
          <IconButton 
            size="small" 
            color="error" 
            onClick={() => handleRemove(row.index)}
            title="Remove"
          >
            <i className="ri-delete-bin-line" />
          </IconButton>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [items])

  return (
    <Box className="w-full flex flex-col gap-6">
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          {field.label}
        </Typography>

        <Autocomplete
          id={`${field.id}-search`}
          options={options}
          getOptionLabel={(option) => option.label || String(option.value)}
          isOptionEqualToValue={(option, val) => String(option.value) === String(val.value)}
          value={searchValue}
          onChange={handleSelect}
          disabled={field.disabled || isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Industry Classification..."
              placeholder="Start typing to search..."
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />

        {fieldError?.root && (
          <Typography color="error" variant="body2" className="mt-2">
            {fieldError.root.message}
          </Typography>
        )}
        
        {fieldError?.message && !Array.isArray(fieldError) && (
          <Typography color="error" variant="body2" className="mt-2">
            {fieldError.message}
          </Typography>
        )}
      </Box>

      <Box className="border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50/50 dark:bg-zinc-900/20 overflow-hidden">
        <DataTable
          data={items}
          columns={columns}
          loading={false}
          page={1}
          pageSize={items.length || 10}
          totalItems={items.length}
          onPageChange={() => {}}
          onPageSizeChange={() => {}}
          enableRowSelection={false}
          getRowId={(row: any) => String(row.industryClassificationId)}
          toolbar={false}
          emptyMessage="No industry classifications selected. Search above to add one."
        />
      </Box>
    </Box>
  )
}
