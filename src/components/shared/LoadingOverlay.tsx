'use client'

import { Box, CircularProgress } from '@mui/material'

interface LoadingOverlayProps {
  visible: boolean
}

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  if (!visible) {
    return null
  }

  return (
    <Box
      className="absolute inset-0 flex items-center justify-center z-50"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(1px)',
      }}
    >
      <CircularProgress />
    </Box>
  )
}
