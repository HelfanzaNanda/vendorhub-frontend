import React, { useEffect } from 'react'
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
  Button, TextField, Autocomplete, Box, Typography, alpha, useTheme
} from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonIcon from '@mui/icons-material/Person'
import BusinessIcon from '@mui/icons-material/Business'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import BadgeIcon from '@mui/icons-material/Badge'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { delegateWorklistSchema, DelegateWorklistFormData } from '../schemas/delegate-worklist.schema'
import { useDelegateUsers, useDelegateWorklist } from '../hooks/useDelegateWorklist'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { DelegationUser } from '../context'

interface WorklistDelegateDialogProps {
  open: boolean
  onClose: () => void
  workflowTransactionId: number
  workflowTransactionStepId: number
}

export default function WorklistDelegateDialog({ open, onClose, workflowTransactionId, workflowTransactionStepId }: WorklistDelegateDialogProps) {
  const router = useRouter()
  const theme = useTheme()
  
  const { 
    control, handleSubmit, watch, reset, formState: { errors } 
  } = useForm<DelegateWorklistFormData>({
    resolver: zodResolver(delegateWorklistSchema),
    defaultValues: {
      delegateUserId: undefined,
      reason: ''
    }
  })

  const delegateUserId = watch('delegateUserId')

  const { data: users = [], isLoading: loadingUsers } = useDelegateUsers(workflowTransactionStepId, open)
  const delegateMutation = useDelegateWorklist()

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      reset()
    }
  }, [open, reset])

  const onSubmit = (data: DelegateWorklistFormData) => {
    const payload = {
      delegateUserId: data.delegateUserId,
    //   reason: data.reason
    }

    delegateMutation.mutate({ workflowTransactionId, workflowTransactionStepId, payload }, {
      onSuccess: () => {
        toast.success('Task delegated successfully')
        onClose()
        delegateMutation.reset()
        reset()
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || 'Failed to delegate task')
      }
    })
  }

  const selectedUser = users?.find?.((u: any) => u.id === delegateUserId)

  return (
    <Dialog open={open} onClose={!delegateMutation.isPending ? onClose : undefined} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
          <PersonAddIcon color="primary" /> Delegate Task
        </DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 4, pt: 3 }}>
          <DialogContentText>
            Delegate this workflow to another eligible user. The selected user will become the new actor for the current workflow step.
          </DialogContentText>

          <Controller
            name="delegateUserId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={Array.isArray(users) ? users : []}
                getOptionLabel={(option: DelegationUser) =>  `${option.firstname} ${option.lastname}` || ''}
                loading={loadingUsers}
                onChange={(_, newValue) => field.onChange(newValue?.id || undefined)}
                value={Array.isArray(users) ? (users.find((c: DelegationUser) => c.id === field.value) || null) : null}
                renderOption={(props, option) => {
                    const { key, ...rest } = props
                    return (
                        <Box
                            key={key}
                            component="li"
                            {...rest}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                py: 1,
                            }}
                            >
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {option.firstname} {option.lastname}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {option.email}
                            </Typography>
                            </Box>
                        )
                }}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Delegate User" 
                    required 
                    error={!!errors.delegateUserId}
                    helperText={errors.delegateUserId?.message}
                    placeholder="Search user by name..."
                  />
                )}
                slotProps={{
                    listbox : {
                        sx: {
                            '& li': {
                                textAlign: 'left !important',   
                                justifyContent: 'flex-start !important', 
                            },
                        },
                    }
                }}
              />
            )}
          />

          {selectedUser && (
            <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.05), border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.2), borderRadius: 2 }}>
              <Typography variant="subtitle2" color="primary" sx={{ mb: 2, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.75rem' }}>
                Delegate To
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon color="action" /> {selectedUser.firstname} {selectedUser.lastname}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <BusinessIcon color="action" fontSize="small" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Site</Typography>
                    <Typography variant="body2" fontWeight="500">{selectedUser.site.name}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AlternateEmailIcon color="action" fontSize="small" />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Email</Typography>
                    <Typography variant="body2" fontWeight="500">{selectedUser.email}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Reason"
                multiline
                minRows={3}
                maxRows={5}
                placeholder="Explain why this task is being delegated..."
                required
                error={!!errors.reason}
                helperText={errors.reason?.message}
                fullWidth
              />
            )}
          />

        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} variant="outlined" color="inherit" disabled={delegateMutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={delegateMutation.isPending}>
            {delegateMutation.isPending ? 'Delegating...' : 'Delegate'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
