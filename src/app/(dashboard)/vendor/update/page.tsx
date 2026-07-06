'use client'

import { Box } from '@mui/material'

import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

import PageHeader from '@/components/shared/PageHeader'
import VendorProfile from '@/modules/vendors/components/VendorProfile'
import { localVendorSchema } from '@/modules/vendors/schemas/local'

function UpdateVendorPageContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'terms_conditions'
  
  return (
    <Box className="flex flex-col gap-6 p-4 h-full">
      <PageHeader
        title="Update Vendor Profile"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Vendor' },
          { label: 'Update Profile' },
        ]}
        actionLabel={activeTab !== 'terms_conditions' ? 'Submit' : undefined}
        actionIcon={activeTab !== 'terms_conditions' ? <i className="ri-send-plane-fill" /> : undefined}
        onActionClick={activeTab !== 'terms_conditions' ? () => console.log('Submit Global Action') : undefined}
      />
      
      <Box className="flex-grow">
        <VendorProfile 
          schemaConfig={localVendorSchema} 
        />
      </Box>
    </Box>
  )
}

export default function UpdateVendorPage() {
  return (
    <Suspense fallback={null}>
      <UpdateVendorPageContent />
    </Suspense>
  )
}
