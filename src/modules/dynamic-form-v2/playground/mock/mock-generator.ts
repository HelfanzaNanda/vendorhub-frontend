import type { FormSchema } from '@/modules/dynamic-form-v2/interfaces';
import { SchemaEngine } from '@/modules/dynamic-form-v2/engines/schema/schema.engine';
import { getMockValueForField } from './mock-value';
import { SchemaRegistry } from '../../registries/schema.registry';

export const generateMockData = (schema: FormSchema): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  schema.sections?.forEach(section => {
    section.fields?.forEach(field => {
      if (field.type === 'FORM' && field.nested) {
        let nestedSchema: FormSchema | undefined;
        if (typeof field.nested.schema === 'object') {
          nestedSchema = field.nested.schema;
        } else {
          const schemaId = field.nested.schema || field.nested.schemaId;
          if (schemaId) {
            nestedSchema = SchemaEngine.resolveNestedSchema(schemaId as string);
            if (!nestedSchema) {
              nestedSchema = SchemaRegistry.getAll().find(s => s.id === schemaId || s.schema.id === schemaId)?.schema;
            }
          }
        }

          if (nestedSchema) {
            const nestedData = generateMockData(nestedSchema);
            result[field.name] = field.nested.multiple ? [nestedData] : nestedData;
          } else {
            result[field.name] = field.nested.multiple ? [{}] : {};
          }
      } else {
        result[field.name] = getMockValueForField(field);
      }
    });
  });

  return result;
};
