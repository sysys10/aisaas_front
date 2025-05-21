import Cube from '@assets/icons/AICFO_CUBE_LOGO.png'
import {
  SIDE_BAR_BOTTOM_LIST,
  SIDE_BAR_TOP_LIST,
  SidebarContent
} from '@constants'
import { useUserStore } from '@stores'

import CustomIcons from '@components/common/CustomIcons'
import { IconName } from '@components/common/CustomIcons/registry'

import { useLogoutMutation } from '@hooks/query'

interface FirstSidebarProps {
  sidebarContent: SidebarContent
  isSidebarOpen: boolean
  toggleSidebar: (name: SidebarContent) => void
  fdsAlarmCnt: number
}

export function FirstSidebar({
  sidebarContent,
  isSidebarOpen,
  toggleSidebar,
  fdsAlarmCnt
}: FirstSidebarProps) {
  const { mutate: Logout } = useLogoutMutation()
  const handleLogout = useUserStore((s) => s.handleLogout)
  const user = useUserStore((s) => s.user)

  return (
    <div
      className={`flex z-20 relative bg-background-sidebar h-full border-r border-border`}
    >
      <div className='flex flex-col items-center text-disabled w-[var(--sidebar-1-width)] justify-between'>
        <div className='flex justify-center z-40 items-center p-5 pb-7 shrink-0'>
          <img src={Cube} alt='cube' className='w-full' />
        </div>
        <div className='flex flex-col gap-y-4 px-4'>
          {SIDE_BAR_TOP_LIST.slice(0, -1).map((v, i) => (
            <CustomIcons
              className='text-left cursor-pointer text-xs'
              key={i + 20}
              text={v.text}
              iconClassName={`p-2 w-10 h-10 rounded-full ${
                sidebarContent === v.name && isSidebarOpen ? 'bg-aicfo' : ''
              }`}
              name={
                sidebarContent === v.name && isSidebarOpen
                  ? ((v.name + '_white') as IconName)
                  : (v.name as IconName)
              }
              onClick={() => {
                toggleSidebar(v.name)
              }}
            />
          ))}
         
        </div>
        <div className='flex relative z-10 flex-col mt-4 pt-1 border-t flex-1 border-[#D9D9D9]'>
          {SIDE_BAR_BOTTOM_LIST.map((v, i) => (
            <div className='relative' key={i + 30}>
              <CustomIcons
                text={v.text}
                name={
                  sidebarContent === v.name
                    ? ((v.name + '_white') as IconName)
                    : (v.name as IconName)
                }
                className='text-left text-xs mt-4'
                onClick={() => toggleSidebar(v.name)}
                iconClassName={`w-10 h-10 p-2 rounded-full ${
                  sidebarContent === v.name ? 'bg-aicfo' : 'bg-[#EAEAEA]'
                }`}
              />
              {user?.certCnt == 0 && sidebarContent !== 'setting' && (
                <div className='absolute top-1/2 -translate-y-1/2 left-12 min-w-80 text-wrap z-50 rounded-md bg-gray-800 opacity-90 p-3 text-sm text-white'>
                  <div className='absolute top-1/2 -translate-y-1/2 -left-2'>
                    <div className='border-t-8 border-r-8 border-b-8 border-t-transparent border-r-gray-800 border-b-transparent'></div>
                  </div>
                  <p>
                    신규 가입고객은 사용 설정 {'>'} 계좌 등록 관리에서 인증서
                    등록 후 사용이 가능합니다.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <CustomIcons
          text='로그아웃'
          name='logout'
          className='text-left text-xs text-disabled mb-7'
          onClick={() => {
            handleLogout()
            Logout()
          }}
          iconClassName={`w-10 h-10 p-2 rounded-full`}
        />
      </div>
    </div>
  )
}
