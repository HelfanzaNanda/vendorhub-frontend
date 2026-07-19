import { 
  FormSchema, 
  FormLayout, 
  formField, 
  textField, 
  autocompleteField, 
  dateField,
  textareaField,
  fileField
} from '@/modules/dynamic-form-v2';

import { CompetencyConstants, DocumentType, CustomerConstants } from '@/modules/form-schemas/vendor/common';
import { CompetencyLookup, IssuedByLookup } from '@/modules/form-schemas/shared/lookups';
import { FullGrid } from '@/modules/dynamic-form-v2/grids';
import { CustomerReferenceSchema } from '../nested';

const CompetencyCertificateSchema: FormSchema = {
  id: CompetencyConstants.SECTION_COMPETENCY_ID,
  title: CompetencyConstants.SECTION_COMPETENCY_TITLE,
  code: CompetencyConstants.SECTION_COMPETENCY_CODE,
  layout: FormLayout.CARD,
  sections: [
    {
      id: CompetencyConstants.SECTION_COMPETENCY_ID,
      code: CompetencyConstants.SECTION_COMPETENCY_CODE,
      title: CompetencyConstants.SECTION_COMPETENCY_TITLE,
      description: CompetencyConstants.SECTION_COMPETENCY_DESCRIPTION,
      layout: FormLayout.CARD,
      fields: [
        autocompleteField({
            name: 'competency',
            label: 'Competency',
            validation: { required: true },
            grid: FullGrid,
            lookup: CompetencyLookup
        }),
      ]
    }
  ]
};

export const VendorCompetencySchema: FormSchema = {
  id: CompetencyConstants.SCHEMA_ID,
  title: CompetencyConstants.SCHEMA_TITLE,
  code: CompetencyConstants.SECTION_COMPETENCY_CODE,
  layout: FormLayout.CARD,
  sections: [
    {
      id: CompetencyConstants.SECTION_COMPETENCY_ID,
      code: CompetencyConstants.SECTION_COMPETENCY_CODE,
      title: CompetencyConstants.SECTION_COMPETENCY_TITLE,
      layout: FormLayout.CARD,
      fields: [
        formField({
          name: 'competencyCertificates',
          label: 'Competency Certificates',
          grid: FullGrid,
          nested: {
            multiple: true,
            schema: CompetencyCertificateSchema
          }
        })
      ]
    },
    {
      id: CustomerConstants.SECTION_ID,
      code: CustomerConstants.SECTION_CODE,
      title: CustomerConstants.SECTION_TITLE,
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
