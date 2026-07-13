import React, { useState, useContext } from 'react'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { WorklistReviewContext } from '../context'
import WorklistSubmitDialog from './WorklistSubmitDialog'
import WorklistDelegateDialog from './WorklistDelegateDialog'

interface WorklistReviewFooterProps {
  workflowTransactionId: string
}

export default function WorklistReviewFooter({ workflowTransactionId }: WorklistReviewFooterProps) {
  const router = useRouter()
  const { worklistData } = useContext(WorklistReviewContext)

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [isDelegateModalOpen, setIsDelegateModalOpen] = useState(false)

  const canSubmit = worklistData?.permissions?.canSubmit ?? false
  const canDelegate = worklistData?.permissions?.canDelegate ?? false

  // Only show footer if at least one permission is true
  if (!canSubmit && !canDelegate) {
    return null
  }

  return (
    <>
      <Box className="fixed bottom-0 left-0 right-0 md:left-64 z-50 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex justify-end gap-3 px-8">
        <Button variant="outlined" color="inherit" onClick={() => router.back()}>
          Cancel
        </Button>
        {canDelegate && (
          <Button variant="outlined" color="primary" onClick={() => setIsDelegateModalOpen(true)} className="px-6 font-bold">
            Delegate
          </Button>
        )}
        {canSubmit && (
          <Button variant="contained" color="primary" onClick={() => setIsSubmitModalOpen(true)} className="px-8 font-bold">
            Submit
          </Button>
        )}
      </Box>

      {canSubmit && (
        <WorklistSubmitDialog 
          open={isSubmitModalOpen} 
          onClose={() => setIsSubmitModalOpen(false)} 
          workflowTransactionId={workflowTransactionId} 
        />
      )}

      {canDelegate && (
        <WorklistDelegateDialog 
          open={isDelegateModalOpen} 
          onClose={() => setIsDelegateModalOpen(false)} 
          workflowTransactionId={workflowTransactionId} 
        />
      )}
    </>
  )
}
