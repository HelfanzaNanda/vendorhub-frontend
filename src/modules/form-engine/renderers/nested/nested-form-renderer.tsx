import React from 'react';

import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, IconButton } from '@mui/material';

import { Add, Delete, ExpandMore } from '@mui/icons-material';

import { FormRenderer } from '../form';
import { useNestedForm } from '../../hooks';
import type { NestedFormRendererProps } from './nested-form-renderer.interface';
import { NestedDynamicFormProvider } from '../../context';

export const NestedFormRenderer: React.FC<NestedFormRendererProps> = React.memo((props) => {
    const { field, schema } = props;
    const { items, multiple, add, remove } = useNestedForm({ field });

    const [expanded, setExpanded] = React.useState<Record<number, boolean>>({});

    const handleExpand = (index: number) => {
        setExpanded(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const rows = items as any[];

    const handleAdd = () => {
        const newIndex = rows.length;

        add();

        setExpanded(prev => ({
            ...prev,
            [newIndex]: true
        }));
    };

    if (!schema) {
        return ( <Typography color="text.secondary"> Loading... </Typography> );
    }

    

    if (multiple) {
        const rows = items as any[];
        return (
            <Box sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle1"> {field.label} </Typography>
                    <IconButton color="primary" sx={{borderRadius: 1}} onClick={() => handleAdd()}> <Add /> </IconButton>
                </Box>
                {rows.length === 0 && ( <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }} > No Data </Typography> )}
                {
                    rows.map((_, index) => (
                        <NestedDynamicFormProvider key={index} parentField={field.name} index={index}>
                            <Accordion expanded={!!expanded[index]} onChange={() => handleExpand(index)} sx={{ mb: 1 }} >
                                <AccordionSummary expandIcon={<ExpandMore />} >
                                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" >
                                        <Typography fontWeight={600}> {schema.title} #{index + 1} </Typography>
                                        <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); remove(index); }} > <Delete fontSize="small" /> </IconButton>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails> <FormRenderer schema={schema} /> </AccordionDetails>
                            </Accordion>
                        </NestedDynamicFormProvider>
                    ))
                }

            </Box>

        );

    }

    return (
        <NestedDynamicFormProvider parentField={field.name}>
            <FormRenderer schema={schema} />
        </NestedDynamicFormProvider>
    );

});

NestedFormRenderer.displayName = 'NestedFormRenderer';
