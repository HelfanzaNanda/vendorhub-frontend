import { FormSchema } from "@/modules/form-engine";
import { SchemaCategory } from "../constants";

export interface MainSchema {
  id: string;
  title: string;
  category: SchemaCategory;
  description: string;
  schema: FormSchema;
}
