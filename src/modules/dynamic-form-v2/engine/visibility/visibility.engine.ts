import { FieldSchema, FormState } from '../../interfaces';
import { ConditionEvaluator } from '../evaluator/condition.evaluator';

export class VisibilityEngine {
  static isVisible(field: FieldSchema, formState: FormState): boolean {
    if (!field.display || !field.display.visible) {
      return true;
    }
    return ConditionEvaluator.evaluate(field.display.visible, formState.values);
  }

  static isReadonly(field: FieldSchema, formState: FormState): boolean {
    if (!field.display || !field.display.readonly) {
      return false;
    }
    return ConditionEvaluator.evaluate(field.display.readonly, formState.values);
  }

  static isDisabled(field: FieldSchema, formState: FormState): boolean {
    if (!field.display || !field.display.disabled) {
      return false;
    }
    return ConditionEvaluator.evaluate(field.display.disabled, formState.values);
  }
}
