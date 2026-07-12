import React, { useContext } from 'react'
import { Box, Card, CircularProgress, Typography } from '@mui/material'
import { WorklistReviewContext } from '../context'
import { useWorklistHistory } from '../hooks'

export default function WorklistApprovalHistory({ workflowTransactionId }: { workflowTransactionId: string }) {
    const { data = [], isLoading, isError } = useWorklistHistory(workflowTransactionId)

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
          Failed to load data for approval history.
        </Box>
      )
    }
  

  const getStatusColor = (action: string) => {
    switch(action.toUpperCase()) {
      case 'SUBMITTED':
      case 'RESUBMITTED': return 'bg-blue-500'
      case 'APPROVED':
      case 'COMPLETED': return 'bg-green-500'
      case 'RETURNED':
      case 'REJECTED': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  return (
    <Card className="p-8 border border-gray-100 shadow-sm">
      <Box className="relative pl-6 border-l-2 border-gray-200 flex flex-col gap-10">
        {data.length === 0 ? (
          <Box className="p-6 bg-gray-50 border border-dashed border-gray-300 rounded text-center text-gray-500">
            No data available.
          </Box>
        ) : (
          data.map((item, idx) => (
          <Box key={idx} className="relative">
            {/* Timeline Dot */}
            <Box className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${getStatusColor(item.action)}`} />
            
            <Box className="flex flex-col gap-1">
              <Box className="flex items-center gap-4">
                <Typography variant="subtitle1" className="font-bold text-gray-900 leading-none">{item.action}</Typography>
                <Typography variant="caption" className="text-gray-500 font-medium leading-none">{item.actionAt}</Typography>
              </Box>
              
              <Typography variant="body2" className="text-gray-700 font-semibold mb-2">{item.actor}</Typography>
              
              {item.remarks && (
                <Box className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <Typography variant="body2" className="text-gray-600 italic">"{item.remarks || '-'}"</Typography>
                </Box>
              )}
            </Box>
          </Box>
        ))
        )}
      </Box>
    </Card>
  )
}
