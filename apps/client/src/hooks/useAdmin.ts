import { useAdminStore } from '@stores/adminStore'
import { useSidebarStore } from '@stores/sidebarStore'

import useRefreshMutation from './query/useRefreshMutation'

export function useAdmin(handleResetResults: () => void) {
  const adminUrl = useAdminStore((s) => s.adminUrl)
  const { mutate: refresh } = useRefreshMutation()

  const { setIsSidebarOpen, setSidebarContent } = useSidebarStore((s) => s)
  const setAdminUrl = useAdminStore((s) => s.setAdminUrl)


  const handleToggleAdmin = () => {
    if (adminUrl) {
      setAdminUrl('')
      // refresh()
      setIsSidebarOpen(false)
      setSidebarContent('brf')
      handleResetResults()
    } else {
     setAdminUrl('https://aibranch-dev.aiwebcash.co.kr/adm/usst_main_01.act')
    }
  }
  const handleCloseAdmin = () => {
    setAdminUrl('')
    // refresh()
    setIsSidebarOpen(false)
    handleResetResults()
  }
  return { adminUrl, handleToggleAdmin, handleCloseAdmin }
}