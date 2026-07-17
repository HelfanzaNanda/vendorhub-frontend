import type { FieldSchema } from '@/modules/dynamic-form-v2/interfaces';
import { hiddenField } from '../field';
import type { FieldBuilderOptions } from '../interfaces';

export type SystemFieldOptions = Partial<Omit<FieldBuilderOptions, 'type' | 'grid'>>;

export const idField = (options?: SystemFieldOptions): FieldSchema => {
  return hiddenField({
    id: 'id',
    name: 'id',
    code: 'id',
    label: 'ID',
    ...options,
  });
};

export const uuidField = (options?: SystemFieldOptions): FieldSchema => {
  return hiddenField({
    id: 'uuid',
    name: 'uuid',
    code: 'uuid',
    label: 'UUID',
    ...options,
  });
};

export const createdAtField = (options?: SystemFieldOptions): FieldSchema => {
  return hiddenField({
    id: 'createdAt',
    name: 'createdAt',
    code: 'createdAt',
    label: 'Created At',
    ...options,
  });
};

export const updatedAtField = (options?: SystemFieldOptions): FieldSchema => {
  return hiddenField({
    id: 'updatedAt',
    name: 'updatedAt',
    code: 'updatedAt',
    label: 'Updated At',
    ...options,
  });
};

export const deletedAtField = (options?: SystemFieldOptions): FieldSchema => {
  return hiddenField({
    id: 'deletedAt',
    name: 'deletedAt',
    code: 'deletedAt',
    label: 'Deleted At',
    ...options,
  });
};

export const versionField = (options?: SystemFieldOptions): FieldSchema => {
  return hiddenField({
    id: 'version',
    name: 'version',
    code: 'version',
    label: 'Version',
    ...options,
  });
};
