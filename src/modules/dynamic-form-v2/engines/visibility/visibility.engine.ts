import type { FieldSchema, FormState } from '../../interfaces';
import { ConditionEvaluator } from '../evaluator/condition.evaluator';

/**
 * VisibilityEngine
 * 
 * Resolves visibility, readonly, and disabled state for a given field
 * based on the conditions and the current FormState.
 */
export class VisibilityEngine {
  static isVisible(field: FieldSchema, formState: FormState): boolean {
    if (!field.display || !field.display.visible) {
      return true;
    }

    
return ConditionEvaluator.evaluate(field.display.visible, formState);
  }

  static isReadonly(field: FieldSchema, formState: FormState): boolean {
    if (!field.display || !field.display.readonly) {
      return false;
    }

    
return ConditionEvaluator.evaluate(field.display.readonly, formState);
  }

  static isDisabled(field: FieldSchema, formState: FormState): boolean {
    if (!field.display || !field.display.disabled) {
      return false;
    }

    
return ConditionEvaluator.evaluate(field.display.disabled, formState);
  }
}
