import React from 'react';

import { Box, Typography } from '@mui/material';
import { DateUtil, TableCellComponentProps } from '@/modules/form-engine';
import { SummaryCell, SummaryGroup, SummaryLabel, SummaryText } from '@/modules/form-engine/components/table-summary';



export function VendorPersonnelCell({ value, record }: TableCellComponentProps) {
    return (
        <SummaryCell>
            <SummaryGroup title="Person">
                <SummaryText bold>
                    John Doe
                </SummaryText>

                <SummaryText>
                    Director
                </SummaryText>

                <SummaryText>
                    Manager
                </SummaryText>
            </SummaryGroup>

            <SummaryGroup title="Identity">
                <SummaryLabel label="Type">
                    KTP
                </SummaryLabel>

                <SummaryLabel label="Number">
                    317xxxxxxxx
                </SummaryLabel>

                <SummaryLabel label="Email">
                    john@mail.com
                </SummaryLabel>
            </SummaryGroup>
        </SummaryCell>
    )
}
