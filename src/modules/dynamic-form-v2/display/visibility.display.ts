import { ConditionOperator, LogicalOperator } from "../enums";
import { DisplaySchema } from "../interfaces";

export const VisibleWhenNotEmpty = (field: string): DisplaySchema => ({
  visible: {
    operator: LogicalOperator.AND,
    conditions: [
      {
        field,
        operator: ConditionOperator.NOT_EMPTY,
        value: null,
      },
    ],
  },
});

export const VisibleWhenEmpty = (field: string): DisplaySchema => ({
  visible: {
    operator: LogicalOperator.AND,
    conditions: [
      {
        field,
        operator: ConditionOperator.EMPTY,
        value: null,
      },
    ],
  },
});

export const VisibleWhenEquals = (field: string, value: unknown): DisplaySchema => ({
  visible: {
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

export const VisibleWhenNotEquals = (field: string, value: unknown): DisplaySchema => ({
  visible: {
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

export const VisibleWhenIn = (field: string, values: unknown[]): DisplaySchema => ({
  visible: {
    operator: LogicalOperator.AND,
    conditions: [
      {
        field,
        operator: ConditionOperator.IN,
        value: values,
      },
    ],
  },
});

export const VisibleWhenNotIn = (field: string, values: unknown[]): DisplaySchema => ({
  visible: {
    operator: LogicalOperator.AND,
    conditions: [
      {
        field,
        operator: ConditionOperator.NOT_IN,
        value: values,
      },
    ],
  },
});
