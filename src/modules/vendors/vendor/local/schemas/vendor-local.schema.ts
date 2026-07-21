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


export const LocalVendorSchema: MainSchema[] = [
    {
        id: 'vendor-terms',
        title: 'Terms & Conditions',
        category: SchemaCategory.VENDOR,
        icon: 'ri-file-list-3-line',
        description: 'Terms & Conditions for vendor registration.',
        schema: VendorTermsSchema
    },
    {
        id: 'vendor-company',
        title: 'Company',
        category: SchemaCategory.VENDOR,
        icon: 'ri-building-4-line',
        description: 'Schema for managing vendor company information.',
        schema: VendorCompanySchema
    },
    {
        id: 'vendor-personnel',
        title: 'Person Responsible',
        category: SchemaCategory.VENDOR,
        icon: 'ri-group-line',
        description: 'Schema for managing vendor board of directors, shareholders, and signers.',
        schema: VendorPersonnelSchema
    },
    {
        id: 'vendor-user-access',
        title: 'User Access',
        category: SchemaCategory.VENDOR,
        icon: 'ri-shield-user-line',
        description: 'Schema for managing vendor user access.',
        schema: VendorUserAccessTableSchema
    },
    {
        id: 'vendor-bank',
        title: 'Bank',
        category: SchemaCategory.VENDOR,
        icon: 'ri-bank-card-line',
        description: 'Schema for managing vendor bank accounts.',
        schema: VendorBankTableSchema
    },
    {
        id: 'vendor-affiliation',
        title: 'Affiliation',
        category: SchemaCategory.VENDOR,
        icon: 'ri-organization-chart',
        description: 'Schema for managing vendor affiliations.',
        schema: VendorAffiliateSchema
    },
    {
        id: 'vendor-capability',
        title: 'Capability & Portfolio',
        category: SchemaCategory.VENDOR,
        icon: 'ri-award-line',
        description: 'Schema for managing vendor capabilities.',
        schema: VendorCompetencySchema
    },
    {
        id: 'vendor-document',
        title: 'Documents',
        category: SchemaCategory.VENDOR,
        icon: 'ri-file-text-line',
        description: 'Schema for managing vendor legal, tax, and company documents.',
        schema: VendorDocumentSchema
    },
    {
        id: 'vendor-financial',
        title: 'Financial',
        category: SchemaCategory.VENDOR,
        icon: 'ri-line-chart-line',
        description: 'Schema for managing vendor financial statements.',
        schema: VendorFinancialReportSchema
    },
];
