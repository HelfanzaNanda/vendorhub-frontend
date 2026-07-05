'use client'

import { useMemo } from 'react'

import { Box, Card, Typography, Grid, CircularProgress, Alert } from '@mui/material'
import { z } from 'zod'

import type { FormSchema } from '../schemas/types'
import { useCrudTable } from '../hooks/useCrudTable'
import DynamicForm from './DynamicForm'

export default function VendorDocumentsTab() {
  const { rows: documents, isLoading, isError, refetch } = useCrudTable<any>('/vendor-documents-temp')

  // Find document details by documentType from API response
  const npwpData = useMemo(() => documents.find((d: any) => d.documentType === 'NPWP') || {}, [documents])
  const taxpayerData = useMemo(() => documents.find((d: any) => d.documentType === 'TAXPAYER_STATUS') || {}, [documents])
  const deedEstablishmentData = useMemo(() => documents.find((d: any) => d.documentType === 'DEED_OF_ESTABLISHMENT') || {}, [documents])
  const deedAmendmentData = useMemo(() => documents.find((d: any) => d.documentType === 'DEED_OF_AMENDMENT') || {}, [documents])
  const orgStructureData = useMemo(() => documents.find((d: any) => d.documentType === 'ORGANIZATIONAL_STRUCTURE') || {}, [documents])

  // Form Schemas Definition
  const npwpSchema: FormSchema = {
    id: 'doc_npwp',
    title: 'Nomor Pokok Wajib Pajak (NPWP)',
    description: 'Provide your company tax identification details.',
    sections: [
      {
        id: 'npwp_section',
        title: 'NPWP Info',
        fields: [
          {
            id: 'number',
            name: 'number',
            label: 'NPWP Number',
            type: 'text',
            required: true,
            validation: z.string().min(15, 'NPWP number must be at least 15 digits'),
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'address',
            name: 'address',
            label: 'Tax Address',
            type: 'textarea',
            required: true,
            grid: { xs: 12 },
          },
          {
            id: 'fileId',
            name: 'fileId',
            label: 'NPWP Document File',
            type: 'file',
            required: true,
            grid: { xs: 12 },
          },
        ],
      },
    ],
  }

  const taxpayerSchema: FormSchema = {
    id: 'doc_taxpayer_status',
    title: 'Taxpayer Status (KSWP)',
    description: 'Provide information regarding your taxpayer confirmation status.',
    sections: [
      {
        id: 'taxpayer_section',
        title: 'KSWP Info',
        fields: [
          {
            id: 'taxpayerStatus',
            name: 'taxpayerStatus',
            label: 'Taxpayer Status',
            type: 'select',
            required: true,
            grid: { xs: 12, md: 6 },
            lookupEndpoint: 'taxpayer-statuses',
          },
          {
            id: 'publishedAt',
            name: 'publishedAt',
            label: 'Confirmation Date',
            type: 'date',
            required: true,
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'fileId',
            name: 'fileId',
            label: 'KSWP Confirmation File',
            type: 'file',
            required: true,
            grid: { xs: 12 },
          },
        ],
      },
    ],
  }

  const deedEstablishmentSchema: FormSchema = {
    id: 'doc_deed_establishment',
    title: 'Deed of Establishment',
    description: 'Provide your company official incorporation/establishment deed.',
    sections: [
      {
        id: 'deed_establishment_section',
        title: 'Deed Info',
        fields: [
          {
            id: 'number',
            name: 'number',
            label: 'Deed Number',
            type: 'text',
            required: true,
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'publishedAt',
            name: 'publishedAt',
            label: 'Deed Date',
            type: 'date',
            required: true,
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'fileId',
            name: 'fileId',
            label: 'Deed File',
            type: 'file',
            required: true,
            grid: { xs: 12 },
          },
        ],
      },
    ],
  }

  const deedAmendmentSchema: FormSchema = {
    id: 'doc_deed_amendment',
    title: 'Deed of Amendment',
    description: 'Provide the latest amendment deed if applicable.',
    sections: [
      {
        id: 'deed_amendment_section',
        title: 'Amendment Deed Info',
        fields: [
          {
            id: 'number',
            name: 'number',
            label: 'Deed Number',
            type: 'text',
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'publishedAt',
            name: 'publishedAt',
            label: 'Deed Date',
            type: 'date',
            grid: { xs: 12, md: 6 },
          },
          {
            id: 'fileId',
            name: 'fileId',
            label: 'Deed File',
            type: 'file',
            grid: { xs: 12 },
          },
        ],
      },
    ],
  }

  const orgStructureSchema: FormSchema = {
    id: 'doc_org_structure',
    title: 'Organizational Structure',
    description: 'Upload your company current organizational structure chart.',
    sections: [
      {
        id: 'org_section',
        title: 'Structure Info',
        fields: [
          {
            id: 'fileId',
            name: 'fileId',
            label: 'Organizational Structure File',
            type: 'file',
            required: true,
            grid: { xs: 12 },
          },
        ],
      },
    ],
  }

  // Create save mutator
  const { saveMutation } = useCrudTable('/vendor-documents-temp')

  const handleSaveDoc = (type: string) => (data: any) => {
    const payload = {
      ...data,
      documentType: type,
    }
    
    saveMutation.mutate(payload, {
      onSuccess: () => {
        refetch()
      },
    })
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
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box className="p-6 pb-2">
            <Typography variant="h5" fontWeight="bold">
              Vendor Documents
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Upload and manage your required legal corporate documents below.
            </Typography>
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <DynamicForm
            schema={npwpSchema}
            mode="update"
            defaultValues={npwpData}
            onSubmit={handleSaveDoc('NPWP')}
            showDraftButtons={false}
            isLoading={saveMutation.isPending}
          />
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <DynamicForm
            schema={taxpayerSchema}
            mode="update"
            defaultValues={taxpayerData}
            onSubmit={handleSaveDoc('TAXPAYER_STATUS')}
            showDraftButtons={false}
            isLoading={saveMutation.isPending}
          />
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <DynamicForm
            schema={deedEstablishmentSchema}
            mode="update"
            defaultValues={deedEstablishmentData}
            onSubmit={handleSaveDoc('DEED_OF_ESTABLISHMENT')}
            showDraftButtons={false}
            isLoading={saveMutation.isPending}
          />
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <DynamicForm
            schema={deedAmendmentSchema}
            mode="update"
            defaultValues={deedAmendmentData}
            onSubmit={handleSaveDoc('DEED_OF_AMENDMENT')}
            showDraftButtons={false}
            isLoading={saveMutation.isPending}
          />
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <DynamicForm
            schema={orgStructureSchema}
            mode="update"
            defaultValues={orgStructureData}
            onSubmit={handleSaveDoc('ORGANIZATIONAL_STRUCTURE')}
            showDraftButtons={false}
            isLoading={saveMutation.isPending}
          />
        </Card>
      </Grid>
    </Grid>
  )
}
