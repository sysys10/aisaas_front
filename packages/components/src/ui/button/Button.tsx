import { type VariantProps, cva } from 'class-variance-authority'
import { ReactNode, forwardRef } from 'react'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-background-disabled disabled:text-background-secondary',
  {
    variants: {
      variant: {
        filled: 'bg-aicfo text-white',
        default:
          'bg-background-primary text-secondary border border-border hover:bg-background-primary-accent',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'bg-background-tertiary text-secondary'
      },
      size: {
        default: 'px-4 py-2',
        xs: 'px-3 py-1 w-fit rounded-md text-sm',
        sm: 'px-4 py-2 w-fit rounded-lg',
        md: 'text-lg px-16 py-2 rounded-xl',
        lg: 'text-lg w-1/2 py-3 px-5 rounded-xl',
        xl: 'w-full py-3 px-5 rounded-lg text-base',
        fds: 'w-full py-3 px-5 rounded-lg text-sm',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: 'filled' | 'default' | 'destructive' | 'outline'
  size?: 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon' | 'fds'
  loading?: boolean
}

const Loader = () => {
  return <div>로딩중...</div>
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, children, loading, ...props },
    ref
  ): ReactNode => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? <Loader /> : children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
