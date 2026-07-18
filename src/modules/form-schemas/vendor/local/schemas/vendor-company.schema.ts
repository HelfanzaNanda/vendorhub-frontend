import { 
  FormSchema, 
  FormLayout, 
  textField, 
  textareaField, 
  selectField, 
  numberField
} from '@/modules/dynamic-form-v2';
import { FullGrid, HalfGrid, QuarterGrid, RequiredValidation } from '@/modules/form-schemas/shared';

import { CountryLookup, ProvinceLookup, CityLookup, BusinessEntityLookup, SiteLookup } from '@/modules/form-schemas/shared/lookups';
import { CompanyConstants } from '@/modules/form-schemas/vendor/common';

export const VendorCompanySchema: FormSchema = {
  id: CompanyConstants.SCHEMA_ID,
  title: CompanyConstants.SCHEMA_TITLE,
  code: CompanyConstants.SCHEMA_ID,
  layout: FormLayout.CARD,
  sections: [
    {
      id: CompanyConstants.SECTION_COMPANY_INFO_ID,
      code: CompanyConstants.SECTION_COMPANY_INFO_CODE,
      title: CompanyConstants.SECTION_COMPANY_INFO_TITLE,
      description: CompanyConstants.SECTION_COMPANY_INFO_DESCRIPTION,
      layout: FormLayout.CARD,
      fields: [
        textField({ 
            name: 'companyName', 
            label: 'Company Name', 
            validation: { required: RequiredValidation.required, maxLength: CompanyConstants.MAX_COMPANY_NAME_LENGTH }, 
            grid: HalfGrid 
        }),

        selectField({ 
            name: 'site', 
            label: 'Site', 
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: SiteLookup 
        }),

        selectField({ 
            name: 'businessEntity', 
            label: 'Business Entity', 
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: BusinessEntityLookup
        }),

        numberField({ 
            name: 'staffCount', 
            label: 'Staff Count', 
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
        })
      ]
    },
    {
      id: CompanyConstants.SECTION_ADDRESS_INFO_ID,
      title: CompanyConstants.SECTION_ADDRESS_INFO_TITLE,
      code: CompanyConstants.SECTION_ADDRESS_INFO_CODE,
      layout: FormLayout.CARD,
      fields: [
        selectField({ 
          name: 'country', 
          label: 'Country', 
          validation: { required: RequiredValidation.required }, 
          grid: QuarterGrid,
          lookup: CountryLookup,
        }),
        selectField({ 
          name: 'province', 
          label: 'Province', 
          validation: { required: RequiredValidation.required }, 
          grid: QuarterGrid,
          lookup: ProvinceLookup,
          dependency: { parent: 'country', clearOnChange: true }
        }),
        selectField({ 
          name: 'city', 
          label: 'City', 
          validation: { required: RequiredValidation.required }, 
          grid: QuarterGrid,
          lookup: CityLookup,
          dependency: { parent: 'province', clearOnChange: true }
        }),
        textField({ 
          name: 'postalCode', 
          label: 'Postal Code', 
          validation: { required: RequiredValidation.required }, 
          grid: HalfGrid 
        }),
        textField({ 
          name: 'website', 
          label: 'Website', 
          validation: { required: RequiredValidation.required }, 
          grid: HalfGrid 
        }),
        textareaField({ 
          name: 'address', 
          label: 'Address', 
          validation: { required: RequiredValidation.required }, 
          grid: FullGrid
        }),
        textField({ 
          name: 'mapsUrl', 
          label: 'Maps URL', 
          validation: { required: RequiredValidation.required }, 
          grid: FullGrid 
        }),
      ]
    },
  ]
};
