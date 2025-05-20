import { useState } from 'react'

import { AlarmType } from '@types'

import { useAlarmReadMutation, useGetAlarmMutation } from './query'

export function useAlarm() {
  const [alarms, setAlarms] = useState<AlarmType[]>([])
  const { mutate: getAlarm, isPending: isLoading } = useGetAlarmMutation({
    setAlarms
  })
  const { mutate: setAlarmRead } = useAlarmReadMutation(setAlarms, getAlarm)

  const handleGetAlarm = () => {
    getAlarm()
  }

  const handleSetAlarmRead = (pushNotificationHistorySeq?: number) => {
    setAlarmRead(pushNotificationHistorySeq)
  }

  return {
    alarms,
    handleGetAlarm,
    isLoading,
    handleSetAlarmRead
  }
}

// export function useAlarmCnt() {
//   const { alarmCnt, setAlarmCnt } = useAlarmStore()
//   const { mutate: getAlarmCnt } = useUnreadPush({ setAlarmCnt })

//   useEffect(() => {
//     getAlarmCnt()
//   }, [])
//   return { alarmCnt }
// }
