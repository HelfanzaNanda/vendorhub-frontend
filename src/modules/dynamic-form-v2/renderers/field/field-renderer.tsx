import React from 'react';

import { FieldType } from '../../enums';
import { useDynamicFormContext } from '../../context';
import { fieldRendererRegistry } from '../registry';
import { NestedFormRenderer } from '../nested';
import type { FieldRendererProps } from './field-renderer.interface';

export const FieldRenderer: React.FC<FieldRendererProps> = React.memo((props) => {
  const { field } = props;
  const context = useDynamicFormContext();
  const name = field.name || field.code || field.id;
  
  const value = context.values[name];
  const error = context.errors[name];
  const disabled = context.readonly;
  const readonly = context.readonly;
  const loading = context.loading;
  
  const onChange = (val: any) => context.setValue(name, val);
  const onBlur = () => context.touch(name);

  if (field.type === FieldType.HIDDEN) {
    return null;
  }

  if (field.type === FieldType.FORM) {
    return (
      <NestedFormRenderer
        field={field}
        schema={undefined} // Wait, NestedFormRenderer should also read from context or resolve via field.nested.schemaId? Actually, the prompt said NestedFormRenderer reuses the same Context.
      />
    );
  }

  const Renderer = fieldRendererRegistry[field.type] as React.ElementType;

  if (!Renderer) {
    throw new Error(
      `Renderer not found.\nField Type:\n${field.type}\nComponent:\n${field.component}`
    );
  }

  return (
    <Renderer
      id={field.id}
      name={name}
      label={field.label}
      placeholder={field.placeholder}
      helperText={field.helperText}
      value={value}
      error={error}
      disabled={disabled}
      readonly={readonly}
      loading={loading}
      required={field.validation?.required}
      props={field.props}
      onChange={onChange}
      onBlur={onBlur}
      field={field}
      isReadonly={readonly}
      isDisabled={disabled}
    />
  );
});

FieldRenderer.displayName = 'FieldRenderer';
