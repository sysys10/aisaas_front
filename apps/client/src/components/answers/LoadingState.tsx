import { useEffect, useState } from 'react'

import CustomIcons from '@components/common/CustomIcons'

interface LoadingStateProps {
  messages?: string[]
}

function LoadingState({
  messages = [
    '답변을 생성중입니다...',
    '잠시만 기다려주세요...',
    '최선의 답변을 준비하고 있어요...',
    '조금만 더 기다려주세요...'
  ]
}: LoadingStateProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) =>
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      )
    }, 2000) // 2초마다 메시지 변경

    return () => clearInterval(interval)
  }, [messages.length])
  return (
    <div className='flex flex-col items-center justify-center gap-8 mt-10 rounded-xl p-8'>
      <div className='flex items-center gap-8'>
        <CustomIcons
          name='newlogo'
          iconClassName='h-10 w-10 animate-[spin_3s_linear_infinite]'
        />
        <span className='text-lg text-gray-700 animate-pulse'>
          {messages[currentMessageIndex]}
        </span>
      </div>
    </div>
  )
}

export { LoadingState }
