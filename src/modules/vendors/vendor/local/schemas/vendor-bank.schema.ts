import { 
  FormSchema, 
  FormLayout, 
  formField, 
  textField, 
  autocompleteField, 
  switchField, 
  textareaField, 
  fileField,
  tableField
} from '@/modules/form-engine';
import { RequiredValidation } from '@/modules/form-engine/validation';
import { FullGrid, HalfGrid } from '@/modules/form-engine/grids';
import { BankConstants, DocumentType } from '@/modules/vendors/vendor/common';
import { BankBranchLookup, BankLookup, CountryLookup, CurrencyLookup } from '@/modules/vendors/shared';
import { VendorBankTable } from '@/modules/vendors/shared/tables/vendor-bank.table';

const BankAccountSchema: FormSchema = {
  id: BankConstants.SCHEMA_ID,
  title: BankConstants.SCHEMA_TITLE,
  code: BankConstants.DOCUMENT_ID,
  layout: FormLayout.DEFAULT,
  sections: [
    {
      id: BankConstants.SECTION_ACCOUNT_INFO_ID,
      title: BankConstants.SECTION_ACCOUNT_INFO_TITLE,
      code: BankConstants.SECTION_ACCOUNT_INFO_CODE,
      description: BankConstants.SECTION_ACCOUNT_INFO_DESCRIPTION,
      layout: FormLayout.CARD,
      fields: [
        autocompleteField({
            name: 'country',
            label: 'Country',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup: CountryLookup,
            payload: {
                key: 'countryId',
                pick: 'id'
            }
        }),

        autocompleteField({
            name: 'bank',
            label: 'Bank',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup: BankLookup,
            payload: {
                key: 'bankId',
                pick: 'id'
            },
            dependency: { parent: 'country.id', clearOnChange: true, disableWhenEmpty: true }
        }),

        autocompleteField({
            name: 'bankBranch',
            label: 'Bank Branch',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup: BankBranchLookup,
            payload: {
                key: 'bankBranchId',
                pick: 'id'
            },
            dependency: { parent: 'bank.id', clearOnChange: true, disableWhenEmpty: true }
        }),

        autocompleteField({
            name: 'currency',
            label: 'Currency',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup: CurrencyLookup,
            payload: {
                key: 'currencyId',
                pick: 'id'
            }
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
            name: 'file', 
            label: 'Bank Statement / Passbook Document', 
            grid: HalfGrid, 
            file: {
                documentTypeCode: DocumentType.BANK_STATEMENT
            },
            payload: {
                key: 'fileId',
                pick: 'id'
            }
        }),
       
      ]
    }
  ]
};

export const VendorBankTableSchema: FormSchema = {
  id: BankConstants.SCHEMA_ID,
  title: BankConstants.SCHEMA_TITLE,
  code: BankConstants.DOCUMENT_ID,
  layout: FormLayout.DEFAULT,
  sections: [
    {
      id: BankConstants.SCHEMA_ID,
      code: BankConstants.DOCUMENT_ID,
      title: BankConstants.SCHEMA_TITLE,
      layout: FormLayout.TABLE,
      fields: [
        tableField({
            name: BankConstants.SCHEMA_ID,
            label: BankConstants.SCHEMA_TITLE,
            helperText: BankConstants.SCHEMA_TITLE,
            grid: FullGrid,
            table: VendorBankTable,
            schema: BankAccountSchema,
            validation: {
                required: RequiredValidation.required
            }
        })
      ]
    }
  ]
};
