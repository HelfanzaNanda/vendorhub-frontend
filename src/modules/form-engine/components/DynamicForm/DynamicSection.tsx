import React from 'react';

import type { SectionSchema } from '@/modules/form-engine';
import { FormSchema, useDynamicFormContext, LayoutRenderer, FormLayout } from '@/modules/form-engine';
import { DynamicField } from './DynamicField';
import { Grid, Box, Button, CircularProgress } from '@mui/material';
import { toast } from 'sonner';
import { createCrudService } from '@/modules/form-engine/services/vendor-crud.service';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export interface DynamicSectionProps {
    section: SectionSchema;
}

export const DynamicSection: React.FC<DynamicSectionProps> = React.memo(({
    section
}) => {
    // Consume context to ensure we are connected, even if we just delegate to LayoutRenderer.
    // FieldRenderer will read from context internally.

    const context = useDynamicFormContext();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const fields = section.fields || [];

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
            const resource = context.schema?.resource;
            const service = createCrudService(resource?.save || '');
            await service.save(payload);
            toast.success(`${action.label} successful`);
            if (resource?.get) {
                queryClient.invalidateQueries({ queryKey: [resource.get] });
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || `Failed to ${action.label.toLowerCase()}`);
        } finally {
            setIsLoading(false);
        }
    };

    const renderActions = () => {
        if (!section.actions?.length) return null;
        return (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
                {section.actions.map(action => (
                    <Button
                        key={action.id}
                        variant={action.type === 'primary' ? 'contained' : 'outlined'}
                        onClick={() => handleAction(action)}
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
                    >
                        {isLoading ? 'Processing...' : action.label}
                    </Button>
                ))}
            </Box>
        );
    };

    if (section.layout == FormLayout.TABLE) {
        return (
            <LayoutRenderer layout={section.layout} >
                <Grid container spacing={3}>
                    {fields.map(field => (
                        <Grid
                            key={field.id}
                            item
                            xs={field.grid?.xs ?? 12}
                            sm={field.grid?.sm}
                            md={field.grid?.md}
                            lg={field.grid?.lg}
                            xl={field.grid?.xl}
                        >
                            <DynamicField key={field.id} field={field} />
                        </Grid>
                    ))}
                </Grid>
                {renderActions()}
            </LayoutRenderer>
        )
    }

    return (
        <LayoutRenderer
            layout={section.layout}
            title={section.title}
            description={section.description}
        >
            <Grid container spacing={3}>
                {fields.map(field => (
                    <Grid
                        key={field.id}
                        item
                        xs={field.grid?.xs ?? 12}
                        sm={field.grid?.sm}
                        md={field.grid?.md}
                        lg={field.grid?.lg}
                        xl={field.grid?.xl}
                    >
                        <DynamicField key={field.id} field={field} />
                    </Grid>
                ))}
            </Grid>
            {renderActions()}
        </LayoutRenderer>
    );
});

DynamicSection.displayName = 'DynamicSection';
