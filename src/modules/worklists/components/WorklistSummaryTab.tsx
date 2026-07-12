'use client'

import React from 'react'
import { Card, Box, Typography, Grid } from '@mui/material'
import { useWorklistReview } from '../context'

export function WorklistSummaryTab() {
  const { worklistData } = useWorklistReview()

  if (!worklistData) return null

  const { workflowInfo, summary } = worklistData

  return (
    <Box className="flex flex-col gap-6 w-full">
      <Card className="p-6">
        <Typography variant="h6" className="mb-4">Workflow Information</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box className="flex flex-col gap-3">
              <Box className="flex justify-between border-b pb-2">
                <Typography color="textSecondary">Request No</Typography>
                <Typography fontWeight="medium">{workflowInfo?.requestNo || '-'}</Typography>
              </Box>
              <Box className="flex justify-between border-b pb-2">
                <Typography color="textSecondary">Workflow</Typography>
                <Typography fontWeight="medium">{workflowInfo?.workflow || '-'}</Typography>
              </Box>
              <Box className="flex justify-between border-b pb-2">
                <Typography color="textSecondary">Status</Typography>
                <Typography fontWeight="medium" color="primary">{workflowInfo?.status || '-'}</Typography>
              </Box>
              <Box className="flex justify-between border-b pb-2">
                <Typography color="textSecondary">Submitted By</Typography>
                <Typography fontWeight="medium">{workflowInfo?.submittedBy || '-'}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="flex flex-col gap-3">
              <Box className="flex justify-between border-b pb-2">
                <Typography color="textSecondary">Submitted Date</Typography>
                <Typography fontWeight="medium">{workflowInfo?.submittedDate || '-'}</Typography>
              </Box>
              <Box className="flex justify-between border-b pb-2">
                <Typography color="textSecondary">Current Step</Typography>
                <Typography fontWeight="medium">{workflowInfo?.currentStep || '-'}</Typography>
              </Box>
              <Box className="flex justify-between border-b pb-2">
                <Typography color="textSecondary">SLA PIC</Typography>
                <Typography fontWeight="medium">{workflowInfo?.slaPic || '-'}</Typography>
              </Box>
              <Box className="flex justify-between border-b pb-2">
                <Typography color="textSecondary">Due Date</Typography>
                <Typography fontWeight="medium">{workflowInfo?.dueDate || '-'}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {summary && summary.length > 0 && (
        <Card className="p-6">
          <Typography variant="h6" className="mb-4">Summary of Changes</Typography>
          <Grid container spacing={2}>
            {summary.map((item: any, idx: number) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Box 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" 
                  onClick={() => {
                    const params = new URLSearchParams(window.location.search)
                    
                    let tabId = ''
                    if (item.section === 'Company') tabId = 'vendor_company'
                    else if (item.section === 'Person Responsible') tabId = 'vendor_personnel'
                    else if (item.section === 'User Access') tabId = 'vendor_user_access'
                    else if (item.section === 'Bank') tabId = 'vendor_bank'
                    else if (item.section === 'Affiliations') tabId = 'vendor_affiliate'
                    else if (item.section === 'Competency') tabId = 'vendor_capability'
                    else if (item.section === 'Document') tabId = 'vendor_document'
                    else if (item.section === 'Financial Report') tabId = 'vendor_financial_report'
                    
                    if (tabId) {
                      params.set('tab', tabId)
                      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`)
                      window.dispatchEvent(new Event('popstate'))
                    }
                  }}
                >
                  <Typography fontWeight="medium">{item.section}</Typography>
                  <Typography className={`text-xs px-2 py-1 rounded font-semibold ${
                    item.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' :
                    item.action === 'CREATE' ? 'bg-green-100 text-green-700' :
                    item.action === 'DELETE' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.action}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}
    </Box>
  )
}
