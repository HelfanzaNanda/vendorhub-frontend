import { FormSchema } from "@/modules/form-engine";
import { SchemaCategory } from "../constants";

export interface MainSchema {
  id: string;
  title: string;
  icon: string;
  category: SchemaCategory;
  description: string;
  schema: FormSchema;
}
