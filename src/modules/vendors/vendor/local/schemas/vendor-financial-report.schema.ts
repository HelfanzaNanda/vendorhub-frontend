import { 
  FormSchema, 
  FormLayout, 
  formField, 
  autocompleteField, 
  dateField,
  currencyField,
  fileField,
  ConditionOperator,
  numberField,
  tableField,
  LogicalOperator,
  DateUtil
} from '@/modules/form-engine';
import { RequiredValidation } from '@/modules/form-engine/validation';
import { FullGrid, HalfGrid } from '@/modules/form-engine/grids';
import { DocumentType, FinancialReportConstants } from '@/modules/vendors/vendor/common';
import { CurrencyLookup, ReportTypeLookup, YearLookup } from '@/modules/vendors/shared';
import { VendorFinancialReportTable } from '@/modules/vendors/shared/tables/vendor-financial-report.table';
import { AuditStatusLookup } from '@/modules/vendors/shared/lookups/static/audit-status.lookup';
import { FinancialPeriodLookup } from '@/modules/vendors/shared/lookups/financial-period.lookup';

const FinancialReportInlineSchema: FormSchema = {
  id: FinancialReportConstants.SCHEMA_ID,
  title: FinancialReportConstants.SCHEMA_TITLE,
  code: FinancialReportConstants.DOCUMENT_ID,
  layout: FormLayout.DEFAULT,
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
            lookup : ReportTypeLookup,
            payload: {
                key: 'reportType',
                pick: 'id'
            },
            
        }),
        autocompleteField({
            name: 'financialPeriod',
            label: 'Period',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup : FinancialPeriodLookup,
            payload: {
                key: 'financialPeriodId',
                pick: 'id'
            },
            display: {
                visible : {
                    operator : LogicalOperator.AND,
                    conditions : [
                        {
                            field: 'reportType.id',
                            operator: ConditionOperator.EQUALS,
                            value: 'ANNUAL'
                        }
                    ]
                }
            }
            
        }),
        autocompleteField({
            name: 'year',
            label: 'Year',
            validation: { required: RequiredValidation.required },
            grid: FullGrid,
            lookup : YearLookup,
            payload: {
                key: 'year',
                pick: 'id'
            },
            display: {
                visible : {
                    operator : LogicalOperator.AND,
                    conditions : [
                        {
                            field: 'reportType.id',
                            operator: ConditionOperator.EQUALS,
                            value: 'ANNUAL'
                        },
                        {
                            field: 'financialPeriod.id',
                            operator: ConditionOperator.IN,
                            value: [1, 2]
                        }
                    ]
                }
            }
        }),
        dateField({
            name: 'periodFrom',
            label: 'Period From',
            grid: HalfGrid,
            validation: { required: RequiredValidation.required },
            props: {
                minDate: DateUtil.minusYears(3),
                maxDate: DateUtil.today()
            },
            display: {
                visible : {
                    operator : LogicalOperator.OR,
                    conditions : [
                        {
                            field: 'reportType.id',
                            operator: ConditionOperator.EQUALS,
                            value: 'INTERIM'
                        },
                        {
                            field: 'financialPeriod.id',
                            operator: ConditionOperator.EQUALS,
                            value: 3
                        }
                    ]
                }
            }
        }),
        dateField({
            name: 'periodTo',
            label: 'Period To',
            grid: HalfGrid,
            validation: { required: RequiredValidation.required },
            props: {
                minDate: DateUtil.today(),
                maxDate: DateUtil.plusYears(1)
            },
            display: {
                visible : {
                    operator : LogicalOperator.OR,
                    conditions : [
                        {
                            field: 'reportType.id',
                            operator: ConditionOperator.EQUALS,
                            value: 'INTERIM'
                        },
                        {
                            field: 'financialPeriod.id',
                            operator: ConditionOperator.EQUALS,
                            value: 3
                        }
                    ]
                }
            }
        }),
        autocompleteField({
            name: 'auditStatus',
            label: 'Audit Status',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup : AuditStatusLookup,
            payload: {
                key: 'auditStatus',
                pick: 'id'
            }
        }),
        autocompleteField({
            name: 'currency',
            label: 'Currency',
            validation: { required: RequiredValidation.required },
            grid: HalfGrid,
            lookup : CurrencyLookup,
            payload: {
                key: 'currencyId',
                pick: 'id'
            }
        }),

        fileField({ 
            name: 'file', 
            label: 'Financial Report Document', 
            grid: HalfGrid, 
            file: { 
                documentTypeCode: DocumentType.FINANCIAL_STATEMENT 
            },
            payload: {
                key: 'fileId',
                pick: 'id'
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
  id: FinancialReportConstants.SCHEMA_ID,
  title: FinancialReportConstants.SCHEMA_TITLE,
  code: FinancialReportConstants.DOCUMENT_ID,
  layout: FormLayout.DEFAULT,
  sections: [
    {
      id: FinancialReportConstants.SCHEMA_ID,
      code: FinancialReportConstants.DOCUMENT_ID,
      title: FinancialReportConstants.SCHEMA_TITLE,
      layout: FormLayout.TABLE,
      fields: [
        tableField({
            name: FinancialReportConstants.SCHEMA_ID,
            label: FinancialReportConstants.SCHEMA_TITLE,
            helperText: FinancialReportConstants.SCHEMA_TITLE,
            grid: FullGrid,
            table: VendorFinancialReportTable,
            schema: FinancialReportInlineSchema,
            validation: {
                required: RequiredValidation.required
            }
        })
      ]
    }
  ]
};
