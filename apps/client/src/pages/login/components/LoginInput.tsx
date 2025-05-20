import React, { InputHTMLAttributes, useState } from 'react'

import CustomIcons from '@components/common/CustomIcons'

interface LoginInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setValue: (value: string) => void
  placeholder: string
  icon: React.ReactNode
}
export default function LoginInput({
  onChange,
  value,
  placeholder,
  setValue,
  icon,
  ...props
}: LoginInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const handleClear = () => {
    setValue('')
  }

  return (
    <div className='w-full'>
      <div
        className={`relative flex items-center p-4 bg-white text-base rounded-lg border-2 ${isFocused || value ? 'border-aicfo' : 'border-gray-300'}`}
      >
        <div className='flex items-center mr-3'>{icon}</div>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type={
            props.type === 'password'
              ? isPasswordVisible
                ? 'text'
                : 'password'
              : 'text'
          }
          className='flex-grow bg-transparent outline-none text-gray-700'
          placeholder={placeholder}
          tabIndex={1}
        />

        {value && (
          <>
            {props.type === 'password' && (
              <button
                type='button'
                tabIndex={-1}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <CustomIcons name='eye_closed' className='text-gray-500' />
                ) : (
                  <CustomIcons name='eye_open' className='text-gray-500' />
                )}
              </button>
            )}
            <button
              type='button'
              onClick={handleClear}
              className={`flex items-center justify-center ml-2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300`}
              tabIndex={-2}
            >
              <CustomIcons name='close' className='text-gray-500' />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
