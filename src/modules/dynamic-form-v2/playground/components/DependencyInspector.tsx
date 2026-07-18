import React from 'react';
import { Box, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, List } from '@mui/material';
import { useDynamicFormContext } from '@/modules/dynamic-form-v2';
import { createPortal } from 'react-dom';
import { SchemaEngine, VisibilityEngine } from '@/modules/dynamic-form-v2/engines';
import { FormSchema, FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { SchemaRegistry } from '../registry';

export const DependencyInspectorPortal: React.FC<{ active: boolean }> = ({ active }) => {
  const context = useDynamicFormContext();
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setTarget(document.getElementById('dependency-inspector-target'));
  }, []);

  if (!active || !target || !context.schema) return null;

  const dependencies: { field: FieldSchema; fullPath: string }[] = [];

  const walkSchema = (schema: FormSchema, prefix: string = '') => {
    schema.sections?.forEach(section => {
      section.fields?.forEach(field => {
        const fullPath = prefix ? `${prefix}.${field.name}` : field.name;
        
        if (field.dependency) {
          dependencies.push({ field, fullPath });
        }
        
        if (field.type === 'FORM' && field.nested) {
           const nestedSchemaId = field.nested.schema || field.nested.schemaId;
           if (nestedSchemaId) {
             let nestedSchema = SchemaEngine.resolveNestedSchema(nestedSchemaId);
             if (!nestedSchema) {
               nestedSchema = SchemaRegistry.find(s => s.id === nestedSchemaId || s.schema.id === nestedSchemaId)?.schema;
             }
             if (nestedSchema) {
                const childPrefix = field.nested.multiple ? `${fullPath}[0]` : fullPath;
                walkSchema(nestedSchema, childPrefix);
             }
           }
        }
      });
    });
  };

  walkSchema(context.schema);

  const formState: any = {
    schema: context.schema,
    values: context.values,
    errors: context.errors,
    touched: context.touched,
    dirty: context.dirty,
    mode: context.mode,
    readonly: context.readonly,
    verification: context.verification,
    loading: context.loading
  };

  return createPortal(
    <Accordion sx={{ mb: 3 }} defaultExpanded>
      <AccordionSummary expandIcon={<span>▼</span>}>
        <Typography fontWeight="bold">Dependency Inspector</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {dependencies.length === 0 ? (
          <Typography>No dependencies found.</Typography>
        ) : (
          <List dense sx={{ width: '100%', p: 0 }}>
            {dependencies.map(({ field, fullPath }) => {
              const parentPath = field.dependency!.parent;
              const parentValue = context.getValue(parentPath);
              const currentValue = context.getValue(fullPath);
              const isVisible = VisibilityEngine.isVisible(field, formState);
              const isDisabled = VisibilityEngine.isDisabled(field, formState);
              
              return (
                <Accordion key={fullPath} sx={{ mb: 1, border: '1px solid', borderColor: 'divider' }} elevation={0}>
                   <AccordionSummary expandIcon={<span>▼</span>} sx={{ bgcolor: 'action.hover' }}>
                     <Box>
                       <Typography variant="subtitle2">{field.label || fullPath}</Typography>
                       <Typography variant="caption" color="text.secondary">Parent: {parentPath}</Typography>
                     </Box>
                   </AccordionSummary>
                   <AccordionDetails>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2"><strong>Dependency Type:</strong> {field.lookup ? 'Lookup' : 'Cascading/Visibility'}</Typography>
                        <Typography variant="body2"><strong>Clear On Change:</strong> {field.dependency!.clearOnChange ? 'Yes' : 'No'}</Typography>
                        {field.display?.visible && <Typography variant="body2"><strong>Visibility Rule:</strong> Yes</Typography>}
                        {field.display?.disabled && <Typography variant="body2"><strong>Enable Rule:</strong> Yes</Typography>}
                        {field.dependency!.params && <Typography variant="body2"><strong>Lookup Params:</strong> {JSON.stringify(field.dependency!.params)}</Typography>}
                        
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="subtitle2">Live Status</Typography>
                        <Typography variant="body2"><strong>Parent Value:</strong> {JSON.stringify(parentValue) || 'undefined'}</Typography>
                        <Typography variant="body2"><strong>Current Field Value:</strong> {JSON.stringify(currentValue) || 'undefined'}</Typography>
                        <Typography variant="body2"><strong>Visible:</strong> {isVisible ? 'Yes' : 'No'}</Typography>
                        <Typography variant="body2"><strong>Enabled:</strong> {!isDisabled ? 'Yes' : 'No'}</Typography>
                        <Typography variant="body2"><strong>Status:</strong> {parentValue ? 'Resolved' : 'Waiting For Parent'}</Typography>
                      </Box>
                   </AccordionDetails>
                </Accordion>
              );
            })}
          </List>
        )}
      </AccordionDetails>
    </Accordion>,
    target
  );
};
