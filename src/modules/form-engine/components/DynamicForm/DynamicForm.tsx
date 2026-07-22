import React from 'react';

import { FormSchema, useDynamicForm, DynamicFormProvider } from '@/modules/form-engine';
import { DynamicController } from './DynamicController';
import { DynamicFormResourceAndActions } from './DynamicFormResourceAndActions';

import type { DynamicFormProps } from './dynamic-form.interface';

export const DynamicForm = React.memo(({
  schema,
  initialValues,
  defaultValues,
  mode,
  readonly,
  loading,
  className,
  style,
  children
}: DynamicFormProps) => {
  const form = useDynamicForm({
    schema,
    initialValues: initialValues || defaultValues,
    mode,
    readonly
  });

  return (
    <DynamicFormProvider value={form}>
      <form 
        className={className} 
        style={style} 
        onSubmit={(e) => e.preventDefault()}
        noValidate
      >
        <DynamicController />
        {(schema.resource || schema.actions) && <DynamicFormResourceAndActions schema={schema} />}
        {children}
      </form>
    </DynamicFormProvider>
  );
});

DynamicForm.displayName = 'DynamicForm';
