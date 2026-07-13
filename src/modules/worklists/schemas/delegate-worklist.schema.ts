import { z } from 'zod';

export const delegateWorklistSchema = z.object({
  delegateUserId: z.number({ required_error: 'Delegate User is required' }),
  reason: z.string({ required_error: 'Reason is required' }).min(1, 'Reason is required'),
});

export type DelegateWorklistFormData = z.infer<typeof delegateWorklistSchema>;
