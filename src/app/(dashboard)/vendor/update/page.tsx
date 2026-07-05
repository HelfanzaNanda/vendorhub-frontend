'use client'

import { useEffect } from 'react'

import { Box } from '@mui/material'

import PageHeader from '@/components/shared/PageHeader'
import VendorRegistration from '@/modules/vendors/components/VendorRegistration'
import { localVendorSchema } from '@/modules/vendors/schemas/local'
import { useVendorStore } from '@/modules/vendors/store/vendorStore'

export default function UpdateVendorPage() {
  const { setVendorId } = useVendorStore()

  // Initialize the store with a mock/implicit Vendor ID for now
  useEffect(() => {
    setVendorId('VND-CURRENT') // Implicit from auth context in real app
  }, [setVendorId])

  return (
    <Box className="flex flex-col gap-6 p-4 h-full">
      <PageHeader
        title="Update Vendor Profile"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Vendor' },
          { label: 'Update Profile' },
        ]}
      />
      
      <Box className="flex-grow">
        <VendorRegistration 
          schemaConfig={localVendorSchema} 
        />
      </Box>
    </Box>
  )
}
