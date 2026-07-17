import type { FieldSchema, DependencySchema } from '../interfaces';

export interface UseDependencyOptions {
  field?: FieldSchema;
  fieldPath?: string;
}

export interface UseDependencyResult {
  parentValue: any;
  hasDependency: boolean;
  dependency: DependencySchema | undefined;
  refresh: () => void;
}
