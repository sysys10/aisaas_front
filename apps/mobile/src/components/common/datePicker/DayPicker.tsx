import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import React, { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'

import { Button } from '@packages/components'

import CustomIcons from '../CustomIcons'
import './datepicker.css'

export interface CustomInputProps {
  value?: any
  onClick?: () => void
}

export interface RenderHeaderProps {
  date: Date
  decreaseMonth: () => void
  increaseMonth: () => void
}

export interface DatePickerBaseProps {
  onClose: (date: string) => void
  initialDate: Date,
  openedReportName?: string
}

const DayPicker = ({ onClose, initialDate, openedReportName }: DatePickerBaseProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)
  const [finalDate, setFinalDate] = useState<Date>(initialDate)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const calRef = useRef<DatePicker>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  console.log('openedReportName: ', openedReportName)
  const today = openedReportName === '일일시재마감' ? new Date(new Date().setDate(new Date().getHours() < 18 ? new Date().getDate() - 1 : new Date().getDate())) : new Date(new Date().setDate(new Date().getDate() - 1))
  useEffect(() => {
    setSelectedDate(ele => ele = initialDate)
    setFinalDate(ele => ele = initialDate)
  }, [openedReportName])

  const formatDisplayDate = (date: Date): JSX.Element => {
    return (
      <p className='flex items-center justify-between px-1'>
        {`${format(date, 'yyyy년 M월 d일(E)', { locale: ko })}`}
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

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
  }

  const handleConfirm = () => {
    setFinalDate(selectedDate)
    console.log('selectedDate: ', selectedDate)
    console.log('finalDate: ', finalDate)
    onClose(format(selectedDate, 'yyyy-MM-dd', { locale: ko }))
    closeBottomSheet()
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
        value: formatDisplayDate(finalDate),
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
                selected={selectedDate}
                maxDate={today}
                onChange={(date: Date | null) => handleDateSelect(date as Date)}
                dateFormat='yyyy년 M월 d일 (E)'
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
                shouldCloseOnSelect={false}
                calendarClassName='w-full border-none'
              />

              <div className='px-2 py-4'>
                <Button
                  size='xl'
                  variant='filled'
                  onClick={handleConfirm}
                  className='w-full'
                >
                  {format(selectedDate, 'yyyy년 M월 d일(E)', {
                    locale: ko
                  })}{' '}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DayPicker
