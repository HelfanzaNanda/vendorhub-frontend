import React from 'react';

import { LayoutRenderer } from '../layout';
import { FieldRenderer } from '../field';
import type { SectionRendererProps } from './section-renderer.interface';

export const SectionRenderer: React.FC<SectionRendererProps> = React.memo(({ section }) => {
  return (
    <LayoutRenderer
      layout={section.layout}
      title={section.title}
      description={section.description}
    >
      {section.fields.map(field => (
        <FieldRenderer key={field.id} field={field} />
      ))}
    </LayoutRenderer>
  );
});

SectionRenderer.displayName = 'SectionRenderer';
