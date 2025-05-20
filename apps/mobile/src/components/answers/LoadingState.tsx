import { useEffect, useState } from 'react'

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  // 타이핑 효과
  useEffect(() => {
    const currentMessage = messages[currentIndex]
    if (!currentMessage) return

    if (isTyping) {
      if (displayText.length < currentMessage.length) {
        const timeoutId = setTimeout(() => {
          setDisplayText(currentMessage.slice(0, displayText.length + 1))
        }, 50)
        return () => clearTimeout(timeoutId)
      } else {
        setIsTyping(false)
        const timeoutId = setTimeout(() => {
          setIsTyping(true)
          setCurrentIndex((prev) => (prev + 1) % messages.length)
          setDisplayText('')
        }, 2000)
        return () => clearTimeout(timeoutId)
      }
    }
  }, [displayText, currentIndex, messages, isTyping])

  return (
    <div className='flex flex-col items-start gap-4 rounded-lg p-6'>
      {/* 로딩 애니메이션 */}
      <div className='flex items-center justify-center space-x-2'>
        <div className='relative flex space-x-3'>
          <div className='h-3 w-3 animate-[bounce_1s_infinite] rounded-full bg-blue-400' />
          <div className='h-3 w-3 animate-[bounce_1s_infinite_0.2s] rounded-full bg-blue-400' />
          <div className='h-3 w-3 animate-[bounce_1s_infinite_0.4s] rounded-full bg-blue-400' />
        </div>
      </div>

      {/* 메시지 표시 영역 */}
      <div className='min-h-[1.5em] text-center'>
        <p className='text-lg text-gray-600'>
          {displayText}
          <span
            className='ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-gray-400'
            style={{
              opacity: isTyping ? 1 : 0,
              transition: 'opacity 0.2s'
            }}
          />
        </p>
      </div>

      {/* 프로그레스 바 */}
      <div className='h-1 w-64 overflow-hidden rounded-full bg-gray-200'>
        <div
          className='h-full rounded-full bg-blue-400'
          style={{
            width: `${(displayText.length / messages[currentIndex].length) * 100}%`,
            transition: 'width 0.05s'
          }}
        />
      </div>
    </div>
  )
}

export default LoadingState
