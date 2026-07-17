import { FormSchema, FieldSchema, SectionSchema } from '../../interfaces';

export class SchemaEngine {
  static walk(schema: FormSchema, callback: (field: FieldSchema, section: SectionSchema) => void): void {
    if (!schema.sections) return;
    
    for (const section of schema.sections) {
      if (!section.fields) continue;
      for (const field of section.fields) {
        callback(field, section);
      }
    }
  }

  static flattenFields(schema: FormSchema): FieldSchema[] {
    const fields: FieldSchema[] = [];
    this.walk(schema, (field) => {
      fields.push(field);
    });
    return fields;
  }

  static findField(schema: FormSchema, fieldName: string): FieldSchema | undefined {
    return this.flattenFields(schema).find(f => f.name === fieldName || f.code === fieldName || f.id === fieldName);
  }

  static findSection(schema: FormSchema, sectionId: string): SectionSchema | undefined {
    return schema.sections?.find(s => s.id === sectionId || s.code === sectionId);
  }

  static getNestedForms(schema: FormSchema): FieldSchema[] {
    return this.flattenFields(schema).filter(f => f.type === 'FORM' && f.nested);
  }

  // Simplified schema registry for the engine
  private static schemaRegistry = new Map<string, FormSchema>();

  static registerSchema(schemaId: string, schema: FormSchema): void {
    this.schemaRegistry.set(schemaId, schema);
  }

  static resolveNestedSchema(schemaId: string): FormSchema | undefined {
    return this.schemaRegistry.get(schemaId);
  }
}
