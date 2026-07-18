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
import type { VisibilitySchema } from '../../interfaces/visibility.interface';
import type { OptionSchema } from '../../interfaces/options.interface';
import { PayloadSchema } from '../../interfaces/payload-schema.interface ';

export interface FieldBuilderOptions {
    name: string;
    label: string;
    code?: string;
    type: FieldType;
    placeholder?: string;
    helperText?: string;
    grid?: GridSchema;
    validation?: ValidationSchema;
    options?: OptionSchema[];
    lookup?: LookupSchema;
    dependency?: DependencySchema;
    verification?: VerificationSchema;
    display?: DisplaySchema;
    file?: FileSchema;
    nested?: NestedFormSchema;
    props?: Record<string, unknown>;
    defaultValue?: unknown;
    component?: DynamicComponent;
    visibility?: VisibilitySchema;
    payload?: PayloadSchema;
}
