"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { TermsAlert } from './TermsAlert';
import { TermsSignatoryCard } from './TermsSignatoryCard';
import { TermsApprovalList } from './TermsApprovalList';
import { TermsUploadSection } from './TermsUploadSection';

export interface TermsConditionsPageProps {
  masterTerms?: any;
  vendorTermsData?: any;
  onSubmit?: (data: any) => void;
  isSubmitting?: boolean;
  user?: any;
  isLoading?: boolean;
  isReadOnly?: boolean;
}

export function TermsConditionsPage(props: TermsConditionsPageProps) {
  const { masterTerms, vendorTermsData, onSubmit, isSubmitting, user, isLoading } = props;

  const submission = vendorTermsData?.submission;
  const isReadOnly = props.isReadOnly ?? !!submission;

  const [reviews, setReviews] = useState<Record<string, { status: 'APPROVED' | 'REJECTED', reason?: string }>>({});
  const [hasRead, setHasRead] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);

  const formZodSchema = z.object({
    vendorName: z.string().optional(),
    authorizedSignatory: z.string().min(1, 'Authorized Signatory is required'),
    position: z.string().min(1, 'Position is required'),
    supportingDocumentId: z.any().refine((val) => val !== null && val !== undefined && val !== '', 'Supporting Document is required')
  });

  const signedDocumentZodSchema = z.object({
    signedDocumentId: z.any().refine((val) => val !== null && val !== undefined && val !== '', 'Signed Document is required')
  });

  const combinedZodSchema = formZodSchema.merge(signedDocumentZodSchema);

  const methods = useForm({
    resolver: zodResolver(combinedZodSchema),
    defaultValues: {
      vendorName: user?.vendor?.companyName || user?.firstname || '',
      authorizedSignatory: '',
      position: '',
      supportingDocumentId: null,
      signedDocumentId: null
    }
  });

  const formValues = methods.watch();

  useEffect(() => {
    if (submission) {
      setHasRead(true);

      if (submission.chapterReviews) {
        setReviews(submission.chapterReviews as any);
      }

      methods.reset({
        vendorName: submission.vendorName || '',
        authorizedSignatory: submission.authorizedSignatory || '',
        position: submission.position || '',
        supportingDocumentId: submission.supportingDocument || null,
        signedDocumentId: submission.signedDocument || null
      });
    }
  }, [submission, methods]);

  const handleApprove = (chapterId: string) => {
    if (isReadOnly) return;
    setReviews(prev => ({ ...prev, [chapterId]: { status: 'APPROVED' } }));
  };

  const handleReject = (chapterId: string, reason: string) => {
    if (isReadOnly) return;
    setReviews(prev => ({ ...prev, [chapterId]: { status: 'REJECTED', reason } }));
  };

  const handleRejectReasonChange = (chapterId: string, reason: string) => {
    setReviews(prev => ({
      ...prev,
      [chapterId]: { ...prev[chapterId], status: 'REJECTED', reason }
    }));
  };

  const generatePDF = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Terms_and_Conditions.pdf');
      
      setPdfGenerated(true);
    } catch (error) {
      console.error('Failed to generate PDF', error);
    }
  };

  const handleFormSubmit = (data: any) => {
    if (isReadOnly) return;
    
    const payload = {
      ...data,
      supportingDocumentId: data.supportingDocumentId ? { id: data.supportingDocumentId.id } : null,
      signedDocumentId: data.signedDocumentId ? { id: data.signedDocumentId.id } : null,
      termsConditionId: masterTerms?.id ? { id: masterTerms.id } : undefined,
      chapterReviews: reviews
    };

    if (onSubmit) {
      onSubmit(payload);
    }
  };

  if (isLoading) return <Typography>Loading terms...</Typography>;
  if (!masterTerms) return <Typography>No terms available.</Typography>;

  const reviewChapters = masterTerms.items.filter((c: any) => c.approvalMode === 'REVIEW');

  const completedReviews = reviewChapters.filter((c: any) => {
    const rev = reviews[c.id.toString()];
    if (!rev) return false;
    if (rev.status === 'REJECTED' && !rev.reason) return false;
    return true;
  }).length;

  const allReviewsCompleted = completedReviews === reviewChapters.length;
  const isSaveEnabled = methods.formState.isValid && allReviewsCompleted && hasRead && (pdfGenerated || isReadOnly);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-8 p-4 sm:p-6 md:p-8">
        <Typography variant="h5" fontWeight="bold">Terms & Conditions</Typography>
        
        <TermsAlert />
        
        <TermsSignatoryCard isReadOnly={isReadOnly} />

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

          {masterTerms.items.sort((a: any, b: any) => a.sortOrder - b.sortOrder).map((chapter: any) => {
            const review = reviews[chapter.id.toString()];
            
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
            );
          })}
        </Box>

        <TermsApprovalList
          chapters={masterTerms.items}
          reviews={reviews}
          isReadOnly={isReadOnly}
          onApprove={handleApprove}
          onReject={handleReject}
          onRejectReasonChange={handleRejectReasonChange}
        />

        <TermsUploadSection
          isReadOnly={isReadOnly}
          hasRead={hasRead}
          onHasReadChange={setHasRead}
          allReviewsCompleted={allReviewsCompleted}
          onGeneratePDF={generatePDF}
          pdfGenerated={pdfGenerated}
          isSaveEnabled={isSaveEnabled}
          isSubmitting={isSubmitting}
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        />
      </div>
    </FormProvider>
  );
}
