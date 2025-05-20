import ChevronLeftIcon from '@heroicons/react/24/solid/ChevronLeftIcon'
import { useLocation } from 'react-router-dom'

import useDeviceStore from '@stores/useDevice'

import handleMobileActions from '@utils/nativeActionHandler'

const TopNav = () => {
  const location = useLocation()
  const device = useDeviceStore((s) => s.device)
  if (location.pathname.startsWith('/alarm')) return null
  if (location.pathname.startsWith('/initial')) return null
  return (
    <nav className='h-topbar-height w-full fixed top-0 left-0 z-50 bg-white p-4 shadow-inset-b'>
      <div className='flex h-full w-full items-center justify-between px-2'>
        <ChevronLeftIcon
          width={'20'}
          className='cursor-pointer'
          onClick={() => handleMobileActions(device, 'godismiss')}
        />
        <div className='absolute left-1/2 -translate-x-1/2 text-xl'>
          {location.pathname.startsWith('/report')
            ? '문의하기'
            : location.pathname.startsWith('/alarm')
              ? '알림'
              : ''}
        </div>
      </div>
    </nav>
  )
}
export { TopNav }
