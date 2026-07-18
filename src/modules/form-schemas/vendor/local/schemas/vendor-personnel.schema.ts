import { FormSchema, FormLayout, formField } from '@/modules/dynamic-form-v2';
import { FullGrid, RequiredValidation } from '@/modules/form-schemas/shared';
import { 
  BoardOfDirectorSchema, 
  ShareholderSchema, 
  AuthorizedSignerSchema,
  PersonnelConstants
} from '@/modules/form-schemas/vendor/common';

export const VendorPersonnelSchema: FormSchema = {
  id: PersonnelConstants.SCHEMA_ID,
  title: PersonnelConstants.SCHEMA_TITLE,
  code: PersonnelConstants.SCHEMA_ID,
  layout: FormLayout.CARD,
  sections: [
    {
      id: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_ID,
      code: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_CODE,
      title: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_TITLE,
      layout: FormLayout.CARD,
      fields: [
        formField({
          name: PersonnelConstants.FIELD_BOARD_OF_DIRECTORS,
          label: PersonnelConstants.SECTION_BOARD_OF_DIRECTORS_TITLE,
          grid: FullGrid,
          nested: {
            multiple: true,
            schema: BoardOfDirectorSchema.id,
            minItems: 1
          },
          validation: {
            required: RequiredValidation.required
          }
        })
      ]
    },
    {
      id: PersonnelConstants.SECTION_SHAREHOLDER_ID,
      code: PersonnelConstants.SECTION_SHAREHOLDER_CODE,
      title: PersonnelConstants.SECTION_SHAREHOLDER_TITLE,
      layout: FormLayout.CARD,
      fields: [
        formField({
          name: PersonnelConstants.FIELD_SHAREHOLDERS,
          label: PersonnelConstants.SECTION_SHAREHOLDER_TITLE,
          grid: FullGrid,
          nested: {
            multiple: true,
            schema: ShareholderSchema.id,
            minItems: 1
          },
          validation: {
            required: RequiredValidation.required
          }
        })
      ]
    },
    {
      id: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_ID,
      code: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_CODE,
      title: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_TITLE,
      layout: FormLayout.CARD,
      fields: [
        formField({
          name: PersonnelConstants.FIELD_AUTHORIZED_SIGNERS,
          label: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_TITLE,
          grid: FullGrid,
          nested: {
            multiple: true,
            schema: AuthorizedSignerSchema.id,
            minItems: 1
          },
          validation: {
            required: RequiredValidation.required
          }
        })
      ]
    }
  ]
};
