import logo from '@assets/icons/AICFO_CUBE_LOGO.png'
import { useEffect, useMemo, useState } from 'react'

import { UserMessage } from './UserMessage'
import { AIResponse } from './aiResponse/AIResponse'

interface ChatBoxProps {
  searchIsLoading: boolean
  result: any
  isLast: boolean
}
export function ChatBox({ searchIsLoading, result, isLast }: ChatBoxProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  return useMemo(
    () => (
      <div className='flex flex-col w-full px-4'>
        <UserMessage utterance={result.utterance} />
        <div className='mt-4'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-end gap-2'>
              <div className='flex items-start'>
                <div
                  className='p-2 border shrink-0 border-gray-300 rounded-full'
                  style={{
                    animation:
                      searchIsLoading && isLast ? 'spin 5s linear infinite' : ''
                  }}
                >
                  <img src={logo} alt='logo' className='h-6 w-6' />
                </div>
                <div className='flex items-center min-h-10 pl-2'>
                  {result.answer ? (
                    <AnimatedText
                      text={result.answer}
                      setIsTypingComplete={setIsTypingComplete}
                    />
                  ) : (
                    <div className='text-gray-500'>
                      답변을 작성하는 중입니다...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {result.answer && (
            <AIResponse isTypingComplete={isTypingComplete} result={result} />
          )}
        </div>
      </div>
    ),
    [result, searchIsLoading, isLast, isTypingComplete]
  )
}

export function AnimatedText({
  text,
  setIsTypingComplete
}: {
  text: string
  setIsTypingComplete: (value: boolean) => void
}) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let currentText = ''
    let currentIndex = 0

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        currentText += text[currentIndex]
        setDisplayedText(currentText)
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTypingComplete(true)
      }
    }, 10)

    return () => clearInterval(typingInterval)
  }, [text])

  return (
    <div className='text-lg text-black'>
      {displayedText.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          <br />
        </span>
      ))}
    </div>
  )
}
