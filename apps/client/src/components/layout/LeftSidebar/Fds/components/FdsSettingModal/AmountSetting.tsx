import { useEffect, useState } from 'react'

import { MIN_AMOUNT } from './constants'
import { formatAmount } from './utils'

const AmountSetting = ({
  title,
  subtitle,
  amount,
  unit,
  isEditable,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onAmountChange,
  isAmountAlertEnabled,
  disabled = false
}: {
  title: string
  subtitle: string
  amount: number
  unit: string
  isEditable: boolean
  isEditing: boolean
  onEdit: () => void
  onSave: () => void
  onCancel: () => void
  onAmountChange: (value: number) => void
  isAmountAlertEnabled: boolean
  disabled?: boolean
}) => {
  const [inputValue, setInputValue] = useState(amount.toString())
  const [error, setError] = useState('')

  useEffect(() => {
    setInputValue(amount.toString())
  }, [amount])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '')
    setInputValue(value)

    const numValue = Number(value) || 0

    if (numValue < MIN_AMOUNT && numValue !== 0) {
      setError('1천만원 이상 입력해주세요')
    } else {
      setError('')
    }

    onAmountChange(numValue)
  }

  const canSave = !error && Number(inputValue) >= MIN_AMOUNT

  return (
    <div className='bg-gray-100 p-4 rounded-lg my-4'>
      <div className='flex justify-between mb-4'>
        <div>
          <p className='text-sm text-gray-700'>{title}</p>
          <p className='text-sm text-gray-700'>{subtitle}</p>
        </div>
        {isEditable ? (
          isEditing ? (
            <div className='space-x-2'>
              <button
                className={`text-blue-600 text-sm ${!canSave || disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={canSave && !disabled ? onSave : undefined}
              >
                저장
              </button>
              <button
                className={`text-gray-500 text-sm ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={disabled ? undefined : onCancel}
              >
                취소
              </button>
            </div>
          ) : (
            <button
              className={`text-blue-600 text-sm ${disabled || !isAmountAlertEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                !disabled && isAmountAlertEnabled && onEdit()
              }}
            >
              수정
            </button>
          )
        ) : null}
      </div>
      {isEditing ? (
        <div className='flex flex-col'>
          <div className='flex justify-end items-center relative'>
            <input
              type='text'
              className={`text-2xl text-right font-bold w-full bg-transparent outline-none mr-6 ${error ? 'text-red-500' : ''}`}
              value={inputValue}
              onChange={handleInputChange}
              autoFocus
              disabled={disabled}
            />
            <span className='text-gray-500 ml-2 absolute right-2'>{unit}</span>
          </div>
          {error && (
            <p className='text-right text-red-500 text-xs mt-1'>{error}</p>
          )}
        </div>
      ) : (
        <div className='flex justify-end items-center'>
          <p className='text-2xl font-bold'>{amount.toLocaleString()}</p>
          <span className='text-gray-500 ml-1'>{unit}</span>
        </div>
      )}
      <div className='text-right text-gray-500 text-sm'>
        {formatAmount(amount) + '원'}
      </div>
    </div>
  )
}
export default AmountSetting
