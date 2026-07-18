'use client';

import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardHeader, IconButton, Button, Collapse, Typography, CircularProgress } from '@mui/material';
import { Add, Delete, ExpandMore, ExpandLess } from '@mui/icons-material';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { BaseFieldProps } from './types';
import { FormSchema } from '../../interfaces';
import { DynamicSection, DynamicController } from '../DynamicForm';
import { TableRenderer } from '../renderers';

// Mock generic schema fetcher - representing standard lookup of nested definitions
const fetchSchema = async (schemaId: string): Promise<FormSchema> => {
  // In a real application, this pulls exactly the requested schema dynamically via API
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: schemaId,
        code: schemaId,
        title: schemaId,
        layout: 'CARD',
        sections: [
          {
            id: `sec-${schemaId}`,
            layout: 'CARD',
            fields: [
              {
                id: `f1-${schemaId}`,
                code: 'name',
                name: 'name',
                label: `Nested ${schemaId} Name`,
                type: 'TEXT',
                component: 'DEFAULT'
              }
            ]
          }
        ]
      });
    }, 500);
  });
};

const SingleNestedForm: React.FC<{ name: string; nestedSchema: FormSchema; }> = ({ name, nestedSchema }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardHeader title={nestedSchema.title || 'Nested Form'} />
      <CardContent>
        {nestedSchema.sections.map(section => (
          <DynamicSection key={section.id} section={section} namePrefix={name} />
        ))}
      </CardContent>
    </Card>
  );
};

const MultipleNestedForm: React.FC<{ name: string; nestedSchema: FormSchema; }> = ({ name, nestedSchema }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });
  
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (nestedSchema.layout === 'TABLE') {
    const allFields = nestedSchema.sections.flatMap(s => s.fields);
    const columns = allFields.map(field => ({
      header: field.label || field.name || field.code,
      renderCell: (index: number) => <DynamicController field={field} namePrefix={`${name}.${index}`} />
    }));
    return (
      <TableRenderer 
        title={nestedSchema.title} 
        columns={columns} 
        rowCount={fields.length} 
        onAdd={() => append({})} 
        onRemove={remove} 
      />
    );
  }

  return (
    <Box mb={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6">{nestedSchema.title || 'Multiple Items'}</Typography>
        <Button startIcon={<Add />} onClick={() => append({})} variant="outlined" size="small">
          Add {nestedSchema.title || 'Item'}
        </Button>
      </Box>
      
      {fields.map((item, index) => {
        const isExpanded = expanded[item.id] !== false; // expand by default
        return (
          <Card key={item.id} variant="outlined" sx={{ mb: 2 }}>
            <CardHeader 
              title={`${nestedSchema.title || 'Item'} #${index + 1}`}
              action={
                <Box>
                  <IconButton onClick={() => toggleExpand(item.id)}>
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                  <IconButton color="error" onClick={() => remove(index)}>
                    <Delete />
                  </IconButton>
                </Box>
              }
            />
            <Collapse in={isExpanded}>
              <CardContent>
                {nestedSchema.sections.map(section => (
                  <DynamicSection key={section.id} section={section} namePrefix={`${name}.${index}`} />
                ))}
              </CardContent>
            </Collapse>
          </Card>
        );
      })}
    </Box>
  );
};

export const FormField: React.FC<BaseFieldProps> = ({
  name, field, error, isReadonly, isDisabled
}) => {
  const [nestedSchema, setNestedSchema] = useState<FormSchema | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const schemaId = field.nested?.schemaId;
    
    if (!schemaId) {
      setLoading(false);
      return;
    }

    fetchSchema(schemaId).then(schema => {
      if (active) {
        setNestedSchema(schema);
        setLoading(false);
      }
    });

    return () => { active = false; };
  }, [field.nested?.schemaId]);

  if (loading) {
    return <Box p={2} display="flex" alignItems="center" gap={1}><CircularProgress size={20} /> Loading nested structure...</Box>;
  }

  if (!nestedSchema) {
    return <Typography color="error" variant="body2">Nested schema configuration missing</Typography>;
  }

  if (field.nested?.multiple) {
    return <MultipleNestedForm name={name} nestedSchema={nestedSchema} />;
  }

  return <SingleNestedForm name={name} nestedSchema={nestedSchema} />;
};
