import React from 'react'

import useDeviceStore from '@stores/useDevice'

import handleMobileActions from '@utils/nativeActionHandler'

const InitialFailScreen = () => {
  const device = useDeviceStore((s) => s.device)
  return (
    <div className='w-full p-6 flex flex-col justify-between h-full'>
      <div className='flex justify-between'>
        <div className='p-4 mb-6 relative'>
          <h1 className='text-3xl font-bold mb-4 leading-[2.5rem]'>
            구독료 정기 결제에 <br /> 실패하여
            <span className='text-aicfo'> 서비스가 중지</span>
            <br />
            되었습니다.
          </h1>

          <p className='text-lg mb-2 mt-10'>
            등록하신 결제수단을 확인하고, <br />
            다른 결제수단을 사용해보세요.
          </p>

          <p className='text-sm text-gray-600'>
            · 정기 결제 시도는 추가로 연속 3일 동안 하루에 한 번씩 시도되며,
            모두 실패하면 더 이상 결제 시도가 이뤄지지 않습니다. 전화문의 :
            1577-7632
          </p>
        </div>
      </div>
      <div
        onClick={() => handleMobileActions(device, 'logout')}
        className='mb-4 pl-4 underline text-[#767676]'
      >
        로그아웃
      </div>
    </div>
  )
}

export default InitialFailScreen
