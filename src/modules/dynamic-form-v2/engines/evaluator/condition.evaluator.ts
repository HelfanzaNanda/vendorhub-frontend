import { ConditionGroup, ConditionItem } from '../../interfaces';
import { LogicalOperator, ConditionOperator } from '../../enums';
import { ObjectUtil } from '../../utils';

export class ConditionEvaluator {
  static evaluate(group: ConditionGroup | undefined, values: Record<string, unknown>): boolean {
    if (!group || !group.conditions || group.conditions.length === 0) {
      return true; // Default to true if no conditions
    }

    if (group.operator === LogicalOperator.AND) {
      return group.conditions.every(condition => this.evaluateItem(condition, values));
    } else if (group.operator === LogicalOperator.OR) {
      return group.conditions.some(condition => this.evaluateItem(condition, values));
    }

    return true;
  }

  private static evaluateItem(condition: ConditionItem, values: Record<string, unknown>): boolean {
    const fieldValue = ObjectUtil.get(values, condition.field);
    const targetValue = condition.value;

    switch (condition.operator) {
      case ConditionOperator.EQUALS:
        return fieldValue === targetValue;
      case ConditionOperator.NOT_EQUALS:
        return fieldValue !== targetValue;
      case ConditionOperator.IN:
        return Array.isArray(targetValue) && targetValue.includes(fieldValue);
      case ConditionOperator.NOT_IN:
        return Array.isArray(targetValue) && !targetValue.includes(fieldValue);
      case ConditionOperator.EMPTY:
        return fieldValue === null || fieldValue === undefined || fieldValue === '';
      case ConditionOperator.NOT_EMPTY:
        return fieldValue !== null && fieldValue !== undefined && fieldValue !== '';
      case ConditionOperator.GREATER_THAN:
        return Number(fieldValue) > Number(targetValue);
      case ConditionOperator.LESS_THAN:
        return Number(fieldValue) < Number(targetValue);
      case ConditionOperator.GREATER_THAN_EQUAL:
        return Number(fieldValue) >= Number(targetValue);
      case ConditionOperator.LESS_THAN_EQUAL:
        return Number(fieldValue) <= Number(targetValue);
      case ConditionOperator.CONTAINS:
        return String(fieldValue).includes(String(targetValue));
      case ConditionOperator.STARTS_WITH:
        return String(fieldValue).startsWith(String(targetValue));
      case ConditionOperator.ENDS_WITH:
        return String(fieldValue).endsWith(String(targetValue));
      default:
        return false;
    }
  }
}
