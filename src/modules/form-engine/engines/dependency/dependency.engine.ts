import type { FormSchema, FieldSchema, FormState } from '../../interfaces';
import { SchemaEngine } from '../schema/schema.engine';

/**
 * DependencyEngine
 * 
 * Handles field dependencies, such as auto-clearing dependent fields
 * when a parent field's value changes.
 */
export class DependencyEngine {
  static getDependentFields(schema: FormSchema, changedField: string): FieldSchema[] {
    const allFields = SchemaEngine.flattenFields(schema);

    
return allFields.filter(f => f.dependency && f.dependency.parent === changedField);
  }

  static processDependencyChange(
    changedField: string, 
    formState: FormState
  ): { affectedFields: FieldSchema[], nextValues: Record<string, unknown> } {
    const schema = formState.schema;
    const values = formState.values;
    
    const affectedFields = this.getDependentFields(schema, changedField);
    const nextValues = { ...values };

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

  static shouldFetchLookup(
    field: FieldSchema,
    parentValue: unknown,
    open: boolean,
    inputValue: string
  ): boolean {
    if (!field.dependency?.parent) {
      return open || inputValue !== '';
    }

    if (open || inputValue !== '') {
      return true;
    }

    if (parentValue !== undefined && parentValue !== null && parentValue !== '') {
      return true;
    }

    return false;
  }
}
