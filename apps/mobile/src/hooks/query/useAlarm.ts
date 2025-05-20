import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { getAlarm } from '@packages/apis'
import { AlarmResponse, AlarmType } from '@packages/apis/types'

interface useAlarmProps {
  setAlarms: (alarms: AlarmType[]) => void
}
const useGetAlarm = ({ setAlarms }: useAlarmProps) => {
  return useMutation({
    mutationFn: getAlarm,
    onSuccess: (data: AlarmResponse) => {
      if (data.success) {
        setAlarms(data.body.data)
      } else {
        alert('알림 조회 실패')
      }
    }
  })
}

const useAlarmQuery = () => {
  const [alarms, setAlarms] = useState<AlarmType[]>([])
  const { mutate: getAlarm } = useGetAlarm({ setAlarms })
  useEffect(() => {
    getAlarm()
  }, [])
  return {
    alarms
  }
}
export default useAlarmQuery
