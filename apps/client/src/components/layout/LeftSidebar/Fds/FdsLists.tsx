import { SidebarContent } from '@constants'
import { useCallback, useEffect, useRef, useState } from 'react'

import CustomDatePicker from '@components/common/datePicker/DatePicker'
import { Skeleton } from '@components/ui/skeleton/Skeleton'

import { useFdsLists } from '@hooks/useFds'

import FdsItem from './FdsItem'
import FinancialSettingsModal from './components/FdsSettingModal'
import { useFdsSetting } from './components/FdsSettingModal/hooks/useFdsSetting'
import CustomIcons from '@components/common/CustomIcons'

export function FdsLists({
  sidebarContent,
  getFdsAlarmCnt
}: {
  sidebarContent: SidebarContent
  getFdsAlarmCnt: () => void
}) {
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver | null>(null)
  // undefined로 변경하여 string | undefined 타입 호환
  const [startDate, setStartDate] = useState<string | undefined>(undefined)
  const [endDate, setEndDate] = useState<string | undefined>(undefined)

  const {
    fdsLists,
    isLoading,
    isFetchingNextPage,
    handleSetAlarmRead,
    handleGetFdsLists,
    handleDeleteAlarm
  } = useFdsLists(getFdsAlarmCnt)

  // 첫 페이지 로드
  useEffect(() => {
    if (sidebarContent === 'fds') {
      setPage(1)
      setHasMore(true)
      handleGetFdsLists({
        page: 1,
        startDate,
        endDate
      })
    }
  }, [sidebarContent, startDate, endDate])

  // 무한 스크롤을 위한 observer 설정
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1)
          }
        },
        { threshold: 0.5 }
      )

      if (node) observer.current.observe(node)
    },
    [isLoading, isFetchingNextPage, hasMore]
  )

  // 페이지 변경 시 추가 데이터 로드
  useEffect(() => {
    if (page > 1 && hasMore && sidebarContent === 'fds') {
      loadMoreData()
    }
  }, [page])

  const loadMoreData = async () => {
    try {
      // Promise 타입으로 반환하도록 수정
      const result = await handleGetFdsLists({
        page,
        startDate,
        endDate,
        appendData: true
      })

      // API 반환 데이터가 배열인지 확인 후 길이 체크
      if (Array.isArray(result) && result.length < 50) {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Failed to load more data:', error)
    }
  }

  const handleDatePickerClose = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate)
    setEndDate(newEndDate)
    setPage(1)
    setHasMore(true)
    handleGetFdsLists({
      startDate: newStartDate,
      endDate: newEndDate,
      page: 1
    })
  }

  const [isOpen, setIsOpen] = useState(false)
  const { fdsAmount, fdsTime, getFdsSetting, isPending, isSavingTime, saveFdsSetting, isSaving, saveFdsTime } =
    useFdsSetting()
  
  const handleClickSetAmount = () => {
    getFdsSetting()
    !isPending && setIsOpen(true)
  }
  
  return (
    <>
      <FinancialSettingsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fdsAmount={fdsAmount}
        fdsTime={fdsTime}
        isPending={isPending}
        saveFdsSetting={saveFdsSetting}
        saveFdsTime={saveFdsTime}
        isSaving={isSaving || isSavingTime}
      />
      <div className='w-full px-3'>
        <div className='flex px-3 py-2 shrink-0 bg-background-secondary items-center justify-between rounded-lg tracking-tight text-sm text-aicfo w-full'>
          이상거래 내역
          <button
            className='flex justify-end items-center'
            onClick={handleClickSetAmount}
          >
            <span className='text-gray-500 text-sm mr-1'>설정</span>
            <CustomIcons name='normalSetting' className='w-fit' />
          </button>
        </div>
      </div>
      <div className='w-full space-y-2 pt-1 px-1 h-full flex flex-col'>
        <div>
          <CustomDatePicker onClose={handleDatePickerClose} />
        </div>
        <div
          style={{ scrollbarWidth: 'none', flex: '1 1 0' }}
          className='overflow-y-auto space-y-1 px-1'
        >
          {isLoading && page === 1 && (
            <>
              <Skeleton className='w-full h-16' />
              <Skeleton className='w-full h-16' />
              <Skeleton className='w-full h-16' />
            </>
          )}
          {fdsLists && fdsLists.length > 0 ? (
            <>
              {fdsLists.map((alarm, index) => (
                <div
                  key={`${alarm.pushNotificationHistorySeq}-${index}`}
                  ref={index === fdsLists.length - 1 ? lastItemRef : null}
                >
                  <FdsItem
                    alarm={alarm}
                    onClick={() =>{
                      if(alarm.useReadYn=='N'){
                        handleSetAlarmRead(alarm.pushNotificationHistorySeq)
                      }
                    }}
                    onDeleteClick={() =>
                      handleDeleteAlarm(alarm.pushNotificationHistorySeq)
                    }
                  />
                </div>
              ))}
            </>
          ) : !isLoading ? (
            <div className='flex items-center justify-center h-full'>
              <p className='text-xs text-gray-400'>이상거래 알림이 없습니다.</p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
