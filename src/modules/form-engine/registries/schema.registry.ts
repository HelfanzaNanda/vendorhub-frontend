import { SchemaEngine } from '../engines';
import type { FormSchema } from '../interfaces';

export interface SchemaMetadata {
    id: string;
    schema: FormSchema;
    title?: string;
    category?: string;
    description?: string;
}

/**
 * Centralized registry for dynamic form schemas.
 * Single source of truth for all schemas used by the Dynamic Form Engine.
 */
export class SchemaRegistry {
    // private static registry = new Map<string, SchemaMetadata>();
    private static rootSchemas = new Map<string, SchemaMetadata>();
    private static nestedSchemas = new Map<string, FormSchema>();



    static register(schemaId: string, schema: FormSchema, metadata?: Omit<SchemaMetadata, 'id' | 'schema'>): void {
        const entry = { id: schemaId, schema, ...metadata };
        this.rootSchemas.set(schemaId, entry);
        this.indexNestedSchemas(entry.schema);
    }

    static resolve(schemaId: string): FormSchema | undefined {
        return this.rootSchemas.get(schemaId)?.schema;
    }

    static resolveNested(schemaId: string) {
        return this.nestedSchemas.get(schemaId);
    }

    static get(schemaId: string): SchemaMetadata | undefined {
        return this.rootSchemas.get(schemaId);
    }

    static getAll(): SchemaMetadata[] {
        return Array.from(this.rootSchemas.values());
    }

    static categories(): string[] {
        const categories = new Set<string>();
        for (const metadata of this.rootSchemas.values()) {
            if (metadata.category) {
                categories.add(metadata.category);
            }
        }
        return Array.from(categories);
    }

    static unregister(schemaId: string): void {
        this.rootSchemas.delete(schemaId);
    }

    private static indexNestedSchemas(schema: FormSchema) {

        SchemaEngine.walk(schema, field => {
            if (!field.nested?.schema) {
                return;
            }

            const schema = field.nested.schema;

            // kalau nested.schema berupa object
            if (!schema.id) {
                return;
            }

            this.nestedSchemas.set(schema.id, schema);
        });

    }

    
}
