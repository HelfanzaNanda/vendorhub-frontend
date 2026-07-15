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
          {tab.groups?.map((group) => {
            let groupPendingReviews = 0;
            const validation = worklistData?.reviewValidation?.[tab.id];
            
            if (validation?.groups) {
              // Try direct mapping
              const camelCaseId = group.id.toLowerCase().replace(/_([a-z])/g, (g) => g[1].toUpperCase());
              if (validation.groups[camelCaseId] !== undefined) {
                groupPendingReviews = validation.groups[camelCaseId];
              } else {
                // Try to find a matching key based on title or ID
                const normalizedGroupId = group.id.toLowerCase().replace(/[^a-z0-9]/g, '');
                const normalizedTitle = group.title.toLowerCase().replace(/[^a-z0-9]/g, '');
                
                for (const key in validation.groups) {
                  const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
                  if (normalizedKey === normalizedGroupId || normalizedKey === normalizedTitle || normalizedKey.includes(normalizedGroupId) || normalizedGroupId.includes(normalizedKey)) {
                    groupPendingReviews = validation.groups[key];
                    break;
                  }
                }
              }
            }

            return (
              <WorklistReviewGroup 
                key={group.id} 
                group={group} 
                workflowTransactionId={workflowTransactionId} 
                pendingReviews={groupPendingReviews}
              />
            )
          })}
        </Box>
      )}
    </Box>
  )
}
