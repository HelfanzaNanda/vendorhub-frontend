// Next Imports
import type { Metadata } from 'next'

// Component Imports
import RegisterView from '@views/Register'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create an account on VendorHub'
}

const RegisterPage = async () => {
  // Vars
  const mode = await getServerMode()

  return <RegisterView mode={mode} />
}

export default RegisterPage
