import { ConditionOperator, DisplaySchema, LogicalOperator } from "@/modules/form-engine";

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
