'use client'

import { useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, Button, IconButton, InputAdornment, Typography, CircularProgress } from '@mui/material'

import Link from '@/components/Link'
import { loginSchema } from '../schema'
import type { LoginInput } from '../schema'
import { useLogin } from '../hooks'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { mutate: login, isPending } = useLogin()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginInput) => {
    login(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <Controller
        name='username'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            autoFocus
            fullWidth
            label='Username'
            error={!!errors.username}
            helperText={errors.username?.message}
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

      <Button
        fullWidth
        variant='contained'
        type='submit'
        disabled={isPending}
        sx={{ minHeight: '42px' }}
      >
        {isPending ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
      </Button>

      <div className='flex justify-center items-center flex-wrap gap-2'>
        <Typography>New on our platform?</Typography>
        <Typography component={Link} href='/register' color='primary.main'>
          Create an account
        </Typography>
      </div>
    </form>
  )
}
