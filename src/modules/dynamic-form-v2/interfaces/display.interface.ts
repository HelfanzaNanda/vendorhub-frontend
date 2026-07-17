import { ConditionGroup } from './condition-group.interface';

export interface DisplaySchema {
  visible?: ConditionGroup;
  readonly?: ConditionGroup;
  disabled?: ConditionGroup;
}
