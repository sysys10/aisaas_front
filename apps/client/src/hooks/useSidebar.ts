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
    if (name === 'setting') {
      if (sidebarContent === name) {
        setSidebarContent('brf')
        setIsSidebarOpen(false)
        handleCloseAdmin()
      } else {
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
      handleCloseAdmin()
      setIsSidebarOpen(!isSidebarOpen)
      return
    }
    handleCloseAdmin()
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
