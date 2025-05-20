import { useSidebar } from '@hooks'
import { useUserStore } from '@stores'
import { useEffect, useMemo } from 'react'

import CustomIcons from '@components/common/CustomIcons'

import { useFdsAlarmCnt } from '@hooks/useFds'

import { LeftSidebarProps } from '@types'

import { FirstSidebar } from './FirstSidebar'
import { SidebarList } from './SidebarList'

export default function Sidebar({ ...props }: LeftSidebarProps) {
  const { handleToggleAdmin, handleCloseAdmin, handleSearchSubmit, user } =
    props

  const { fdsAlarmCnt, getFdsAlarmCnt } = useFdsAlarmCnt()
  useEffect(() => {
    getFdsAlarmCnt()
  }, [])
  const handleLogout = useUserStore((s) => s.handleLogout)
  const { sidebarContent, isSidebarOpen, toggleSidebar, setIsSidebarOpen } =
    useSidebar({
      handleToggleAdmin,
      handleCloseAdmin
    })   
  const isBlocked  = useUserStore((s) => s.isBlocked)

  return useMemo(
    () => (
      <aside
        className={`shrink-0 z-50 flex justify-between h-screen absolute md:relative whitespace-nowrap`}
      >
        <FirstSidebar
          sidebarContent={sidebarContent}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          fdsAlarmCnt={fdsAlarmCnt}
        />
        <div className='relative'>
          <div
            className={`${isSidebarOpen ? 'w-sidebar-width' : 'w-0 overflow-x-hidden'} transition-[width] duration-[300ms]`}
          >
            <div
              className={`relaitve h-screen w-full pt-20 overflow-hidden bg-background-primary border-r whitespace-nowrap`}
            >
              <div className={`w-full h-full flex flex-col`}>
                <SidebarList
                  {...props}
                  sidebarContent={sidebarContent}
                  getFdsAlarmCnt={getFdsAlarmCnt}
                />
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              console.log('sidebar clicked')
              if(isBlocked){
                return
              }
              if (sidebarContent) {
                setIsSidebarOpen(!isSidebarOpen)
              } else {
                setIsSidebarOpen(true)
              }
            }}
            className={`absolute z-40 transition-all duration-500 top-[11rem] -translate-y-1/2 translate-x-1/2 right-0`}
          >
            {
              sidebarContent !== 'setting' &&
              <CustomIcons
                name='menu'
                iconClassName={`w-8 h-8 p-1 bg-background-primary border border-gray-300 rounded-md ${
                  !isSidebarOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            }
          </div>
        </div>
      </aside>
    ),
    [
      user,
      handleLogout,
      handleSearchSubmit,
      isSidebarOpen,
      sidebarContent,
      fdsAlarmCnt
    ]
  )
}
