import React from 'react'

import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material'
import type { NumericFormatProps } from 'react-number-format';
import { NumericFormat } from 'react-number-format'

interface CustomProps {
  onChange: (event: { target: { name: string; value: number | null } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.floatValue === undefined ? null : values.floatValue,
            },
          });
        }}
        thousandSeparator=","
        decimalSeparator="."
        decimalScale={2}
        fixedDecimalScale={true}
        allowNegative={false}
      />
    );
  }
);

type AppNumericInputProps = Omit<TextFieldProps, 'onChange' | 'value'> & {
  value: number | null | undefined;
  onChange: (value: number | null) => void;
};

export const AppNumericInput: React.FC<AppNumericInputProps> = ({
  value,
  onChange,
  name,
  ...props
}) => {
  return (
    <TextField
      {...props}
      name={name}
      value={value === undefined ? null : value}
      onChange={(e) => onChange(e.target.value as unknown as (number | null))}
      InputProps={{
        ...props.InputProps,
        inputComponent: NumericFormatCustom as any,
      }}
    />
  );
};
