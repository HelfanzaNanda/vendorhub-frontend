import type { FieldSchema, FormState } from '../../interfaces';
import { FormSchema } from '../../interfaces';
import { SchemaEngine } from '../schema/schema.engine';
import { VisibilityEngine } from '../visibility/visibility.engine';
import { ObjectUtil } from '../../utils';

/**
 * PayloadBuilder
 * 
 * Generates API payloads from the current FormState by traversing
 * the schema, filtering hidden/readonly fields, and collecting values.
 */
export class PayloadBuilder {
    static build(formState: FormState): Record<string, unknown> {
        const schema = formState.schema;
        let payload: Record<string, unknown> = {};
        const fields = SchemaEngine.flattenFields(schema);


        for (const field of fields) {
            // Ignore specific types
            if (field.type === 'HIDDEN') continue;

            // Check visibility and readonly
            const isVisible = VisibilityEngine.isVisible(field, formState);
            const isReadonly = VisibilityEngine.isReadonly(field, formState);

            if (!isVisible || isReadonly) continue;

            const val = ObjectUtil.get(formState.values, field.name);

            // Ignore undefined/null unless it's a specific requirement
            if (val === undefined || val === null) continue;
            

            if (field.type === 'FORM' && field.nested) {
                if (field.nested.multiple) {
                    if (Array.isArray(val) && val.length > 0) {
                        // Nested form values are typically already built/clean if processed bottom-up, but for simple payload just take values
                        payload = this.mapPayload(payload, field, val);

                    }
                } else {
                    // Single nested form
                    if (typeof val === 'object' && Object.keys(val).length > 0) {
                        payload = this.mapPayload(payload, field, val);
                    }
                }
            } else {
                payload = this.mapPayload(payload, field, val);
            }
        }

        return payload;
    }

    static buildDraft(formState: FormState): Record<string, unknown> {
        const schema = formState.schema;

        // Draft might include everything including readonly/hidden fields, just to save state
        let payload: Record<string, unknown> = {};
        const fields = SchemaEngine.flattenFields(schema);

        for (const field of fields) {
            const val = ObjectUtil.get(formState.values, field.name);

            if (val !== undefined) {
                payload = this.mapPayload(payload, field, val);
            }
        }


        return payload;
    }

    static buildSubmit(formState: FormState): Record<string, unknown> {
        // Standard build is typically the submit payload
        return this.build(formState);
    }

    static buildSection(formState: FormState, sectionId: string): Record<string, unknown> {
        const schema = formState.schema;
        const section = SchemaEngine.findSection(schema, sectionId);

        if (!section || !section.fields) return {};

        let payload: Record<string, unknown> = {};

        for (const field of section.fields) {
            const isVisible = VisibilityEngine.isVisible(field, formState);
            const isReadonly = VisibilityEngine.isReadonly(field, formState);

            if (!isVisible || isReadonly) continue;

            const val = ObjectUtil.get(formState.values, field.name);

            if (val !== undefined && val !== null) {
                payload = this.mapPayload(payload, field, val);
            }
        }


        return payload;
    }

    static buildField(formState: FormState, fieldPath: string): unknown {
        const schema = formState.schema;
        const field = SchemaEngine.findField(schema, fieldPath);

        if (!field) return undefined;

        const isVisible = VisibilityEngine.isVisible(field, formState);
        const isReadonly = VisibilityEngine.isReadonly(field, formState);

        if (!isVisible || isReadonly) return undefined;

        return ObjectUtil.get(formState.values, field.name);
    }

    private static mapPayload( payload: Record<string, unknown>, field: FieldSchema, value: unknown ) {
        if (!field.payload) {
            return ObjectUtil.set(payload, field.name, value);
        }

        const pick = field.payload.pick ?? 'id';

        if (Array.isArray(value)) {
            // return ObjectUtil.set(
            //     payload,
            //     field.payload.key,
            //     value.map(v => (v as any)[pick])
            // );
            const mapped = value.map(item => {
                if ( item && typeof item === 'object' ) {
                    return (item as Record<string, any>)[pick];
                }
                return item;
            });
            return ObjectUtil.set( payload, field.payload.key, mapped );
        } 

        if ( value && typeof value === 'object' ) {
            return ObjectUtil.set(
                payload,
                field.payload.key,
                (value as Record<string, unknown>)[pick]
            );
        }
        return ObjectUtil.set(
            payload,
            field.payload.key,
            (value as any)[pick]
        );
    }
}
