import {
    VendorCompanySchema,
    VendorPersonnelSchema,
    VendorBankSchema,
    VendorBusinessLicenseSchema,
    VendorCompetencySchema,
    VendorDocumentSchema,
    VendorFinancialReportSchema,
    VendorAffiliateSchema,
    UserAccessTableSchema
} from '@/modules/form-schemas/vendor/local/schemas';
import { SchemaCategory } from './schema-category';
import type { PlaygroundSchema } from './types';
import { SchemaRegistry } from '../../registries/schema.registry';

const playgroundSchemas: readonly PlaygroundSchema[] = [
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
        id: 'vendor-user-access',
        title: 'Vendor User Access',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor portal users and access controls.',
        schema: UserAccessTableSchema
    },
    // {
    //     id: 'vendor-bank',
    //     title: 'Vendor Bank Accounts',
    //     category: SchemaCategory.VENDOR,
    //     description: 'Schema for managing vendor bank accounts.',
    //     schema: VendorBankSchema
    // },
    // {
    //     id: 'vendor-affiliate',
    //     title: 'Vendor Affiliate',
    //     category: SchemaCategory.VENDOR,
    //     description: 'Schema for managing vendor affiliated companies.',
    //     schema: VendorAffiliateSchema
    // },
    // {
    //     id: 'vendor-competency',
    //     title: 'Capability & Portfilio',
    //     category: SchemaCategory.VENDOR,
    //     description: 'Schema for managing vendor competencies and customer references.',
    //     schema: VendorCompetencySchema
    // },
    // {
    //     id: 'vendor-document',
    //     title: 'Vendor Document',
    //     category: SchemaCategory.VENDOR,
    //     description: 'Schema for managing vendor legal, tax, and company documents.',
    //     schema: VendorDocumentSchema
    // },
    // {
    //     id: 'vendor-financial-report',
    //     title: 'Vendor Financial Report',
    //     category: SchemaCategory.VENDOR,
    //     description: 'Schema for managing vendor financial statements.',
    //     schema: VendorFinancialReportSchema
    // },
];

// Register all playground schemas to the central registry
playgroundSchemas.forEach(item => {
    SchemaRegistry.register(item.id, item.schema, {
        title: item.title,
        category: item.category,
        description: item.description
    });
});
