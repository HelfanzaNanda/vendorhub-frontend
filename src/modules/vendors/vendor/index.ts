import { LocalVendorSchema } from './local/schemas/vendor-local.schema';

export * from './common';
export * from './local';
// export * from './foreign';
// export * from './individual';


export const VendorSchemas = {
  LOCAL: LocalVendorSchema,
//   FOREIGN: ForeignVendorSchema,
//   INDIVIDUAL: IndividualVendorSchema,
} as const;
