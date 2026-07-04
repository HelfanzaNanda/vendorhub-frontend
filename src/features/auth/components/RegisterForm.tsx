'use client'

import { useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button, IconButton, InputAdornment, Typography, CircularProgress, Checkbox, FormControlLabel } from '@mui/material'

import Link from '@/components/Link'
import { registerSchema } from '../schema'
import type { RegisterInput } from '../schema'
import { useRegister } from '../hooks'

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { mutate: register, isPending } = useRegister()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: RegisterInput) => {
    register(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            autoFocus
            fullWidth
            label='Full Name'
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isPending}
          />
        )}
      />

      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label='Email'
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isPending}
          />
        )}
      />

      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label='Password'
            type={showPassword ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isPending}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      size='small'
                      edge='end'
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      disabled={isPending}
                    >
                      <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      <Controller
        name='confirmPassword'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label='Confirm Password'
            type={showConfirmPassword ? 'text' : 'password'}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            disabled={isPending}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      size='small'
                      edge='end'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      disabled={isPending}
                    >
                      <i className={showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      <div className='flex items-center gap-x-2'>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label={
            <Typography variant="body2">
              I agree to the{' '}
              <Typography component={Link} href="#" color='primary.main' variant="body2" sx={{ display: 'inline' }}>
                privacy policy & terms
              </Typography>
            </Typography>
          }
          disabled={isPending}
        />
      </div>

      <Button
        fullWidth
        variant='contained'
        type='submit'
        disabled={isPending}
        sx={{ minHeight: '42px' }}
      >
        {isPending ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
      </Button>

      <div className='flex justify-center items-center flex-wrap gap-2'>
        <Typography>Already have an account?</Typography>
        <Typography component={Link} href='/login' color='primary.main'>
          Sign in instead
        </Typography>
      </div>
    </form>
  )
}
