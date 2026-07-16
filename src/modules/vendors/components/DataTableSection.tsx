'use client'

import { Box, Typography } from '@mui/material'

import type { DatatableConfig } from '../schemas/types'
import VendorCrudTable from './VendorCrudTable'

interface DataTableSectionProps {
  configs: DatatableConfig[]
}

export default function DataTableSection({ configs }: DataTableSectionProps) {
  return (
    <Box className="flex flex-col h-full gap-4">
      {configs.map((config) => (
        <VendorCrudTable
          key={config.id}
          config={config}
        />
      ))}
    </Box>
  )
}
