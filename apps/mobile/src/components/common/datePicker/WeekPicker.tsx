import { endOfWeek, format, startOfWeek } from 'date-fns'
import { ko } from 'date-fns/locale'
import React, { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'

import { Button } from '@packages/components'

import CustomIcons from '../CustomIcons'
import './datepicker.css'

interface WeekPickerProps {
  onClose: (startDate: string, endDate: string) => void
  initialDate: Date
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

const WeekPicker = ({ onClose, initialDate }: WeekPickerProps) => {
  // 초기 날짜 범위 설정
  const [startEnd] = useState<[Date, Date]>(getWeekRange(initialDate))
  const [dateRange, setDateRange] =
    useState<[Date | null, Date | null]>(startEnd)
  const [startDate, endDate] = dateRange
  const [finalRange, setFinalRange] = useState<[Date, Date]>(startEnd)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const calRef = useRef<DatePicker>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  const formatWeekRange = (start: Date, end: Date): JSX.Element => {
    return (
      <p className='flex items-center justify-between px-1 text-sm'>
        {`${format(start, 'yyyy년 M월 d일(E)', { locale: ko })} - ${format(end, 'M월 d일(E)', { locale: ko })}`}
      </p>
    )
  }

  const renderCustomInput = ({
    value,
    onClick
  }: CustomInputProps): JSX.Element => (
    <button
      className='!text-base p-4 text-left flex w-full items-center justify-between gap-2 bg-[#F5F5F5] border border-[#D9D9D9] rounded-lg'
      onClick={() => {
        setIsOpen(true)
        onClick && onClick()
      }}
    >
      {value}
      <CustomIcons name='calendar' />
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
      closeBottomSheet()
    }
  }

  const closeBottomSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.classList.remove('translate-y-0')
      sheetRef.current.classList.add('translate-y-full')

      // 애니메이션 완료 후 모달 닫기
      setTimeout(() => {
        setIsOpen(false)
        calRef.current?.setOpen(false)
      }, 300)
    }
  }

  // 바깥 영역 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeBottomSheet()
    }
  }

  // 키보드 ESC 키 눌렀을 때 닫기
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeBottomSheet()
      }
    }

    window.addEventListener('keydown', handleEscKey)
    return () => window.removeEventListener('keydown', handleEscKey)
  }, [isOpen])

  // Bottom Sheet 열릴 때 애니메이션
  useEffect(() => {
    if (isOpen && sheetRef.current) {
      // 다음 프레임에서 애니메이션 적용
      requestAnimationFrame(() => {
        sheetRef.current?.classList.remove('translate-y-full')
        sheetRef.current?.classList.add('translate-y-0')
      })
    }
  }, [isOpen])

  // 열릴 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div className='w-full'>
      {/* 데이트피커 버튼 */}
      {renderCustomInput({
        value:
          startDate && endDate
            ? formatWeekRange(startDate, endDate)
            : formatWeekRange(finalRange[0], finalRange[1])
      })}

      {/* Bottom Sheet */}
      {isOpen && (
        <div
          className='fixed inset-0 z-50 bg-black/40 flex items-end justify-center'
          onClick={handleBackdropClick}
        >
          <div
            ref={sheetRef}
            className='w-full max-w-lg bg-white rounded-t-2xl transform translate-y-full transition-transform duration-300 ease-in-out'
            style={{ maxHeight: '90vh' }}
          >
            <div className='p-4'>
              <DatePicker
                inline
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                maxDate={finalRange[1]}
                onChange={handleRangeSelect}
                selectsRange
                dateFormat='yyyy년 M월 d일 (eee)'
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth
                }: RenderHeaderProps) => (
                  <div className='flex justify-between bg-white p-2'>
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
                      className={`w-full h-full text-center flex items-center justify-center ${
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
                calendarClassName='w-full border-none'
              />

              <div className='px-2 py-4'>
                <Button
                  size='xl'
                  onClick={handleConfirm}
                  className='w-full'
                  variant='filled'
                  disabled={!startDate || !endDate}
                >
                  {startDate && endDate
                    ? formatWeekRange(startDate, endDate)
                    : '날짜를 선택해주세요'}{' '}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WeekPicker
