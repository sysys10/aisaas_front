import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import React, { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'

import { Button } from '@packages/components'

import CustomIcons from '../CustomIcons'
import './datepicker.css'

interface CustomInputProps {
  value?: string | JSX.Element
  onClick?: () => void
}

interface RenderHeaderProps {
  date: Date
  decreaseMonth: () => void
  increaseMonth: () => void
}

interface CustomDatePickerProps {
  onClose: (month: string) => void
  initialDate: Date
}

const MonthPicker = ({ onClose, initialDate }: CustomDatePickerProps) => {
  const today = new Date(new Date().setMonth(new Date().getMonth() - 1))
  const [month, setMonth] = useState<Date>(initialDate)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const calRef = useRef<DatePicker>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  const formatDateRange = (date: Date | null): any => {
    if (!date) return ''
    return (
      <p className='flex items-center w-fit gap-2 px-1 text-sm'>
        {format(date, 'yyyy년 M월', { locale: ko })}
        {/* <CustomIcons name='calendar' className='w-4 h-4' /> */}
      </p>
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

  const handleRangeSelect = (date: Date | null) => {
    if (!date) return
    setMonth(date)
  }

  const handleConfirm = () => {
    if (month) {
      const lastMonth = new Date(month.getFullYear(), month.getMonth(), 1)
      console.log('자금월보 Month: ', month)
      onClose(format(lastMonth, 'yyyy-MM-dd', { locale: ko }))
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
    <div className='w-fit'>
      {/* 데이트피커 버튼 */}
      {renderCustomInput({
        value: formatDateRange(month)
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
            {/* 드래그 핸들 */}
            <div className='w-full flex justify-center py-2'>
              <div className='w-10 h-1 bg-gray-300 rounded-full'></div>
            </div>

            <div className='p-4'>
              <DatePicker
                inline
                selected={month}
                maxDate={today}
                onChange={(date) => handleRangeSelect(date as Date)}
                showMonthYearPicker
                dateFormat='yyyy년 M월'
                renderCustomHeader={({ date, decreaseYear, increaseYear }) => (
                  <div className='flex justify-between bg-white px-3 py-3'>
                    <span className='text-lg font-medium'>
                      {format(date, 'yyyy년', { locale: ko })}
                    </span>
                    <div className='flex items-center gap-2 text-lg font-bold text-gray-500'>
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
                calendarClassName='w-full border-none'
                monthClassName={(date) =>
                  date.getMonth() === month.getMonth()
                    ? '!bg-[#4f63d2] !text-white'
                    : ''
                }
              />

              <div className='px-2 py-4'>
                <Button
                  size='xl'
                  variant='filled'
                  onClick={handleConfirm}
                  disabled={!month}
                  className='w-full'
                >
                  {month
                    ? `${format(month, 'yyyy년 M월', { locale: ko })}`
                    : '월을 선택해주세요'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MonthPicker
