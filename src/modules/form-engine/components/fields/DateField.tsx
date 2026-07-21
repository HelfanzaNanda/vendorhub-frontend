import React from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import type { BaseFieldProps } from './types';
import dayjs, { Dayjs } from 'dayjs';
import { DateUtil } from '../../utils';

export const DateField: React.FC<BaseFieldProps> = ({
    name, value, onChange, ref, field, error, isReadonly, isDisabled
}) => {
    const minDate = DateUtil.toDayjs(field.props?.minDate) ?? undefined;
    const maxDate = DateUtil.toDayjs(field.props?.maxDate) ?? undefined;
    return (
        <DatePicker
            label={field.label}
            value={DateUtil.toDayjs(value as Date | string | Dayjs | null)}
            onChange={(date) => {
                if (date?.isValid()) {
                    onChange(date.toDate());
                } else {
                    onChange(null);
                }
            }}
            readOnly={isReadonly}
            disabled={isDisabled}
            minDate={minDate}
            maxDate={maxDate}
            inputRef={ref}
            slotProps={{
                textField: {
                    name,
                    fullWidth: true,
                    error: !!error,
                    helperText: error || field.helperText,
                    required: field.validation?.required,
                    placeholder: field.placeholder,
                }
            }}
        />
    );
};
