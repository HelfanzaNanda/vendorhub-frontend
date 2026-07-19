import { ConditionOperator, DisplaySchema, LogicalOperator } from "@/modules/dynamic-form-v2";

export const ShareholderDisplay: DisplaySchema = {
  visible: {
    operator: LogicalOperator.AND,
    conditions: [
      {
        field: 'type',
        operator: ConditionOperator.EQUALS,
        value: 'SHAREHOLDER',
      },
    ],
  },
};
