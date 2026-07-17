import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormSchema, FormState } from '../../interfaces';
import { PayloadBuilder } from '../../engine';
import { DynamicSection } from './DynamicSection';
import { FormToolbar } from '../components';
import { FormLayout } from '../../enums';
import { TabsRenderer, StepperRenderer } from '../renderers';

interface DynamicFormProps<T = Record<string, unknown>> {
  schema: FormSchema;
  defaultValues?: Partial<T>;
  onSubmit: (payload: T) => void;
}

export const DynamicForm = <T extends Record<string, unknown>>({ schema, defaultValues, onSubmit }: DynamicFormProps<T>) => {
  const methods = useForm({
    defaultValues: defaultValues as any,
    mode: 'onTouched',
  });

  const verificationRef = React.useRef<Record<string, any>>({});

  const handleSubmit = methods.handleSubmit((data) => {
    const formState: FormState = {
      values: data,
      errors: methods.formState.errors as any,
      touched: methods.formState.touchedFields as any,
      dirty: methods.formState.dirtyFields as any,
      loading: false,
      submitting: methods.formState.isSubmitting,
      verification: verificationRef.current
    };
    
    const payload = PayloadBuilder.build(schema, formState);
    onSubmit(payload as T);
  });

  const renderSections = () => {
    // ... Layout logic remains identical ...
    if (schema.layout === FormLayout.TABS) {
      return (
        <TabsRenderer 
          items={schema.sections.map(sec => ({
            id: sec.id,
            title: sec.title || sec.code,
            content: <DynamicSection section={sec} />
          }))}
        />
      );
    }
    
    if (schema.layout === FormLayout.STEPPER) {
      return (
        <StepperRenderer 
          items={schema.sections.map(sec => ({
            id: sec.id,
            title: sec.title || sec.code,
            content: <DynamicSection section={sec} />
          }))}
        />
      );
    }

    return (
      <React.Fragment>
        {schema.sections.map(section => (
          <DynamicSection key={section.id} section={section} />
        ))}
      </React.Fragment>
    );
  };

  return (
    <FormProvider {...methods}>
      {/* We can expose a verification context if components need it. For now, fields can just assume it tracks internally or via engine. */}
      <form onSubmit={handleSubmit} noValidate>
        {renderSections()}
        <FormToolbar />
      </form>
    </FormProvider>
  );
};

