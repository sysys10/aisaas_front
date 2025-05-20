import { openAdminApi } from '@apis'

import { useAdminStore } from '@stores/adminStore'

import { AICFOMutation } from '@types'

import { createMutation } from './mutationUtils'
import { useAdminTokenStore } from '@stores/adminTokenStore'
import { skipToken } from '@tanstack/react-query'

export const useAdminQuery = () => {
  const setAdminUrl = useAdminStore((s) => s.setAdminUrl)

  return createMutation({
    mutationFn: openAdminApi,
    onSuccess: (data) => {
      if (data.success) {
        setAdminUrl(data.message)
      }
    }
  }) as AICFOMutation<any, void>
}
function extractToken(url: string) {
  // URL에서 TOKEN= 이후의 모든 문자열을 가져오기
  const tokenMatch = url.match(/TOKEN=([^&]+)/);
  
  if (tokenMatch && tokenMatch[1]) {
    return tokenMatch[1];
  }
  
  return '';
}
export const useAdminTokenQuery = () => {
  const setAdminToken = useAdminTokenStore((s) => s.setAdminToken)

  return createMutation({
    mutationFn: openAdminApi,
    onSuccess: (data) => {
      if (data.success) {
        const token = data.message.replace('AdminGateWay','AdminPlanGateWay')
        setAdminToken(token)
      }
    }
  }) as AICFOMutation<any, void>
}
