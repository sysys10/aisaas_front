import { PropsWithChildren } from 'react'

import { cn } from '../../lib/utils'

interface ChipProps
  extends PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  variant?: 'default' | 'outlined' | 'filled'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  selected?: boolean
  disabled?: boolean
}

export function Chip({
  children,
  variant = 'default',
  size = 'md',
  selected = false,
  disabled = false,
  className,
  ...props
}: ChipProps) {
  const variantStyles = {
    default: 'bg-background-primary border border-border',
    outlined: 'border border-border hover:bg-background-gray',
    filled: 'bg-aicfo text-white hover:bg-aicfo-accent'
  }

  const sizeStyles = {
    xs: 'md:px-3 px-2 md:py-1.5 py-1 text-sm text-gray-400',
    sm: 'md:px-5 px-2.5 md:py-2 py-2 text-sm text-gray-400',
    md: 'md:px-5 px-2.5 md:py-4 py-2 text-base md:text-lg text-gray-400',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <div
      className={cn(
        'rounded-3xl inline-flex items-center justify-center gap-2 cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        selected && 'ring ring-blue-300',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
