import React from 'react';
import { FormSchema, SectionSchema, useDynamicFormContext, LayoutRenderer } from '@/modules/dynamic-form-v2';
import { DynamicField } from './DynamicField';

export interface DynamicSectionProps {
  section: SectionSchema;
  schema?: FormSchema;
  readonly?: boolean;
  loading?: boolean;
}

export const DynamicSection: React.FC<DynamicSectionProps> = React.memo(({
  section,
  // We can consume these if passed, otherwise from context
  // though we don't strictly need them to render LayoutRenderer, they are part of the required props
}) => {
  // Consume context to ensure we are connected, even if we just delegate to LayoutRenderer.
  // FieldRenderer will read from context internally.
  const context = useDynamicFormContext();

  return (
    <LayoutRenderer
      layout={section.layout}
      title={section.title}
      description={section.description}
    >
      {section.fields.map(field => (
        <DynamicField key={field.id} field={field} />
      ))}
    </LayoutRenderer>
  );
});

DynamicSection.displayName = 'DynamicSection';
