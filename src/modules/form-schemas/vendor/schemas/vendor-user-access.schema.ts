import { FormSchema } from '../../../dynamic-form-v2/interfaces';
import { FieldType, FormLayout } from '../../../dynamic-form-v2/enums';

export const vendorUserAccessSchema: FormSchema = {
  id: 'vendor-user-access',
  code: 'vendor-user-access',
  title: 'User Access',
  layout: FormLayout.CARD,
  sections: [
    {
      id: 'user-access-sec',
      code: 'user-access-sec',
      title: 'Account Verification',
      layout: FormLayout.CARD,
      fields: [
        {
          id: 'email',
          code: 'email',
          name: 'email',
          label: 'Email Address',
          type: FieldType.EMAIL,
          component: 'EMAIL_VERIFICATION',
          validation: { required: true },
          verification: {
            action: 'CHECK_EMAIL',
            required: true,
            otp: true
          }
        },
        {
          id: 'phone',
          code: 'phone',
          name: 'phone',
          label: 'Phone Number',
          type: FieldType.PHONE,
          component: 'PHONE_VERIFICATION',
          validation: { required: true },
          verification: {
            action: 'CHECK_PHONE',
            required: true,
            otp: true
          }
        }
      ]
    }
  ]
};