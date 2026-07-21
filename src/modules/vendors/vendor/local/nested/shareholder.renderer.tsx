'use client'

import React, { useMemo, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { TableField } from '@/modules/form-engine/components/fields';
import { useQueryClient, useIsFetching } from '@tanstack/react-query';
import { PersonnelType } from '@/modules/vendors/vendor/common';

export const ShareholderTableRenderer: React.FC<any> = (props) => {
    const { field, context } = props;
    const queryClient = useQueryClient();
    
    // The endpoint from the config
    const endpoint = field.table?.endpoint || `/vendor-personnel-temps?personnelTypeCode=${PersonnelType.SHAREHOLDER}`;
    
    // We replace path parameters if any
    const finalEndpoint = useMemo(() => {
        let url = endpoint;
        const matches = url.match(/:[a-zA-Z]+/g);
        if (matches) {
            matches.forEach((m: string) => {
                const key = m.substring(1);
                const val = context.getValue(key) || context.getValue('id') || context.getValue('vendorTempId') || '';
                url = url.replace(m, String(val));
            });
        }
        return url;
    }, [endpoint, context]);

    const isFetching = useIsFetching({ queryKey: [finalEndpoint] });
    
    const { total, remaining } = useMemo(() => {
        const queries = queryClient.getQueryCache().findAll({ queryKey: [finalEndpoint] });
        
        let latestTime = 0;
        let latestRows: any[] = [];
        
        queries.forEach(query => {
            const data = query.state.data as any;
            const payload = data?.data || data;
            const rows = payload?.data || payload?.rows || [];
            if (Array.isArray(rows) && rows.length > 0 && query.state.dataUpdatedAt >= latestTime) {
                latestTime = query.state.dataUpdatedAt;
                latestRows = rows;
            } else if (Array.isArray(rows) && latestTime === 0) {
                latestRows = rows;
            }
        });
        
        const sum = latestRows.reduce((acc, row) => acc + Number(row.ownershipPercentage || row.ownership || 0), 0);
        return { total: sum, remaining: 100 - sum };
    }, [isFetching, queryClient, finalEndpoint]);
    
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
