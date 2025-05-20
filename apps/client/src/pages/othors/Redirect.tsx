import { useUserStore } from '@stores'
import { useEffect } from 'react'

import CustomIcons from '@components/common/CustomIcons'

import { useLogoutMutation } from '@hooks/query'

export default function LogoutRedirectPage() {
  const handleLogout = useUserStore((s) => s.handleLogout)
  const { mutate: Logout } = useLogoutMutation()
  useEffect(() => {
    Logout()
    handleLogout()

    const timer = setTimeout(() => {
      window.location.href = '/login'
    }, 2000)

    return () => clearTimeout(timer)
  }, [handleLogout])

  return (
    <main className='h-screen flex items-center justify-center bg-background'>
      <div className='p-8 max-w-md w-full bg-white/50 backdrop-blur-sm'>
        <div className='text-center space-y-6'>
          <div className='flex justify-center'>
            <CustomIcons
              name='login'
              className='h-16 w-16 text-purple-500 animate-bounce'
            />
          </div>
          <h1 className='text-3xl font-semibold text-gray-800'>
            로그아웃 되었습니다. 다시 로그인해주세요.
          </h1>
          <p className='text-gray-600'>잠시 후 로그인 페이지로 이동합니다...</p>
        </div>
      </div>
    </main>
  )
}
