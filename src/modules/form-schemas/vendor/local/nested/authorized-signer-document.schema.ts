import { 
  FormSchema, 
  FormLayout, 
  textField, 
  currencyField, 
  dateField, 
  textareaField, 
  fileField, 
  numberField,
  autocompleteField,
  DateUtil
} from '@/modules/form-engine';
import { RequiredValidation } from '@/modules/form-engine/validation';
import { FullGrid, HalfGrid } from '@/modules/form-engine/grids';
import {  DocumentType } from '../../common';
import { YearLookup } from '@/modules/form-schemas/shared';
import { PersonnelConstants } from '../../common/constants/personnel.constant';
import { AuthorizedSignerDocumentTypeLookup } from '@/modules/form-schemas/shared/lookups/static/authorized-signer-document.lookup';

export const AuthorizedSignerDocumentSchema: FormSchema = {
  id: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_DOCUMENT_ID,
  title: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_DOCUMENT_TITLE,
  code: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_DOCUMENT_CODE,
  layout: FormLayout.DEFAULT,
  sections: [
    {
      id: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_DOCUMENT_ID,
      code: PersonnelConstants.SECTION_AUTHORIZED_SIGNER_DOCUMENT_CODE,
      layout: FormLayout.DEFAULT,
      fields: [
        autocompleteField({
            name: 'type',
            label: 'Type',
            validation: { required: RequiredValidation.required }, 
            grid: HalfGrid,
            lookup: AuthorizedSignerDocumentTypeLookup,
            payload: {
                key: 'type',
                pick: 'id'
            }
        }),
        dateField({
            name: 'effectiveEndDate',
            label: 'Effective End Date',
            grid: HalfGrid,
            validation: { required: RequiredValidation.required },
            props: {
                minDate: DateUtil.today(),
                maxDate: DateUtil.plusYears(3)
            }
        }),
      ]
    }
  ]
};
