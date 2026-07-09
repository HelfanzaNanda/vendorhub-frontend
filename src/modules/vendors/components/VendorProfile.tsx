'use client'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box, Card, Tabs, Tab, Button, Alert } from '@mui/material'

import DynamicForm from './DynamicForm'
import DataTableSection from './DataTableSection'
import VendorDocumentsTab from './VendorDocumentsTab'
import VendorTermsTab from './VendorTermsTab'
import { useVendorTerms } from '../hooks/useTerms'
import { 
  useVendorCompany, 
  useUpdateVendorCompany,
  useVendorBusinessLicense,
  useUpdateVendorBusinessLicense
} from '../hooks/useSingletonResource'
import type { VendorProfileSchema, VendorTabSchema } from '../schemas/types'
import { useVendorStore } from '../store/vendorStore'

// Wrapper for Vendor Company (Singleton)
function VendorCompanyWrapper({ activeTab }: { activeTab: VendorTabSchema }) {
  const { data, isLoading } = useVendorCompany()
  const updateMutation = useUpdateVendorCompany()

  if (isLoading) return null

  return (
    <DynamicForm 
      key={`${activeTab.id}-form`}
      schema={activeTab.schema!}
      mode="update"
      defaultValues={data}
      onSubmit={(data) => updateMutation.mutate(data)}
      isLoading={updateMutation.isPending}
      showDraftButtons={false}
    />
  )
}

// Wrapper for Vendor Capability (Mixed Singleton + DataTable)
function VendorCapabilityWrapper({ activeTab }: { activeTab: VendorTabSchema }) {
  const { data, isLoading } = useVendorBusinessLicense()
  const updateMutation = useUpdateVendorBusinessLicense()

  const capabilityDraft = useVendorStore(state => state.formDrafts['vendor_capability_form'])

  if (isLoading) return null

  const currentFormValues = capabilityDraft || data || {}
  const industryClassifications = currentFormValues.industryClassifications || []
  const hasIndustryClassification = industryClassifications.length > 0

  return (
    <Box className="flex flex-col gap-6 w-full">
      <Card className="flex flex-col">
        <DynamicForm 
          key={`${activeTab.id}-form`}
          schema={activeTab.schema!}
          mode="update"
          defaultValues={data}
          onSubmit={(formData) => {
            const payload = { ...formData }

            if (payload.nibFileId !== undefined) {
              payload.fileId = payload.nibFileId
              delete payload.nibFileId
            }

            if (payload.industryClassifications) {
              payload.industryClassificationIds = payload.industryClassifications
                .map((ic: any) => Number(ic.industryClassificationId))
                .filter((id: number) => !isNaN(id))
              delete payload.industryClassifications
            }

            updateMutation.mutate(payload)
          }}
          isLoading={updateMutation.isPending}
          showDraftButtons={false}
        />
      </Card>
      {activeTab.datatableConfigs && (
        <Card className="flex flex-col">
          <DataTableSection
            key={`${activeTab.id}-datatable`}
            configs={activeTab.datatableConfigs.map(config => {
              if (config.id === 'COMPETENCY') {
                const updatedConfig = { ...config, disableAdd: !hasIndustryClassification }
                
                // Inject into the field schema directly to avoid polluting payload
                if (updatedConfig.modalFormSchema) {
                  updatedConfig.modalFormSchema = {
                    ...updatedConfig.modalFormSchema,
                    sections: updatedConfig.modalFormSchema.sections.map(section => ({
                      ...section,
                      fields: section.fields.map(field => {
                        if (field.id === 'subCategoryItemId') {
                          return { 
                            ...field, 
                            _industryClassificationIds: industryClassifications
                              .map((ic: any) => ic.industryClassificationId)
                              .filter(Boolean)
                              .join(',') 
                          }
                        }

                        
return field
                      })
                    }))
                  }
                }

                return updatedConfig
              }

              
return config
            })}
          />
        </Card>
      )}
    </Box>
  )
}

interface VendorProfileProps {
  schemaConfig: VendorProfileSchema
}

export default function VendorProfile({ schemaConfig }: VendorProfileProps) {
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

  // Terms and conditions gate
  const { data: termsData, isLoading: isTermsLoading } = useVendorTerms()
  const hasAcceptedTerms = !!termsData?.submission

  useEffect(() => {
    if (!isTermsLoading && !hasAcceptedTerms && schemaConfig.tabs.find(t => t.id === 'terms_conditions')) {
      setActiveTabId('terms_conditions')
      router.replace(`?tab=terms_conditions`, { scroll: false })
    }
  }, [isTermsLoading, hasAcceptedTerms, schemaConfig.tabs, router])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    if (!hasAcceptedTerms && newValue !== 'terms_conditions') {
      return // Prevent navigating away from terms if not accepted
    }

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
      {!hasAcceptedTerms && (
        <Alert severity="warning" className="mb-4">
          Please complete and submit the Terms &amp; Conditions before filling out the remaining vendor information.
        </Alert>
      )}
      <Card className="mb-6">
        <Tabs
          value={activeTabId}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="vendor profile tabs"
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
              disabled={!hasAcceptedTerms && tab.id !== 'terms_conditions'}
            />
          ))}
        </Tabs>
      </Card>

      <Box className="min-h-[500px] flex flex-col gap-6">
        {activeTab.type === 'terms_conditions' && (
          <Card className="flex flex-col"><VendorTermsTab /></Card>
        )}

        {activeTab.id === 'vendor_company' && (
          <Card className="flex flex-col"><VendorCompanyWrapper activeTab={activeTab} /></Card>
        )}

        {activeTab.id === 'vendor_capability' && (
          <VendorCapabilityWrapper activeTab={activeTab} />
        )}

        {activeTab.id !== 'vendor_company' && activeTab.id !== 'vendor_capability' && activeTab.type !== 'documents' && activeTab.type !== 'terms_conditions' && (
          <>
            {(activeTab.type === 'form' || activeTab.type === 'mixed') && activeTab.schema && (
              <Card className="flex flex-col">
                <DynamicForm 
                  key={`${activeTab.id}-form`}
                  schema={activeTab.schema}
                  mode="update"
                  tabEndpoint={activeTab.tabEndpoint}
                />
              </Card>
            )}

            {(activeTab.type === 'datatable' || activeTab.type === 'mixed') && activeTab.datatableConfigs && (
              <Card className="flex flex-col">
                <DataTableSection
                  key={`${activeTab.id}-datatable`}
                  configs={activeTab.datatableConfigs}
                />
              </Card>
            )}
          </>
        )}

        {activeTab.type === 'documents' && (
          <Card className="flex flex-col"><VendorDocumentsTab key={activeTab.id} /></Card>
        )}
      </Box>
    </Box>
  )
}
