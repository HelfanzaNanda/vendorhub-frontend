import { FormSchema, FormState } from '../../interfaces';
import { SchemaEngine } from '../schema/schema.engine';
import { VisibilityEngine } from '../visibility/visibility.engine';
import { ObjectUtil } from '../../utils';

export class PayloadBuilder {
  static build(schema: FormSchema, formState: FormState): Record<string, unknown> {
    const payload: Record<string, unknown> = {};
    const fields = SchemaEngine.flattenFields(schema);

    for (const field of fields) {
      // Ignore specific types
      if (field.type === 'HIDDEN') continue;

      // Check visibility and readonly
      const isVisible = VisibilityEngine.isVisible(field, formState);
      const isReadonly = VisibilityEngine.isReadonly(field, formState);

      if (!isVisible || isReadonly) continue;

      let val = ObjectUtil.get(formState.values, field.name);
      
      // Ignore undefined/null unless it's a specific requirement
      if (val === undefined || val === null) continue;

      if (field.type === 'FORM' && field.nested) {
        if (field.nested.multiple) {
          if (Array.isArray(val) && val.length > 0) {
            payload[field.name] = val; // Nested form values are typically already built/clean if processed bottom-up, but for simple payload just take values
          }
        } else {
          // Single nested form
          if (typeof val === 'object' && Object.keys(val).length > 0) {
            payload[field.name] = val;
          }
        }
      } else {
        payload[field.name] = val;
      }
    }

    return payload;
  }
}
