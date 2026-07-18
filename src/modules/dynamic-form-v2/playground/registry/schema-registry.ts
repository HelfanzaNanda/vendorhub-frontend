import { 
  VendorCompanySchema,
  VendorPersonnelSchema,
  VendorBankSchema,
  VendorBusinessLicenseSchema,
  VendorCompetencySchema,
  VendorDocumentSchema,
  VendorFinancialReportSchema,
  UserAccessSchema,
  VendorAffiliateSchema
} from '@/modules/form-schemas/vendor/local/schemas';
import { SchemaCategory } from './schema-category';
import type { PlaygroundSchema } from './types';

export const SchemaRegistry: readonly PlaygroundSchema[] = [
  {
    id: 'vendor-company',
    title: 'Vendor Company',
    category: SchemaCategory.VENDOR,
    description: 'Schema for managing vendor company information.',
    schema: VendorCompanySchema
  },
  {
    id: 'vendor-personnel',
    title: 'Vendor Personnel',
    category: SchemaCategory.VENDOR,
    description: 'Schema for managing vendor board of directors, shareholders, and signers.',
    schema: VendorPersonnelSchema
  },
  {
    id: 'vendor-bank',
    title: 'Vendor Bank Accounts',
    category: SchemaCategory.VENDOR,
    description: 'Schema for managing vendor bank accounts.',
    schema: VendorBankSchema
  },
  {
    id: 'vendor-business-license',
    title: 'Vendor Business License',
    category: SchemaCategory.VENDOR,
    description: 'Schema for managing vendor business licenses and KBLI classifications.',
    schema: VendorBusinessLicenseSchema
  },
  {
    id: 'vendor-competency',
    title: 'Vendor Competency',
    category: SchemaCategory.VENDOR,
    description: 'Schema for managing vendor competencies and customer references.',
    schema: VendorCompetencySchema
  },
  {
    id: 'vendor-document',
    title: 'Vendor Document',
    category: SchemaCategory.VENDOR,
    description: 'Schema for managing vendor legal, tax, and company documents.',
    schema: VendorDocumentSchema
  },
  {
    id: 'vendor-financial-report',
    title: 'Vendor Financial Report',
    category: SchemaCategory.VENDOR,
    description: 'Schema for managing vendor financial statements.',
    schema: VendorFinancialReportSchema
  },
  {
    id: 'vendor-user-access',
    title: 'Vendor User Access',
    category: SchemaCategory.VENDOR,
    description: 'Schema for managing vendor portal users and access controls.',
    schema: UserAccessSchema
  },
  {
    id: 'vendor-affiliate',
    title: 'Vendor Affiliate',
    category: SchemaCategory.VENDOR,
    description: 'Schema for managing vendor affiliated companies.',
    schema: VendorAffiliateSchema
  }
];
