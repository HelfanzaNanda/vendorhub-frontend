import { z } from 'zod'

import type { FormSchema } from '../types'

export const userAccessModalSchema: FormSchema = {
  id: 'user_access_modal',
  title: 'User Access',
  sections: [
    {
      id: 'user_details',
      title: 'User Details',
      fields: [
        {
          id: 'firstname',
          name: 'firstname',
          label: 'First Name',
          type: 'text',
          required: true,
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'lastname',
          name: 'lastname',
          label: 'Last Name',
          type: 'text',
          required: true,
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'jobTitle',
          name: 'jobTitle',
          label: 'Job Title',
          type: 'text',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'positionId',
          name: 'positionId',
          label: 'Position',
          type: 'select',
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'positions',
        },
        {
          id: 'phone',
          name: 'phone',
          label: 'Phone Number',
          type: 'telco-phone',
          required: true,
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'effectiveEndDate',
          name: 'effectiveEndDate',
          label: 'Effective End Date',
          type: 'date',
          grid: { xs: 12, md: 6 }
        },
        {
          id: 'email',
          name: 'email',
          label: 'Email Address',
          type: 'email-with-verification',
          required: true,
          validation: z.string().email('Invalid email address'),
          grid: { xs: 12 }
        },
        {
          id: 'emailAvailable',
          name: 'emailAvailable',
          label: 'Email Availability',
          type: 'text',
          visibility: () => false,
          validation: z.literal(true, { errorMap: () => ({ message: 'Complete email verification before saving.' }) }),
        },
        {
          id: 'otpVerified',
          name: 'otpVerified',
          label: 'OTP',
          type: 'verify-otp',
          required: true,
          grid: { xs: 12 },
          validation: z.literal(true, { errorMap: () => ({ message: 'Complete OTP verification before saving.' }) }),
        },
        {
          id: 'roleIds',
          name: 'roleIds',
          label: 'Roles',
          type: 'multi-select',
          required: true,
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'roles?type=external',
        },
        {
          id: 'areaIds',
          name: 'areaIds',
          label: 'Areas',
          type: 'multi-select',
          required: true,
          grid: { xs: 12, md: 6 },
          lookupEndpoint: 'areas',
        },
        {
          id: 'formPengajuanFile',
          name: 'formPengajuanFile',
          label: 'Form Pengajuan Document',
          type: 'file',
          required: true,
          grid: { xs: 12 }
        },
      ]
    }
  ]
}
