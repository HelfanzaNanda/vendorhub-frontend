import { DynamicComponent, FieldType } from "../enums";
import { GridSchema } from "./grid.interface";
import { LookupSchema } from "./lookup.interface";
import { ValidationSchema } from "./validation.interface";
import { DependencySchema } from "./dependency.interface";
import { VerificationSchema } from "./verification.interface";
import { DisplaySchema } from "./display.interface";
import { FileSchema } from "./file.interface";
import { NestedFormSchema } from "./nested-form.interface";

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
  props?: Record<string, unknown>;
}
