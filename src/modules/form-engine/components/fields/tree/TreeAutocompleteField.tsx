'use client';

import React, { useEffect, useState } from 'react';
import { CircularProgress, InputAdornment, TextField } from '@mui/material';

import { apiClient } from '@/services/api';

import { TreePopover } from './TreePopover';
import { BaseFieldProps } from '../types';
import { LookupEngine, TreeEngine } from '../../../engines';
import { useDynamicFormContext } from '../../../context';
import type { TreeNode } from '../../../interfaces';
import { ObjectUtil } from '@/modules/form-engine/utils';
import { useMappingEffect } from '../../../hooks';

export const TreeAutocompleteField: React.FC<BaseFieldProps> = ({
    name, value, onChange, ref, field, error, isReadonly, isDisabled 
}) => {

    const context = useDynamicFormContext();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [tree, setTree] = useState<TreeNode[]>([]);
    const lookup = field.lookup;
    useEffect(() => {

        if (!lookup) {
            return;
        }

        const load = async () => {
            setLoading(true);
            try {
                const request = LookupEngine.prepareLookupRequest(field, context.values);
                if (!request) return;

                const response = await apiClient.request({
                    url: request.endpoint,
                    method: request.method,
                    params: request.params
                });
                const data = Array.isArray(response.data) ? response.data : response.data.data ?? [];
                // setTree(data);
                setTree(TreeEngine.attachParent(data));

            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const selected = React.useMemo(() => {
        if (value === null || value === undefined || value === '') return field.multiple ? [] : null;
        if (Array.isArray(value)) {
            return value.map(v => {
                if (typeof v === 'object' && v !== null) return v;
                return TreeEngine.findById(tree, v as number | string);
            }).filter(Boolean);
        }
        if (typeof value === 'object' && value !== null) return value;
        return TreeEngine.findById(tree, value as number | string);
    }, [value, tree, field.multiple]);

    useMappingEffect(field, selected);

    const displayValue = React.useMemo(() => {
        if (Array.isArray(selected)) {
            return selected.map(s => s.name).join(', ');
        }
        return selected?.name ?? '';
    }, [selected]);

    return (
        <>
            <TextField
                fullWidth
                inputRef={ref}
                name={name}
                label={field.name}
                value={displayValue}
                error={!!error}
                helperText={error ?? field.helperText}
                onClick={(e) => {
                    if (!isReadonly && !isDisabled) {
                        setAnchorEl(e.currentTarget);
                    }
                }}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            { loading ? <CircularProgress size={20} /> : <i className="ri-arrow-down-s-line" /> }
                        </InputAdornment>
                    )
                }}
            />
            <TreePopover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                value={value as any}
                tree={tree}
                multiple={field.multiple}
                onClose={() => setAnchorEl(null)}
                onSelect={(node) => {
                    if (field.multiple) {
                        const currentValues = Array.isArray(value) ? [...value] : [];
                        const exists = currentValues.some(v => 
                            (typeof v === 'object' ? v.id : v) === node.id
                        );
                        
                        let newValues;
                        if (exists) {
                            newValues = currentValues.filter(v => 
                                (typeof v === 'object' ? v.id : v) !== node.id
                            );
                        } else {
                            newValues = [...currentValues, node];
                        }
                        onChange(newValues);
                    } else {
                        onChange(node);
                    }
                    // Mapping is now handled automatically by useMappingEffect
                }}
            />
        </>
    );
};
