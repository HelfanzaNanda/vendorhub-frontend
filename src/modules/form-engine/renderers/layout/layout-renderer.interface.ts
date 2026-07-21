import type React from 'react';

import type { FormLayout } from '../../enums';

export interface LayoutComponentProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  props?: Record<string, unknown>;
}

export interface LayoutRendererProps extends LayoutComponentProps {
  layout: FormLayout;
}
