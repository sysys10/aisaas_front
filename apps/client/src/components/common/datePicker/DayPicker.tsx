import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import React, { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'

import CustomIcons from '@components/common/CustomIcons'

import {
  CustomInputProps,
  DatePickerBaseProps,
  RenderHeaderProps
} from '@types'

import { Button } from '@packages/components'

import './datepicker.css'
import { useEffect } from 'react'

const DayPicker = ({ onClose, initialDate, openedReportName, menuClickTrigger }: DatePickerBaseProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)
  const [finalDate, setFinalDate] = useState<Date>(initialDate)
  const calRef = useRef<DatePicker>(null)
  // 당일 일자 선택 불가
  const today = openedReportName === '일일시재마감' ? new Date(new Date().setDate(new Date().getHours() < 18 ? new Date().getDate() - 1 : new Date().getDate())) : new Date(new Date().setDate(new Date().getDate() - 1))
  const formatDisplayDate = (date: Date): JSX.Element => {
    return (
      <p className='flex items-center justify-between px-1'>
        {`${format(date, 'yyyy년 M월 d일(E)', { locale: ko })}`}
      </p>
    )
  }

  useEffect(() => {
    setSelectedDate(prev => prev = initialDate)
    setFinalDate(prev => prev = initialDate)
  }, [menuClickTrigger])

  const renderCustomInput = ({
    value,
    onClick
  }: CustomInputProps): JSX.Element => (
    <button
      className='!text-sm w-fit p-2 text-left flex items-center justify-center gap-2 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
      onClick={onClick}
    >
      {value}
      <CustomIcons name='calendar' className='w-4 h-4' />
    </button>
  )

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleConfirm = () => {
    setFinalDate(selectedDate)
    onClose(format(selectedDate, 'yyyy-MM-dd', { locale: ko }))
    calRef.current?.setOpen(false)
  }

  return (
    <div className='w-full'>
      <DatePicker
        ref={calRef}
        selected={selectedDate}
        onChange={(date: Date | null) => handleDateSelect(date as Date)}
        dateFormat='yyyy년 M월 d일 (E)'
        maxDate={today}
        customInput={renderCustomInput({
          value: formatDisplayDate(finalDate),
          onClick: () => calRef.current?.setOpen(true)
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
        shouldCloseOnSelect={false}
        popperClassName='border-none'
        calendarClassName='border-none w-full'
        wrapperClassName='w-full'
      >
        <div className='px-2 py-2'>
          <Button size='xl' variant='filled' onClick={handleConfirm}>
            {format(selectedDate, 'yyyy년 M월 d일(E)', { locale: ko })}
          </Button>
        </div>
      </DatePicker>
    </div>
  )
}
export default DayPicker
