'use client'

import { Box, Pagination as MuiPagination, Typography } from '@mui/material'

interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return (
      <Box className="flex justify-between items-center p-4 border-t">
        <Typography variant="body2" color="text.secondary">
          Showing {totalItems} of {totalItems} items
        </Typography>
      </Box>
    )
  }

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <Box className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t">
      <Typography variant="body2" color="text.secondary">
        Showing {startItem}-{endItem} of {totalItems} items
      </Typography>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        shape="rounded"
        size="medium"
      />
    </Box>
  )
}
