import React, { useContext } from 'react'
import { Box, Card, Typography, Grid, Chip, Button, Divider } from '@mui/material'
import { WorklistReviewContext } from '../context'

interface WorklistReviewSummaryProps {
  workflowTransactionId: string
}

export default function WorklistReviewSummary({ workflowTransactionId }: WorklistReviewSummaryProps) {
  const { worklistData } = useContext(WorklistReviewContext)

  if (!worklistData || !worklistData.workflowInfo) {
    return <Typography>Loading summary...</Typography>
  }

  const info = worklistData.workflowInfo
  const approvers = worklistData.approvers || []

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'APPROVED': return 'success'
      case 'REJECTED': return 'error'
      case 'REVISED': return 'warning'
      case 'WAITING': return 'default'
      default: return 'primary'
    }
  }

  return (
    <Box className="flex flex-col gap-6">
      <Card className="p-6 border border-gray-100 shadow-sm">
        <Typography variant="h6" className="font-bold mb-4 flex items-center gap-2">
          <i className="ri-information-line text-primary-500" /> Workflow Information
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box className="flex flex-col gap-3">
              <InfoRow 
                label="Request No" 
                value={<Typography variant="body1" className="font-bold text-primary-700">{info.requestNo}</Typography>} 
              />
              <InfoRow label="Vendor Name" value={info.vendorName} />
              <InfoRow label="Vendor Type" value={
                <Chip label={info.vendorType} size="small" className="font-medium bg-gray-100" />
              } />
              <InfoRow label="Workflow Name" value={info.workflowName || info.workflow} />
              <InfoRow label="Current Step" value={
                <Chip label={info.currentStep} color="primary" variant="outlined" size="small" className="font-medium" />
              } />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="flex flex-col gap-3">
              <InfoRow label="Status" value={
                <Chip label={info.status} color="primary" size="small" className="font-medium" />
              } />
              <InfoRow label="Site" value={info.site} />
              <InfoRow label="Submitted By" value={info.submittedBy} />
              <InfoRow label="Submitted Date" value={info.submittedDate} />
              <InfoRow label="Due Date" value={
                <Box className="flex items-center gap-1.5 text-amber-600 font-medium">
                  <i className="ri-calendar-event-line" /> {info.dueDate}
                </Box>
              } />
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Review Statistics */}
      <Card className="p-6 border border-gray-100 shadow-sm">
        <Typography variant="h6" className="font-bold mb-4 flex items-center gap-2">
          <i className="ri-bar-chart-box-line text-green-500" /> Review Statistics
        </Typography>
        <Grid container spacing={3}>
          {[
            { label: 'Changed Sections', value: worklistData.reviewStatistics?.changedSections || 0, color: 'text-gray-800' },
            { label: 'Changed Fields', value: worklistData.reviewStatistics?.changedFields || 0, color: 'text-amber-600' },
            { label: 'Created', value: worklistData.reviewStatistics?.created || 0, color: 'text-green-600' },
            { label: 'Updated', value: worklistData.reviewStatistics?.updated || 0, color: 'text-blue-600' },
            { label: 'Deleted', value: worklistData.reviewStatistics?.deleted || 0, color: 'text-red-600' },
            { label: 'No Changes', value: worklistData.reviewStatistics?.noChanges || 0, color: 'text-gray-400' },
          ].map((stat, idx) => (
            <Grid item xs={6} sm={4} md={2} key={idx}>
              <Box className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                <Typography variant="h4" className={`font-black ${stat.color} mb-1`}>{stat.value}</Typography>
                <Typography variant="caption" className="text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>

      <Card className="p-6 border border-gray-100 shadow-sm">
        <Typography variant="h6" className="font-bold mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <i className="ri-user-settings-line text-blue-500" /> Approver Info
          </span>
          <Box className="flex gap-2">
            <Button size="small" variant="outlined">Delegate</Button>
            <Button size="small" variant="contained" color="primary">Change</Button>
          </Box>
        </Typography>
        <Grid container spacing={4}>
          {approvers.map((approver, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex flex-col gap-2 h-full relative">
                <Box className="flex items-center justify-between mb-1">
                  <Typography variant="subtitle2" className="text-gray-500">{approver.role}</Typography>
                  <Chip label={approver.status} color={getStatusColor(approver.status) as any} size="small" className="font-bold text-[10px] h-5" />
                </Box>
                
                <Box>
                  <Typography variant="body1" className="font-bold text-gray-800">{approver.user?.name}</Typography>
                  <Typography variant="caption" className="text-gray-600">{approver.user?.email}</Typography>
                  {approver.delegatedUser && (
                    <Typography variant="caption" className="text-blue-600 font-medium block mt-0.5">
                      Delegated to: {approver.delegatedUser.name}
                      <Typography variant="caption" className="text-gray-600">{approver.delegatedUser?.email}</Typography>
                    </Typography>
                  )}
                </Box>

                <Divider className="my-1 border-gray-200" />
                
                <Box className="grid grid-cols-2 gap-2 mt-1">
                  <Box>
                    <Typography variant="caption" className="text-gray-500 block">Action Date</Typography>
                    <Typography variant="body2" className="font-medium text-gray-700">{approver.actionAt || '-'}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" className="text-gray-500 block">Remarks</Typography>
                    <Typography variant="body2" className="text-gray-700 italic">{approver.remarks || '-'}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
          {approvers.length === 0 && (
            <Grid item xs={12}>
              <Typography className="text-gray-500 italic p-4 text-center">No approvers data available.</Typography>
            </Grid>
          )}
        </Grid>
      </Card>
    </Box>
  )
}

function InfoRow({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <Box className="flex items-start">
      <Typography variant="body2" className="text-gray-500 w-1/3 min-w-[120px]">
        {label}
      </Typography>
      <Box className="flex-1 text-gray-900 font-medium">
        {value || '-'}
      </Box>
    </Box>
  )
}
