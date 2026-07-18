import React from 'react';

import type { SectionSchema} from '@/modules/dynamic-form-v2';
import { FormSchema, useDynamicFormContext, LayoutRenderer } from '@/modules/dynamic-form-v2';
import { DynamicField } from './DynamicField';

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

  return (
    <LayoutRenderer
      layout={section.layout}
      title={section.title}
      description={section.description}
    >
      {fields.map(field => (
        <DynamicField key={field.id} field={field} />
      ))}
    </LayoutRenderer>
  );
});

DynamicSection.displayName = 'DynamicSection';
