import React from 'react';

import { useDynamicFormContext, FormRenderer } from '@/modules/form-engine';

export const DynamicController: React.FC = React.memo(() => {
  const context = useDynamicFormContext();


  if (!context || !context.schema) {
    return null;
  }

  return (
    <FormRenderer schema={context.schema} />
  );
});

DynamicController.displayName = 'DynamicController';
