import type { FormSchema } from '../interfaces';
import type { UseDynamicFormReturn } from '../hooks/use-dynamic-form.interface';

export interface DynamicFormContextValue extends UseDynamicFormReturn {
  schema: FormSchema;
}
