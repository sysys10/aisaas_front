import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import React, { useRef, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'

import CustomIcons from '@components/common/CustomIcons'

import { Button } from '@packages/components'

import './datepicker.css'

interface CustomInputProps {
  value?: string
  onClick?: () => void
}

interface RenderHeaderProps {
  date: Date
  decreaseMonth: () => void
  increaseMonth: () => void
}

interface CustomDatePickerProps {
  onClose: (month: string) => void
  initialDate: Date,
  menuClickTrigger?: boolean,
}

const MonthPicker = ({ onClose, initialDate, menuClickTrigger }: CustomDatePickerProps) => {
  const [month, setMonth] = useState<Date>(initialDate)
  const calRef = useRef<DatePicker>(null)
  const today = new Date(new Date().setMonth(new Date().getMonth() - 1))

  const formatDateRange = (date: Date | null): any => {
    if (!date) return ''
    return (
      <div className='flex items-center w-fit gap-2 px-1 text-sm'>
        {format(date, 'yyyy년 M월', { locale: ko })}
        <CustomIcons name='calendar' className='w-4 h-4' />
      </div>
    )
  }

  const MONTH_NAMES = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ]

  const renderCustomInput = ({
    value,
    onClick
  }: CustomInputProps): JSX.Element => (
    <button
      className='!text-xs w-full p-2 px-4 bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
      onClick={onClick}
    >
      {value ? value : '전체기간'}
    </button>
  )

  const handleRangeSelect = (date: Date | null) => {
    if (!date) return
    setMonth(date)
  }

  const handleConfirm = () => {
    if (month) {
      const lastMonth = new Date(month.getFullYear(), month.getMonth(), 1)
      onClose(format(lastMonth, 'yyyy-MM-dd', { locale: ko }))
      calRef.current?.setOpen(false)
    }
  }

  useEffect(() => {
    setMonth(prev => prev = initialDate)
  }, [menuClickTrigger])

  return (
    <div className='w-fit'>
      <DatePicker
        ref={calRef}
        selected={month}
        onChange={(date) => handleRangeSelect(date as Date)}
        showMonthYearPicker
        dateFormat='yyyy년 M월'
        maxDate={today}
        customInput={renderCustomInput({
          value: formatDateRange(month)
        })}
        renderCustomHeader={({ date, decreaseYear, increaseYear }) => (
          <div className='flex justify-between bg-white px-3 py-1.5'>
            <span className='text-lg font-medium'>
              {format(date, 'yyyy년', { locale: ko })}
            </span>
            <div className='flex items-center gap-0.5 text-lg font-bold text-gray-500'>
              <button onClick={() => decreaseYear()} className='p-0.5'>
                {'<'}
              </button>
              <button onClick={() => increaseYear()} className='p-0.5'>
                {'>'}
              </button>
            </div>
          </div>
        )}
        renderMonthContent={(m) => (
          <div style={{ fontSize: '1rem' }}>{`${MONTH_NAMES[m]}`}</div>
        )}
        shouldCloseOnSelect={false}
        popperClassName='border-none'
        calendarClassName='border-none w-full'
        monthClassName={(date) =>
          date.getMonth() === month.getMonth()
            ? '!bg-[#4f63d2] !text-white'
            : ''
        }
        wrapperClassName='w-full'
      >
        <div className='py-2'>
          <Button
            size='xl'
            variant='filled'
            onClick={handleConfirm}
            disabled={!month}
            className='text-base'
          >
            {month
              ? `${format(month, 'yyyy년 M월', { locale: ko })}`
              : '월을 선택해주세요'}
          </Button>
        </div>
      </DatePicker>
    </div>
  )
}

export default MonthPicker
