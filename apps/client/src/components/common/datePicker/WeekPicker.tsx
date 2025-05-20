import { endOfWeek, format, startOfWeek } from 'date-fns'
import { ko } from 'date-fns/locale'
import React, { useRef, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'

import CustomIcons from '@components/common/CustomIcons'

import { Button } from '@packages/components'

import './datepicker.css'

interface WeekPickerProps {
  onClose: (startDate: string, endDate: string) => void
  initialDate: Date,
  menuClickTrigger?: boolean
}

interface CustomInputProps {
  value?: string | JSX.Element
  onClick?: () => void
}

interface RenderHeaderProps {
  date: Date
  decreaseMonth: () => void
  increaseMonth: () => void
}

const isSameDate = (date1: Date | null, date2: Date | null) => {
  if (!date1 || !date2) return false
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export const getWeekRange = (date: Date): [Date, Date] => {
  const monday = startOfWeek(date, { weekStartsOn: 1 })
  const sunday = endOfWeek(date, { weekStartsOn: 1 })
  return [monday, sunday]
}

const WeekPicker = ({ onClose, initialDate, menuClickTrigger }: WeekPickerProps) => {
  // 초기 날짜 범위 설정
  const [startEnd,  setStartEnd] = useState<[Date, Date]>(getWeekRange(initialDate))
  const [dateRange, setDateRange] =
    useState<[Date | null, Date | null]>(startEnd)
  const [startDate, endDate] = dateRange
  const [finalRange, setFinalRange] = useState<[Date, Date]>(startEnd)

  useEffect(() => {
    setStartEnd(prev => prev = getWeekRange(initialDate))
    setDateRange(prev => prev = getWeekRange(initialDate))
  }, [menuClickTrigger])

  const calRef = useRef<DatePicker>(null)

  const getKoreanWeekday = (date: Date) => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토']
    return weekdays[date.getDay()]
  }

  const formatWeekRange = (start: Date, end: Date): JSX.Element => {
    return (
      <p className='flex items-center justify-between px-1 text-sm'>
        {`${format(start, 'yyyy년 M월 d일(E)', { locale: ko })} - ${format(end, 'd일(E)', { locale: ko })}`}
      </p>
    )
  }

  const renderCustomInput = ({
    value,
    onClick
  }: CustomInputProps): JSX.Element => (
    <button
      className='!text-xs w-fit p-2 text-left flex items-center justify-center gap-1.5 bg-white border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500'
      onClick={onClick}
    >
      {value}
      <CustomIcons name='calendar' className='w-3.5 h-3.5' />
    </button>
  )

  const handleRangeSelect = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    if (start) {
      // 시작일이 선택되면 해당 주의 월-일 범위로 설정
      const [weekStart, weekEnd] = getWeekRange(start)
      setDateRange([weekStart, weekEnd])
    }
  }

  const handleConfirm = () => {
    if (startDate && endDate) {
      const [weekStart, weekEnd] = getWeekRange(startDate)
      setFinalRange([weekStart, weekEnd])
      onClose(
        format(weekStart, 'yyyy-MM-dd', { locale: ko }),
        format(weekEnd, 'yyyy-MM-dd', { locale: ko })
      )
      calRef.current?.setOpen(false)
    }
  }

  return (
    <div className='w-full'>
      <DatePicker
        ref={calRef}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        onChange={handleRangeSelect}
        selectsRange
        maxDate={finalRange[1]}
        dateFormat='yyyy년 M월 d일 (eee)'
        customInput={renderCustomInput({
          value:
            startDate && endDate
              ? formatWeekRange(startDate, endDate)
              : formatWeekRange(finalRange[0], finalRange[1])
        })}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth
        }: RenderHeaderProps) => (
          <div className='flex justify-between bg-white'>
            <button onClick={decreaseMonth} className='p-0.5'>
              &lt;
            </button>
            <span className='text-sm font-medium'>
              {date.getFullYear()}년 {date.getMonth() + 1}월
            </span>
            <button onClick={increaseMonth} className='p-0.5'>
              &gt;
            </button>
          </div>
        )}
        calendarStartDay={1}
        dayClassName={(date) => {
          if (!startDate) return 'bg-white'
          const [weekStart, weekEnd] = getWeekRange(startDate)
          const isInRange = date >= weekStart && date <= weekEnd
          const isEdge =
            date.getTime() === weekStart.getTime() ||
            date.getTime() === weekEnd.getTime()
          return isEdge
            ? 'bg-[#4f63d2]/10'
            : isInRange
              ? 'bg-[rgba(79,99,210,0.1)]'
              : 'bg-white'
        }}
        renderDayContents={(day: number, date: Date) => {
          const isEnd = isSameDate(date, endDate)
          const isStart = isSameDate(date, startDate)
          return (
            <div
              style={{ fontSize: '0.875rem' }}
              className={`w-full h-full text-center ${
                isEnd
                  ? 'bg-[#4f63d2]/10 rounded-r-full'
                  : isStart
                    ? 'bg-[#4f63d2]/10 rounded-l-full'
                    : ''
              }`}
            >
              <div>{format(date, 'd', { locale: ko })}</div>
            </div>
          )
        }}
        shouldCloseOnSelect={false}
        popperClassName='border-none !left-2'
        calendarClassName='border-none w-full'
        wrapperClassName='w-full'
      >
        <div className='px-1.5 py-1.5'>
          <Button
            size='xl'
            onClick={handleConfirm}
            className='w-full text-xs'
            variant='filled'
            disabled={!startDate || !endDate}
          >
            {startDate && endDate
              ? formatWeekRange(startDate, endDate)
              : '날짜를 선택해주세요'}{' '}
          </Button>
        </div>
      </DatePicker>
    </div>
  )
}

export default WeekPicker
