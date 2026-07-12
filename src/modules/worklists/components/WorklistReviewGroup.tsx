import React from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'
import { WorklistDataGroupSchema } from '../schemas/types'
import WorklistReviewCard from './WorklistReviewCard'

interface WorklistReviewGroupProps {
  group: WorklistDataGroupSchema
  workflowTransactionId: string
}

export default function WorklistReviewGroup({ group, workflowTransactionId }: WorklistReviewGroupProps) {
  const { data: response, isLoading, isError } = useQuery({
    queryKey: [group.endpoint, workflowTransactionId],
    queryFn: () => api.get(group.endpoint.replace(':workflowTransactionId', workflowTransactionId)),
    enabled: !!group.endpoint && !!workflowTransactionId
  })

  if (isLoading) {
    return (
      <Box className="flex justify-center p-8">
        <CircularProgress size={24} />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box className="p-4 bg-red-50 text-red-600 rounded">
        Failed to load data for {group.title}.
      </Box>
    )
  }

  // Assuming backend returns an array of temp records or a single object inside response.data
  const rawData = response?.data
  const records = Array.isArray(rawData) ? rawData : (rawData ? [rawData] : [])

  return (
    <Box className="flex flex-col gap-4">
      <Typography variant="h6" className="font-bold text-gray-800">
        {group.title}
      </Typography>

      {records.length === 0 ? (
        <Box className="p-6 bg-gray-50 border border-dashed border-gray-300 rounded text-center text-gray-500">
          No data available.
        </Box>
      ) : (
        <Box className="flex flex-col gap-6">
          {records.map((record, index) => (
            <WorklistReviewCard 
              key={record.id || index} 
              record={record} 
              group={group} 
              workflowTransactionId={workflowTransactionId} 
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
