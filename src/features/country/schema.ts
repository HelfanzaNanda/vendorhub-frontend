import { z } from 'zod'

export const countrySchema = z.object({
  name: z.string().min(2, 'Country Name must be at least 2 characters'),
  iso2Code: z.string().min(2, 'ISO Code must be at least 2 characters').max(2, 'ISO Code must be 2 characters').toUpperCase(),
  phoneCode: z.string().min(2, 'Phone Code must be at least 2 characters').optional().or(z.literal('')), // Supports empty string or optional value
})

export type CountryFormInput = z.infer<typeof countrySchema>
