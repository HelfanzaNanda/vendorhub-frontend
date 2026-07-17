import React from 'react';
import { FieldSchema } from '../../interfaces';
import { FieldType } from '../../enums';
import { ControllerRenderProps, ControllerFieldState } from 'react-hook-form';
import * as Fields from '../fields';

interface DynamicFieldProps {
  field: FieldSchema;
  controllerField: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  isReadonly: boolean;
  isDisabled: boolean;
}

export const DynamicField: React.FC<DynamicFieldProps> = ({ 
  field, 
  controllerField, 
  fieldState, 
  isReadonly, 
  isDisabled 
}) => {
  const commonProps = {
    ...controllerField,
    field,
    error: fieldState.error?.message,
    isReadonly,
    isDisabled,
  };

  switch (field.type) {
    case FieldType.TEXT: return <Fields.TextField {...commonProps} />;
    case FieldType.TEXTAREA: return <Fields.TextAreaField {...commonProps} />;
    case FieldType.NUMBER: return <Fields.NumberField {...commonProps} />;
    case FieldType.DECIMAL: return <Fields.DecimalField {...commonProps} />;
    case FieldType.CURRENCY: return <Fields.CurrencyField {...commonProps} />;
    case FieldType.PERCENTAGE: return <Fields.PercentageField {...commonProps} />;
    case FieldType.EMAIL: return <Fields.EmailField {...commonProps} />;
    case FieldType.PHONE: return <Fields.PhoneField {...commonProps} />;
    case FieldType.PASSWORD: return <Fields.PasswordField {...commonProps} />;
    case FieldType.DATE: return <Fields.DateField {...commonProps} />;
    case FieldType.DATETIME: return <Fields.DatetimeField {...commonProps} />;
    case FieldType.MONTH: return <Fields.MonthField {...commonProps} />;
    case FieldType.YEAR: return <Fields.YearField {...commonProps} />;
    case FieldType.SWITCH: return <Fields.SwitchField {...commonProps} />;
    case FieldType.CHECKBOX: return <Fields.CheckboxField {...commonProps} />;
    case FieldType.RADIO: return <Fields.RadioField {...commonProps} />;
    case FieldType.SELECT: return <Fields.SelectField {...commonProps} />;
    case FieldType.AUTOCOMPLETE: return <Fields.AutocompleteField {...commonProps} />;
    case FieldType.FILE: return <Fields.FileField {...commonProps} />;
    case FieldType.FORM: return <Fields.FormField {...commonProps} />;
    case FieldType.HIDDEN: return <Fields.HiddenField {...commonProps} />;
    default: return <Fields.TextField {...commonProps} />;
  }
};
