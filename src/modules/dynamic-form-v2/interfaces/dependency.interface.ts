export interface DependencySchema {
  parent: string;
  clearOnChange?: boolean;
  disableWhenEmpty?: boolean;
  params?: Record<string, unknown>;
}
