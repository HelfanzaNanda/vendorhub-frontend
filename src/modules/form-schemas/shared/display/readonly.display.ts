import type { DisplaySchema } from '../../../dynamic-form-v2/interfaces/display.interface';
import { LogicalOperator } from '../../../dynamic-form-v2/enums/logical-operator.enum';
import { ConditionOperator } from '../../../dynamic-form-v2/enums/condition-operator.enum';

export const ReadonlyWhenEquals = (field: string, value: unknown): DisplaySchema => ({
  readonly: {
    operator: LogicalOperator.AND,
    conditions: [
      {
        field,
        operator: ConditionOperator.EQUALS,
        value,
      },
    ],
  },
});

export const ReadonlyWhenNotEquals = (field: string, value: unknown): DisplaySchema => ({
  readonly: {
    operator: LogicalOperator.AND,
    conditions: [
      {
        field,
        operator: ConditionOperator.NOT_EQUALS,
        value,
      },
    ],
  },
});
