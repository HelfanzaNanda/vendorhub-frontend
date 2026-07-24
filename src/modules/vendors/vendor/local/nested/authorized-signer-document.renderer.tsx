'use client'

import React, { useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, IconButton } from '@mui/material';
import { Add, Delete, ExpandMore } from '@mui/icons-material';
import { FormRenderer } from '@/modules/form-engine/renderers/form';
import { useNestedForm } from '@/modules/form-engine/hooks';
import { NestedDynamicFormProvider } from '@/modules/form-engine/context';
import { AuthorizedSignerDocumentEnum } from '@/modules/form-engine/enums/authorized-signer-document.enum';

export const AuthorizedSignerDocumentRenderer: React.FC<any> = React.memo((props) => {
    const { field, isDisabled, isReadonly } = props;
    const schema = field.nested?.schema;
    const { items, add, remove } = useNestedForm({ field });
    

    const [expanded, setExpanded] = React.useState<Record<number, boolean>>({});

    const handleExpand = (index: number) => {
        setExpanded(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const rows = items as any[];

    // 1. Auto create Contract row
    useEffect(() => {
        if (rows.length === 0) {
            add({ type: {
                id: AuthorizedSignerDocumentEnum.KONTRAK,
                name: AuthorizedSignerDocumentEnum.KONTRAK
            } });
            setExpanded({ 0: true });
        }
    }, [rows.length, add]);

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

    // "When all four document types already exist: Disable Add button"
    const maxTypes = 4;
    const isAddDisabled = rows.length >= maxTypes;

    return (
        <Box sx={{ mb: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="subtitle1"> {field.label} </Typography>
                {isDisabled || isReadonly ? null : ( <IconButton color="primary" sx={{borderRadius: 1}} onClick={handleAdd} disabled={isAddDisabled}> <Add /> </IconButton> )}
            </Box>
            {rows.length === 0 && ( <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center' }} > No Data </Typography> )}
            {
                rows.map((row, index) => {
                    const modifiedSchema = JSON.parse(JSON.stringify(schema));
                    const section = modifiedSchema.sections[0];
                    const typeField = section.fields.find((f: any) => f.name === 'type');

                    const isContract = row.type?.id === AuthorizedSignerDocumentEnum.KONTRAK;
                    if (typeField && typeField.lookup?.options) {
                        if (isContract) {
                            // "Contract is mandatory. Contract row cannot be removed. The Document Type field must be disabled/read-only."
                            typeField.lookup.options = typeField.lookup.options.filter(
                                (opt: any) => opt.id === AuthorizedSignerDocumentEnum.KONTRAK
                            );
                            typeField.props = { ...typeField.props, clearable: false };
                            typeField.display = {
                                ...typeField.display,
                                readonly: { operator: 'AND', conditions: [] },
                                disabled: { operator: 'AND', conditions: [] }
                            };
                        } else {
                            // "Prevent duplicate Document Type. The Document Type dropdown must only display document types that have not been used."
                            typeField.lookup.options = typeField.lookup.options.filter((opt: any) => {
                                const isCurrentValue = opt.id === row.type?.id;
                                const isUsed = rows.some((r, i) => i !== index && r.type?.id === opt.id);
                                return isCurrentValue || !isUsed;
                            });
                            // Ensure CONTRACT is not selectable in other rows since it's reserved for row 0
                            typeField.lookup.options = typeField.lookup.options.filter(
                                (opt: any) => opt.id !== AuthorizedSignerDocumentEnum.KONTRAK || opt.id === row.type?.id
                            );
                        }
                    }

                    return (
                        <NestedDynamicFormProvider key={index} parentField={field.name} index={index}>
                            <Accordion expanded={!!expanded[index]} onChange={() => handleExpand(index)} sx={{ mb: 1 }} >
                                <AccordionSummary expandIcon={<ExpandMore />} >
                                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" >
                                        <Typography fontWeight={600}> {schema.title} #{index + 1} </Typography>
                                        
                                        {/* Contract row cannot be removed */}
                                        {!isContract && !isDisabled && !isReadonly && (
                                            <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); remove(index); }} > 
                                                <Delete fontSize="small" /> 
                                            </IconButton>
                                        )}
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails> <FormRenderer schema={modifiedSchema} /> </AccordionDetails>
                            </Accordion>
                        </NestedDynamicFormProvider>
                    );
                })
            }
        </Box>
    );
});

AuthorizedSignerDocumentRenderer.displayName = 'AuthorizedSignerDocumentRenderer';
