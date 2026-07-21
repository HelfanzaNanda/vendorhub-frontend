import { FormSchema } from "./form-schema.interface";

export interface NestedFormSchema {
  schemaId?: string;
//   schema?: string;
  schema?: FormSchema
  multiple?: boolean;
  minItems?: number;
  maxItems?: number;
}
