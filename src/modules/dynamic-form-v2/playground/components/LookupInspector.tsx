import React from 'react';

import { Box, Typography, Divider, Accordion, AccordionSummary, AccordionDetails, List, Chip } from '@mui/material';

import { createPortal } from 'react-dom';

import { useDynamicFormContext } from '@/modules/dynamic-form-v2';
import { SchemaEngine } from '@/modules/dynamic-form-v2/engines';
import type { FormSchema, FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { SchemaRegistry } from '../../registries/schema.registry';

export const LookupInspectorPortal: React.FC<{ active: boolean }> = ({ active }) => {
  const context = useDynamicFormContext();
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setTarget(document.getElementById('lookup-inspector-target'));
  }, []);

  if (!active || !target || !context.schema) return null;

  const lookups: { field: FieldSchema; fullPath: string }[] = [];

  const walkSchema = (schema: FormSchema, prefix: string = '') => {
    schema.sections?.forEach(section => {
      section.fields?.forEach(field => {
        const fullPath = prefix ? `${prefix}.${field.name}` : field.name;
        
        if (field.lookup || field.props?.options || (field as { options?: unknown }).options) {
          lookups.push({ field, fullPath });
        }
        
         if (field.type === 'FORM' && field.nested) {
           let nestedSchema: FormSchema | undefined;
           
           if (typeof field.nested.schema === 'object') {
             nestedSchema = field.nested.schema;
           } else {
             const nestedSchemaId = field.nested.schema || field.nested.schemaId;
             if (nestedSchemaId) {
               nestedSchema = SchemaEngine.resolveNestedSchema(nestedSchemaId as string);
               if (!nestedSchema) {
                 nestedSchema = SchemaRegistry.getAll().find(s => s.id === nestedSchemaId || s.schema.id === nestedSchemaId)?.schema;
               }
             }
           }

           if (nestedSchema) {
              const childPrefix = field.nested.multiple ? `${fullPath}[0]` : fullPath;
              walkSchema(nestedSchema, childPrefix);
           }
         }
      });
    });
  };

  walkSchema(context.schema);

  return createPortal(
    <Accordion sx={{ mb: 3 }} defaultExpanded>
      <AccordionSummary expandIcon={<span>▼</span>}>
        <Typography fontWeight="bold">Lookup Inspector</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {lookups.length === 0 ? (
          <Typography>No lookups found.</Typography>
        ) : (
          <List dense sx={{ width: '100%', p: 0 }}>
            {lookups.map(({ field, fullPath }) => {
              const options = (field.props?.options || (field as { options?: { value: unknown, label: string }[] }).options || []) as { value: unknown, label: string }[];
              const isStatic = options.length > 0;
              const isDynamic = !!field.dependency;
              const isAsync = !!field.lookup?.endpoint && !isDynamic;
              
              const lookupType = isStatic ? 'Static' : isDynamic ? 'Dynamic' : isAsync ? 'Async' : 'Unknown';
              
              const parentPath = field.dependency?.parent;
              const parentValue = parentPath ? context.getValue(parentPath) : undefined;
              const currentValue = context.getValue(fullPath);
              
              let resolvedParams = field.lookup?.params ? { ...field.lookup.params } : {};

              if (isDynamic && field.dependency?.params) {
                 resolvedParams = { ...resolvedParams, ...field.dependency.params };
              }
              
              let currentStatus = 'Ready';

              if (isStatic) currentStatus = 'Loaded';
              else if (isDynamic && !parentValue) currentStatus = 'Waiting For Dependency';

              let currentDisplayLabel = '';

              if (isStatic && currentValue !== undefined && currentValue !== null) {
                 const opt = options.find(o => String(o.value) === String(currentValue));

                 if (opt) currentDisplayLabel = opt.label;
              }

              return (
                <Accordion key={fullPath} sx={{ mb: 1, border: '1px solid', borderColor: 'divider' }} elevation={0}>
                   <AccordionSummary expandIcon={<span>▼</span>} sx={{ bgcolor: 'action.hover' }}>
                     <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', pr: 2 }}>
                       <Box>
                         <Typography variant="subtitle2">{field.label || fullPath}</Typography>
                         <Typography variant="caption" color="text.secondary">{field.lookup?.endpoint || 'Static Options'}</Typography>
                       </Box>
                       <Chip size="small" label={currentStatus} color={currentStatus === 'Loaded' || currentStatus === 'Ready' ? 'success' : 'warning'} />
                     </Box>
                   </AccordionSummary>
                   <AccordionDetails>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2"><strong>Lookup Identifier:</strong> {field.lookup?.endpoint || 'static'}</Typography>
                        <Typography variant="body2"><strong>Lookup Type:</strong> {lookupType}</Typography>
                        <Typography variant="body2"><strong>Current Value:</strong> {JSON.stringify(currentValue) ?? 'undefined'}</Typography>
                        {currentDisplayLabel && <Typography variant="body2"><strong>Current Display Label:</strong> {currentDisplayLabel}</Typography>}
                        <Typography variant="body2"><strong>Current Status:</strong> {currentStatus}</Typography>
                        
                        {isDynamic && (
                          <>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle2">Dependency</Typography>
                            <Typography variant="body2"><strong>Parent Field:</strong> {parentPath}</Typography>
                            <Typography variant="body2"><strong>Parent Value:</strong> {JSON.stringify(parentValue) ?? 'undefined'}</Typography>
                            <Typography variant="body2"><strong>Resolved Parameters:</strong> {JSON.stringify(resolvedParams)}</Typography>
                          </>
                        )}

                        {isStatic && (
                          <>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle2">Static Options</Typography>
                            <Typography variant="body2"><strong>Total Options:</strong> {options.length}</Typography>
                            <Typography variant="body2"><strong>Preview:</strong> {JSON.stringify(options.slice(0, 3))}{options.length > 3 ? '...' : ''}</Typography>
                          </>
                        )}
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
