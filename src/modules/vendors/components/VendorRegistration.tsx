'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box, Card, Tabs, Tab } from '@mui/material'

import DynamicForm from './DynamicForm'
import DataTableSection from './DataTableSection'
import VendorDocumentsTab from './VendorDocumentsTab'
import type { VendorRegistrationSchema } from '../schemas/types'

interface VendorRegistrationProps {
  schemaConfig: VendorRegistrationSchema
}

export default function VendorRegistration({ schemaConfig }: VendorRegistrationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTabId, setActiveTabId] = useState<string>('')

  // Determine active tab from URL query params
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    
    if (tabParam) {
      setActiveTabId(tabParam)
    } else if (schemaConfig.tabs.length > 0) {
      // Default to first tab if none provided
      const defaultTab = schemaConfig.tabs[0].id

      setActiveTabId(defaultTab)
      router.replace(`?tab=${defaultTab}`, { scroll: false })
    }
  }, [searchParams, schemaConfig, router])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTabId(newValue)
    router.push(`?tab=${newValue}`, { scroll: false })
  }

  // Find the active tab schema
  const activeTab = schemaConfig.tabs.find((t) => t.id === activeTabId)

  if (!activeTab) {
    return null // Loading or invalid state
  }

  return (
    <Box className="flex flex-col w-full h-full">
      <Card className="mb-6">
        <Tabs
          value={activeTabId}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="vendor registration tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {schemaConfig.tabs.map((tab) => (
            <Tab 
              key={tab.id} 
              label={tab.label} 
              value={tab.id} 
              icon={<i className={`${tab.icon} text-lg`} />}
              iconPosition="start"
              sx={{ minHeight: 64, px: 4 }}
            />
          ))}
        </Tabs>
      </Card>

      <Card className="min-h-[500px] flex flex-col">
        {activeTab.type === 'form' && activeTab.schema && (
          <DynamicForm 
            key={activeTab.id}
            schema={activeTab.schema}
            mode="update"
            tabEndpoint={activeTab.tabEndpoint}
          />
        )}

        {activeTab.type === 'datatable' && activeTab.datatableConfigs && (
          <DataTableSection
            key={activeTab.id}
            configs={activeTab.datatableConfigs}
          />
        )}

        {activeTab.type === 'documents' && (
          <VendorDocumentsTab key={activeTab.id} />
        )}
      </Card>
    </Box>
  )
}
