import React from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className='relative w-full'>
        <input
          {...props}
          ref={ref}
          className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground peer flex h-12 w-full rounded-md border px-3 py-2 text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 ${error ? 'border-red-500 focus-visible:ring-red-500' : ''} ${className}`}
          placeholder=' '
        />
        {label && (
          <label
            className={`text-muted-foreground peer-focus:bg-background peer-[:not(:placeholder-shown)]:bg-background absolute left-3 top-3 bg-background-primary px-1 text-base transition-all duration-200 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 ${error ? 'peer-focus:text-red-500' : ''}`}
          >
            {label}
          </label>
        )}
        {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
      </div>
    )
  }
)

InputField.displayName = 'InputField'

export default InputField
