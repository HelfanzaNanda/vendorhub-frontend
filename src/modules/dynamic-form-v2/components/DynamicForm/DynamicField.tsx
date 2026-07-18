import React from 'react';
import {
  FieldSchema,
  FieldRenderer,
  useField,
  useLookup,
  useVisibility,
  useValidation,
  useVerification,
  useDependency,
  useNestedForm
} from '@/modules/dynamic-form-v2';

export interface DynamicFieldProps {
  field: FieldSchema;
  readonly?: boolean;
  loading?: boolean;
}

export const DynamicField: React.FC<DynamicFieldProps> = React.memo(({
  field,
  readonly,
  loading
}) => {
  // Obtain runtime from Hooks
  const visibility = useVisibility({ field });
  const fieldState = useField({ field });
  const validation = useValidation({ field });
  const lookup = useLookup({ field });
  const verification = useVerification({ field });
  const dependency = useDependency({ field });
  const nestedForm = useNestedForm({ field });

  // Visibility decision must come from useVisibility()
  if (!visibility.visible) {
    return null;
  }

  // Combine runtime to pass to FieldRenderer
  const runtime = {
    ...visibility,
    ...fieldState,
    ...validation,
    ...lookup,
    ...verification,
    ...dependency,
    ...nestedForm,
    readonly: readonly ?? visibility.readonly,
    loading: loading ?? fieldState.loading,
  };

  return (
    <FieldRenderer
      field={field}
      runtime={runtime}
    />
  );
});

DynamicField.displayName = 'DynamicField';
