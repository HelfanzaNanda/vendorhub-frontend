import type { DisplaySchema } from '../../../dynamic-form-v2/interfaces/display.interface';
import { LogicalOperator } from '../../../dynamic-form-v2/enums/logical-operator.enum';
import { ConditionOperator } from '../../../dynamic-form-v2/enums/condition-operator.enum';

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
