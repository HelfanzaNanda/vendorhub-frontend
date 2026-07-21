import type React from 'react';

import type { FormLayout } from '../../enums';
import type { LayoutComponentProps } from '../layout/layout-renderer.interface';

export type LayoutRegistry = Record<FormLayout, React.ComponentType<LayoutComponentProps>>;
