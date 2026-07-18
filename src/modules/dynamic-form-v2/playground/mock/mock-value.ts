import { FieldType } from '@/modules/dynamic-form-v2/enums';
import { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';

export const getMockValueForField = (field: FieldSchema): any => {
  switch (field.type) {
    case FieldType.TEXT:
      return "Sample Text";
    case FieldType.TEXTAREA:
      return "Lorem ipsum dolor sit amet.";
    case FieldType.EMAIL:
      return "john.doe@example.com";
    case FieldType.PHONE:
      return "081234567890";
    case FieldType.NUMBER:
    case FieldType.CURRENCY:
    case FieldType.PERCENTAGE:
      return 100;
    case FieldType.DATE:
      return new Date().toISOString().split('T')[0];

    case FieldType.SWITCH:
    case FieldType.CHECKBOX:
      return true;
    case FieldType.SELECT:
    case FieldType.RADIO:
      // Try static options
      const options = field.props?.options || (field as any).options;
      if (options && options.length > 0) {
        return options[0].value;
      }
      // If we had lookup options resolved, we could use them, but we only have schema static options here.
      return null;
    case FieldType.FILE:
    case FieldType.HIDDEN:
    default:
      return null;
  }
};
