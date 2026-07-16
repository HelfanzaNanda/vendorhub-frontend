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
      <Card sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Workflow Information</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                <Typography color="text.secondary">Request No</Typography>
                <Typography fontWeight="medium">{workflowInfo?.requestNo || '-'}</Typography>

              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                <Typography color="text.secondary">Workflow</Typography>
                <Typography fontWeight="medium">{workflowInfo?.workflow || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                <Typography color="text.secondary">Status</Typography>
                <Typography fontWeight="medium" color="primary">{workflowInfo?.status || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                <Typography color="text.secondary">Submitted By</Typography>
                <Typography fontWeight="medium">{workflowInfo?.submittedBy || '-'}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                <Typography color="text.secondary">Submitted Date</Typography>
                <Typography fontWeight="medium">{workflowInfo?.submittedDate || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                <Typography color="text.secondary">Current Step</Typography>
                <Typography fontWeight="medium">{workflowInfo?.currentStep || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                <Typography color="text.secondary">SLA PIC</Typography>
                <Typography fontWeight="medium">{workflowInfo?.slaPic || '-'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}>
                <Typography color="text.secondary">Due Date</Typography>
                <Typography fontWeight="medium">{workflowInfo?.dueDate || '-'}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {summary && summary.length > 0 && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Summary of Changes</Typography>
          <Grid container spacing={2}>
            {summary.map((item: any, idx: number) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Box 
                  className="cursor-pointer transition-colors" 
                  onClick={() => {
                    const params = new URLSearchParams(window.location.search)
                    
                    let tabId = ''

                    if (item.section === 'Company') tabId = 'vendor_company'
                    else if (item.section === 'Personnel') tabId = 'vendor_personnel'
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
                  sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5,
                    border: '1px solid', borderColor: 'divider', borderRadius: 2,
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <Typography fontWeight="medium">{item.section}</Typography>
                  <Box sx={{
                    px: 1, py: 0.5, borderRadius: 1, fontSize: '0.75rem', fontWeight: 600,
                    ...(item.action === 'UPDATE' ? { bgcolor: 'info.main', color: 'info.contrastText' } :
                        item.action === 'CREATE' ? { bgcolor: 'success.main', color: 'success.contrastText' } :
                        item.action === 'DELETE' ? { bgcolor: 'error.main', color: 'error.contrastText' } :
                        { bgcolor: 'action.selected', color: 'text.primary' })
                  }}>
                    {item.action}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>
      )}
    </Box>
  )
}
