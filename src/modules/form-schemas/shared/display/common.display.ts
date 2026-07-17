import type { DisplaySchema } from '../../../dynamic-form-v2/interfaces/display.interface';
import { LogicalOperator } from '../../../dynamic-form-v2/enums/logical-operator.enum';
import { ConditionOperator } from '../../../dynamic-form-v2/enums/condition-operator.enum';

export const AlwaysVisible: DisplaySchema = {};

export const AlwaysHidden: DisplaySchema = {
  visible: {
    operator: LogicalOperator.AND,
    conditions: [
      {
        field: '__hidden__',
        operator: ConditionOperator.EQUALS,
        value: '__ALWAYS_FALSE__',
      },
    ],
  },
};

export const AlwaysReadonly: DisplaySchema = {
  readonly: {
    operator: LogicalOperator.AND,
    conditions: [
      {
        field: '__readonly__',
        operator: ConditionOperator.NOT_EQUALS,
        value: '__ALWAYS_TRUE__',
      },
    ],
  },
};

export const AlwaysEditable: DisplaySchema = {};

export const AlwaysDisabled: DisplaySchema = {
  disabled: {
    operator: LogicalOperator.AND,
    conditions: [
      {
        field: '__disabled__',
        operator: ConditionOperator.NOT_EQUALS,
        value: '__ALWAYS_TRUE__',
      },
    ],
  },
};

export const AlwaysEnabled: DisplaySchema = {};
