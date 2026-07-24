import React from 'react';

import { Box, Typography } from '@mui/material';
import { DateUtil, TableCellComponentProps } from '@/modules/form-engine';

export function VendorFinancialPeriodCell({ value, record }: TableCellComponentProps) {

    // const reportType = record.reportType?.name;

    let primary = '';
    let reportType = record.reportType?.name;

    if (reportType === 'ANNUAL') {
        if (record.financialPeriod) {
            if (record.financialPeriod.id !== 3) {
                primary = `${record.year.name} (${record.financialPeriod.name})`
            }else{
                primary = `${record.financialPeriod.name} (${DateUtil.formatDate(record.periodFrom, 'MMM YYYY')} - ${DateUtil.formatDate(record.periodTo, 'MMM YYYY')})`;
            }
        }
    } else {
        primary = `${DateUtil.formatDate(record.periodFrom, 'MMM YYYY')} - ${DateUtil.formatDate(record.periodTo, 'MMM YYYY')}`;
        // secondary = record.financialPeriod?.name ?? 'Interim';
    }

    return (
        <Box display="flex" flexDirection="column">
            <Typography>
                {primary}
            </Typography>

            <Typography variant="caption" color="text.secondary" >
                {reportType}
            </Typography>
        </Box>
    );
}
