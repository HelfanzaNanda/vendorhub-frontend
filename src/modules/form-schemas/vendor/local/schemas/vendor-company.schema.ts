import { 
  FormSchema, 
  FormLayout, 
  textField, 
  textareaField,  
  numberField,
  autocompleteField,
  NumberField
} from '@/modules/dynamic-form-v2';
import { FullGrid, HalfGrid, ThirdGrid } from '@/modules/dynamic-form-v2/grids';
import { MapsUrlValidation, RequiredValidation, WebsiteValidation } from '@/modules/dynamic-form-v2/validation';
import { CountryLookup, ProvinceLookup, CityLookup, BusinessEntityLookup, SiteLookup } from '@/modules/form-schemas/shared';
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
            name: 'name', 
            label: 'Company Name', 
            validation: { required: RequiredValidation.required, maxLength: CompanyConstants.MAX_COMPANY_NAME_LENGTH }, 
            grid: HalfGrid 
        }),

        autocompleteField({ 
            name: 'site', 
            label: 'Site', 
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: SiteLookup,
            payload: {
                key: 'siteId',
                pick: 'value'
            }
        }),

        autocompleteField({ 
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
        autocompleteField({ 
          name: 'country', 
          label: 'Country', 
          validation: { required: RequiredValidation.required }, 
          grid: ThirdGrid,
          lookup: CountryLookup,
          display: {
            readonly: true
          },
          defaultValue: {
            value: 27,
            label: 'Indonesia'
          }
        }),
        autocompleteField({ 
          name: 'province', 
          label: 'Province', 
          validation: { required: RequiredValidation.required }, 
          grid: ThirdGrid,
          lookup: ProvinceLookup,
          dependency: { parent: 'country.value', clearOnChange: true }
        }),
        autocompleteField({ 
          name: 'city', 
          label: 'City', 
          validation: { required: RequiredValidation.required }, 
          grid: ThirdGrid,
          lookup: CityLookup,
          dependency: { parent: 'province.value', clearOnChange: true }
        }),
        numberField({ 
          name: 'postalCode', 
          label: 'Postal Code', 
          validation: { required: RequiredValidation.required, maxLength: 6 }, 
          grid: HalfGrid 
        }),
        textField({ 
          name: 'website', 
          label: 'Website', 
          validation: { required: RequiredValidation.required, website: WebsiteValidation.website }, 
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
          validation: { required: RequiredValidation.required, mapsUrl: MapsUrlValidation.mapsUrl }, 
          grid: FullGrid 
        }),
      ]
    },
  ]
};
