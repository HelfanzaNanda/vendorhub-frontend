export enum FinancialReportType {
  INTERIM = 'INTERIM',
  ANNUAL = 'ANNUAL',
}

export enum AuditStatus {
  AUDITED = 'AUDITED',
  UNAUDITED = 'UNAUDITED',
}

export const FinancialReportConstants = {
  // Schema
  SCHEMA_ID: 'financialReportSchema',
  SCHEMA_TITLE: 'Financial Report',

  DOCUMENT_ID: 'FINANCIAL_REPORT',

  // Sections
  SECTION_FINANCIAL_REPORT_DETAIL_ID: 'financialReportDetail',
  SECTION_FINANCIAL_REPORT_DETAIL_CODE: 'FINANCIAL_REPORT_DETAIL',
  SECTION_FINANCIAL_REPORT_DETAIL_TITLE: 'Financial Report Detail',
  SECTION_FINANCIAL_REPORT_DETAIL_DESCRIPTION: 'Manage financial reports detail.',

  // Sections
  SECTION_FINANCIAL_REPORT_FIGURE_ID: 'financialReportFigure',
  SECTION_FINANCIAL_REPORT_FIGURE_CODE: 'FINANCIAL_REPORT_FIGURE',
  SECTION_FINANCIAL_REPORT_FIGURE_TITLE: 'Financial Report Figure',
  SECTION_FINANCIAL_REPORT_FIGURE_DESCRIPTION: 'Manage financial reports figure.'
} as const;
