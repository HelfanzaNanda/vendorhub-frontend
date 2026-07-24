'use client'

import React, { useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { TableField } from '@/modules/form-engine/components/fields';
import { useQueryClient, useIsFetching, useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { PersonnelType } from '@/modules/vendors/vendor/common';

export const ShareholderTableRenderer: React.FC<any> = (props) => {
    const { field, context } = props;
    const queryClient = useQueryClient();
    const summaryEndpoint = `/vendor-personnel-temps/ownership-summary`;

    const { data: summaryResponse, refetch: refetchSummary } = useQuery({
        queryKey: [summaryEndpoint],
        queryFn: async () => {
            const res = await api.get(summaryEndpoint);
            return res.data;
        }
    });

    // The TableField fetches its own data. When TableField mutates, it automatically refetches.
    // To sync our summary, we observe any active fetching on the personnel-temps endpoint (which TableField hits).
    const isTableFetching = useIsFetching({ queryKey: [field.table?.endpoint || `/vendor-personnel-temps?personnelTypeCode=${PersonnelType.SHAREHOLDER}`] });

    useEffect(() => {
        if (!isTableFetching) {
            refetchSummary();
        }
    }, [isTableFetching, refetchSummary]);

    const total = summaryResponse?.total ?? 0;
    const remaining = 100 - total;
    
    const { setError, clearError, getError } = context;
    const currentError = getError(field.name);

    useEffect(() => {
        if (total !== 100) {
            if (!currentError) {
                setError(field.name, 'Total ownership must equal exactly 100%.');
            }
        } else {
            if (currentError) {
                clearError(field.name);
            }
        }
    }, [total, field.name, setError, clearError, currentError]);

    return (
        <Box className="w-full flex flex-col gap-4">
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    p: 2,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                    width: {
                        xs: '100%',
                        sm: '50%',
                        md: '33%'
                    }
                }}>
                <Box className="flex justify-between items-center mb-2">
                    <Typography fontWeight="medium">Total Ownership</Typography>
                    <Typography fontWeight="bold" color={total > 100 ? 'error' : 'inherit'}>{total}%</Typography>
                </Box>
                {total > 100 ? (
                    <Box className="flex justify-between items-center">
                        <Typography fontWeight="medium" color="error">Exceeded</Typography>
                        <Typography fontWeight="bold" color="error">{total - 100}%</Typography>
                    </Box>
                ) : (
                    <Box className="flex justify-between items-center">
                        <Typography fontWeight="medium">Remaining</Typography>
                        <Typography fontWeight="bold">{remaining}%</Typography>
                    </Box>
                )}
                
                {total !== 100 && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                        Total ownership must equal exactly 100%.
                    </Typography>
                )}
            </Box>
            <TableField {...props} />
            
        </Box>
    );
};
