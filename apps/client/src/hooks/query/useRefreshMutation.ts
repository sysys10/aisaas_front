import { useUserStore } from '@stores'

import { getRefreshInfo } from '@packages/apis'

import { createMutation } from './mutationUtils'
import { setHeader } from '@utils'

export function useRefreshMutation() {
  const setUser = useUserStore((state) => state.setUser)
  const setIsBolcked = useUserStore((state) => state.setIsBolcked)
  return createMutation({
    mutationFn: getRefreshInfo,
    onSuccess: (data) => {
      setUser({
        userId: data.body.userId,
        companyId: data.body.companyId,
        mngeYn: data.body.mngeYn,
        prodCd: data.body.prodCd,
        companyNm: data.body.companyNm,
        useInttId: data.body.useInttId,
        certCnt: data.body.certCnt
      })
      setHeader(data.body.jwtToken)
      setIsBolcked(data.body.planStts == '0' && data.body.freeDDay <= 0)
    }
  })
}

export default useRefreshMutation
