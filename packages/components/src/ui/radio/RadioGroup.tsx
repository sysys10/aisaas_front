import { cn } from '../../lib/utils'

interface RadioOption<T> {
  value: T
  label: string
}

interface RadioGroupProps<T> {
  options: RadioOption<T>[]
  value?: T | null
  onChange?: (value: T) => void
  name: string
  label?: string
  direction?: 'horizontal' | 'vertical'
  error?: string
  helperText?: string
  className?: string
  labelClassName?: string
}

export function RadioGroup<T>({
  options,
  value,
  onChange,
  name,
  label,
  direction = 'vertical',
  error,
  helperText,
  className,
  labelClassName
}: RadioGroupProps<T>) {
  return (
    <div className={cn('flex flex-col gap-2 items-start', className)}>
      {label && (
        <label className='text-sm font-medium text-primary'>{label}</label>
      )}
      <div
        className={cn(
          'flex gap-4',
          direction === 'vertical' ? 'flex-col' : 'flex-row'
        )}
      >
        {options.map((option) => (
          <label
            key={option.value as string}
            className={cn(
              'flex items-center gap-2 text-primary',
              labelClassName
            )}
          >
            <input
              type='radio'
              name={name}
              value={option.value as string}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value as T)}
              className={cn(
                'h-5 w-5 border-border accent-aicfo',
                'focus:outline-none',
                'disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-red-500'
              )}
            />
            {option.label}
          </label>
        ))}
      </div>
      {(error || helperText) && (
        <p
          className={cn(
            'text-xs',
            error ? 'text-red-500' : 'text-text-secondary'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  )
}
