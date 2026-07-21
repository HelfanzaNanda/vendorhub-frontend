"use client"

import React from 'react';
import { Card, CardContent, Grid, TextField, Box, Typography } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { FileField } from '../../components/fields/FileField';

export function TermsSignatoryCard({ isReadOnly }: { isReadOnly?: boolean }) {
  const { control } = useFormContext();

  return (
    <Card className="rounded-xl shadow-sm border border-gray-100">
      <CardContent className="p-6 sm:p-8">
        <Box>
          <Box className="mb-4">
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              Signatory Details
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Controller
                name="vendorName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Vendor Name" fullWidth disabled />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="authorizedSignatory"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField 
                    {...field} 
                    label="Authorized Signatory *" 
                    fullWidth 
                    disabled={isReadOnly}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="position"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField 
                    {...field} 
                    label="Position *" 
                    fullWidth 
                    disabled={isReadOnly}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="supportingDocumentId"
                control={control}
                render={({ field: { value, onChange }, fieldState }) => (
                  <FileField
                    name="supportingDocumentId"
                    value={value}
                    onChange={onChange}
                    error={fieldState.error?.message}
                    isReadonly={isReadOnly}
                    isDisabled={isReadOnly}
                    field={{ type: 'file', label: 'Supporting Document *' } as any}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
