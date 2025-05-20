import { GetAlarmCountResponse, getAlarmCount } from '@packages/apis'

import { createMutation } from './mutationUtils'

export const useUnreadPush = ({
  setAlarmCnt
}: {
  setAlarmCnt: (cnt: number) => void
}) => {
  return createMutation<GetAlarmCountResponse, void>({
    mutationFn: getAlarmCount,
    onSuccess: (data) => {
      setAlarmCnt(data.body.unReadCnt)
    },
    onError: (error) => {
      if (error.status === 401) {
        window.location.href = '/logout/redirect'
      }
    }
  })
}
