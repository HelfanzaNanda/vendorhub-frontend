'use client';

import React, { useState, useEffect } from 'react';

import { Autocomplete, TextField, CircularProgress } from '@mui/material';

import { useDynamicFormContext } from '../../context';
import type { BaseFieldProps } from './types';
import type { OptionSchema } from '../../interfaces';
import { LookupEngine } from '../../engines';
import { apiClient } from '@/services/api';

export const AutocompleteField: React.FC<BaseFieldProps> = ({
    name, value, onChange, onBlur, ref, field, error, isReadonly, isDisabled
}) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<OptionSchema[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const context = useDynamicFormContext();

    const parentValue = field.dependency?.parent
    ? context.getValue(field.dependency.parent)
    : undefined;

    useEffect(() => {
        let active = true;

        if (!field.lookup) {
            setOptions((field.props?.options as OptionSchema[]) || []);

            return undefined;
        }

        if (!open && inputValue === '') {
            return undefined;
        }

        const fetchOptions = async () => {
            setLoading(true);

            try {
                const formValues = context.values;

                // Uses Lookup Engine purely for rules/params parsing
                const requestConfig = LookupEngine.prepareLookupRequest(field, formValues);

                if (!requestConfig) {
                    setOptions([]);

                    return;
                }
                

                const queryParams = new URLSearchParams(requestConfig.params as Record<string, string>);

                if (inputValue && field.lookup?.searchParam) {
                    queryParams.append(field.lookup.searchParam, inputValue);
                }

                const url = `${requestConfig.endpoint}?${queryParams.toString()}`;

                // This abstracts the actual fetch using centralized api client
                const response = await apiClient.request({
                    url: url,
                    method: requestConfig.method,
                });
                const data = response.data;

                if (active) {
                    setOptions(Array.isArray(data) ? data : data.data || []);
                }
            } catch (err) {
                console.error("Lookup fetch error", err);
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        const debounceTime = field.lookup?.debounce || 300;
        const timeout = setTimeout(fetchOptions, debounceTime);

        return () => {
            active = false;
            clearTimeout(timeout);
        };
    }, field.dependency?.parent ? [field.id, open, inputValue, parentValue] : [field.id, open, inputValue]
    // [
    //     field,
    //     inputValue,
    //     open,
    //     context.values,
    //     parentValue
    // ]
    );

    const multiple = field.props?.multiple === true;
    const valueField = field.lookup?.valueField || 'id';
    const labelField = field.lookup?.labelField || 'name';

    return (
        <Autocomplete
            id={name}
            multiple={multiple}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            isOptionEqualToValue={(option, val) => (option as Record<string, unknown>)[valueField] === (val as Record<string, unknown>)[valueField]}
            getOptionLabel={(option) => String((option as Record<string, unknown>)[labelField] || '')}
            options={options}
            loading={loading}
            value={value ?? (multiple ? [] : null)}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            onBlur={onBlur}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            readOnly={isReadonly}
            disabled={isDisabled}
            disableClearable={field.props?.clearable === false}
            renderInput={(params) => (
                <TextField
                    {...params}
                    inputRef={ref}
                    name={name}
                    label={field.label}
                    placeholder={field.placeholder}
                    error={!!error}
                    helperText={error || field.helperText}
                    required={field.validation?.required}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
};
