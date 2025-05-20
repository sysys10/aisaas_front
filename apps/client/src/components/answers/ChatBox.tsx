import logo from '@assets/icons/AICFO_CUBE_LOGO.png'
import { useMemo, useState } from 'react'

import AnimatedText from '@components/ui/AnimatedText'

import { ChatBoxProps } from '@types'

import { UserMessage } from './UserMessage'
import { AIResponse } from './aiResponse/AIResponse'

export function ChatBox({ searchIsLoading, result, isLast }: ChatBoxProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  return useMemo(
    () => (
      <div className='flex flex-col w-full pb-12 px-2'>
        <UserMessage utterance={result.utterance} />
        <div className='mt-6'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-end gap-2'>
              <div className='flex items-start'>
                <div
                  className='p-1.5 w-8 h-8 shrink-0 rounded-full'
                  style={{
                    animation:
                      searchIsLoading && isLast ? 'spin 5s linear infinite' : ''
                  }}
                >
                  <img src={logo} alt='logo' className='w-full h-full' />
                </div>
                <div className='flex text-base items-center min-h-10 pl-2'>
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
    [result, searchIsLoading, isTypingComplete]
  )
}
