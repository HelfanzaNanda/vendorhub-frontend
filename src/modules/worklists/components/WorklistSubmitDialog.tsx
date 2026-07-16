import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { 
  Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
  Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
  Autocomplete, Box, FormHelperText
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'sonner'

import { AxiosError } from 'axios'

import type { SubmitWorklistFormData } from '../schemas/submit-worklist.schema';
import { submitWorklistSchema } from '../schemas/submit-worklist.schema'
import { useVendorCategories, useVendorCategoryItems, useSubmitWorklist } from '../hooks/useSubmitWorklist'


import { WorklistReviewContext } from '../context'
import { worklistProfileSchema } from '../schemas'


interface WorklistSubmitDialogProps {
  open: boolean
  onClose: () => void
  workflowTransactionId: string
}

export default function WorklistSubmitDialog({ open, onClose, workflowTransactionId }: WorklistSubmitDialogProps) {
  const router = useRouter()
  const { setReviewValidation, setActiveTab } = React.useContext(WorklistReviewContext)
  
  const { 
    control, handleSubmit, watch, setValue, reset, formState: { errors } 
  } = useForm<SubmitWorklistFormData>({
    resolver: zodResolver(submitWorklistSchema),
    defaultValues: {
      status: undefined,
      vendorCategoryId: undefined,
      vendorCategoryItemId: undefined,
      priority: 'NON_VIP',
      remarks: ''
    }
  })

  const status = watch('status')
  const vendorCategoryId = watch('vendorCategoryId')

  const { data: categories = [], isLoading: loadingCategories } = useVendorCategories()
  const { data: categoryItems = [], isLoading: loadingItems } = useVendorCategoryItems(vendorCategoryId || '')
  const submitMutation = useSubmitWorklist()

  // Reset fields when status changes from APPROVED to something else
  useEffect(() => {
    if (status !== 'APPROVED') {
      setValue('vendorCategoryId', undefined)
      setValue('vendorCategoryItemId', undefined)
      setValue('priority', 'NON_VIP')
    }
  }, [status, setValue])

  // Reset item when category changes
  useEffect(() => {
    setValue('vendorCategoryItemId', undefined)
  }, [vendorCategoryId, setValue])

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      reset()
    }
  }, [open, reset])

  const onSubmit = (data: SubmitWorklistFormData) => {
    const payload = {
      status: data.status,
      vendorCategoryItemId: data.status === 'APPROVED' ? data.vendorCategoryItemId : undefined,
      priority: data.status === 'APPROVED' ? data.priority : undefined,
      remarks: data.remarks
    }

    submitMutation.mutate({ id: workflowTransactionId, payload }, {
        onSuccess: () => {
            toast.success('Worklist submitted successfully')
            if (setReviewValidation) setReviewValidation(null)
            onClose()
            router.push('/worklist/vendor-registration')
        },
        onError: (err : any) => {
            const status = err?.response?.status
            const data = err?.response?.data
            
            if (status === 422 && data?.reviewValidation) {
                toast.error(data.message || 'Review belum selesai.')
                
                if (setReviewValidation) {
                    setReviewValidation(data.reviewValidation)
                }
            
                // Auto navigate to first tab with pending reviews
                if (setActiveTab) {
                    const tabs = worklistProfileSchema.tabs

                    const firstPendingTabIndex = tabs.findIndex(tab => {
                        const tabValidation = data.reviewValidation[tab.id]

                        if (typeof tabValidation === 'number' && tabValidation > 0) return true
                        if (tabValidation && typeof tabValidation === 'object' && tabValidation.pendingReviews > 0) return true
                        
return false
                    })

                    if (firstPendingTabIndex !== -1) {
                        setActiveTab(firstPendingTabIndex)
                    }

                    onClose()
                }
            } else {
                toast.error(data?.message || 'Failed to submit worklist')
            }
        }
    })
  }

  return (
    <Dialog open={open} onClose={!submitMutation.isPending ? onClose : undefined} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Submit Review</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <DialogContentText>
            Please complete the information below before submitting this workflow.
          </DialogContentText>

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl error={!!errors.status}>
                <FormLabel required>Status</FormLabel>
                <RadioGroup row {...field} value={field.value || ''}>
                  <FormControlLabel value="APPROVED" control={<Radio />} label="Approve" />
                  <FormControlLabel value="REJECTED" control={<Radio />} label="Reject" />
                  <FormControlLabel value="REVISED" control={<Radio />} label="Revise (Return to Vendor)" />
                </RadioGroup>
                {errors.status && <FormHelperText>{errors.status.message}</FormHelperText>}
              </FormControl>
            )}
          />

          {status === 'APPROVED' && (
            <>
              <Controller
                name="vendorCategoryId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={categories}
                    loading={loadingCategories}
                    onChange={(_, newValue) => field.onChange(newValue?.value || '')}
                    value={categories.find((c: any) => c.value === field.value) || null}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        label="Vendor Category" 
                        required 
                        error={!!errors.vendorCategoryId}
                        helperText={errors.vendorCategoryId?.message}
                      />
                    )}
                  />
                )}
              />

              <Controller
                name="vendorCategoryItemId"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={categoryItems}
                    loading={loadingItems}
                    disabled={!vendorCategoryId}
                    onChange={(_, newValue) => field.onChange(newValue?.value || '')}
                    value={categoryItems.find((c: any) => c.value === field.value) || null}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        label="Vendor Category Item" 
                        required 
                        error={!!errors.vendorCategoryItemId}
                        helperText={errors.vendorCategoryItemId?.message}
                      />
                    )}
                  />
                )}
              />

              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <FormControl error={!!errors.priority}>
                    <FormLabel required>Priority</FormLabel>
                    <RadioGroup row {...field} value={field.value || ''}>
                      <FormControlLabel value="VIP" control={<Radio />} label="VIP" />
                      <FormControlLabel value="NON_VIP" control={<Radio />} label="NON VIP" />
                    </RadioGroup>
                    {errors.priority && <FormHelperText>{errors.priority.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </>
          )}

          <Controller
            name="remarks"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Remarks"
                multiline
                minRows={3}
                maxRows={6}
                placeholder="Enter remarks..."
                required={status === 'REJECTED' || status === 'REVISED'}
                error={!!errors.remarks}
                helperText={errors.remarks?.message}
                fullWidth
              />
            )}
          />

        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} variant="outlined" color="inherit" disabled={submitMutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={submitMutation.isPending}>
            {submitMutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
