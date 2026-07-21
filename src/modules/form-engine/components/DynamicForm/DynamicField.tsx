import React, { useMemo } from 'react';

import type { FieldSchema } from '../../interfaces';
import { FieldRenderer } from '../../renderers/field/field-renderer';
import { useDynamicFormContext } from '../../context';
import { VisibilityEngine } from '../../engines/visibility/visibility.engine';

export interface DynamicFieldProps {
  field: FieldSchema;
}

export const DynamicField: React.FC<DynamicFieldProps> = React.memo(({ field }) => {
  const context = useDynamicFormContext();

  const isVisible = useMemo(() => {
    return VisibilityEngine.isVisible(field, context);
  }, [field, context]);

  if (!isVisible) {
    return null;
  }

  return <FieldRenderer field={field} />;
});

DynamicField.displayName = 'DynamicField';
