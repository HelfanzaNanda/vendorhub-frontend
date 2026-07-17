export interface ValidationSchema {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  regexCode?: string;
  message?: string;
}
