import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Chip, Button, TextField } from '@mui/material';

export interface TermsApprovalListProps {
  chapters: any[];
  reviews: Record<string, any>;
  isReadOnly?: boolean;
  onApprove: (chapterId: string) => void;
  onReject: (chapterId: string, reason: string) => void;
  onRejectReasonChange: (chapterId: string, reason: string) => void;
}

export function TermsApprovalList({ 
  chapters, 
  reviews, 
  isReadOnly, 
  onApprove, 
  onReject, 
  onRejectReasonChange 
}: TermsApprovalListProps) {
  const reviewChapters = chapters.filter((c: any) => c.approvalMode === 'REVIEW');
  const completedReviews = reviewChapters.filter((c: any) => {
    const rev = reviews[c.id.toString()];
    if (!rev) return false;
    if (rev.status === 'REJECTED' && !rev.reason) return false;
    return true;
  }).length;

  return (
    <Box>
      <Typography variant="h6" className="mb-4">Chapters & Approvals</Typography>
      <Typography variant="body2" color="text.secondary" className="mb-4">
        Required Approvals Completed: {completedReviews} / {reviewChapters.length}
      </Typography>
      
      {chapters.sort((a: any, b: any) => a.sortOrder - b.sortOrder).map((chapter: any) => {
        const review = reviews[chapter.id.toString()];
        
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
                      onClick={() => onApprove(chapter.id.toString())}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant={review?.status === 'REJECTED' ? 'contained' : 'outlined'} 
                      color="error"
                      onClick={() => onReject(chapter.id.toString(), '')}
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
                      onChange={(e) => onRejectReasonChange(chapter.id.toString(), e.target.value)}
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
        );
      })}
    </Box>
  );
}
