import { z } from 'zod';
import { localCompanySchema } from './src/modules/vendors/schemas/local/company.schema';

const shape: Record<string, z.ZodTypeAny> = {};
localCompanySchema.sections.forEach((section) => {
  section.fields.forEach((field) => {
    if (field.validation) {
      shape[field.name] = field.validation;
    } else {
      let fieldSchema: z.ZodTypeAny;
      switch (field.type) {
        case 'number':
          fieldSchema = z.number();
          break;
        case 'checkbox':
        case 'switch':
          fieldSchema = z.boolean();
          break;
        case 'autocomplete':
        case 'select':
          fieldSchema = z.union([z.number(), z.string()]);
          break;
        case 'multi-select':
        case 'field-array':
          fieldSchema = z.array(z.any());
          break;
        case 'date':
        case 'file':
          fieldSchema = z.any();
          break;
        default:
          fieldSchema = z.string();
      }

      if (field.required && !field.disabled) {
        if (field.type === 'text' || field.type === 'textarea' || field.type === 'email' || field.type === 'phone' || field.type === 'currency' || field.type === 'percentage') {
          fieldSchema = z.string().min(1, 'This field is required');
        } else if (field.type === 'multi-select' || field.type === 'field-array') {
          fieldSchema = z.array(z.any()).min(1, 'This field is required');
        } else {
          fieldSchema = fieldSchema.nullable().refine((val) => val !== null && val !== undefined && val !== '', 'This field is required');
        }
      } else {
        if (field.type === 'autocomplete' || field.type === 'select' || field.type === 'date' || field.type === 'file' || field.type === 'number') {
          fieldSchema = fieldSchema.nullable().optional();
        } else {
          fieldSchema = fieldSchema.optional();
        }
      }

      shape[field.name] = fieldSchema;
    }
  });
});

const zodSchema = z.object(shape);

// Let's test countryId
console.log('Testing countryId with null:');
const res1 = zodSchema.safeParse({
  companyName: 'test',
  siteId: '1',
  businessTypeId: '2',
  address: 'Address',
  countryId: null, // this should fail with "This field is required"
  provinceId: 1,
  cityId: 1,
});

if (!res1.success) {
  console.log(res1.error.issues.filter(i => i.path[0] === 'countryId'));
}

console.log('Testing countryId with number:');
const res2 = zodSchema.safeParse({
  companyName: 'test',
  siteId: '1',
  businessTypeId: '2',
  address: 'Address',
  countryId: 123,
  provinceId: 1,
  cityId: 1,
});

if (!res2.success) {
  console.log(res2.error.issues.filter(i => i.path[0] === 'countryId'));
} else {
  console.log("Success with number!");
}

console.log('Testing provinceId with string:');
const res3 = zodSchema.safeParse({
  companyName: 'test',
  siteId: '1',
  businessTypeId: '2',
  address: 'Address',
  countryId: 123,
  provinceId: '456',
  cityId: 1,
});
if (!res3.success) {
  console.log(res3.error.issues.filter(i => i.path[0] === 'provinceId'));
} else {
  console.log("Success with string!");
}
