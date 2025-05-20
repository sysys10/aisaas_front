// components/skeletons/AICFOHomeSkeleton.tsx
import React from 'react'

const AICFOHomeSkeleton = () => {
  return (
    <div className='flex h-screen w-full animate-pulse'>
      <div className='w-20 min-h-screen bg-white border-r border-gray-200 flex flex-col items-center'>
        <div className='py-6 w-full flex justify-center'>
          <div className='h-10 w-10 bg-gray-200 rounded-md'></div>
        </div>

        <div className='w-full mt-6 flex flex-col items-center gap-8'>
          <div className='h-8 w-8 bg-gray-200 rounded-md'></div>
          <div className='h-8 w-8 bg-gray-200 rounded-md relative'></div>
          <div className='h-8 w-8 bg-gray-200 rounded-md'></div>
          <div className='h-8 w-8 bg-gray-200 rounded-md'></div>
        </div>

        <div className='mt-auto mb-6'>
          <div className='h-8 w-8 bg-gray-200 rounded-md'></div>
        </div>
      </div>

      <div className='flex-1 bg-white p-6 flex flex-col'>
        <div className='w-full flex justify-between items-center mb-20'>
          <div className='h-8 w-24 bg-gray-200 rounded-md'></div>
          <div className='flex items-center gap-4'>
            <div className='h-8 w-32 bg-gray-200 rounded-md'></div>
            <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
            <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
          </div>
        </div>

        <div className='flex-1 flex flex-col items-center justify-center mb-20'>
          <div className='max-w-3xl mx-auto w-full flex flex-col items-center'>
            <div className='mb-8 text-center'>
              <div className='h-8 w-64 bg-gray-200 rounded-md mx-auto'></div>
            </div>

            {/* 검색창 */}
            <div className='w-full h-14 bg-gray-200 rounded-2xl mb-8'></div>

            {/* 카테고리 버튼들 */}
            <div className='flex justify-center gap-3 flex-wrap'>
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className='h-10 w-24 bg-gray-200 rounded-full'
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 텍스트 */}
        <div className='mt-auto mb-6 flex justify-center'>
          <div className='h-4 w-80 bg-gray-200 rounded-md'></div>
        </div>
      </div>
    </div>
  )
}

export default AICFOHomeSkeleton
