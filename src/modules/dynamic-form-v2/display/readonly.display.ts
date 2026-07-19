import { ConditionOperator, LogicalOperator } from "../enums";
import { DisplaySchema } from "../interfaces";

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
