import { AlarmResponse, AlarmType } from '@types'

import { deleteAlarm, getAlarm, setAlarmRead } from '@packages/apis'

import { createMutation } from './mutationUtils'

interface useAlarmProps {
  setAlarms: (alarms: AlarmType[]) => void
}

const useGetAlarmMutation = ({ setAlarms }: useAlarmProps) => {
  return createMutation<AlarmResponse, void>({
    mutationFn: getAlarm,
    onSuccess: (data: AlarmResponse) => {
      if (data.success) {
        setAlarms(data.body.data)
      }
    }
  })
}

const useDeleteAlarmMutation = (setAlarms: any, getAlarmCnt: () => void) => {
  return createMutation({
    mutationFn: deleteAlarm,
    onSuccess: (data, variables) => {
      if (data.success) {
        setAlarms((prev: AlarmType[]) =>
          prev.filter((alarm: AlarmType) => alarm.pushNotificationHistorySeq !== variables)
        )
        getAlarmCnt()
      }
    }
  })
}

const useAlarmReadMutation = (setAlarms: any, getAlarmCnt: () => void) => {
  return createMutation({
    mutationFn: setAlarmRead,
    onSuccess: (data, variables) => {
      if (data.success) {
        setAlarms((prev: any) =>
          prev.map((alarm: any) =>
            alarm.pushNotificationHistorySeq === variables
              ? { ...alarm, useReadYn: 'Y' }
              : alarm
          )
        )
        getAlarmCnt()
      }
    }
  })
}

export { useGetAlarmMutation, useAlarmReadMutation,useDeleteAlarmMutation }
