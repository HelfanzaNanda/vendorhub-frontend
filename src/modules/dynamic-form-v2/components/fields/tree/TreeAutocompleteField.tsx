'use client';

import React, { useEffect, useState } from 'react';
import { CircularProgress, InputAdornment, TextField } from '@mui/material';

import { apiClient } from '@/services/api';

import { TreePopover } from './TreePopover';
import { BaseFieldProps } from '../types';
import { LookupEngine, TreeEngine } from '../../../engines';
import { useDynamicFormContext } from '../../../context';
import type { TreeNode } from '../../../interfaces';
import { ObjectUtil } from '@/modules/dynamic-form-v2/utils';

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

    // const selected = value ? TreeEngine.findById( tree, value as number ) : null;
    const selected = (value as TreeNode | null) ?? TreeEngine.findById(tree, value as number);
    return (
        <>
            <TextField
                fullWidth
                inputRef={ref}
                name={name}
                label={field.label}
                value={selected?.label ?? ''}
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
                value={value as number}
                tree={tree}
                onClose={() => setAnchorEl(null)}
                onSelect={(node) => {
                    onChange(node);
                     field.mapping?.forEach(item => {
                        context.setValue(
                            item.to,
                            ObjectUtil.get(node, item.from)
                        );

                    });
                }}
            />
        </>
    );
};
