import { ConditionOperator, DisplaySchema, LogicalOperator } from "@/modules/dynamic-form-v2";

export const PersonnelDisplay: DisplaySchema = {
  visible: {
    operator: LogicalOperator.AND,
    conditions: [
      {
        field: 'type',
        operator: ConditionOperator.EQUALS,
        value: 'PERSONNEL',
      },
    ],
  },
};
