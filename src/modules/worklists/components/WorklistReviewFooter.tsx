import React, { useState, useContext } from 'react'
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material'
import { useRouter } from 'next/navigation'
import { WorklistReviewContext } from '../context'
import { useSubmitAction } from '../hooks'
import { toast } from 'sonner'

interface WorklistReviewFooterProps {
  workflowTransactionId: string
}

export default function WorklistReviewFooter({ workflowTransactionId }: WorklistReviewFooterProps) {
  const router = useRouter()
  const { worklistData } = useContext(WorklistReviewContext)
  const submitActionMutation = useSubmitAction()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [decision, setDecision] = useState('')
  const [remark, setRemark] = useState('')
  const [vendorCategory, setVendorCategory] = useState('')

  const handleOpenModal = () => {
    // Validation: ideally check if all sections have review statuses.
    // For now, we open the modal and let backend handle strict validation or we could implement a local context check
    setIsModalOpen(true)
  }

  const handleSubmit = () => {
    if (!decision) {
      toast.error('Please select a decision.')
      return
    }

    if (!remark) {
      toast.error('Remark is required for all decisions.')
      return
    }

    submitActionMutation.mutate({
      id: workflowTransactionId,
      payload: { 
        action: decision, 
        remark,
        vendorCategory // if required
      }
    }, {
      onSuccess: () => {
        toast.success(`Action ${decision} submitted successfully.`)
        setIsModalOpen(false)
        router.push('/worklist')
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || 'Failed to submit action. Please ensure all sections have been reviewed.'
        toast.error(msg)
      }
    })
  }

  // Only show if user has permission
  if (!worklistData?.permission?.canAction) {
    return null
  }

  return (
    <>
      <Box className="fixed bottom-0 left-0 right-0 md:left-64 z-50 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-end gap-3 px-8">
        <Button variant="outlined" color="inherit" onClick={() => router.back()}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleOpenModal} className="px-8 font-bold">
          Submit Review
        </Button>
      </Box>

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="font-bold border-b pb-4">Submit Review Decision</DialogTitle>
        <DialogContent className="pt-6 flex flex-col gap-5 mt-2">
          
          <FormControl fullWidth>
            <InputLabel>Decision</InputLabel>
            <Select
              value={decision}
              label="Decision"
              onChange={(e) => setDecision(e.target.value)}
            >
              <MenuItem value="APPROVE">Approve</MenuItem>
              <MenuItem value="REJECT">Reject</MenuItem>
              <MenuItem value="REVISE">Revise</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Vendor Category</InputLabel>
            <Select
              value={vendorCategory}
              label="Vendor Category"
              onChange={(e) => setVendorCategory(e.target.value)}
            >
              <MenuItem value="A">Category A</MenuItem>
              <MenuItem value="B">Category B</MenuItem>
              <MenuItem value="C">Category C</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Remark"
            required
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter your final remark here..."
          />

        </DialogContent>
        <DialogActions className="p-4 pt-0">
          <Button onClick={() => setIsModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={submitActionMutation.isPending || !decision || !remark}
          >
            {submitActionMutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
