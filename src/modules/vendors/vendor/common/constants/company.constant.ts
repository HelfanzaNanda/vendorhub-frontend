export const CompanyConstants = {
  // Lengths
  MAX_COMPANY_NAME_LENGTH: 100,
  MAX_WEBSITE_LENGTH: 100,
  MAX_EMAIL_LENGTH: 100,
  MAX_PHONE_LENGTH: 20,

  // Schema
  SCHEMA_ID: 'vendorCompanySchema',
  SCHEMA_CODE: 'VENDOR_COMPANY',
  SCHEMA_TITLE: 'Company Information',

  SECTION_COMPANY_INFO_ID: 'companyInfo',
  SECTION_COMPANY_INFO_CODE: 'COMPANY_INFO',
  SECTION_COMPANY_INFO_TITLE: 'Company Information',
  SECTION_COMPANY_INFO_DESCRIPTION: 'Provide general information about your company.',

  SECTION_ADDRESS_INFO_ID: 'addressInfo',
  SECTION_ADDRESS_INFO_CODE: 'ADDRESS_INFO',
  SECTION_ADDRESS_INFO_TITLE: 'Address Information',

  SECTION_CONTACT_INFO_ID: 'contactInfo',
  SECTION_CONTACT_INFO_CODE: 'CONTACT_INFO',
  SECTION_CONTACT_INFO_TITLE: 'Contact Information',

  SECTION_TAX_INFO_ID: 'taxInfo',
  SECTION_TAX_INFO_CODE: 'TAX_INFO',
  SECTION_TAX_INFO_TITLE: 'Tax Information',

  
  // Layout Codes
  LAYOUT_DEFAULT: 'default',

  
} as const;
