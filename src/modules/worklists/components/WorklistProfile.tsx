import React, { useState, useContext } from 'react'
import { Box, Card, Typography, Tab, Tabs } from '@mui/material'
import { WorklistProfileSchema, WorklistTabSchema } from '../schemas/types'
import WorklistReviewTabContent from './WorklistReviewTabContent'
import { useWorklistDetail } from '../hooks'
import { WorklistReviewContext } from '../context'

interface WorklistProfileProps {
  schemaConfig: WorklistProfileSchema
  worklistTransactionId: string
}

export default function WorklistProfile({ schemaConfig, worklistTransactionId }: WorklistProfileProps) {
  const { worklistData, activeTab = 0, setActiveTab, reviewValidation } = useContext(WorklistReviewContext)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (setActiveTab) {
      setActiveTab(newValue)
    }
  }

  const currentTab = schemaConfig.tabs[activeTab]

  return (
    <Card className="flex flex-col md:flex-row shadow-sm border border-gray-100 overflow-hidden">
      {/* Sidebar Tabs */}
      <Box className="w-full md:w-64 border-r border-gray-100 bg-gray-50 flex-shrink-0">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              alignItems: 'flex-start',
              textAlign: 'left',
              textTransform: 'none',
              padding: '16px 24px',
              minHeight: '60px',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'text.secondary',
              borderBottom: '1px solid #f3f4f6',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                color: 'text.primary',
              },
              '&.Mui-selected': {
                color: 'primary.main',
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              left: 0,
              right: 'auto',
              width: '4px',
              borderRadius: '0 4px 4px 0',
            },
          }}
        >
          {schemaConfig.tabs.map((tab: WorklistTabSchema, index: number) => {
            const changesCount = worklistData?.tabChanges?.[tab.id] || 0
            
            // Calculate pending reviews for this tab from reviewValidation
            let pendingReviewsCount = 0
            if (reviewValidation && reviewValidation[tab.id]) {
              const tabValidation = reviewValidation[tab.id]
              if (typeof tabValidation === 'number') {
                pendingReviewsCount = tabValidation
              } else if (tabValidation && typeof tabValidation === 'object' && tabValidation.pendingReviews !== undefined) {
                pendingReviewsCount = tabValidation.pendingReviews
              }
            }
            
            return (
            <Tab
              key={tab.id}
              label={
                <Box className="flex items-center gap-3 w-full">
                  {tab.icon && <i className={`${tab.icon} text-lg`} />}
                  <Typography variant="body2" component={"div"} className="flex-1 font-inherit text-left flex items-center justify-between">
                    <span>{tab.label}</span>
                  </Typography>

                  <Box className="flex items-center gap-1">
                    {changesCount > 0 && (
                    <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {changesCount}
                    </span>
                    )}
                    {pendingReviewsCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {pendingReviewsCount}
                    </span>
                    )}
                </Box>
                  {/* <Typography variant="body2" className="flex-1 font-inherit text-left flex items-center justify-between">
                    <span>{tab.label}</span>
                    <Box className="flex items-center gap-1">
                      {changesCount > 0 && (
                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {changesCount}
                        </span>
                      )}
                      {pendingReviewsCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {pendingReviewsCount}
                        </span>
                      )}
                    </Box>
                  </Typography> */}
                </Box>
              }
              id={`worklist-tab-${index}`}
            />
          )})}
        </Tabs>
      </Box>

      {/* Main Content Area */}
      <Box className="flex-1 p-6 lg:p-8 bg-white min-h-[500px]">
        <WorklistReviewTabContent 
          tab={currentTab} 
          workflowTransactionId={worklistTransactionId} 
        />
      </Box>
    </Card>
  )
}
