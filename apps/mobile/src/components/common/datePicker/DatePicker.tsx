import { format, isSameDay, isWithinInterval } from 'date-fns'
import { ko } from 'date-fns/locale'
import React, { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'

import { Button } from '@packages/components'

import CustomIcons from '../CustomIcons'
import './datepicker.css'

interface CustomInputProps {
  value?: any
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
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const calRef = useRef<DatePicker>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  const formatDateRange = (
    start: Date | null,
    end: Date | null
  ): JSX.Element | string => {
    if (!start || !end) return '전체기간'
    return (
      <p className='flex items-center w-fit gap-2 px-1'>
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
    setDateRange(dates)
  }

  const handleConfirm = () => {
    if (startDate && endDate) {
      setFinalRange([startDate, endDate])
      onClose(format(startDate, 'yyyy-MM-dd'), format(endDate, 'yyyy-MM-dd'))
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
      {renderCustomInput({
        value: formatDateRange(finalRange[0], finalRange[1]),
        onClick: () => calRef.current?.setOpen(true)
      })}

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
                ref={calRef}
                selected={startDate}
                onChange={handleRangeSelect}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                dateFormat='yyyy년 M월 d일 (E)'
                locale={ko}
                inline
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
                renderDayContents={(day: number, date: Date) => {
                  return (
                    <div
                      className={`w-full h-full text-center flex items-center justify-center ${
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
                calendarClassName='w-full border-none'
              />

              <div className='px-2 py-4'>
                <Button
                  size='xl'
                  variant='filled'
                  onClick={handleConfirm}
                  className='w-full'
                  disabled={!startDate || !endDate}
                >
                  {startDate && endDate
                    ? `${format(startDate, 'yyyy년 M월 d일(E)', { locale: ko })} - ${format(endDate, 'M월 d일(E)', { locale: ko })}`
                    : '날짜를 선택해주세요'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomDatePicker
