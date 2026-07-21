"use client"

import React from 'react';
import { Box, FormControlLabel, Checkbox, Button, Typography, Divider, Card, CardContent } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { FileField } from '../../components/fields/FileField';

export interface TermsUploadSectionProps {
  isReadOnly?: boolean;
  hasRead: boolean;
  onHasReadChange: (val: boolean) => void;
  allReviewsCompleted: boolean;
  onGeneratePDF: () => void;
  pdfGenerated: boolean;
  isSaveEnabled: boolean;
  isSubmitting?: boolean;
  onSubmit: () => void;
}

export function TermsUploadSection({
  isReadOnly,
  hasRead,
  onHasReadChange,
  allReviewsCompleted,
  onGeneratePDF,
  pdfGenerated,
  isSaveEnabled,
  isSubmitting,
  onSubmit
}: TermsUploadSectionProps) {
  const { control } = useFormContext();

  return (
    <Card className="rounded-xl shadow-sm border border-gray-100 mt-4">
      <CardContent className="flex flex-col gap-8 p-6 sm:p-8">
        <FormControlLabel
          control={
            <Checkbox 
              checked={hasRead} 
              onChange={(e) => onHasReadChange(e.target.checked)} 
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
              onClick={onGeneratePDF}
              disabled={!allReviewsCompleted || !hasRead}
              startIcon={<i className="ri-file-download-line" />}
            >
              Generate / Download Terms
            </Button>
            {pdfGenerated && <Typography variant="caption" color="success.main" className="ml-3">PDF Generated ✓</Typography>}
          </Box>
        )}

        <Box className="max-w-md">
          <Controller
            name="signedDocumentId"
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <FileField
                name="signedDocumentId"
                value={value}
                onChange={onChange}
                error={fieldState.error?.message}
                isReadonly={isReadOnly}
                isDisabled={isReadOnly}
                field={{ type: 'file', label: 'Signed Terms Document (PDF) *' } as any}
              />
            )}
          />
        </Box>

        <Divider />

        {!isReadOnly && (
          <Box className="flex justify-end">
            <Button 
              type="button" 
              onClick={onSubmit}
              variant="contained" 
              color="primary" 
              size="large"
              disabled={!isSaveEnabled || isSubmitting}
              startIcon={isSubmitting ? <i className="ri-loader-4-line animate-spin" /> : <i className="ri-save-line" />}
            >
              {isSubmitting ? 'Saving...' : 'Submit Terms & Conditions'}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
