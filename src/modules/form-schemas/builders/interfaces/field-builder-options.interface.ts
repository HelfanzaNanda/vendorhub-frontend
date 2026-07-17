import type { DynamicComponent, FieldType } from '@/modules/dynamic-form-v2/enums';
import type {
  GridSchema,
  ValidationSchema,
  LookupSchema,
  VerificationSchema,
  DisplaySchema,
  FileSchema,
  NestedFormSchema,
  DependencySchema,
} from '@/modules/dynamic-form-v2/interfaces';

export interface FieldBuilderOptions {
  id: string;
  type: FieldType;
  label: string;
  code?: string;
  name?: string;
  placeholder?: string;
  helperText?: string;
  defaultValue?: unknown;
  grid?: GridSchema;
  validation?: ValidationSchema;
  lookup?: LookupSchema;
  dependency?: DependencySchema;
  verification?: VerificationSchema;
  display?: DisplaySchema;
  file?: FileSchema;
  nested?: NestedFormSchema;
  props?: Record<string, unknown>;
  component?: DynamicComponent;
}
