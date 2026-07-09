'use client'

import { useMemo } from 'react'

import { Card, Box, CircularProgress, Alert } from '@mui/material'
import { z } from 'zod'

import type { FormSchema } from '../schemas/types'
import { useVendorDocument, useUpdateVendorDocument } from '../hooks/useSingletonResource'
import DynamicForm from './DynamicForm'

export default function VendorDocumentsTab() {
  const { data, isLoading, isError } = useVendorDocument()
  const updateMutation = useUpdateVendorDocument()

  // Convert array response from backend to flat form structure
  const defaultValues = useMemo(() => {
    if (!data || !Array.isArray(data)) return {}

    const flat: Record<string, any> = {}

    data.forEach((doc: any) => {
      // Safely extract the file ID or File object
      const fileId = doc.file || doc.fileId

      if (doc.documentTypeId === 1) { // NPWP
        flat.npwpNumber = doc.documentNumber
        flat.npwpAddress = doc.address
        flat.npwpFileId = fileId
      } else if (doc.documentTypeId === 2) { // KSWP
        flat.kswpStatus = doc.status
        flat.kswpDate = doc.published_date || doc.publishDate
        flat.kswpFileId = fileId
      } else if (doc.documentTypeId === 3) { // Deed Est
        flat.deedEstNumber = doc.documentNumber
        flat.deedEstDate = doc.published_date || doc.publishDate
        flat.deedEstFileId = fileId
      } else if (doc.documentTypeId === 4) { // Deed Amend
        flat.deedAmendNumber = doc.documentNumber
        flat.deedAmendDate = doc.published_date || doc.publishDate
        flat.deedAmendFileId = fileId
      } else if (doc.documentTypeId === 5) { // Org Structure
        flat.orgStructureFileId = fileId
      }
    })

    return flat
  }, [data])

  const handleSubmit = (formData: any) => {
    // Map flat form data back to an array of document objects
    const payload = []

    // NPWP (documentTypeId: 1)
    if (formData.npwpNumber || formData.npwpAddress || formData.npwpFileId) {
      payload.push({
        documentTypeId: 1,
        documentNumber: formData.npwpNumber,
        address: formData.npwpAddress,
        fileId: formData.npwpFileId ? { id: formData.npwpFileId } : null,
      })
    }

    // Taxpayer Status (documentTypeId: 2)
    if (formData.kswpStatus !== undefined || formData.kswpDate || formData.kswpFileId) {
      payload.push({
        documentTypeId: 2,
        status: formData.kswpStatus,
        published_date: formData.kswpDate,
        fileId: formData.kswpFileId ? { id: formData.kswpFileId } : null,
      })
    }

    // Deed of Establishment (documentTypeId: 3)
    if (formData.deedEstNumber || formData.deedEstDate || formData.deedEstFileId) {
      payload.push({
        documentTypeId: 3,
        documentNumber: formData.deedEstNumber,
        published_date: formData.deedEstDate,
        fileId: formData.deedEstFileId ? { id: formData.deedEstFileId } : null,
      })
    }

    // Deed of Amendment (documentTypeId: 4)
    if (formData.deedAmendNumber || formData.deedAmendDate || formData.deedAmendFileId) {
      payload.push({
        documentTypeId: 4,
        documentNumber: formData.deedAmendNumber,
        published_date: formData.deedAmendDate,
        fileId: formData.deedAmendFileId ? { id: formData.deedAmendFileId } : null,
      })
    }

    // Organizational Structure (documentTypeId: 5)
    if (formData.orgStructureFileId) {
      payload.push({
        documentTypeId: 5,
        fileId: formData.orgStructureFileId ? { id: formData.orgStructureFileId } : null,
      })
    }

    updateMutation.mutate(payload)
  }

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
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        showDraftButtons={false}
        isLoading={updateMutation.isPending}
      />
    </Card>
  )
}
