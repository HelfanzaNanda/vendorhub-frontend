import type { FormSchema } from '../interfaces';

/**
 * Centralized registry for dynamic form schemas.
 * Moved out of SchemaEngine to keep the engine pure.
 */
export class SchemaRegistry {
  private static registry = new Map<string, FormSchema>();

  static register(schemaId: string, schema: FormSchema): void {
    this.registry.set(schemaId, schema);
  }

  static resolve(schemaId: string): FormSchema | undefined {
    return this.registry.get(schemaId);
  }
}
