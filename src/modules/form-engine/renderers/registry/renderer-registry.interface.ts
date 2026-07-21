import type React from 'react';

import type { FieldType } from '../../enums';
import type { BaseFieldProps } from '../../components/fields';

export type RendererRegistry = Partial<Record<FieldType, React.ComponentType<BaseFieldProps>>>;
