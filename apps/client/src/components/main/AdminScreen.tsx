import CustomIcons from '@components/common/CustomIcons'

import { useEffect } from 'react'
import { useUserStore } from '@stores/userStore'
import { useLogoutMutation } from '@hooks/query'

export default function AdminScreen({
  adminUrl,
  handleCloseAdmin
}: {
  adminUrl: string
  handleCloseAdmin: () => void
}) {
  const { mutate: Logout } = useLogoutMutation();
  const handleLogout = useUserStore((s) => s.handleLogout);
  const acceptedOriginUrls = [
    'https://aicfoadm-dev.appplay.co.kr',
    'https://admin.webcashaicfo.com'
  ];

  useEffect(() => {
    window.addEventListener('message', async (event) => {
      if (!acceptedOriginUrls.includes(event.origin)) {
        return
      }
      const requestLogoutData = event.data.includes('requestLogout') ? JSON.parse(event.data) : null
      if (requestLogoutData && requestLogoutData.requestLogout) {
        handleLogout();
        Logout();
      }
    });

    return window.removeEventListener('message', (event) => {
      console.log('event deleted')
    });
  }, [])

  return (
    <div className='relative w-full h-full flex flex-col pt-[0.55rem]'>
      <div className='w-full px-3 py-2'>
        <div className='w-full rounded-lg py-2 bg-background-sidebar flex items-center justify-between px-4'>
          <div className='text-sm text-aicfo'>사용설정</div>
          <div>
            <CustomIcons
              name='close'
              onClick={handleCloseAdmin}
              className='w-4 h-4 text-gray-500'
            />
          </div>
        </div>
      </div>
      {/* { (
        <div className='w-full flex-1 flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6'>
          <div className='flex items-center justify-center gap-2 sm:gap-3 md:gap-4'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-aicfo animate-bounce'
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
          <p className='text-sm sm:text-base md:text-lg text-gray-500'>사용설정을 불러오는 중입니다.</p>
        </div>
      ) : ( */}
        <iframe src={adminUrl} className='w-full flex-1 border-0' />
      {/* )} */}
    </div>
  )
}
