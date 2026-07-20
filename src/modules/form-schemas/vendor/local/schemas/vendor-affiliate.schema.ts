import { 
  FormSchema, 
  FormLayout, 
  formField, 
  textField, 
  autocompleteField, 
  dateField, 
  textareaField, 
  tableField
} from '@/modules/dynamic-form-v2';
import { RequiredValidation } from '@/modules/dynamic-form-v2/validation';
import { FullGrid, HalfGrid } from '@/modules/dynamic-form-v2/grids';

import { AffiliateConstants } from '../../common/constants/affiliate.constant';
import { AffiliateTypeLookup, BusinessEntityLookup } from '@/modules/form-schemas/shared';
import { VendorAffiliateTable } from '@/modules/form-schemas/shared/tables/vendor-affiliate.table';

const AffiliateCompanyInlineSchema: FormSchema = {
  id: AffiliateConstants.SCHEMA_ID,
  title: AffiliateConstants.SECTION_AFFILIATE_TITLE,
  code: AffiliateConstants.SECTION_AFFILIATE_CODE,
  layout: FormLayout.CARD,
  sections: [
    {
      id: AffiliateConstants.SECTION_AFFILIATE_ID,
      title: AffiliateConstants.SECTION_AFFILIATE_TITLE,
      code: AffiliateConstants.SECTION_AFFILIATE_CODE,
      layout: FormLayout.CARD,
      fields: [
        autocompleteField({
            name: 'affiliateTypeId',
            label: 'Relationship Type',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup: AffiliateTypeLookup,
            payload: {
                key: 'affiliateTypeId',
                pick: 'id'
            }
        }),
        autocompleteField({
            name: 'businessEntityTypeId',
            label: 'Business Entity',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup: BusinessEntityLookup,
            payload: {
                key: 'businessEntityTypeId',
                pick: 'id'
            }
        }),
        textField({
            name: 'companyName',
            label: 'Company Name',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid
        }),
        textareaField({
            name: 'businessField',
            label: 'Bussiness Field',
            validation: { required: RequiredValidation.required },
            grid: FullGrid
        })
      ]
    }
  ]
};

export const VendorAffiliateSchema: FormSchema = {
  id: AffiliateConstants.SCHEMA_ID,
  title: AffiliateConstants.SECTION_AFFILIATE_TITLE,
  code: AffiliateConstants.SECTION_AFFILIATE_CODE,
  layout: FormLayout.CARD,
  sections: [
    {
      id: AffiliateConstants.SECTION_AFFILIATE_ID,
      code: AffiliateConstants.SECTION_AFFILIATE_CODE,
      title: AffiliateConstants.SECTION_AFFILIATE_TITLE,
      layout: FormLayout.TABLE,
      fields: [
        tableField({
            name: AffiliateConstants.SCHEMA_ID,
            label: AffiliateConstants.SCHEMA_TITLE,
            helperText: AffiliateConstants.SCHEMA_TITLE,
            grid: FullGrid,
            table: VendorAffiliateTable,
            schema: AffiliateCompanyInlineSchema,
            validation: {
                required: RequiredValidation.required
            }
        })
      ]
    }
  ]
};
