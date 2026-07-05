'use client'

import { Card, Box, CircularProgress, Alert } from '@mui/material'
import { z } from 'zod'

import type { FormSchema } from '../schemas/types'
import { useVendorDocument, useUpdateVendorDocument } from '../hooks/useSingletonResource'
import DynamicForm from './DynamicForm'

export default function VendorDocumentsTab() {
  const { data, isLoading, isError } = useVendorDocument()
  const updateMutation = useUpdateVendorDocument()

  const documentsSchema: FormSchema = {
    id: 'vendor_documents',
    title: 'Legal Documents',
    description: 'Upload and manage your required legal corporate documents.',
    sections: [
      {
        id: 'npwp_section',
        title: 'NPWP',
        fields: [
          {
            id: 'npwpNumber',
            name: 'npwpNumber',
            label: 'Document Number',
            type: 'text',
            required: true,
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'npwpAddress',
            name: 'npwpAddress',
            label: 'Address',
            type: 'textarea',
            required: true,
            grid: { xs: 12 },
          },
          {
            id: 'npwpFileId',
            name: 'npwpFileId',
            label: 'File Upload',
            type: 'file',
            required: true,
            grid: { xs: 12 },
          },
        ],
      },
      {
        id: 'kswp_section',
        title: 'Taxpayer Status',
        fields: [
          {
            id: 'kswpStatus',
            name: 'kswpStatus',
            label: 'Taxpayer Status',
            type: 'select',
            required: true,
            validation: z.boolean(),
            options: [
              { label: 'PKP', value: true as any },
              { label: 'NON PKP', value: false as any },
            ],
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'kswpDate',
            name: 'kswpDate',
            label: 'Published Date',
            type: 'date',
            required: true,
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'kswpFileId',
            name: 'kswpFileId',
            label: 'File Upload',
            type: 'file',
            required: true,
            grid: { xs: 12 },
          },
        ],
      },
      {
        id: 'deed_est_section',
        title: 'Deed of Establishment',
        fields: [
          {
            id: 'deedEstNumber',
            name: 'deedEstNumber',
            label: 'Document Number',
            type: 'text',
            required: true,
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'deedEstDate',
            name: 'deedEstDate',
            label: 'Published Date',
            type: 'date',
            required: true,
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'deedEstFileId',
            name: 'deedEstFileId',
            label: 'File Upload',
            type: 'file',
            required: true,
            grid: { xs: 12 },
          },
        ],
      },
      {
        id: 'deed_amend_section',
        title: 'Deed of Amendment',
        fields: [
          {
            id: 'deedAmendNumber',
            name: 'deedAmendNumber',
            label: 'Document Number',
            type: 'text',
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'deedAmendDate',
            name: 'deedAmendDate',
            label: 'Published Date',
            type: 'date',
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'deedAmendFileId',
            name: 'deedAmendFileId',
            label: 'File Upload',
            type: 'file',
            grid: { xs: 12 },
          },
        ],
      },
      {
        id: 'org_structure_section',
        title: 'Organizational Structure',
        fields: [
          {
            id: 'orgStructureFileId',
            name: 'orgStructureFileId',
            label: 'File Upload',
            type: 'file',
            required: true,
            grid: { xs: 12 },
          },
        ],
      },
    ],
  }

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center p-8">
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box className="p-4">
        <Alert severity="error">Failed to load documents data. Please refresh.</Alert>
      </Box>
    )
  }

  return (
    <Card className="flex flex-col min-h-[500px]">
      <DynamicForm
        schema={documentsSchema}
        mode="update"
        defaultValues={data || {}}
        onSubmit={(formData) => updateMutation.mutate(formData)}
        showDraftButtons={false}
        isLoading={updateMutation.isPending}
      />
    </Card>
  )
}
