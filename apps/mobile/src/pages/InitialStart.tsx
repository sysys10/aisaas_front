import React from 'react'

import useDeviceStore from '@stores/useDevice'

import handleMobileActions from '@utils/nativeActionHandler'

const InitialStartScreen = () => {
  const device = useDeviceStore((s) => s.device)

  const storeName = device === 'ios' ? 'APP Store' : 'Google Play'

  return (
    <div className='w-full p-6'>
      <div className='mx-auto rounded-2xl  justify-between'>
        <div className='p-4 mb-6 relative'>
          <h1 className='text-3xl font-bold mb-4 leading-[2.5rem]'>
            지금 <span className='text-aicfo'>AICFO 구독</span>을<br />
            시작하세요!
          </h1>

          <p className='text-lg mb-4 mt-10'>
            365일, 24시간 옆에 있는 AI자금비서를 <br />월{' '}
            <span className='font-bold'>29,000원</span>으로 채용할 수 있습니다.
          </p>

          <p className='text-sm text-gray-600 mb-7'>
            · 월간 사용 요금 기준으로, VAT(부가세)가 별도 부과됩니다.
          </p>
          <p className='text-sm text-red-600 font-normal'>
            · {storeName}를 통한 결제를 사용할 수 없습니다. <br />
            &nbsp;&nbsp;PC버전에서 로그인 후 구독을 진행할 수 있습니다.
          </p>
        </div>
        <div>
          <div className='bg-white p-4 rounded-lg mb-4 border border-[#E0E0E0]'>
            <h2 className='text-lg font-bold mb-2'>
              은행 데이터를 이용한 업무 답변
            </h2>
            <ul className='list-disc text-[#767676] pl-6'>
              <li className='mb-1'>자금현황</li>
              <li className='mb-1'>수시입출</li>
              <li className='mb-1'>예적금</li>
              <li className='mb-1'>대출</li>
              <li className='mb-1'>외화</li>
              <li className='mb-1'>증권</li>
            </ul>
          </div>

          <div className='bg-white p-4 rounded-lg mb-4 border border-[#E0E0E0]'>
            <h2 className='text-lg font-bold mb-2'>
              자금일보 등 총 4종 자금 업무 보고
            </h2>
            <ul className='list-disc text-[#767676] pl-6'>
              <li className='mb-1'>자금일보</li>
              <li className='mb-1'>자금주보</li>
              <li className='mb-1'>자금월보</li>
              <li className='mb-1'>일임시재마감</li>
            </ul>
          </div>

          <div className='bg-white p-4 rounded-lg mb-4 border border-[#E0E0E0]'>
            <h2 className='text-lg font-bold'>
              고액거래나 지정시간 외 이상거래 발생 알림
            </h2>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleMobileActions(device, 'logout')}
        className='mb-4 pt-8 pl-4 underline text-[#767676]'
      >
        로그아웃
      </div>
    </div>
  )
}

export default InitialStartScreen
