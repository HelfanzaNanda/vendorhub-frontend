import React, { useMemo } from 'react';

import { FieldType } from '../../enums';
import { useDynamicFormContext } from '../../context';
import { fieldRendererRegistry } from '../registry';
import { NestedFormRenderer } from '../nested';
import { VisibilityEngine } from '../../engines/visibility/visibility.engine';
import type { FieldRendererProps } from './field-renderer.interface';
import { SchemaEngine } from '../../engines';

export const FieldRenderer: React.FC<FieldRendererProps> = React.memo((props) => {
    const { field } = props;
    const context = useDynamicFormContext();
    const name = field.name || field.code || field.id;

    const value = context.getValue(name);
    const error = context.getError(name);

    const readonly = useMemo(() => VisibilityEngine.isReadonly(field, context), [field, context]);
    const disabled = useMemo(() => VisibilityEngine.isDisabled(field, context), [field, context]);

    const loading = context.loading;

    const onChange = (val: unknown) => context.setValue(name, val);
    const onBlur = () => context.touch(name);


    
    
    if (field.type === FieldType.HIDDEN) {
        return null;
    }
    
    if (field.type === FieldType.FORM) {
        if (field.nested?.schema) {
            return (
                <NestedFormRenderer
                    field={field}
                    schema={field.nested.schema}
                />
            );
        }
    }

    const Renderer = fieldRendererRegistry[field.type] as React.ElementType;

    if (!Renderer) {
        throw new Error(
            `Renderer not found.\nField Type:\n${field.type}\nComponent:\n${field.component}`
        );
    }

    return (
        <Renderer
            id={field.id}
            name={name}
            label={field.label}
            placeholder={field.placeholder}
            helperText={field.helperText}
            value={value}
            error={error}
            disabled={disabled}
            readonly={readonly}
            loading={loading}
            required={field.validation?.required}
            props={field.props}
            onChange={onChange}
            onBlur={onBlur}
            field={field}
            isReadonly={readonly}
            isDisabled={disabled}
            context={context}
        />
    );
});

FieldRenderer.displayName = 'FieldRenderer';
