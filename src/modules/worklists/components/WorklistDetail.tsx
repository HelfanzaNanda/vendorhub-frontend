'use client'

import React, { useMemo, useState } from 'react'
import { Box, CircularProgress, Typography, Button, Card, Grid } from '@mui/material'
import PageHeader from '@/components/shared/PageHeader'
import { useWorklistDetail } from '../hooks'
import { WorklistReviewContext } from '../context'
import WorklistProfile from './WorklistProfile'
import WorklistReviewFooter from './WorklistReviewFooter'
import { worklistProfileSchema } from '../schemas'

interface WorklistDetailProps {
  workflowTransactionId: string
}

export default function WorklistDetail({ workflowTransactionId }: WorklistDetailProps) {
  const { data, isLoading, isError } = useWorklistDetail(workflowTransactionId)

  const worklistContextValue = useMemo(() => {
    if (!data) return { isReviewMode: false }
    return {
      isReviewMode: true,
      worklistData: data,
    }
  }, [data])

  if (isLoading) {
    return (
      <Box className="flex items-center justify-center h-96">
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !data) {
    return (
      <Box className="flex flex-col p-4">
        <Typography color="error">Failed to load worklist detail.</Typography>
      </Box>
    )
  }

  const { workflowInfo, approvers = [] } = data

  return (
    <WorklistReviewContext.Provider value={worklistContextValue}>
      <Box className="flex flex-col gap-6 w-full pb-32 relative">
        <PageHeader
          title={`Review - ${workflowInfo?.requestNo}`}
          breadcrumbs={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Worklist', href: '/worklist' },
            { label: workflowInfo?.requestNo || 'Detail' },
          ]}
        />

        {/* Global Summary Card */}
        {workflowInfo && (
          <Card className="p-5 border border-gray-200 shadow-sm rounded-xl bg-white mb-2">
            <Grid container spacing={3} alignItems="flex-start">
              <Grid item xs={6} sm={4} md={2}>
                <Typography variant="caption" className="text-gray-500 uppercase tracking-wider font-semibold block mb-1">Request No</Typography>
                <Typography variant="body2" className="font-bold text-gray-800">{workflowInfo.requestNo || '-'}</Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Typography variant="caption" className="text-gray-500 uppercase tracking-wider font-semibold block mb-1">Vendor</Typography>
                <Typography variant="body2" className="font-bold text-gray-800">{workflowInfo.vendorName || 'Vendor Data'}</Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Typography variant="caption" className="text-gray-500 uppercase tracking-wider font-semibold block mb-1">Vendor Type</Typography>
                <Typography variant="body2" className="font-bold text-gray-800">{workflowInfo.vendorType || '-'}</Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Typography variant="caption" className="text-gray-500 uppercase tracking-wider font-semibold block mb-1">Workflow</Typography>
                <Typography variant="body2" className="font-bold text-gray-800">{workflowInfo.workflow || '-'}</Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Typography variant="caption" className="text-gray-500 uppercase tracking-wider font-semibold block mb-1">Submitted Date</Typography>
                <Typography variant="body2" className="font-bold text-gray-800">{workflowInfo.submittedDate || '-'}</Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Typography variant="caption" className="text-gray-500 uppercase tracking-wider font-semibold block mb-1">Current Step</Typography>
                <Box className="mt-1">
                  <Box className="inline-block px-2 py-1 bg-blue-50 text-blue-700 font-bold rounded text-xs border border-blue-100">
                    {workflowInfo.currentStep || '-'}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={4} md={2}>
                <Typography variant="caption" className="text-gray-500 uppercase tracking-wider font-semibold block mb-1">Site</Typography>
                <Typography variant="body2" className="font-bold text-gray-800">{workflowInfo.site || '-'}</Typography>
              </Grid>
              <Grid item xs={6} sm={4} md={5}>
                <Typography variant="caption" className="text-gray-500 uppercase tracking-wider font-semibold block mb-1">Approvers</Typography>
                <Box className="flex flex-wrap gap-2 mt-1">
                  {approvers.map((approver, index) => (
                    <Box key={index} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs">
                      <span className="text-gray-500 mr-1">{index + 1}.</span> <span className="font-medium text-gray-700">{approver.user?.name}</span>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Card>
        )}

        <WorklistProfile 
          schemaConfig={worklistProfileSchema} 
          worklistTransactionId={workflowTransactionId} 
        />

        <WorklistReviewFooter workflowTransactionId={workflowTransactionId} />
      </Box>
    </WorklistReviewContext.Provider>
  )
}
