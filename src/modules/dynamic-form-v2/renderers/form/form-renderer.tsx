import React from 'react';

import { LayoutRenderer } from '../layout';
import { DynamicSection } from '../../components/DynamicForm';
import type { FormRendererProps } from './form-renderer.interface';

import { useDynamicFormContext } from '../../context';

export const FormRenderer: React.FC<FormRendererProps> = React.memo(({ schema: propSchema }) => {
  const context = useDynamicFormContext();
  const schema = propSchema || context.schema;


  if (!schema) {
    return null;
  }

  const sections = schema.sections || [];

  // Inject basic structural properties such as tabs if the Layout requires it to arrange children.
  const layoutProps = {
    tabs: sections.map(section => ({
      id: section.id,
      label: section.title || section.code
    }))
  };

  return (
    <LayoutRenderer
      layout={schema.layout}
      title={schema.title}
      description={schema.description}
      props={layoutProps}
    >
      {sections.map(section => (
        <DynamicSection key={section.id} section={section} />
      ))}
    </LayoutRenderer>
  );
});

FormRenderer.displayName = 'FormRenderer';
