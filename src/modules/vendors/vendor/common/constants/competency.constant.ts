export enum ReferenceStatus {
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
  PENDING = 'PENDING',
}

export enum PortfolioStatus {
  COMPLETED = 'COMPLETED',
  ONGOING = 'ONGOING',
  CANCELLED = 'CANCELLED',
}



export const CompetencyConstants = {
  // Schema
  SCHEMA_ID: 'competencySchema',
  SCHEMA_TITLE: 'Competency',
  
  // Document
  DOCUMENT_ID: 'COMPETENCY',
  
  // Sections
  SECTION_COMPETENCY_ID: 'competency',
  SECTION_COMPETENCY_CODE: 'COMPETENCY',
  SECTION_COMPETENCY_TITLE: 'Competency',
  SECTION_COMPETENCY_DESCRIPTION: 'Competency is a measure of your ability to perform a task or perform a job. It is a measure of your skills, knowledge, and experience. It is a measure of your ability to perform a task or perform a job. It is a measure of your skills, knowledge, and experience.',

} as const;


export const CustomerConstants = {
  // Schema
  SCHEMA_ID: 'customerReferenceSchema',
  SCHEMA_TITLE: 'Customer Reference',
  
  // Document
  DOCUMENT_ID: 'CUSTOMER_REFERENCE',
  
  // Sections
  SECTION_ID: 'customer',
  SECTION_CODE: 'CUSTOMER',
  SECTION_TITLE: 'Customer Reference',
  SECTION_DESCRIPTION: '',

} as const;
