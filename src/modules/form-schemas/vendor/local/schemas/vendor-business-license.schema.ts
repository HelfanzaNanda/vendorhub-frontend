import { 
  FormSchema, 
  FormLayout, 
  formField, 
  textField, 
  selectField, 
  switchField, 
  textareaField,
  dateField,
  fileField
} from '@/modules/dynamic-form-v2';

import { LicenseStatus, LicenseCategory } from '@/modules/form-schemas/vendor/common';
import { 
  KbliLookup, 
  BusinessCategoryLookup, 
  BusinessScaleLookup 
} from '@/modules/form-schemas/shared/lookups';
import { BusinessLicenseConstants } from '@/modules/form-schemas/vendor/common';
import { FullGrid, QuarterGrid, RequiredValidation } from '@/modules/form-schemas/shared';

const KbliNestedSchema: FormSchema = {
  id: BusinessLicenseConstants.SECTION_INDUSTRY_CLASSIFICATION_ID,
  title: BusinessLicenseConstants.SECTION_INDUSTRY_CLASSIFICATION_TITLE,
  code: BusinessLicenseConstants.SECTION_INDUSTRY_CLASSIFICATION_CODE,
  layout: FormLayout.CARD,
  sections: [
    {
      id: BusinessLicenseConstants.SECTION_INDUSTRY_CLASSIFICATION_ID,
      title: BusinessLicenseConstants.SECTION_INDUSTRY_CLASSIFICATION_TITLE,
      code: BusinessLicenseConstants.SECTION_INDUSTRY_CLASSIFICATION_CODE,
      description: BusinessLicenseConstants.SECTION_INDUSTRY_CLASSIFICATION_DESCRIPTION,
      layout: FormLayout.CARD,
      fields: [
        selectField({
            name: 'kbliId',
            label: 'KBLI',
            validation: { required: RequiredValidation.required },
            grid: FullGrid,
            lookup: KbliLookup
        }),
        textField({
            name: 'number',
            label: 'Number',
            grid: QuarterGrid
        }),
        textField({
            name: 'title',
            label: 'Title',
            grid: QuarterGrid
        }),
        textField({
            name: 'description',
            label: 'Description',
            grid: QuarterGrid
        }),
      ]
    }
  ]
};

export const VendorBusinessLicenseSchema: FormSchema = {
  id: BusinessLicenseConstants.SCHEMA_ID,
  title: BusinessLicenseConstants.SCHEMA_TITLE,
  code: BusinessLicenseConstants.SCHEMA_ID,
  layout: FormLayout.CARD,
  sections: [
    {
      id: BusinessLicenseConstants.SECTION_LICENSE_INFO_ID,
      code: BusinessLicenseConstants.SECTION_LICENSE_INFO_CODE,
      title: BusinessLicenseConstants.SECTION_LICENSE_INFO_TITLE,
      layout: FormLayout.CARD,
      fields: [
        fileField({ 
            name: 'fileId', 
            label: 'NIB Document', 
            grid: FullGrid, 
            props: { 
                documentType: BusinessLicenseConstants.DOCUMENT_ID 
            }
        }),
      ]
    },
    {
      id: BusinessLicenseConstants.SECTION_INDUSTRY_CLASSIFICATION_ID,
      code: BusinessLicenseConstants.SECTION_INDUSTRY_CLASSIFICATION_CODE,
      title: BusinessLicenseConstants.SECTION_INDUSTRY_CLASSIFICATION_TITLE,
      layout: FormLayout.CARD,
      fields: [
        formField({
          name: 'kbliList',
          label: 'KBLI List',
          grid: FullGrid,
          nested: {
            multiple: true,
            minItems: 1,
            schema: KbliNestedSchema.id
          },
          validation: {
            required: true
          }
        })
      ]
    }
  ]
};
