import { FormSchema } from '../../../dynamic-form-v2/interfaces';
import { FieldType, FormLayout } from '../../../dynamic-form-v2/enums';

export const vendorCompetencySchema: FormSchema = {
  id: 'vendor-competency',
  code: 'vendor-competency',
  title: 'Competencies',
  layout: FormLayout.CARD,
  sections: [
    {
      id: 'competency-sec',
      code: 'competency-sec',
      title: 'Capabilities',
      layout: FormLayout.CARD,
      fields: [
        {
          id: 'capabilities',
          code: 'capabilities',
          name: 'capabilities',
          label: 'Capabilities & References',
          type: FieldType.FORM,
          component: 'DEFAULT',
          nested: { multiple: true, schemaId: 'vendor-capability' }
        }
      ]
    }
  ]
};