import { FormSchema } from '../../../dynamic-form-v2/interfaces';
import { FieldType, FormLayout } from '../../../dynamic-form-v2/enums';

export const vendorCapabilitySchema: FormSchema = {
  id: 'vendor-capability',
  code: 'vendor-capability',
  title: 'Capability',
  layout: FormLayout.CARD,
  sections: [
    {
      id: 'capability-details',
      code: 'capability-details',
      title: 'Capability Details',
      layout: FormLayout.CARD,
      fields: [
        {
          id: 'capabilityName',
          code: 'capabilityName',
          name: 'capabilityName',
          label: 'Capability Name',
          type: FieldType.TEXT,
          component: 'DEFAULT',
          validation: { required: true }
        },
        {
          id: 'customerReferences',
          code: 'customerReferences',
          name: 'customerReferences',
          label: 'Customer References',
          type: FieldType.FORM,
          component: 'DEFAULT',
          nested: { multiple: true, schemaId: 'customer-reference' }
        }
      ]
    }
  ]
};