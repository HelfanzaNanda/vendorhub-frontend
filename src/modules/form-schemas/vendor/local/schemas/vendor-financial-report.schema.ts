import { 
  FormSchema, 
  FormLayout, 
  formField, 
  autocompleteField, 
  dateField,
  currencyField,
  fileField,
  ConditionOperator,
  numberField
} from '@/modules/dynamic-form-v2';
import { RequiredValidation } from '@/modules/dynamic-form-v2/validation';
import { FullGrid, HalfGrid } from '@/modules/dynamic-form-v2/grids';
import { FinancialReportConstants } from '@/modules/form-schemas/vendor/common';
import { CurrencyLookup, ReportTypeLookup } from '@/modules/form-schemas/shared';

const FinancialReportInlineSchema: FormSchema = {
  id: FinancialReportConstants.SCHEMA_ID,
  title: FinancialReportConstants.SCHEMA_TITLE,
  code: FinancialReportConstants.DOCUMENT_ID,
  layout: FormLayout.CARD,
  sections: [
    {
      id: FinancialReportConstants.SECTION_FINANCIAL_REPORT_DETAIL_ID,
      code: FinancialReportConstants.SECTION_FINANCIAL_REPORT_DETAIL_CODE,
      title: FinancialReportConstants.SECTION_FINANCIAL_REPORT_DETAIL_TITLE,
      description: FinancialReportConstants.SECTION_FINANCIAL_REPORT_DETAIL_DESCRIPTION,
      layout: FormLayout.CARD,
      fields: [
        autocompleteField({
            name: 'reportType',
            label: 'Report Type',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup : ReportTypeLookup
        }),
        autocompleteField({
            name: 'auditStatus',
            label: 'Audit Status',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup : ReportTypeLookup
        }),
        autocompleteField({
            name: 'currencyId',
            label: 'Currency',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup : CurrencyLookup
        }),

        fileField({ 
            name: 'fileId', 
            label: 'Financial Report Document', 
            grid: HalfGrid, 
            props: { 
                documentType: FinancialReportConstants.DOCUMENT_ID 
            }
        }),
      ]
    },
    {
      id: FinancialReportConstants.SECTION_FINANCIAL_REPORT_FIGURE_ID,
      code: FinancialReportConstants.SECTION_FINANCIAL_REPORT_FIGURE_CODE,
      title: FinancialReportConstants.SECTION_FINANCIAL_REPORT_FIGURE_TITLE,
      description: FinancialReportConstants.SECTION_FINANCIAL_REPORT_FIGURE_DESCRIPTION,
      layout: FormLayout.CARD,
      fields: [
        currencyField({
            name: 'currentAssets',
            label: 'Current Assets',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
        }),
        currencyField({
            name: 'totalAssets',
            label: 'Total Assets',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
        }),
        currencyField({
            name: 'currentLiabilities',
            label: 'Current Liabilities',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
        }),
        currencyField({
            name: 'totalLiabilities',
            label: 'Total Liabilities',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
        }),
        currencyField({
            name: 'totalRevenue',
            label: 'Total Revenue',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
        }),
        currencyField({
            name: 'netProfitLossAfterTax',
            label: 'Net Profit / Loss After Tax',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
        })
      ]
    }
  ]
};

export const VendorFinancialReportSchema: FormSchema = {
  id: 'vendorFinancialReportSchema',
  title: 'Financial Reports',
  code: 'VENDOR_FINANCIAL_REPORTS',
  layout: FormLayout.CARD,
  sections: [
    {
      id: 'financialReportsSection',
      code: 'FINANCIAL_REPORTS_SECTION',
      title: 'Financial Reports',
      layout: FormLayout.CARD,
      fields: [
        formField({
          name: 'financialReports',
          label: 'Financial Reports',
          grid: FullGrid,
          nested: {
            multiple: true,
            schema: FinancialReportInlineSchema
          }
        })
      ]
    }
  ]
};
