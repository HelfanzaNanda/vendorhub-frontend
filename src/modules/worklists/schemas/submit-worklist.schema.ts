import { z } from 'zod';

export const submitWorklistSchema = z.object({
  status: z.enum(['APPROVE', 'REJECT', 'REVISE'], {
    required_error: 'Status is required',
  }),
  vendorCategoryId: z.any().optional(),
  vendorCategoryItemId: z.any().optional(),
  priority: z.enum(['VIP', 'NON_VIP']).optional().default('NON_VIP'),
  remarks: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.status === 'APPROVE') {
    if (!data.vendorCategoryId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Vendor Category is required',
        path: ['vendorCategoryId'],
      });
    }
    if (!data.vendorCategoryItemId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Vendor Category Item is required',
        path: ['vendorCategoryItemId'],
      });
    }
    if (!data.priority) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Priority is required',
        path: ['priority'],
      });
    }
  }

  if ((data.status === 'REJECT' || data.status === 'REVISE') && !data.remarks?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Remarks is required',
      path: ['remarks'],
    });
  }
});

export type SubmitWorklistFormData = z.infer<typeof submitWorklistSchema>;
