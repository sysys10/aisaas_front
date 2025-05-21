import { openAdminApi } from '@apis'
import { useAdminStore } from '@stores/adminStore'
import { AICFOMutation } from '@types'
import { createMutation } from './mutationUtils'

export const useAdminQuery = () => {
  const setAdminUrl = useAdminStore((s) => s.setAdminUrl)

  return createMutation({
    mutationFn: openAdminApi,
    onSuccess: (data) => {
      setAdminUrl(data)
      
    }
  }) as AICFOMutation<any, void>
}
