export enum UserAccessStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const UserAccessConstants = {
  // Schema
  SCHEMA_ID: 'userAccessSchema',
  SCHEMA_TITLE: 'User Access',

  DOCUMENT_ID: 'USER_ACCESS',

  // Sections
  SECTION_USER_ACCESS_ID: 'userAccess',
  SECTION_USER_ACCESS_CODE: 'USER_ACCESS',
  SECTION_USER_ACCESS_TITLE: 'User Access',
  SECTION_USER_ACCESS_DESCRIPTION: 'Manage portal access users, roles, and areas.'
} as const;
