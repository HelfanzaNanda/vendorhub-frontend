import type { DynamicComponent, FieldType } from "../enums";
import type { GridSchema } from "./grid.interface";
import type { LookupSchema } from "./lookup.interface";
import type { ValidationSchema } from "./validation.interface";
import type { DependencySchema } from "./dependency.interface";
import type { VerificationSchema } from "./verification.interface";
import type { DisplaySchema } from "./display.interface";
import type { FileSchema } from "./file.interface";
import type { NestedFormSchema } from "./nested-form.interface";
import type { PayloadSchema } from "./payload-schema.interface";
import type { TableConfigSchema } from "./table-schema.interface";
import type { FormSchema } from "./form-schema.interface";
import { DynamicFormContextValue } from "../context";
import { FieldProps } from "./field-props.interface";
import { FieldMapping } from "./field-mapping.interface";
import { MultiLookupSchema } from "./multi-lookup.interface";


export interface FieldSchema {
  id: string;
  code: string;
  name: string;
  label: string;
  type: FieldType;
  component: DynamicComponent;
  defaultValue?: unknown;
  placeholder?: string;
  helperText?: string;
  grid?: GridSchema;
  validation?: ValidationSchema;
  lookup?: LookupSchema;
  dependency?: DependencySchema;
  verification?: VerificationSchema;
  display?: DisplaySchema;
  file?: FileSchema;
  nested?: NestedFormSchema;
  table?: TableConfigSchema;
  schema?: FormSchema;
  props?: FieldProps;
  payload?: PayloadSchema;
  multiple?: boolean;
  mapping?: FieldMapping[]
  multiLookup?: MultiLookupSchema;
}
