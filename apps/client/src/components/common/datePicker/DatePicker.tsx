import { format, isSameDay, isWithinInterval } from 'date-fns'
import { ko } from 'date-fns/locale'
import React, { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'

import { Button } from '@packages/components'

import CustomIcons from '../CustomIcons'
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

function handleIsSameDate(date: Date | null, date2: Date | null) {
  if (!date || !date2) return false
  return isSameDay(date, date2)
}

interface CustomDatePickerProps {
  onClose: (startDate: string, endDate: string) => void
  initialDate?: [Date | null, Date | null]
}

const CustomDatePicker = ({
  onClose,
  initialDate = [null, null]
}: CustomDatePickerProps) => {
  const [dateRange, setDateRange] =
    useState<[Date | null, Date | null]>(initialDate)
  const [startDate, endDate] = dateRange
  const [finalRange, setFinalRange] =
    useState<[Date | null, Date | null]>(initialDate)
  const today = new Date()

  const calRef = useRef<DatePicker>(null)

  const formatDateRange = (
    start: Date | null,
    end: Date | null
  ): JSX.Element | string => {
    if (!start || !end) return ''
    return (
      <p className='flex items-center w-fit gap-2 px-1'>
        {`${format(start, 'yyyy년 M/d(E)', { locale: ko })} - ${format(end, 'M/d(E)', { locale: ko })}`}
      </p>
    )
  }

  const renderCustomInput = ({
    value,
    onClick
  }: CustomInputProps): JSX.Element => (
    <button
      className='min-w-[19rem] mt-1 justify-between ml-2 p-2 text-center flex items-center bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
      onClick={onClick}
    >
      {value ? value : '전체기간'}
      <CustomIcons name='calendar' />
    </button>
  )

  const handleRangeSelect = (dates: [Date | null, Date | null]) => {
    setDateRange(dates)
  }

  const handleConfirm = () => {
    if (startDate && endDate) {
      setFinalRange([startDate, endDate])
      onClose(format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd'))
      calRef.current?.setOpen(false)
    }
  }

  return (
    <div className='w-full relative'>
      <DatePicker
        ref={calRef}
        selected={startDate}
        onChange={handleRangeSelect}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        maxDate={today}
        dateFormat='yyyy년 M월 d일 (E)'
        locale={ko}
        customInput={renderCustomInput({
          value: formatDateRange(finalRange[0], finalRange[1]) as string
        })}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth
        }: RenderHeaderProps) => (
          <div className='flex justify-between bg-white'>
            <button onClick={decreaseMonth} className='p-1'>
              &lt;
            </button>
            <span className='text-base font-medium'>
              {format(date, 'yyyy년 M월', { locale: ko })}
            </span>
            <button onClick={increaseMonth} className='p-1'>
              &gt;
            </button>
          </div>
        )}
        renderDayContents={(day: number, date: Date) => {
          return (
            <div
              className={`w-full h-full text-center ${
                handleIsSameDate(date, startDate) &&
                'bg-[#4f63d2]/10 rounded-l-full'
              } ${handleIsSameDate(date, endDate) && 'bg-[#4f63d2]/10 rounded-r-full'}`}
            >
              <div>{date.getDate()}</div>
            </div>
          )
        }}
        dayClassName={(date: Date) => {
          const isInRange =
            startDate &&
            endDate &&
            isWithinInterval(date, { start: startDate, end: endDate })
          return `${isInRange ? 'bg-[rgba(79,99,210,0.1)]' : 'bg-white'}`
        }}
        shouldCloseOnSelect={false}
        popperClassName='border-none !z-50'
        calendarClassName='!translate-x-3 border-none w-full'
        wrapperClassName='w-full'
      >
        <div className='px-2 py-2'>
          <Button
            size='fds'
            variant='filled'
            onClick={handleConfirm}
            disabled={!startDate || !endDate}
          >
            {startDate && endDate
              ? `${format(startDate, 'yyyy년 M월 d일(E)', { locale: ko })} - ${format(endDate, 'M월 d일(E)', { locale: ko })}`
              : '날짜를 선택해주세요'}
          </Button>
        </div>
      </DatePicker>
    </div>
  )
}

export default CustomDatePicker
