import { FormSchema, FieldSchema } from '../../interfaces';
import { SchemaEngine } from '../schema/schema.engine';

export class DependencyEngine {
  static getDependentFields(schema: FormSchema, changedField: string): FieldSchema[] {
    const allFields = SchemaEngine.flattenFields(schema);
    return allFields.filter(f => f.dependency && f.dependency.parent === changedField);
  }

  static processDependencyChange(
    schema: FormSchema, 
    changedField: string, 
    values: Record<string, unknown>
  ): { affectedFields: FieldSchema[], nextValues: Record<string, unknown> } {
    
    const affectedFields = this.getDependentFields(schema, changedField);
    let nextValues = { ...values };

    for (const field of affectedFields) {
      if (field.dependency?.clearOnChange) {
        nextValues[field.name] = undefined;
      }
    }

    return {
      affectedFields,
      nextValues
    };
  }
}
