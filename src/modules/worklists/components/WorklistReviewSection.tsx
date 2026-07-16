'use client'

import React from 'react'

import { Card, Box, Typography, RadioGroup, FormControlLabel, Radio, TextField, CircularProgress } from '@mui/material'

import { toast } from 'sonner'

import { useWorklistDetail, useSubmitReview } from '../hooks'
import { useWorklistReview } from '../context'

interface Props {
  sectionId: string;
  transactionId: string;
}

export function WorklistReviewSection({ sectionId, transactionId }: Props) {
  const { data, isLoading } = useWorklistDetail(transactionId)
  const submitReview = useSubmitReview()
  const { isReviewMode } = useWorklistReview()

  if (isLoading || !data) return null

  const { permissions, sections } = data
  
  const section = sections?.find((s: any) => s.id === sectionId)

  // If this section has no review data and is not in review mode
  if (!section || !isReviewMode || !section.showReviewSection) return null

  const review = section.review || { status: '', remark: '' }

  const handleReviewChange = (status: string, remark: string) => {
    submitReview.mutate({
      id: transactionId,
      payload: { section: sectionId, status, remark }
    }, {
      onSuccess: () => {
        toast.success(`Review saved for ${section.title || sectionId}`)
      },
      onError: () => {
        toast.error(`Failed to save review for ${sectionId}`)
      }
    })
  }

  return (
    <Card className="flex flex-col p-6 mt-6 border-t-4 border-t-primary-500 shadow-md">
      <Typography variant="h6" className="mb-4">Review Result</Typography>
      
      <Box className="flex flex-col gap-4">
        <RadioGroup 
          row 
          value={review.status || ''} 
          onChange={(e) => {
            if (!permissions?.canReview) return;
            handleReviewChange(e.target.value, review.remark || '')
          }}
        >
          <FormControlLabel 
            value="OK" 
            control={<Radio color="success" />} 
            label="OK" 
            disabled={!permissions?.canReview || submitReview.isPending} 
          />
          <FormControlLabel 
            value="NOT_OK" 
            control={<Radio color="error" />} 
            label="Not OK" 
            disabled={!permissions?.canReview || submitReview.isPending} 
          />
        </RadioGroup>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Remark"
          placeholder="Add remark..."
          defaultValue={review.remark || ''}
          onBlur={(e) => {
            if (!permissions?.canReview) return;

            if (e.target.value !== review.remark) {
              handleReviewChange(review.status || '', e.target.value)
            }
          }}
          disabled={!permissions?.canReview || review.status === 'OK'}
        />

        {submitReview.isPending && (
          <Box className="flex items-center gap-2 text-primary-500 text-sm">
            <CircularProgress size={16} /> Saving...
          </Box>
        )}
      </Box>
    </Card>
  )
}
