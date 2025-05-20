import { useState } from 'react'

import { AlarmType } from '@types'

import { useAlarmReadMutation, useGetAlarmMutation } from './query'
import { useUnreadPush } from './query/useUnreadPushMutation'

export function useAlarm(getAlarmCnt: () => void) {
  const [alarms, setAlarms] = useState<AlarmType[]>([])
  const { mutate: getAlarm, isPending: isLoading } = useGetAlarmMutation({
    setAlarms
  })
  const { mutate: setAlarmRead } = useAlarmReadMutation(setAlarms, getAlarmCnt)

  const handleGetAlarm = () => {
    getAlarm()
  }

  const handleSetAlarmRead = (pushNotificationHistorySeq?: number) => {
    setAlarmRead(pushNotificationHistorySeq)
    getAlarmCnt()
  }

  return {
    alarms,
    handleGetAlarm,
    isLoading,
    handleSetAlarmRead
  }
}

export function useAlarmCnt() {
  const [alarmCnt, setAlarmCnt] = useState(0)
  const { mutate: getAlarmCnt } = useUnreadPush({ setAlarmCnt })

  // useEffect(() => {
  //   getAlarmCnt()
  // }, [])
  return { alarmCnt, getAlarmCnt }
}
