import { useState } from 'react'

import { AlarmType } from '@types'

import { useAlarmReadMutation, useDeleteAlarmMutation, useFdsQuery, useUnreadFdsPush } from './query'

export function useFdsAlarmCnt() {
  const [fdsAlarmCnt, setFdsAlarmCnt] = useState(0)
  const { mutate: getFdsAlarmCnt } = useUnreadFdsPush({ setFdsAlarmCnt })

  return { fdsAlarmCnt, getFdsAlarmCnt }
}

export function useFdsLists(getFdsAlarmCnt: () => void) {
  const [fdsLists, setFdsLists] = useState<AlarmType[]>([])
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)

  const { mutate: postAlarmRead, isPaused: isLoading } = useAlarmReadMutation(
    setFdsLists,
    getFdsAlarmCnt
  )

  const { mutate: deleteAlarm } = useDeleteAlarmMutation(
    setFdsLists,
    getFdsAlarmCnt
  )

  // 데이터 업데이트 핸들러 (추가 또는 교체)
  const handleFdsListsUpdate = (
    data: AlarmType[],
    appendData = false
  ): AlarmType[] => {
    if (appendData) {
      setFdsLists((prev) => [...prev, ...data])
    } else {
      setFdsLists(data)
    }
    setIsFetchingNextPage(false)
    return data
  }

  const { mutate: getFdsLists } = useFdsQuery({
    setFdsLists: handleFdsListsUpdate
  })

  const handleGetFdsLists = ({
    startDate,
    endDate,
    page,
    appendData = false
  }: {
    startDate?: string
    endDate?: string
    page: number
    appendData?: boolean
  }): Promise<AlarmType[]> => {
    if (appendData) {
      setIsFetchingNextPage(true)
    }

    // Promise로 감싸서 반환하여 결과를 기다릴 수 있게 함
    return new Promise((resolve) => {
      getFdsLists(
        {
          startDate,
          endDate,
          page,
          appendData
        },
        {
          onSuccess: (data) => {
            resolve(data)
          },
          onError: () => {
            setIsFetchingNextPage(false)
            resolve([])
          }
        }
      )
    })
  }

  const handleSetAlarmRead = (pushNotificationHistorySeq?: number) => {
    postAlarmRead(pushNotificationHistorySeq)
  }

  const handleDeleteAlarm = (pushNotificationHistorySeq?: number) => {
    console.log(pushNotificationHistorySeq)
    deleteAlarm(pushNotificationHistorySeq)
  }

  return {
    fdsLists,
    isLoading,
    isFetchingNextPage,
    handleGetFdsLists,
    handleSetAlarmRead,
    handleDeleteAlarm
  }
}
