import { AlarmType } from '@types'

import { GetAlarmCountResponse, getFdsCount, getFdsList } from '@packages/apis'

import { createMutation } from './mutationUtils'

export const useFdsQuery = ({
  setFdsLists
}: {
  // 반환 타입을 AlarmType[] 또는 Promise<AlarmType[]>로 변경
  setFdsLists: (data: AlarmType[], appendData?: boolean) => AlarmType[] | void
}) => {
  return createMutation<
    AlarmType[],
    { startDate?: string; endDate?: string; page: number; appendData?: boolean }
  >({
    mutationFn: async ({ startDate, endDate, page }) => {
      return await getFdsList({ startDate, endDate, page })
    },
    onSuccess: (data, variables) => {
      return setFdsLists(data, variables.appendData)
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
