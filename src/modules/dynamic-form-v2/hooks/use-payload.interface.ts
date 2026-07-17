import type { FormSchema } from '../interfaces';

export interface UsePayloadOptions {
  schema?: FormSchema;
}

export interface UsePayloadResult {
  build: () => Record<string, unknown>;
  buildDraft: () => Record<string, unknown>;
  buildSubmit: () => Record<string, unknown>;
  buildSection: (sectionId: string) => Record<string, unknown>;
  buildField: (fieldPath: string) => unknown;
}
