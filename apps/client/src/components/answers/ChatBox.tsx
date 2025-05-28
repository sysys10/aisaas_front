import logo from '@assets/icons/AICFO_CUBE_LOGO.png'
import { useMemo, useState } from 'react'

import AnimatedText from '@components/ui/AnimatedText'

import { ChatBoxProps } from '@types'

import { UserMessage } from './UserMessage'
import { AIResponse } from './aiResponse/AIResponse'

export function ChatBox({ searchIsLoading, result, isLast, handleSearchSubmit }: ChatBoxProps) {
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  return useMemo(
    () => (
      <div className='flex flex-col w-full pb-12 px-2'>
        <div className='fixed left-4 bottom-4 w-16 h-16'>
          {searchIsLoading ? (
            <img 
              src='/cat_1.png' 
              alt='Loading cat' 
              className='w-full h-full object-contain'
            />
          ) : (
            <img 
              src='/cat_4.png' 
              alt='Idle cat' 
              className='w-full h-full object-contain'
            />
          )}
        </div>
        {result.utterance !== 'next_page' && <UserMessage utterance={result.utterance} />}
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
                <div className='flex text-base items-center pl-2 pt-1'>
                  {result.answer ? (
                    <AnimatedText
                      text={result.answer === 'next_page' ? '다음 페이지' : result.answer}
                      setIsTypingComplete={setIsTypingComplete}
                    />
                  ) : (
                    <div className='text-gray-500'>
                      {
                        result.answer === 'next_page' ? (
                          <div className='text-gray-500'>
                            다음 페이지 내용을 작성하는 중입니다...
                          </div>
                        ) : (
                          <div className='text-gray-500'>
                            답변을 작성하는 중입니다...
                          </div>
                        )
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          

          {result.answer && (
            <AIResponse isTypingComplete={isTypingComplete} result={result} handleSearchSubmit={handleSearchSubmit} />
          )}
        </div>
      </div>
    ),
    [result, searchIsLoading, isTypingComplete]
  )
}
