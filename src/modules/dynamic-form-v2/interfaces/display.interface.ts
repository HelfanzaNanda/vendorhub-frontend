import type { ConditionGroup } from './condition-group.interface';

export interface DisplaySchema {
  visible?: boolean | ConditionGroup;
  readonly?: boolean | ConditionGroup;
  disabled?: boolean | ConditionGroup;
}
