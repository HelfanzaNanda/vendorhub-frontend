export interface DependencySchema {
  parent: string;
  clearOnChange?: boolean;
  params?: Record<string, unknown>;
}
