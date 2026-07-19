import { ConditionOperator, LogicalOperator } from "../enums";
import { DisplaySchema } from "../interfaces";

export const DisabledWhenEquals = (field: string, value: unknown): DisplaySchema => ({
  disabled: {
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

export const DisabledWhenNotEquals = (field: string, value: unknown): DisplaySchema => ({
  disabled: {
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
