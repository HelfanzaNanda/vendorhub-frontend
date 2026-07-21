import type { DynamicComponent, FieldType } from '@/modules/form-engine/enums';
import type {
  GridSchema,
  ValidationSchema,
  LookupSchema,
  VerificationSchema,
  DisplaySchema,
  FileSchema,
  NestedFormSchema,
  DependencySchema,
} from '@/modules/form-engine/interfaces';
import type { VisibilitySchema } from '../../interfaces/visibility.interface';
import type { OptionSchema } from '../../interfaces/options.interface';
import { PayloadSchema } from '../../interfaces/payload-schema.interface';
import { FieldMapping } from '../../interfaces/field-mapping.interface';
import { MultiLookupSchema } from '../../interfaces/multi-lookup.interface';
import { TreeLookupSchema } from '../../interfaces/tree-lookup.interface';

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
    multiple?: boolean;
    mapping?: FieldMapping[];
    multiLookup?: MultiLookupSchema;

    tree?: boolean;
    childrenField?: string;
    selectableField?: string;
}
