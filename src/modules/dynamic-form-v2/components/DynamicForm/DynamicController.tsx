import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { FieldSchema, FormState } from '../../interfaces';
import { ValidationEngine, VisibilityEngine } from '../../engine';
import { DynamicField } from './DynamicField';

interface DynamicControllerProps {
  field: FieldSchema;
  namePrefix?: string;
}

export const DynamicController: React.FC<DynamicControllerProps> = ({ field, namePrefix }) => {
  const { control, getValues, formState: { errors, touchedFields, dirtyFields, isSubmitting } } = useFormContext();
  
  // Watch all values to allow reactive visibility and readonly re-evaluation.
  useWatch({ control });
  
  const currentFormState: FormState = {
    values: getValues(),
    errors: errors as Record<string, string[]>,
    touched: touchedFields as Record<string, boolean>,
    dirty: dirtyFields as Record<string, boolean>,
    loading: false,
    submitting: isSubmitting,
    verification: {} 
  };

  const isVisible = VisibilityEngine.isVisible(field, currentFormState);
  
  if (!isVisible) {
    return null;
  }

  const isReadonly = VisibilityEngine.isReadonly(field, currentFormState);
  const isDisabled = VisibilityEngine.isDisabled(field, currentFormState);

  const fieldName = field.name || field.code;
  const fullName = namePrefix ? `${namePrefix}.${fieldName}` : fieldName;

  // Dependency Engine Logic
  const { setValue } = useFormContext();
  const parentPath = field.dependency?.parent ? (namePrefix ? `${namePrefix}.${field.dependency.parent}` : field.dependency.parent) : undefined;
  
  // Safely extract the parent value from the current state
  const currentParentVal = parentPath ? currentFormState.values[parentPath] || null : null; // simplified lookup, in real engine this uses ObjectUtil.get
  const prevParentRef = React.useRef(currentParentVal);
  
  React.useEffect(() => {
    if (parentPath && currentParentVal !== prevParentRef.current) {
      prevParentRef.current = currentParentVal;
      if (field.dependency?.clearOnChange) {
        setValue(fullName, null, { shouldValidate: true, shouldDirty: true });
      }
    }
  });

  return (
    <Controller
      name={fullName}
      control={control}
      shouldUnregister={field.visibility?.clearOnHide}
      rules={{
        validate: (value) => {
          const result = ValidationEngine.evaluate(field, value);
          if (!result.valid && result.messages.length > 0) {
            return result.messages[0];
          }
          return true;
        }
      }}
      render={({ field: controllerField, fieldState }) => (
        <DynamicField 
          field={field} 
          controllerField={controllerField} 
          fieldState={fieldState}
          isReadonly={isReadonly}
          isDisabled={isDisabled}
        />
      )}
    />
  );
};
