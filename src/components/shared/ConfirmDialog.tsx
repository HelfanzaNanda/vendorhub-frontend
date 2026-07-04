'use client'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress } from '@mui/material'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
  confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
}

export default function ConfirmDialog({
  open,
  title,
  message,
  onClose,
  onConfirm,
  isLoading = false,
  confirmColor = 'primary',
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={() => !isLoading && onClose()}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions className="p-4 pt-0">
        <Button onClick={onClose} color="secondary" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color={confirmColor}
          variant="contained"
          disabled={isLoading}
          sx={{ minWidth: 80 }}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
