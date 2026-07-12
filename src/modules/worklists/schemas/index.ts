import { WorklistProfileSchema } from './types'
import { worklistCompanyGroup } from './company.schema'
import { worklistPersonnelGroups } from './personnel.schema'
import { worklistBankGroup } from './bank.schema'
import { worklistBusinessLicenseGroup } from './business-license.schema'
import { worklistCompetencyGroup } from './competency.schema'
import { worklistDocumentGroup } from './document.schema'
import { worklistFinancialReportGroup } from './financial-report.schema'
import { worklistUserAccessGroup } from './user-access.schema'
import { worklistAffiliationGroup } from './affiliation.schema'

export const worklistProfileSchema: WorklistProfileSchema = {
  tabs: [
    {
      id: 'summary',
      label: 'Summary',
      icon: 'ri-dashboard-line',
      isSummary: true,
    },
    {
      id: 'company',
      label: 'Company',
      icon: 'ri-building-4-line',
      groups: [worklistCompanyGroup]
    },
    {
      id: 'personnel',
      label: 'Person Responsible',
      icon: 'ri-user-line',
      groups: worklistPersonnelGroups
    },
    {
      id: 'user-access',
      label: 'User Access',
      icon: 'ri-user-line',
      groups: [worklistUserAccessGroup]
    },
    {
      id: 'bank',
      label: 'Bank',
      icon: 'ri-bank-card-line',
      groups: [worklistBankGroup]
    },
    {
      id: 'affiliation',
      label: 'Affiliation',
      icon: 'ri-exchange-funds-line',
      groups: [worklistAffiliationGroup]
    },
    {
      id: 'capability',
      label: 'Capability & Portfolio',
      icon: 'ri-briefcase-line',
      groups: [worklistBusinessLicenseGroup, worklistCompetencyGroup]
    },
    {
      id: 'document',
      label: 'Document',
      icon: 'ri-file-text-line',
      groups: [worklistDocumentGroup]
    },
    {
      id: 'financial',
      label: 'Financial Report',
      icon: 'ri-line-chart-line',
      groups: [worklistFinancialReportGroup]
    },
    {
      id: 'history',
      label: 'Approval History',
      icon: 'ri-history-line',
      isHistory: true
    }
  ]
}
