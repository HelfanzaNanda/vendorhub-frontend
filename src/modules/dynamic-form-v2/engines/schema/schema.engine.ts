import type { FormSchema, FieldSchema, SectionSchema } from '../../interfaces';
import { SchemaRegistry } from '../../registries/schema.registry';
import { ObjectUtil } from '../../utils';

/**
 * SchemaEngine
 * 
 * Handles schema searching, flattening, traversal, and manipulation.
 * Purely focused on schema logic, contains no state.
 */
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

    static registerSchema(schemaId: string, schema: FormSchema): void {
        SchemaRegistry.register(schemaId, schema);
    }

    static resolveNestedSchema(schemaId: string): FormSchema | undefined {
        return SchemaRegistry.resolve(schemaId);
    }

    static buildDefaultValues(schema: FormSchema): Record<string, unknown> {
        let values: Record<string, unknown> = {};

        this.walk(schema, (field) => {
            // Skip field tanpa name
            if (!field.name) return;

            // Skip jika memang tidak punya defaultValue
            if (field.defaultValue === undefined) return;

            values = ObjectUtil.set(values, field.name, field.defaultValue);
        });


        return values;
    }
}
