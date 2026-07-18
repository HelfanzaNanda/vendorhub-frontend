import { 
  FormSchema, 
  FormLayout, 
  formField, 
  textField, 
  autocompleteField, 
  switchField, 
  textareaField, 
  fileField
} from '@/modules/dynamic-form-v2';

import { BankConstants } from '@/modules/form-schemas/vendor/common';
import { BankBranchLookup, BankLookup, CountryLookup, CurrencyLookup } from '@/modules/form-schemas/shared/lookups';
import { FullGrid, HalfGrid, RequiredValidation } from '@/modules/form-schemas/shared';

const BankAccountSchema: FormSchema = {
  id: BankConstants.SCHEMA_ID,
  title: BankConstants.SCHEMA_TITLE,
  code: BankConstants.DOCUMENT_ID,
  layout: FormLayout.CARD,
  sections: [
    {
      id: BankConstants.SECTION_ACCOUNT_INFO_ID,
      title: BankConstants.SECTION_ACCOUNT_INFO_TITLE,
      code: BankConstants.SECTION_ACCOUNT_INFO_CODE,
      description: BankConstants.SECTION_ACCOUNT_INFO_DESCRIPTION,
      layout: FormLayout.CARD,
      fields: [
        autocompleteField({
            name: 'countryId',
            label: 'Country',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup: CountryLookup
        }),

        autocompleteField({
            name: 'bankId',
            label: 'Bank',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup: BankLookup
        }),

        autocompleteField({
            name: 'bankBranchId',
            label: 'Bank Branch',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup: BankBranchLookup
        }),

        autocompleteField({
            name: 'currencyId',
            label: 'Currency',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup: CurrencyLookup
        }),

        textField({
            name: 'accountName',
            label: 'Account Name',
            validation: { 
                required: RequiredValidation.required
            },
            grid: HalfGrid
        }),

        textField({
            name: 'accountNumber',
            label: 'Account Number',
            validation: { 
                required: RequiredValidation.required, 
                maxLength: BankConstants.MAX_ACCOUNT_NUMBER_LENGTH 
            },
            grid: HalfGrid
        }),

        fileField({ 
            name: 'fileId', 
            label: 'Bank Statement / Passbook Document', 
            grid: HalfGrid, 
            props: { 
                documentType: BankConstants.DOCUMENT_ID
            }
        }),
       
      ]
    }
  ]
};

export const VendorBankSchema: FormSchema = {
  id: BankConstants.SCHEMA_ID,
  title: BankConstants.SCHEMA_TITLE,
  code: BankConstants.DOCUMENT_ID,
  layout: FormLayout.CARD,
  sections: [
    {
      id: BankConstants.SCHEMA_ID,
      code: BankConstants.DOCUMENT_ID,
      title: BankConstants.SCHEMA_TITLE,
      layout: FormLayout.CARD,
      fields: [
        formField({
          name: 'bankAccounts',
          label: 'Bank Accounts',
          grid: FullGrid,
          nested: {
            multiple: true,
            schema: BankAccountSchema.id,
            minItems: 1
          },
          validation: {
            required: true
          }
        })
      ]
    }
  ]
};
