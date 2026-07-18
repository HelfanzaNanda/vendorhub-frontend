export const BankConstants = {
  // Account Info
  MAX_ACCOUNT_NUMBER_LENGTH: 50,
  MAX_ACCOUNT_NAME_LENGTH: 100,
  MAX_SWIFT_CODE_LENGTH: 11,
  
  // Schema
  SCHEMA_ID: 'bankSchema',
  SCHEMA_TITLE: 'Bank',
  
  // Document
  DOCUMENT_ID: 'BANK',
  
  // Sections
  SECTION_ACCOUNT_INFO_ID: 'accountInfo',
  SECTION_ACCOUNT_INFO_CODE: 'ACCOUNT_INFO',
  SECTION_ACCOUNT_INFO_TITLE: 'Account Info',
  SECTION_ACCOUNT_INFO_DESCRIPTION: 'Kindly provide your bank account details for payments.'
} as const;
