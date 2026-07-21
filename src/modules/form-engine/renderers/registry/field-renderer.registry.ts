import { FieldType } from '../../enums';
import {
  TextField,
  TextAreaField,
  NumberField,
  DecimalField,
  CurrencyField,
  PercentageField,
  EmailField,
  PhoneField,
  PasswordField,
  DateField,
  DatetimeField,
  MonthField,
  YearField,
  SwitchField,
  CheckboxField,
  RadioField,
  SelectField,
  AutocompleteField,
  FileField,
  HiddenField,
  TableField,
} from '../../components/fields';
import type { RendererRegistry } from './renderer-registry.interface';
import { MultiLookupField } from '../../components/fields/MultiLookupField';
import { TreeAutocompleteField } from '../../components/fields/tree/TreeAutocompleteField';
import { AuthorizedSignerDocumentRenderer } from '@/modules/form-schemas/vendor/local/nested/authorized-signer-document.renderer';

export const fieldRendererRegistry: RendererRegistry = {
  [FieldType.TEXT]: TextField,
  [FieldType.TEXTAREA]: TextAreaField,
  [FieldType.NUMBER]: NumberField,
  [FieldType.DECIMAL]: DecimalField,
  [FieldType.CURRENCY]: CurrencyField,
  [FieldType.PERCENTAGE]: PercentageField,
  [FieldType.EMAIL]: EmailField,
  [FieldType.PHONE]: PhoneField,
  [FieldType.PASSWORD]: PasswordField,
  [FieldType.DATE]: DateField,
  [FieldType.DATETIME]: DatetimeField,
  [FieldType.MONTH]: MonthField,
  [FieldType.YEAR]: YearField,
  [FieldType.SWITCH]: SwitchField,
  [FieldType.CHECKBOX]: CheckboxField,
  [FieldType.RADIO]: RadioField,
  [FieldType.SELECT]: SelectField,
  [FieldType.AUTOCOMPLETE]: AutocompleteField,
  [FieldType.FILE]: FileField,
  [FieldType.HIDDEN]: HiddenField,
  [FieldType.TABLE]: TableField,
  [FieldType.MULTI_LOOKUP]: MultiLookupField,
  [FieldType.TREE_AUTOCOMPLETE]: TreeAutocompleteField,
  [FieldType.AUTHORIZED_SIGNER_DOCUMENT_NESTED]: AuthorizedSignerDocumentRenderer
};
