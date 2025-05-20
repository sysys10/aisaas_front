import { useGetVocDetail } from '@hooks'
import { useMemo } from 'react'

import CustomIcons from '@components/common/CustomIcons'
import { ModalPortal } from '@components/ui'
import { Skeleton } from '@components/ui/skeleton/Skeleton'

import { AlarmType } from '@types'

import { AlarmItem } from './AlarmItem'
import { AlarmResponse } from './AlarmResponse'

interface AlarmModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  alarms: AlarmType[]
  handleSetAlarmRead: (pushNotificationHistorySeq?: number | undefined) => void
  isLoading: boolean
}
export function AlarmModal({
  isOpen,
  setIsOpen,
  alarms,
  isLoading,
  handleSetAlarmRead
}: AlarmModalProps) {
  const handleAllAlarmRead = () => {
    handleSetAlarmRead()
  }
  const handleAlarmItemClick = (alarm: AlarmType) => {
    handleSetAlarmRead(alarm.pushNotificationHistorySeq)
  }
  const { vocDetail, getVoc, handleReset } = useGetVocDetail()
  return useMemo(() => {
    return (
      <ModalPortal
        height='full'
        size='sm'
        className='w-full left-full text-nowrap flex flex-col -translate-x-full px-0 top-0 rounded-none translate-y-0'
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
      >
        <div className='shadow-inset-b '>
          <div className='flex justify-between w-full px-6 pb-4'>
            <h1 className='text-[1.375rem] font-semibold'>알림</h1>
            <CustomIcons
              name='close'
              onClick={() => setIsOpen(false)}
              iconClassName='w-8 h-8 font-thin'
            />
          </div>
        </div>
        {vocDetail ? (
          <AlarmResponse vocDetail={vocDetail} handleReset={handleReset} />
        ) : (
          <>
            <div className='flex justify-between w-full px-6 pt-10 pb-2'>
              <h2 className='text-lg font-semibold'>알림 내역</h2>
              <button
                onClick={handleAllAlarmRead}
                className='text-aicfo text-sm'
              >
                모두 읽음
              </button>
            </div>
            <div className='flex flex-col overflow-y-auto'>
              {isLoading ? (
                <div className='flex flex-col gap-y-3 px-6 py-5'>
                  <Skeleton className='h-20' />
                  <Skeleton className='h-20' />
                  <Skeleton className='h-20 rounded-sm' />
                </div>
              ) : alarms.length > 0 ? (
                alarms?.map((v, i) => (
                  <AlarmItem
                    key={i}
                    v={v}
                    onClick={() => {
                      getVoc({ vocId: v.vocSeq || 0 })
                      handleAlarmItemClick(v)
                    }}
                  />
                ))
              ) : (
                <div className='text-center mt-10'>알림이 없습니다.</div>
              )}
            </div>
          </>
        )}
      </ModalPortal>
    )
  }, [vocDetail, alarms, isLoading, isOpen])
}
