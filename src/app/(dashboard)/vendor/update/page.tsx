'use client'

import { Box } from '@mui/material'

import PageHeader from '@/components/shared/PageHeader'
import VendorProfile from '@/modules/vendors/components/VendorProfile'
import { localVendorSchema } from '@/modules/vendors/schemas/local'

export default function UpdateVendorPage() {
  return (
    <Box className="flex flex-col gap-6 p-4 h-full">
      <PageHeader
        title="Update Vendor Profile"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Vendor' },
          { label: 'Update Profile' },
        ]}
        actionLabel="Submit"
        actionIcon={<i className="ri-send-plane-fill" />}
        onActionClick={() => console.log('Submit Global Action')}
      />
      
      <Box className="flex-grow">
        <VendorProfile 
          schemaConfig={localVendorSchema} 
        />
      </Box>
    </Box>
  )
}
