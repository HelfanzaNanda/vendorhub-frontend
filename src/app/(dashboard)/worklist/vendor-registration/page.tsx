'use client'

import React from 'react'
import { WorklistDashboard } from '@/modules/worklists/components/WorklistDashboard'
import { WorkflowCode } from '@/modules/worklists/enums/workflow-code.enum'

export default function VendorRegistrationWorklistPage() {
  return <WorklistDashboard workflowCode={WorkflowCode.VENDOR_REGISTRATION} title="Vendor Registration" />
}
