import React from 'react';

import type { SectionSchema} from '@/modules/dynamic-form-v2';
import { FormSchema, useDynamicFormContext, LayoutRenderer, FormLayout } from '@/modules/dynamic-form-v2';
import { DynamicField } from './DynamicField';
import { Grid } from '@mui/material';

export interface DynamicSectionProps {
  section: SectionSchema;
}

export const DynamicSection: React.FC<DynamicSectionProps> = React.memo(({
  section
}) => {
  // Consume context to ensure we are connected, even if we just delegate to LayoutRenderer.
  // FieldRenderer will read from context internally.

  const context = useDynamicFormContext();

  const fields = section.fields || [];

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
    </LayoutRenderer>
  );
});

DynamicSection.displayName = 'DynamicSection';
