import { SidebarContent } from '@constants'
import { useUserStore } from '@stores'

import { useSidebarStore } from '@stores/sidebarStore'

interface UseSidebarProps {
  handleToggleAdmin: () => void
  handleCloseAdmin: () => void
}

const useSidebar = ({
  handleToggleAdmin,
  handleCloseAdmin
}: UseSidebarProps) => {
  const { isBlocked } = useUserStore((s) => s)
  const { sidebarContent, setSidebarContent, setIsSidebarOpen, isSidebarOpen } =
    useSidebarStore((s) => s)

  const toggleSidebar = (name: SidebarContent) => {
   if (sidebarContent === 'setting' && name === 'recentQuestion') {
    // 최근질의 누르고
        
    handleCloseAdmin()
    setIsSidebarOpen(true)
    setSidebarContent('recentQuestion')

        return 
    } 
    if (name === 'setting') {
      // 세팅을 눌렀는데
      if (sidebarContent === 'setting') {
        // 세팅으 또 누르면
        setSidebarContent('recentQuestion')
        setIsSidebarOpen(false)
        handleCloseAdmin()
      } else {
        // 세팅을 누르고 최근질의 누를 떄
        handleToggleAdmin()
        setSidebarContent(name)
        setIsSidebarOpen(false)
      }
      return
    }
    if (isBlocked) {
      return
    }
    if (name === sidebarContent) {
      setIsSidebarOpen(!isSidebarOpen)
      return
    }
    setSidebarContent(name as any)
    setIsSidebarOpen(true)
  }

  return {
    sidebarContent,
    isSidebarOpen,
    toggleSidebar,
    setIsSidebarOpen
  }
}

export { useSidebar }
