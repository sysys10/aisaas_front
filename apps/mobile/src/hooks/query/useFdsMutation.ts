import { AlarmType } from '@types'

import { GetAlarmCountResponse, getFdsCount, getFdsList } from '@packages/apis'

import { createMutation } from './mutationUtils'

export const useFdsQuery = ({
  setFdsLists
}: {
  setFdsLists: (data: AlarmType[]) => void
}) => {
  return createMutation<
    AlarmType[],
    { startDate?: string; endDate?: string; page: number }
  >({
    mutationFn: getFdsList,
    onSuccess: (data) => {
      setFdsLists(data)
    }
  })
}

export const useUnreadFdsPush = ({
  setFdsAlarmCnt
}: {
  setFdsAlarmCnt: (cnt: number) => void
}) => {
  return createMutation<GetAlarmCountResponse, void>({
    mutationFn: getFdsCount,
    onSuccess: (data) => {
      if (data.success) {
        setFdsAlarmCnt(data.body.unReadCnt)
      }
    }
  })
}
