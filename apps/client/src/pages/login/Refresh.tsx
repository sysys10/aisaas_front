import { useUserStore } from '@stores'
import { useEffect } from 'react'

import CustomIcons from '@components/common/CustomIcons'

import { useLogoutMutation, useRefreshMutation } from '@hooks/query'

export default function LoginRefreshPage() {
  const {mutate: refresh} = useRefreshMutation()
  useEffect(() => {
    refresh()

    const timer = setTimeout(() => {
      window.location.href = '/pc'
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

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
            로그인 중입니다.
          </h1>
          <p className='text-gray-600'>잠시 후 메인 페이지로 이동합니다...</p>
        </div>
      </div>
    </main>
  )
}
