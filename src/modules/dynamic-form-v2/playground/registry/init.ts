import {
    VendorCompanySchema,
    VendorPersonnelSchema,
    VendorBusinessLicenseSchema,
    VendorCompetencySchema,
    VendorDocumentSchema,
    VendorFinancialReportSchema,
    VendorAffiliateSchema,
    VendorUserAccessTableSchema,
    VendorBankTableSchema
} from '@/modules/form-schemas/vendor/local/schemas';
import { SchemaCategory } from './schema-category';
import type { PlaygroundSchema } from './types';
import { SchemaRegistry } from '../../registries/schema.registry';

const playgroundSchemas: readonly PlaygroundSchema[] = [
    {
        id: 'vendor-company',
        title: 'Company Information',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor company information.',
        schema: VendorCompanySchema
    },
    {
        id: 'vendor-personnel',
        title: 'Personnel',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor board of directors, shareholders, and signers.',
        schema: VendorPersonnelSchema
    },
    {
        id: 'vendor-user-access',
        title: 'User Access',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor portal users and access controls.',
        schema: VendorUserAccessTableSchema
    },
    {
        id: 'vendor-bank',
        title: 'Bank Accounts',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor bank accounts.',
        schema: VendorBankTableSchema
    },
    {
        id: 'vendor-affiliate',
        title: 'Affiliate',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor affiliated companies.',
        schema: VendorAffiliateSchema
    },
    // {
    //     id: 'vendor-competency',
    //     title: 'Capability & Portfilio',
    //     category: SchemaCategory.VENDOR,
    //     description: 'Schema for managing vendor competencies and customer references.',
    //     schema: VendorCompetencySchema
    // },
    {
        id: 'vendor-document',
        title: 'Document',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor legal, tax, and company documents.',
        schema: VendorDocumentSchema
    },
    {
        id: 'vendor-financial-report',
        title: 'Financial Report',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor financial statements.',
        schema: VendorFinancialReportSchema
    },
];

// Register all playground schemas to the central registry
playgroundSchemas.forEach(item => {
    SchemaRegistry.register(item.id, item.schema, {
        title: item.title,
        category: item.category,
        description: item.description
    });
});
