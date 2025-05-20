import { useAdminStore } from '@stores/adminStore'
import { useSidebarStore } from '@stores/sidebarStore'

import { useAdminQuery, useAdminTokenQuery } from './query'
import useRefreshMutation from './query/useRefreshMutation'

export function useAdmin(handleResetResults: () => void) {
  const adminUrl = useAdminStore((s) => s.adminUrl)
  const { mutate: refresh } = useRefreshMutation()

  const { setIsSidebarOpen, setSidebarContent } = useSidebarStore((s) => s)
  const setAdminUrl = useAdminStore((s) => s.setAdminUrl)

  const { mutate: openAdmin, isPending: isAdminLoading } = useAdminQuery()

  const handleToggleAdmin = () => {
    if (adminUrl) {
      setAdminUrl('')
      refresh()
      setIsSidebarOpen(false)
      setSidebarContent('brf')
      handleResetResults()
    } else {
      openAdmin()
    }
  }
  const handleCloseAdmin = () => {
    setAdminUrl('')
    refresh()
    setIsSidebarOpen(false)
    handleResetResults()
  }
  return { adminUrl, handleToggleAdmin, handleCloseAdmin, isAdminLoading }
}
export const useAdminToken = () => {
  const { mutate: getAdminToken } = useAdminTokenQuery()
  return {getAdminToken }
}