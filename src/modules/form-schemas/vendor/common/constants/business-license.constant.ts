export enum LicenseStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

export enum LicenseCategory {
  GENERAL = 'GENERAL',
  SPECIAL = 'SPECIAL',
  CONSTRUCTION = 'CONSTRUCTION',
}


export const BusinessLicenseConstants = {
  // Schema
  SCHEMA_ID: 'businessLicenseSchema',
  SCHEMA_TITLE: 'Business License',
  
  // Document
  DOCUMENT_ID: 'BUSINESS_LICENSE',
  
  // Sections
  SECTION_LICENSE_INFO_ID: 'licenseInfo',
  SECTION_LICENSE_INFO_CODE: 'LICENSE_INFO',
  SECTION_LICENSE_INFO_TITLE: 'License Information',
  SECTION_LICENSE_INFO_DESCRIPTION: 'Provide your license information.',

//   SECTION_NIB_DOCUMENT_ID: 'nibDocument',
//   SECTION_NIB_DOCUMENT_CODE: 'NIB_DOCUMENT',
//   SECTION_NIB_DOCUMENT_TITLE: 'NIB Document',
//   SECTION_NIB_DOCUMENT_DESCRIPTION: 'Upload your NIB document and define your industry classifications.',

  SECTION_INDUSTRY_CLASSIFICATION_ID: 'industryClassification',
  SECTION_INDUSTRY_CLASSIFICATION_CODE: 'INDUSTRY_CLASSIFICATION',
  SECTION_INDUSTRY_CLASSIFICATION_TITLE: 'Industry Classification',
  SECTION_INDUSTRY_CLASSIFICATION_DESCRIPTION: 'Define your industry classifications.',
} as const;
