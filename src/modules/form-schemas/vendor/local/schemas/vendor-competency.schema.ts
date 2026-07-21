import { 
  FormSchema, 
  FormLayout, 
  formField, 
  textField, 
  autocompleteField, 
  dateField,
  textareaField,
  fileField,
  tableField,
  multiLookupField,
  treeAutocompleteField
} from '@/modules/dynamic-form-v2';

import { CompetencyConstants, DocumentType, CustomerConstants, BusinessLicenseConstants } from '@/modules/form-schemas/vendor/common';
import { CompetencyLookup, IssuedByLookup, KbliLookup } from '@/modules/form-schemas/shared/lookups';
import { FullGrid, HalfGrid, ThirdGrid } from '@/modules/dynamic-form-v2/grids';
import { CustomerReferenceSchema } from '../nested';
import { RequiredValidation } from '@/modules/dynamic-form-v2/validation';
import { VendorCompetencyTable } from '@/modules/form-schemas/shared/tables/vendor-competency.table';


const CompetencyInlineSchema: FormSchema = {
  id: CompetencyConstants.SECTION_COMPETENCY_ID,
  title: CompetencyConstants.SECTION_COMPETENCY_TITLE,
  code: CompetencyConstants.SECTION_COMPETENCY_CODE,
  layout: FormLayout.DEFAULT,
  sections: [
    {
      id: CompetencyConstants.SECTION_COMPETENCY_ID,
      code: CompetencyConstants.SECTION_COMPETENCY_CODE,
      title: CompetencyConstants.SECTION_COMPETENCY_TITLE,
      description: CompetencyConstants.SECTION_COMPETENCY_DESCRIPTION,
      layout: FormLayout.CARD,
      fields: [
        treeAutocompleteField({
            name:'competencyIds',
            label:'Search Competency',
            lookup: CompetencyLookup,
            grid: FullGrid,
            multiple:true,
            payload:    {
                key:'subCompetencyItemId',
                pick:'id'
            },
            mapping: [
                {
                    from: 'parent.label',
                    to: 'category'
                },

                {
                    from: 'parent.parent.label',
                    to: 'subCategory'
                },

                {
                    from: 'label',
                    to: 'item'
                }

            ]
        }),
        textField({
            name: 'category',
            label: 'Category',
            display : {
                readonly : true
            },
            grid: ThirdGrid 
        }),
        textField({
            name: 'subCategory',
            label: 'Sub Category',
            display : {
                readonly : true
            },
            grid: ThirdGrid 
        }),
        textField({
            name: 'item',
            label: 'Item',
            display : {
                readonly : true
            },
            grid: ThirdGrid 
        }),
      ]
    },
    {
      id: CustomerConstants.SECTION_ID,
      code: CustomerConstants.SECTION_CODE,
      layout: FormLayout.CARD,
      fields: [
        formField({
          name: 'customerReferences',
          label: 'Customer References',
          grid: FullGrid,
          nested: {
            multiple: true,
            schema: CustomerReferenceSchema
          }
        })
      ]
    }
  ]
};

export const VendorCompetencySchema: FormSchema = {
  id: CompetencyConstants.SCHEMA_ID,
  title: CompetencyConstants.SCHEMA_TITLE,
  code: CompetencyConstants.SECTION_COMPETENCY_CODE,
  layout: FormLayout.DEFAULT,
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
                file: { 
                    documentTypeCode: DocumentType.BUSINESS_LICENSE 
                },
                payload: {
                    key: 'fileId',
                    pick: 'id'
                }
            }),
            multiLookupField({
                name: 'industryClassifications',
                label: 'Industry Classification',
                grid: FullGrid,
                multiLookup: {
                    lookup: KbliLookup,
                    columns: [
                        {
                            field: 'number',
                            header: 'Number'
                        },
                        {
                            field: 'name',
                            header: 'Title'
                        },
                        {
                            field: 'description',
                            header: 'Description'
                        }
                    ],
                    duplicate: false,
                    removable: true,
                    searchable: true
                },
                payload: {
                    key: 'industryClassificationIds',
                    pick: 'id'
                }
            })
        ]
    },
    {
      id: CompetencyConstants.SECTION_COMPETENCY_ID,
      code: CompetencyConstants.SECTION_COMPETENCY_CODE,
      title: CompetencyConstants.SECTION_COMPETENCY_TITLE,
      layout: FormLayout.TABLE,
      fields: [
        tableField({
            name: CompetencyConstants.SCHEMA_ID,
            label: CompetencyConstants.SCHEMA_TITLE,
            helperText: CompetencyConstants.SCHEMA_TITLE,
            grid: FullGrid,
            table: VendorCompetencyTable,
            schema: CompetencyInlineSchema,
            validation: {
                required: RequiredValidation.required
            }
        })
      ]
    },
  ]
};
