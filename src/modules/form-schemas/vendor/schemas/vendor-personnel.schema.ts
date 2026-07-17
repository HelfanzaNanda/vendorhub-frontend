import { FormSchema } from '../../../dynamic-form-v2/interfaces';
import { FieldType, FormLayout } from '../../../dynamic-form-v2/enums';

export const vendorPersonnelSchema: FormSchema = {
  id: 'vendor-personnel',
  code: 'vendor-personnel',
  title: 'Personnel Information',
  layout: FormLayout.TABS,
  sections: [
    {
      id: 'bod-sec',
      code: 'bod-sec',
      title: 'Board of Directors',
      layout: FormLayout.CARD,
      fields: [
        {
          id: 'boardOfDirectors',
          code: 'boardOfDirectors',
          name: 'boardOfDirectors',
          label: 'Board of Directors',
          type: FieldType.FORM,
          component: 'DEFAULT',
          nested: { multiple: true, schemaId: 'board-of-director' }
        }
      ]
    },
    {
      id: 'authorized-signer-sec',
      code: 'authorized-signer-sec',
      title: 'Authorized Signers',
      layout: FormLayout.CARD,
      fields: [
        {
          id: 'authorizedSigners',
          code: 'authorizedSigners',
          name: 'authorizedSigners',
          label: 'Authorized Signers',
          type: FieldType.FORM,
          component: 'DEFAULT',
          nested: { multiple: true, schemaId: 'authorized-signer' }
        }
      ]
    },
    {
      id: 'shareholder-sec',
      code: 'shareholder-sec',
      title: 'Shareholders',
      layout: FormLayout.CARD,
      fields: [
        {
          id: 'shareholders',
          code: 'shareholders',
          name: 'shareholders',
          label: 'Shareholders',
          type: FieldType.FORM,
          component: 'DEFAULT',
          nested: { multiple: true, schemaId: 'shareholder' }
        }
      ]
    }
  ]
};