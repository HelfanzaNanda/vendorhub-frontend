'use client'

import { Box, Typography } from '@mui/material'

import { useVendorStore } from '../store/vendorStore'
import type { DatatableConfig } from '../schemas/types'
import VendorCrudTable from './VendorCrudTable'

interface DataTableSectionProps {
  configs: DatatableConfig[]
}

export default function DataTableSection({ configs }: DataTableSectionProps) {
  const { vendorId } = useVendorStore()

  if (!vendorId) {
    return (
      <Box className="p-12 text-center h-full flex flex-col items-center justify-center">
        <i className="ri-lock-2-line text-6xl text-gray-300 mb-4" />
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Section Locked
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Unable to identify Vendor Context. Please save the Company Information first.
        </Typography>
      </Box>
    )
  }

  return (
    <Box className="flex flex-col h-full gap-8 p-6">
      {configs.map((config) => (
        <VendorCrudTable
          key={config.id}
          config={config}
        />
      ))}
    </Box>
  )
}
