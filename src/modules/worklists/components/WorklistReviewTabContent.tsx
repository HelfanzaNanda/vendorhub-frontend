import React, { useContext } from 'react'
import { Box, Typography, Card, Grid, Chip } from '@mui/material'
import { WorklistTabSchema } from '../schemas/types'
import WorklistReviewGroup from './WorklistReviewGroup'
import WorklistReviewSummary from './WorklistReviewSummary'
import WorklistApprovalHistory from './WorklistApprovalHistory'
import { WorklistReviewContext } from '../context'

interface WorklistReviewTabContentProps {
  tab: WorklistTabSchema
  workflowTransactionId: string
}

export default function WorklistReviewTabContent({ tab, workflowTransactionId }: WorklistReviewTabContentProps) {
  const { worklistData } = useContext(WorklistReviewContext)
  const info = worklistData?.workflowInfo

  return (
    <Box className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Box className="mb-6 pb-4 border-b border-gray-100 flex items-center gap-3">
        {tab.icon && <i className={`${tab.icon} text-2xl text-primary-600`} />}
        <Box>
          <Typography variant="h5" className="font-bold text-gray-900">
            {tab.label}
          </Typography>
        </Box>
      </Box>

      {tab.isSummary ? (
        <WorklistReviewSummary workflowTransactionId={workflowTransactionId} />
      ) : tab.isHistory ? (
        <WorklistApprovalHistory workflowTransactionId={workflowTransactionId} />
      ) : (
        <Box className="flex flex-col gap-8">
          {tab.groups?.map((group) => (
            <WorklistReviewGroup 
              key={group.id} 
              group={group} 
              workflowTransactionId={workflowTransactionId} 
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
