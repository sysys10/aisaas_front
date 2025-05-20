import { AICFOResultType } from '@/types'
import { useEffect, useMemo, useRef, useState } from 'react'

import { ChatBox } from './ChatBox'

interface AnswerSectionProps {
  results: AICFOResultType[]
  searchIsLoading: boolean
}
export function AnswerSection({ ...props }: AnswerSectionProps) {
  const { results, searchIsLoading } = props

  const answerSectionRef = useRef<HTMLDivElement>(null)
  const chatBoxesRef = useRef<HTMLDivElement>(null)
  const questionRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    questionRefs.current = questionRefs.current.slice(0, results.length)
  }, [results.length])

  useEffect(() => {
    if (!chatBoxesRef.current) return
    const currentScrollHeight = chatBoxesRef.current.scrollHeight
    answerSectionRef.current?.scrollTo({
      top: currentScrollHeight,
      behavior: 'smooth'
    })
  }, [results.length])
  return useMemo(
    () => (
      <section
        ref={answerSectionRef}
        className={`w-full flex-1 h-full overflow-y-auto`}
      >
        <div className='mx-auto h-full w-full max-w-4xl px-2'>
          <div ref={chatBoxesRef}>
            {results.map((result, idx) => (
              <div
                key={`question-${idx}`}
                ref={(el) => (questionRefs.current[idx] = el)}
                className={`w-full ${
                  idx === results.length - 1
                    ? 'h-[calc(100vh-var(--topbar-height))]'
                    : ''
                }`}
              >
                <ChatBox
                  searchIsLoading={searchIsLoading}
                  result={result}
                  isLast={idx === results.length - 1}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    [results, searchIsLoading, results.length]
  )
}
