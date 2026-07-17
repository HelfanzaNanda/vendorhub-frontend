import { FormSchema } from '../../../dynamic-form-v2/interfaces'
import { FieldType, FormLayout, ConditionOperator } from '../../../dynamic-form-v2/enums'
import { DocumentTypeConstant } from '../../shared/constants'

export const vendorFinancialReportSchema: FormSchema = {
    id: 'vendor-financial-report',
    code: 'vendor-financial-report',
    title: 'Financial Report',
    layout: FormLayout.CARD,
    sections: [
        {
            id: 'financial-report-sec',
            code: 'financial-report-sec',
            title: 'Financial Report Details',
            layout: FormLayout.CARD,
            fields: [
                {
                    id: 'reportType',
                    code: 'reportType',
                    name: 'reportType',
                    label: 'Report Type',
                    type: FieldType.RADIO,
                    component: 'DEFAULT',
                    props: {
                        options: [
                            { label: 'Annual', value: 'ANNUAL' },
                            { label: 'Interim', value: 'INTERIM' }
                        ]
                    },
                    validation: { required: true }
                },
                {
                    id: 'annualReportFile',
                    code: 'annualReportFile',
                    name: 'annualReportFile',
                    label: 'Annual Report File',
                    type: FieldType.FILE,
                    component: 'DEFAULT',
                    file: { documentTypeCode: DocumentTypeConstant.FINANCIAL_REPORT_ANNUAL },
                    display: {
                        visible: {
                            operator: 'AND',
                            conditions: [{ field: 'reportType', operator: ConditionOperator.EQUALS, value: 'ANNUAL' }]
                        }
                    }
                },
                {
                    id: 'interimReportFile',
                    code: 'interimReportFile',
                    name: 'interimReportFile',
                    label: 'Interim Report File',
                    type: FieldType.FILE,
                    component: 'DEFAULT',
                    file: { documentTypeCode: DocumentTypeConstant.FINANCIAL_REPORT_INTERIM },
                    display: {
                        visible: {
                            operator: 'AND',
                            conditions: [{ field: 'reportType', operator: ConditionOperator.EQUALS, value: 'INTERIM' }]
                        }
                    }
                }
            ]
        }
    ]
}
