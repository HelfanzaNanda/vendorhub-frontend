import { 
  FormSchema, 
  FormLayout, 
  textField, 
  textareaField,  
  numberField,
  autocompleteField,
  NumberField,
  LogicalOperator,
  ConditionOperator
} from '@/modules/form-engine';
import { FullGrid, HalfGrid, ThirdGrid } from '@/modules/form-engine/grids';
import { MapsUrlValidation, RequiredValidation, WebsiteValidation } from '@/modules/form-engine/validation';
import { CountryLookup, ProvinceLookup, CityLookup, BusinessEntityLookup, SiteLookup } from '@/modules/vendors/shared';
import { CompanyConstants } from '@/modules/vendors/vendor/common';
import React, { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { toast } from 'sonner';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';

export const VendorCompanySchema: FormSchema = {
  id: CompanyConstants.SCHEMA_ID,
  title: CompanyConstants.SCHEMA_TITLE,
  code: CompanyConstants.SCHEMA_CODE,
  layout: FormLayout.DEFAULT,
  resource: {
    get: '/vendor-company-temps',
    save: '/vendor-company-temps'
  },
  actions: [
    {
        id: 'save',
        label: 'Save',
        type: 'primary'
    }
  ],
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

        autocompleteField({ 
            name: 'site', 
            label: 'Site', 
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: SiteLookup,
            payload: {
                key: 'siteId',
                pick: 'id'
            }
        }),

        autocompleteField({ 
            name: 'businessType', 
            label: 'Business Entity', 
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: BusinessEntityLookup,
            payload: {
                key: 'businessTypeId',
                pick: 'id'
            }
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
          payload: {
            key: 'countryId',
            pick: 'id'
          },
          display: {
            readonly: true
          },
          defaultValue: {
            id: 27,
            name: 'Indonesia'
          }
        }),
        autocompleteField({ 
          name: 'province', 
          label: 'Province', 
          validation: { required: RequiredValidation.required }, 
          grid: ThirdGrid,
          lookup: ProvinceLookup,
          payload: {
            key: 'provinceId',
            pick: 'id'
          },
          dependency: { parent: 'country.id', clearOnChange: true, disableWhenEmpty: true }
        }),
        autocompleteField({ 
          name: 'city', 
          label: 'City', 
          validation: { required: RequiredValidation.required }, 
          grid: ThirdGrid,
          lookup: CityLookup,
          payload: {
            key: 'cityId',
            pick: 'id'
          },
          dependency: { parent: 'province.id', clearOnChange: true, disableWhenEmpty: true }
        }),
        textField({ 
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
          name: 'mapUrl', 
          label: 'Maps URL', 
          validation: { required: RequiredValidation.required, mapsUrl: MapsUrlValidation.mapsUrl }, 
          grid: FullGrid 
        }),
      ]
    },
  ]
};
