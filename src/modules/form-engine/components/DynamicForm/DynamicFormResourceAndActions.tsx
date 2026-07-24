import React, { useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useDynamicFormContext } from '@/modules/form-engine/context';
import { createCrudService } from '@/modules/form-engine/services/vendor-crud.service';
import { api } from '@/services/api';
import { FormSchema } from '@/modules/form-engine/interfaces';
import { useUnsavedChanges } from '@/modules/form-engine/hooks/use-unsaved-changes';

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

    const { setIsDirty, registerSaveCallback } = useUnsavedChanges();

    React.useEffect(() => {
        if (fetchedData && context) {
            context.setValuesAndClean(fetchedData as Record<string, unknown>);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchedData]);

    const executeSave = React.useCallback(async (action: any): Promise<boolean> => {
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
            return false;
        }

        if (action.id === 'save' && !context.isDirty) {
            toast.info('No changes detected.');
            return false;
        }

        setIsLoading(true);
        try {
            const payload = context.buildPayload();
            const service = createCrudService(schema.resource?.save || '');
            await service.save(payload);
            context.markClean(); // Mark clean after successful save
            toast.success(`${action.label} successful`);
            if (schema.resource?.get) {
                queryClient.invalidateQueries({ queryKey: [schema.resource?.get] });
            }
            return true;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || `Failed to ${action.label.toLowerCase()}`);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [context, schema, queryClient]);

    React.useEffect(() => {
        if (hasActions) {
            setIsDirty(context.isDirty);
            // Default to 'save' action or the first primary action
            const saveAction = schema.actions?.find(a => a.id === 'save') || schema.actions?.[0];
            registerSaveCallback(() => executeSave(saveAction));
        }
    }, [context.isDirty, hasActions, setIsDirty, registerSaveCallback, executeSave, schema.actions]);

    // Ensure we clean up when this component unmounts
    React.useEffect(() => {
        return () => setIsDirty(false);
    }, [setIsDirty]);

    const handleAction = async (action: any) => {
        await executeSave(action);
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
                    disabled={isLoading || isFetching || (context.permissions?.canSave === false)}
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                >
                    {isLoading ? 'Processing...' : action.label}
                </Button>
            ))}
        </Box>
    );
};
