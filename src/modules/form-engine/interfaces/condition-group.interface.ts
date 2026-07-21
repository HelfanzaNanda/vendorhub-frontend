import type { LogicalOperator } from '../enums/logical-operator.enum';
import type { ConditionOperator } from '../enums/condition-operator.enum';

export interface ConditionItem {
  field: string;
  operator: ConditionOperator;
  value: unknown;
}

export interface ConditionGroup {
  operator: LogicalOperator;
  conditions: ConditionItem[];
}
