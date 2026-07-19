import { ConditionOperator, LogicalOperator } from "../enums";
import { DisplaySchema } from "../interfaces";

export const AuthorityDisplay: DisplaySchema = {
  visible: {
    operator: LogicalOperator.AND,
    conditions: [
      {
        field: 'type',
        operator: ConditionOperator.EQUALS,
        value: 'AUTHORITY',
      },
    ],
  },
};
