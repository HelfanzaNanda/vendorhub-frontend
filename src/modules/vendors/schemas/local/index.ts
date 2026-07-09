import type { VendorProfileSchema } from '../types'
import { termsSchema } from './terms.schema'
import { localCompanySchema } from './company.schema'
import { personnelModalSchema } from './personnel.schema'
import { userAccessModalSchema } from './user_access.schema'
import { bankModalSchema } from './bank.schema'
import { affiliateModalSchema } from './affiliate.schema'
import { competencyModalSchema, capabilityFormSchema } from './capability.schema'
import { financialModalSchema } from './financial.schema'

export const localVendorSchema: VendorProfileSchema = {
  vendorType: 'local',
  tabs: [
    {
      id: 'terms_conditions',
      label: 'Terms & Conditions',
      icon: 'ri-file-list-3-line',
      type: 'terms_conditions',
      schema: termsSchema,
    },
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
      tabEndpoint: '/vendor-user-temps',
      datatableConfigs: [
        {
          id: 'USER_ACCESS',
          title: 'User Access',
          description: 'Manage portal access users, roles, and areas.',
          apiEndpoint: '/vendor-user-temps',
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
      tabEndpoint: '/vendor-bank-temps',
      datatableConfigs: [
        {
          id: 'BANK_ACCOUNT',
          title: 'Bank Accounts',
          apiEndpoint: '/vendor-bank-temps',
          canDelete: true,
          modalFormSchema: bankModalSchema,
          columns: [
            { id: 'accountName', header: 'Account Name', accessorKey: 'accountName' },
            { id: 'accountNumber', header: 'Account Number', accessorKey: 'accountNumber' },
            { id: 'currencyId', header: 'Currency', accessorKey: 'currency.name' },
            { id: 'bankBranchId', header: 'Bank Branch', accessorKey: 'bankBranch.name' },
          ],
        },
      ],
    },
    {
      id: 'vendor_affiliate',
      label: 'Affiliations',
      icon: 'ri-organization-chart',
      type: 'datatable',
      tabEndpoint: '/vendor-affiliation-temps',
      datatableConfigs: [
        {
          id: 'AFFILIATE',
          title: 'Company Affiliations',
          description: 'Kindly list any other companies, if any, that have common ownership with the company being registered.',
          apiEndpoint: '/vendor-affiliation-temps',
          canDelete: true,
          modalFormSchema: affiliateModalSchema,
          columns: [
            { id: 'companyName', header: 'Company Name', accessorKey: 'companyName' },
            { id: 'npwp', header: 'NPWP', accessorKey: 'npwp' },
            { id: 'affiliateTypeId', header: 'Affiliate Type', accessorKey: 'affiliateType.name' },
            { id: 'businessField', header: 'Business Field', accessorKey: 'businessField' },
          ],
        },
      ],
    },
    {
      id: 'vendor_capability',
      label: 'Capability & Portfolio',
      icon: 'ri-award-line',
      type: 'mixed',
      schema: capabilityFormSchema,
      tabEndpoint: '/vendor-capability-temps',
      datatableConfigs: [
        {
          id: 'COMPETENCY',
          title: 'Competencies',
          apiEndpoint: '/vendor-competency-temps',
          canDelete: true,
          modalFormSchema: competencyModalSchema,
          columns: [
            { id: 'category', header: 'Category', accessorKey: 'subCategoryItem.subCategory.category.name' },
            { id: 'subCategory', header: 'Sub Category', accessorKey: 'subCategoryItem.subCategory.name' },
            { id: 'subCategoryItem', header: 'Sub Category Item', accessorKey: 'subCategoryItem.name' },
            { id: 'customerReferencesCount', header: 'Total Customer References', accessorKey: 'customerReferencesCount' },

            // { id: 'createdAt', header: 'Created At', accessorKey: 'createdAt', cell: 'date' },
            // { id: 'updatedAt', header: 'Updated At', accessorKey: 'updatedAt', cell: 'date' },
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
      tabEndpoint: '/vendor-financial-report-temps',
      datatableConfigs: [
        {
          id: 'FINANCIAL_REPORT',
          title: 'Financial Reports',
          apiEndpoint: '/vendor-financial-report-temps',
          canDelete: true,
          modalFormSchema: financialModalSchema,
          columns: [
            { id: 'year', header: 'Year', accessorKey: 'year' },
            { id: 'reportType', header: 'Report Type', accessorKey: 'reportType' },
            { id: 'auditStatus', header: 'Audit Status', accessorKey: 'auditStatus' },
            { id: 'totalAssets', header: 'Total Assets', accessorKey: 'totalAssets' },
            { id: 'totalRevenue', header: 'Total Revenue', accessorKey: 'totalRevenue' },
          ],
        },
      ],
    },
  ],
}
