import React, { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useDynamicFormContext } from '@/modules/form-engine/context';
import { createCrudService } from '@/modules/form-engine/services/vendor-crud.service';
import { api } from '@/services/api';
import { FormSchema } from '@/modules/form-engine/interfaces';

export const DynamicFormResourceAndActions = ({ schema }: { schema: FormSchema }) => {
    const context = useDynamicFormContext();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const hasResource = !!schema.resource?.get;
    const hasActions = !!schema.actions?.length;

    const { data: fetchedData, isLoading: isFetching } = useQuery({
        queryKey: [schema.resource?.get],
        queryFn: async () => {
            if (!schema.resource?.get) return null;
            const res = await api.get(schema.resource.get);
            return res.data;
        },
        enabled: hasResource,
        staleTime: Infinity,
    });

    React.useEffect(() => {
        if (fetchedData && context) {
            Object.entries(fetchedData).forEach(([key, value]) => {
                context.setValue(key, value);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchedData]);

    const handleAction = async (action: any) => {
        let isValid = true;
        if (action.validateFields && action.validateFields.length > 0) {
            action.validateFields.forEach((field: string) => {
                if (!context?.validateField(field)) {
                    isValid = false;
                }
            });
        } else {
            isValid = context?.validate() ?? false;
        }

        if (!isValid) {
            toast.error('Please fill in all the required fields');
            return;
        }

        setIsLoading(true);
        try {
            const payload = context.buildPayload();
            const service = createCrudService(schema.resource?.save || '');
            await service.save(payload);
            toast.success(`${action.label} successful`);
            if (schema.resource?.get) {
                queryClient.invalidateQueries({ queryKey: [schema.resource?.get] });
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || `Failed to ${action.label.toLowerCase()}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (!hasActions) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
            {schema.actions?.map(action => (
                <Button
                    key={action.id}
                    variant={action.type === 'primary' ? 'contained' : 'outlined'}
                    onClick={() => handleAction(action)}
                    disabled={isLoading || isFetching}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                >
                    {isLoading ? 'Processing...' : action.label}
                </Button>
            ))}
        </Box>
    );
};
