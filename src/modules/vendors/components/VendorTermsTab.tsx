'use client'

import React, { useState, useRef, useEffect } from 'react'

import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Checkbox, 
  FormControlLabel,
  TextField,
  Divider,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import FormSection from './FormSection'
import { termsSchema } from '../schemas/local/terms.schema'
import { useMasterTerms, useSubmitTerms, useVendorTerms } from '../hooks/useTerms'
import { useAuthStore } from '@/features/auth/store'
import FormFieldRenderer from './FormFieldRenderer'

export default function VendorTermsTab() {
  const { data: masterTerms, isLoading: isMasterLoading } = useMasterTerms()
  const { data: vendorTermsData, isLoading: isVendorTermsLoading } = useVendorTerms()
  const submitMutation = useSubmitTerms()
  const user = useAuthStore(state => state.user)

  const submission = vendorTermsData?.submission
  const isReadOnly = !!submission

  // Chapter reviews state: chapterId -> { status: 'APPROVED' | 'REJECTED', reason?: string }
  const [reviews, setReviews] = useState<Record<string, { status: 'APPROVED' | 'REJECTED', reason?: string }>>({})
  const [hasRead, setHasRead] = useState(false)
  const [pdfGenerated, setPdfGenerated] = useState(false)
  
  const contentRef = useRef<HTMLDivElement>(null)

  // Generate Zod schema for signatory form (simplified since we know exactly what it is)
  const formZodSchema = z.object({
    vendorName: z.string().optional(),
    authorizedSignatory: z.string().min(1, 'Authorized Signatory is required'),
    position: z.string().min(1, 'Position is required'),
    supportingDocumentId: z.any().refine((val) => val !== null && val !== undefined && val !== '', 'Supporting Document is required')
  })

  // We add a special field for signed document upload at the bottom
  const signedDocumentZodSchema = z.object({
    signedDocumentId: z.any().refine((val) => val !== null && val !== undefined && val !== '', 'Signed Document is required')
  })

  const combinedZodSchema = formZodSchema.merge(signedDocumentZodSchema)

  const methods = useForm({
    resolver: zodResolver(combinedZodSchema),
    defaultValues: {
      vendorName: user?.vendor?.companyName || user?.firstname || '',
      authorizedSignatory: '',
      position: '',
      supportingDocumentId: null,
      signedDocumentId: null
    }
  })

  const formValues = methods.watch()

  useEffect(() => {
    if (submission) {
      setHasRead(true)

      if (submission.chapterReviews) {
        setReviews(submission.chapterReviews as any)
      }

      methods.reset({
        vendorName: submission.vendorName || '',
        authorizedSignatory: submission.authorizedSignatory || '',
        position: submission.position || '',
        supportingDocumentId: submission.supportingDocument || null,
        signedDocumentId: submission.signedDocument || null
      })
    }
  }, [submission, methods])

  const handleApprove = (chapterId: string) => {
    if (isReadOnly) return
    setReviews(prev => ({ ...prev, [chapterId]: { status: 'APPROVED' } }))
  }

  const handleReject = (chapterId: string, reason: string) => {
    if (isReadOnly) return
    setReviews(prev => ({ ...prev, [chapterId]: { status: 'REJECTED', reason } }))
  }

  const handleRejectReasonChange = (chapterId: string, reason: string) => {
    setReviews(prev => ({
      ...prev,
      [chapterId]: { ...prev[chapterId], status: 'REJECTED', reason }
    }))
  }

  const generatePDF = async () => {
    if (!contentRef.current) return

    try {
      const canvas = await html2canvas(contentRef.current, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('Terms_and_Conditions.pdf')
      
      setPdfGenerated(true)
    } catch (error) {
      console.error('Failed to generate PDF', error)
    }
  }

  const onSubmit = (data: any) => {
    if (isReadOnly) return
    
    // Clean up document objects to only send IDs if needed, but existing backend handles it or we send just id
    const payload = {
      ...data,
      supportingDocumentId: data.supportingDocumentId ? { id: data.supportingDocumentId.id } : null,
      signedDocumentId: data.signedDocumentId ? { id: data.signedDocumentId.id } : null,
      termsConditionId: masterTerms?.id ? { id: masterTerms.id } : undefined,
      chapterReviews: reviews
    }

    submitMutation.mutate(payload)
  }

  if (isMasterLoading || isVendorTermsLoading) return <Typography>Loading terms...</Typography>
  if (!masterTerms) return <Typography>No terms available.</Typography>

  const reviewChapters = masterTerms.items.filter(c => c.approvalMode === 'REVIEW')

  const completedReviews = reviewChapters.filter(c => {
    const rev = reviews[c.id.toString()]

    if (!rev) return false
    if (rev.status === 'REJECTED' && !rev.reason) return false
    
return true
  }).length

  const allReviewsCompleted = completedReviews === reviewChapters.length
  
  // Custom signed file field schema
  const signedDocFieldSchema = {
    id: 'signedDocumentId',
    name: 'signedDocumentId',
    label: 'Signed Terms Document (PDF)',
    type: 'file' as const,
    required: true
  }

  const isSaveEnabled = methods.formState.isValid && allReviewsCompleted && hasRead && (pdfGenerated || isReadOnly)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-8 p-4 sm:p-6 md:p-8">
        <Typography variant="h5" fontWeight="bold">Terms & Conditions</Typography>
        
        <Alert severity="info">
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            Before you can proceed with the vendor registration, please complete the following steps:
          </Typography>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>Fill in all required information.</li>
            <li>Check <strong>&quot;I have read and understood all Terms &amp; Conditions.&quot;</strong></li>
            <li>Download the Terms &amp; Conditions document.</li>
            <li>Sign the downloaded document.</li>
            <li>Upload the signed document.</li>
            <li>Click <strong>Submit Terms &amp; Conditions</strong>.</li>
          </ol>
        </Alert>
        
        {/* Signatory Details Form */}
        <Card className="rounded-xl shadow-sm border border-gray-100">
          <CardContent className="p-6 sm:p-8">
            <FormSection 
              section={{
                ...termsSchema.sections[0],
                fields: termsSchema.sections[0].fields.map(f => ({ ...f, disabled: isReadOnly || f.disabled }))
              }} 
              formValues={formValues} 
            />
          </CardContent>
        </Card>

        {/* PDF Content Wrapper (Hidden on screen, used strictly for html2canvas generation) */}
        <Box 
          ref={contentRef} 
          className="flex flex-col gap-4 p-8 bg-white"
          sx={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '800px', zIndex: -1000 }}
        >
          <Typography variant="h6" className="mb-4">
            {masterTerms.title}
          </Typography>
          
          <Box className="mb-6">
            <Typography variant="body2"><strong>Vendor:</strong> {formValues.vendorName}</Typography>
            <Typography variant="body2"><strong>Authorized Signatory:</strong> {formValues.authorizedSignatory}</Typography>
            <Typography variant="body2"><strong>Position:</strong> {formValues.position}</Typography>
            <Typography variant="body2"><strong>Date:</strong> {new Date().toLocaleDateString()}</Typography>
          </Box>

          {masterTerms.items.sort((a, b) => a.sortOrder - b.sortOrder).map(chapter => {
            const review = reviews[chapter.id.toString()]
            
            return (
              <Card key={chapter.id} variant="outlined" className="mb-4 break-inside-avoid">
                <CardContent className="flex flex-col gap-4">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Chapter {chapter.chapter}: {chapter.title}
                  </Typography>
                  <div dangerouslySetInnerHTML={{ __html: chapter.content }} className="text-sm text-gray-700" />
                  
                  {/* Print-only review status */}
                  {chapter.approvalMode === 'REVIEW' && review && (
                    <Box className="mt-4 p-3 bg-gray-50 border rounded-md">
                      <Typography variant="body2" fontWeight="bold" color={review.status === 'APPROVED' ? 'success.main' : 'error.main'}>
                        Decision: {review.status}
                      </Typography>
                      {review.status === 'REJECTED' && (
                        <Typography variant="body2" className="mt-1">
                          Reason: {review.reason}
                        </Typography>
                      )}
                    </Box>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </Box>

        {/* Interactive Review Controls */}
        <Box>
          <Typography variant="h6" className="mb-4">Chapters & Approvals</Typography>
          <Typography variant="body2" color="text.secondary" className="mb-4">
            Required Approvals Completed: {completedReviews} / {reviewChapters.length}
          </Typography>
          
          {masterTerms.items.sort((a, b) => a.sortOrder - b.sortOrder).map(chapter => {
            const review = reviews[chapter.id.toString()]
            
            return (
              <Accordion 
                key={chapter.id} 
                defaultExpanded={false} 
                className="mb-4 rounded-xl border border-gray-200 before:hidden shadow-sm overflow-hidden"
              >
                <AccordionSummary 
                  expandIcon={<i className="ri-arrow-down-s-line text-xl" />}
                  className="bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-100"
                  sx={{ minHeight: '64px' }}
                >
                  <Box className="flex w-full items-center justify-between pr-4">
                    <Typography fontWeight="medium">
                      {chapter.chapter} - {chapter.title}
                    </Typography>
                    
                    {chapter.approvalMode === 'REVIEW' && (
                      <Chip 
                        label={review?.status === 'APPROVED' ? 'Approved' : review?.status === 'REJECTED' ? 'Rejected' : 'Pending'} 
                        color={review?.status === 'APPROVED' ? 'success' : review?.status === 'REJECTED' ? 'error' : 'default'}
                        size="small"
                        className="font-medium"
                      />
                    )}
                    {chapter.approvalMode === 'AUTO' && (
                      <Chip label="Auto" size="small" variant="outlined" />
                    )}
                  </Box>
                </AccordionSummary>
                
                <AccordionDetails className="p-6 sm:p-8 flex flex-col gap-6">
                  <div 
                    dangerouslySetInnerHTML={{ __html: chapter.content }} 
                    className="text-sm text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:pl-1 [&_p]:mb-4 last:[&_p]:mb-0" 
                  />
                  
                  {chapter.approvalMode === 'REVIEW' && !isReadOnly && (
                    <Box className="p-6 bg-gray-50 rounded-xl border border-gray-200 mt-2">
                      <Typography variant="subtitle2" className="mb-4 font-semibold text-gray-900">
                        Approval Action Required
                      </Typography>
                      <Box className="flex gap-2">
                        <Button 
                          variant={review?.status === 'APPROVED' ? 'contained' : 'outlined'} 
                          color="success"
                          onClick={() => handleApprove(chapter.id.toString())}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant={review?.status === 'REJECTED' ? 'contained' : 'outlined'} 
                          color="error"
                          onClick={() => handleReject(chapter.id.toString(), '')}
                        >
                          Reject
                        </Button>
                      </Box>
                      
                      {review?.status === 'REJECTED' && (
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          label="Reject Reason *"
                          value={review.reason || ''}
                          onChange={(e) => handleRejectReasonChange(chapter.id.toString(), e.target.value)}
                          error={!review.reason}
                          helperText={!review.reason ? 'Reject reason is required' : ''}
                          className="mt-4 bg-white"
                        />
                      )}
                    </Box>
                  )}
                  {chapter.approvalMode === 'REVIEW' && isReadOnly && review && (
                    <Box className="p-6 bg-gray-50 rounded-xl border border-gray-200 mt-2">
                      <Typography variant="subtitle2" className="mb-4 font-semibold text-gray-900">
                        Submitted Review
                      </Typography>
                      <Box className="flex flex-col gap-2">
                        <Box className="flex items-center gap-2">
                          <Typography variant="body2" fontWeight="medium">Status:</Typography>
                          <Chip 
                            label={review.status === 'APPROVED' ? 'Approved' : 'Rejected'} 
                            color={review.status === 'APPROVED' ? 'success' : 'error'}
                            size="small"
                          />
                        </Box>
                        {review.status === 'REJECTED' && review.reason && (
                          <Box className="mt-2">
                            <Typography variant="body2" fontWeight="medium">Reason for rejection:</Typography>
                            <Typography variant="body2" color="text.secondary" className="mt-1 p-3 bg-white rounded border border-gray-100">
                              {review.reason}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            )
          })}
        </Box>

        {/* Final Actions */}
        <Card className="rounded-xl shadow-sm border border-gray-100 mt-4">
          <CardContent className="flex flex-col gap-8 p-6 sm:p-8">
            <FormControlLabel
              control={
                <Checkbox 
                  checked={hasRead} 
                  onChange={(e) => setHasRead(e.target.checked)} 
                  disabled={!allReviewsCompleted || isReadOnly}
                  color="primary"
                />
              }
              label="I have read and understood all Terms & Conditions."
            />

            {!isReadOnly && (
              <Box>
                <Button 
                  variant="outlined" 
                  onClick={generatePDF}
                  disabled={!allReviewsCompleted || !hasRead}
                  startIcon={<i className="ri-file-download-line" />}
                >
                  Generate / Download Terms
                </Button>
                {pdfGenerated && <Typography variant="caption" color="success.main" className="ml-3">PDF Generated ✓</Typography>}
              </Box>
            )}

            <Box className="max-w-md">
              <FormFieldRenderer field={{...signedDocFieldSchema, disabled: isReadOnly}} />
            </Box>

            <Divider />

            {!isReadOnly && (
              <Box className="flex justify-end">
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  disabled={!isSaveEnabled || submitMutation.isPending}
                  startIcon={submitMutation.isPending ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-save-line" />}
                >
                  {submitMutation.isPending ? 'Saving...' : 'Submit Terms & Conditions'}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  )
}
