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
            

            // if (field.type === 'FORM' && field.nested) {
            //     if (field.nested.multiple) {
            //         if (Array.isArray(val) && val.length > 0) {
            //             payload = this.mapPayload(payload, field, val);
            //         }
            //     } else {
            //         // Single nested form
            //         if (typeof val === 'object' && Object.keys(val).length > 0) {
            //             payload = this.mapPayload(payload, field, val);
            //         }
            //     }
            // } else {
            //     payload = this.mapPayload(payload, field, val);
            // }

            if (field.nested?.schema) {

                if (field.nested.multiple) {
                    const initialVal = formState.initialValues ? ObjectUtil.get(formState.initialValues, field.name) : [];
                    const initialArray = Array.isArray(initialVal) ? initialVal : [];
                    const currentArray = Array.isArray(val) ? val : [];

                    const payloadArray: any[] = [];
                    const presentIds = new Set();

                    for (const item of currentArray) {
                        const builtItem = this.buildNested(
                            item as Record<string, unknown>,
                            field.nested!.schema as FormSchema
                        );
                        
                        const id = (item as any).id;
                        let action: string | null = null;
                        
                        if (!id) {
                            action = 'CREATE';
                        } else {
                            presentIds.add(id);
                            const initialItem = initialArray.find(i => i.id === id);
                            if (initialItem) {
                                const builtInitialItem = this.buildNested(initialItem as Record<string, unknown>, field.nested!.schema as FormSchema);
                                if (JSON.stringify(builtItem) !== JSON.stringify(builtInitialItem)) {
                                    action = 'UPDATE';
                                } else {
                                    action = null; // NO_ACTION
                                }
                            } else {
                                action = 'UPDATE';
                            }
                        }
                        
                        builtItem.id = id || null;
                        builtItem.action = action;
                        delete builtItem.source;
                        delete builtItem.masterId;
                        delete builtItem.tempId;
                        
                        payloadArray.push(builtItem);
                    }

                    for (const initialItem of initialArray) {
                        if (initialItem.id && !presentIds.has(initialItem.id)) {
                            payloadArray.push({
                                id: initialItem.id,
                                action: 'DELETE'
                            });
                        }
                    }

                    if (payloadArray.length > 0) {
                        payload = this.mapPayload(payload, field, payloadArray);
                    }

                } else {

                    if (typeof val === 'object' && Object.keys(val).length > 0) {

                        payload = this.mapPayload(
                            payload,
                            field,
                            this.buildNested(
                                val as Record<string, unknown>,
                                field.nested.schema as FormSchema
                            )
                        );

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
        // return ObjectUtil.set(
        //     payload,
        //     field.payload.key,
        //     (value as any)[pick]
        // );

         return ObjectUtil.set(
            payload,
            field.payload.key,
            value,
        );
    }

    private static buildNested(
        values: Record<string, unknown>,
        schema: FormSchema
    ): Record<string, unknown> {
        let payload: Record<string, unknown> = {};

        const fields = SchemaEngine.flattenFields(schema);

        for (const field of fields) {
            const value = ObjectUtil.get(values, field.name);
            if (value === undefined || value === null) {
                continue;
            }

            if (field.nested?.schema) {
                if (field.nested.multiple) {
                    payload = this.mapPayload(
                        payload,
                        field,
                        (value as Record<string, unknown>[]).map(item =>
                            this.buildNested(item, field.nested!.schema as FormSchema)
                        )
                    );
                } else {
                    payload = this.mapPayload(
                        payload,
                        field,
                        this.buildNested(
                            value as Record<string, unknown>,
                            field.nested.schema as FormSchema
                        )
                    );
                }
                continue;
            }
            
            payload = this.mapPayload(payload, field, value);
        }
        return payload;
    }
}
