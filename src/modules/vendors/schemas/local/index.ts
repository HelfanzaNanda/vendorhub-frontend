import type { VendorRegistrationSchema } from '../types'
import { localCompanySchema } from './company.schema'
import { personnelModalSchema } from './personnel.schema'
import { userAccessModalSchema } from './user_access.schema'
import { bankModalSchema } from './bank.schema'
import { affiliateModalSchema } from './affiliate.schema'
import { businessLicenseModalSchema, competencyModalSchema } from './capability.schema'
import { financialModalSchema } from './financial.schema'

export const localVendorSchema: VendorRegistrationSchema = {
  vendorType: 'local',
  tabs: [
    {
      id: 'vendor_company',
      label: 'Company Info',
      icon: 'ri-building-4-line',
      type: 'form',
      schema: localCompanySchema,
      tabEndpoint: '/vendor-company-temps',
    },
    {
      id: 'vendor_personnel',
      label: 'Personnel',
      icon: 'ri-group-line',
      type: 'datatable',
      tabEndpoint: '/vendor-personnel-temps',
      datatableConfigs: [
        {
          id: 'BOARD_OF_DIRECTORS',
          title: 'Board of Directors',
          description: 'Manage the board of directors.',
          apiEndpoint: '/vendor-personnel-temps',
          canDelete: true,
          modalFormSchema: personnelModalSchema,
          columns: [
            { id: 'name', header: 'Full Name', accessorKey: 'name' },
            { id: 'position', header: 'Position', accessorKey: 'position' },
            { id: 'email', header: 'Email Address', accessorKey: 'email' },
            { id: 'phone', header: 'Phone Number', accessorKey: 'phone' },
            { id: 'identityNumber', header: 'Identity Number', accessorKey: 'identityNumber' },
          ],
        },
        {
          id: 'SHAREHOLDER',
          title: 'Shareholders',
          description: 'Manage company shareholders and ownership percentages.',
          apiEndpoint: '/vendor-personnel-temps',
          canDelete: true,
          modalFormSchema: personnelModalSchema,
          columns: [
            { id: 'name', header: 'Full Name', accessorKey: 'name' },
            { id: 'ownershipPercentage', header: 'Ownership (%)', accessorKey: 'ownershipPercentage', cell: 'percentage' },
            { id: 'email', header: 'Email Address', accessorKey: 'email' },
            { id: 'phone', header: 'Phone Number', accessorKey: 'phone' },
            { id: 'identityNumber', header: 'Identity Number', accessorKey: 'identityNumber' },
          ],
        },
        {
          id: 'AUTHORIZED_SIGNER',
          title: 'Authorized Signers',
          description: 'Manage personnel authorized to sign legal documents.',
          apiEndpoint: '/vendor-personnel-temps',
          canDelete: true,
          modalFormSchema: personnelModalSchema,
          columns: [
            { id: 'name', header: 'Full Name', accessorKey: 'name' },
            { id: 'position', header: 'Position', accessorKey: 'position' },
            { id: 'email', header: 'Email Address', accessorKey: 'email' },
            { id: 'phone', header: 'Phone Number', accessorKey: 'phone' },
            { id: 'identityNumber', header: 'Identity Number', accessorKey: 'identityNumber' },
          ],
        },
      ],
    },
    {
      id: 'vendor_user_access',
      label: 'User Access',
      icon: 'ri-shield-user-line',
      type: 'datatable',
      tabEndpoint: '/vendor-user-access-temps',
      datatableConfigs: [
        {
          id: 'USER_ACCESS',
          title: 'User Access',
          description: 'Manage portal access users, roles, and areas.',
          apiEndpoint: '/vendor-user-access-temps',
          canDelete: true,
          modalFormSchema: userAccessModalSchema,
          columns: [
            { id: 'username', header: 'Username', accessorKey: 'username' },
            { id: 'email', header: 'Email', accessorKey: 'email' },
            { id: 'jobTitle', header: 'Job Title', accessorKey: 'jobTitle' },
            { id: 'effectiveStartDate', header: 'Start Date', accessorKey: 'effectiveStartDate', cell: 'date' },
            { id: 'effectiveEndDate', header: 'End Date', accessorKey: 'effectiveEndDate', cell: 'date' },
          ],
        },
      ],
    },
    {
      id: 'vendor_bank',
      label: 'Bank Accounts',
      icon: 'ri-bank-card-line',
      type: 'datatable',
      tabEndpoint: '/vendor-banks-temps',
      datatableConfigs: [
        {
          id: 'BANK_ACCOUNT',
          title: 'Bank Accounts',
          apiEndpoint: '/vendor-banks-temps',
          canDelete: true,
          modalFormSchema: bankModalSchema,
          columns: [
            { id: 'accountName', header: 'Account Name', accessorKey: 'accountName' },
            { id: 'accountNumber', header: 'Account Number', accessorKey: 'accountNumber' },
            { id: 'currencyId', header: 'Currency', accessorKey: 'currencyId' },
            { id: 'bankBranchId', header: 'Bank Branch', accessorKey: 'bankBranchId' },
          ],
        },
      ],
    },
    {
      id: 'vendor_affiliate',
      label: 'Affiliations',
      icon: 'ri-organization-chart',
      type: 'datatable',
      tabEndpoint: '/vendor-affiliate-temps',
      datatableConfigs: [
        {
          id: 'AFFILIATE',
          title: 'Company Affiliations',
          apiEndpoint: '/vendor-affiliate-temps',
          canDelete: true,
          modalFormSchema: affiliateModalSchema,
          columns: [
            { id: 'companyName', header: 'Company Name', accessorKey: 'companyName' },
            { id: 'npwp', header: 'NPWP', accessorKey: 'npwp' },
            { id: 'affiliateTypeId', header: 'Affiliate Type', accessorKey: 'affiliateTypeId' },
            { id: 'businessField', header: 'Business Field', accessorKey: 'businessField' },
          ],
        },
      ],
    },
    {
      id: 'vendor_capability',
      label: 'Capability & Portfolio',
      icon: 'ri-briefcase-4-line',
      type: 'datatable',
      tabEndpoint: '/vendor-capability-temps',
      datatableConfigs: [
        {
          id: 'BUSINESS_LICENSE',
          title: 'Business Licenses',
          apiEndpoint: '/vendor-capability-temps',
          canDelete: true,
          modalFormSchema: businessLicenseModalSchema,
          columns: [
            { id: 'licenseName', header: 'License Name', accessorKey: 'licenseName' },
            { id: 'licenseNumber', header: 'License Number', accessorKey: 'licenseNumber' },
            { id: 'issueDate', header: 'Issue Date', accessorKey: 'issueDate', cell: 'date' },
            { id: 'expiryDate', header: 'Expiry Date', accessorKey: 'expiryDate', cell: 'date' },
          ],
        },
        {
          id: 'COMPETENCY',
          title: 'Competencies',
          apiEndpoint: '/vendor-capability-temps',
          canDelete: true,
          modalFormSchema: competencyModalSchema,
          columns: [
            { id: 'competencyName', header: 'Competency Area', accessorKey: 'competencyName' },
            { id: 'certificateId', header: 'Certificate Number', accessorKey: 'certificateId' },
            { id: 'description', header: 'Description', accessorKey: 'description' },
          ],
        },
      ],
    },
    {
      id: 'vendor_document',
      label: 'Documents',
      icon: 'ri-file-text-line',
      type: 'documents',
      tabEndpoint: '/vendor-documents-temps',
    },
    {
      id: 'vendor_financial_report',
      label: 'Financials',
      icon: 'ri-line-chart-line',
      type: 'datatable',
      tabEndpoint: '/vendor-financial-reports-temps',
      datatableConfigs: [
        {
          id: 'FINANCIAL_REPORT',
          title: 'Financial Reports',
          apiEndpoint: '/vendor-financial-reports-temps',
          canDelete: true,
          modalFormSchema: financialModalSchema,
          columns: [
            { id: 'year', header: 'Year', accessorKey: 'year' },
            { id: 'reportType', header: 'Report Type', accessorKey: 'reportType' },
            { id: 'auditStatus', header: 'Audit Status', accessorKey: 'auditStatus' },
            { id: 'totalAssets', header: 'Total Assets', accessorKey: 'totalAssets', cell: 'currency' },
            { id: 'totalRevenue', header: 'Total Revenue', accessorKey: 'totalRevenue', cell: 'currency' },
          ],
        },
      ],
    },
  ],
}
