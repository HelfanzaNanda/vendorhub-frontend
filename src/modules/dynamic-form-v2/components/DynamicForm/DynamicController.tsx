import React from 'react';
import { useDynamicFormContext, FormRenderer } from '@/modules/dynamic-form-v2';

export const DynamicController: React.FC = React.memo(() => {
  const context = useDynamicFormContext();

  console.log('schema : ', context.schema);
  

  if (!context || !context.schema) {
    return null;
  }

  return (
    <FormRenderer schema={context.schema} />
  );
});

DynamicController.displayName = 'DynamicController';
