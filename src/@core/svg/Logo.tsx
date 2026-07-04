// React Imports
import type { SVGAttributes } from 'react'

const Logo = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M4 4L11.5 24C11.9 25.1 12.8 25.8 13.9 25.8C15 25.8 15.9 25.1 16.3 24L23.8 4H18.5L13.9 18.5L9.3 4H4Z'
        fill='var(--mui-palette-primary-main)'
      />
      <path
        d='M22.5 15H29.5'
        stroke='var(--mui-palette-primary-main)'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <path
        d='M22.5 6V24'
        stroke='var(--mui-palette-primary-main)'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <path
        d='M29.5 6V24'
        stroke='var(--mui-palette-primary-main)'
        strokeWidth='3'
        strokeLinecap='round'
      />
    </svg>
  )
}

export default Logo
