import {
    VendorTermsSchema,
    VendorCompanySchema,
    VendorPersonnelSchema,
    VendorBusinessLicenseSchema,
    VendorBankTableSchema,
    VendorCompetencySchema,
    VendorDocumentSchema,
    VendorFinancialReportSchema,
    VendorUserAccessTableSchema,
    VendorAffiliateSchema,
} from '@/modules/form-schemas/vendor/local/schemas';
import { SchemaCategory } from './schema-category';
import type { PlaygroundSchema } from './types';
import { SchemaRegistry } from '../../registries/schema.registry';

const playgroundSchemas: readonly PlaygroundSchema[] = [
    {
        id: 'vendor-terms',
        title: 'Terms & Conditions',
        category: SchemaCategory.VENDOR,
        description: 'Terms & Conditions for vendor registration.',
        schema: VendorTermsSchema
    },
    {
        id: 'vendor-company',
        title: 'Company',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor company information.',
        schema: VendorCompanySchema
    },
    {
        id: 'vendor-personnel',
        title: 'Person Responsible',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor board of directors, shareholders, and signers.',
        schema: VendorPersonnelSchema
    },
    {
        id: 'vendor-user-access',
        title: 'User Access',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor user access.',
        schema: VendorUserAccessTableSchema
    },
    {
        id: 'vendor-bank',
        title: 'Bank',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor bank accounts.',
        schema: VendorBankTableSchema
    },
    {
        id: 'vendor-affiliation',
        title: 'Affiliation',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor affiliations.',
        schema: VendorAffiliateSchema
    },
    {
        id: 'vendor-competency',
        title: 'Competency',
        category: SchemaCategory.VENDOR,
        description: 'Schema for managing vendor competencies and customer references.',
        schema: VendorCompetencySchema
    },
    {
        id: 'vendor-document',
        title: 'Documents',
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
