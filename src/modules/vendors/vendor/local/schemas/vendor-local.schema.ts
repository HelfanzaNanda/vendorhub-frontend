import { FormLayout, formField } from '@/modules/form-engine';
import type { FormSchema } from '@/modules/form-engine';

import { VendorTermsSchema } from './vendor-terms.schema';
import { VendorCompanySchema } from './vendor-company.schema';
import { VendorPersonnelSchema } from './vendor-personnel.schema';
import { VendorUserAccessTableSchema } from './vendor-user-access.schema';
import { VendorBankTableSchema } from './vendor-bank.schema';
import { VendorAffiliateSchema } from './vendor-affiliate.schema';
import { VendorCompetencySchema } from './vendor-competency.schema';
import { VendorDocumentSchema } from './vendor-document.schema';
import { VendorFinancialReportSchema } from './vendor-financial-report.schema';
import { SchemaCategory } from '../../common/constants/schema-category.constant';
import { MainSchema } from '../../common';


export const LocalVendorSchema: readonly MainSchema[] = [
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
