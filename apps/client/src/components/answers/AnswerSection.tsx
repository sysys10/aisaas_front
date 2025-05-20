import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import CustomIcons from '@components/common/CustomIcons'

import { AnswerSectionProps } from '@types'

import { ChatBox } from './ChatBox'

const TOPBAR_HEIGHT = 0

export function AnswerSection({ ...props }: AnswerSectionProps) {
  const { results, searchIsLoading, isFirstSearch } = props
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const answerSectionRef = useRef<HTMLDivElement>(null)
  const chatBoxesRef = useRef<HTMLDivElement>(null)
  const questionRefs = useRef<(HTMLDivElement | null)[]>([])

  // 결과 길이가 변경될 때만 questionRefs 업데이트
  useEffect(() => {
    questionRefs.current = questionRefs.current.slice(0, results.length)
  }, [results.length])

  // 새 결과가 추가될 때 스크롤 자동 이동
  useEffect(() => {
    if (!chatBoxesRef.current || !answerSectionRef.current) return

    const currentScrollHeight = chatBoxesRef.current.scrollHeight
    answerSectionRef.current.scrollTo({
      top: currentScrollHeight,
      behavior: 'smooth'
    })
  }, [results.length])

  // 스크롤 위치에 따른 현재 질문 인덱스 추적
  useEffect(() => {
    const answerSection = answerSectionRef.current
    if (!answerSection) return

    const handleScroll = () => {
      const containerHeight = answerSection.clientHeight

      // 뷰포트 중앙에 가장 가까운 질문 찾기
      let currentIndex = questionRefs.current.findIndex((ref) => {
        if (!ref) return false

        const rect = ref.getBoundingClientRect()
        const elementMiddle = rect.top + (rect.bottom - rect.top) / 2
        const viewportMiddle = containerHeight / 2

        return Math.abs(elementMiddle - viewportMiddle) < containerHeight / 3
      })

      // 중앙에 질문이 없으면 화면에 보이는 첫 번째 질문 찾기
      if (currentIndex === -1) {
        currentIndex = questionRefs.current.findIndex((ref) => {
          if (!ref) return false
          return ref.getBoundingClientRect().bottom > TOPBAR_HEIGHT
        })
      }

      // 인덱스가 유효하면 상태 업데이트
      if (currentIndex !== -1) {
        setCurrentQuestionIndex(currentIndex)
      }
    }

    answerSection.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      answerSection.removeEventListener('scroll', handleScroll)
    }
  }, [results.length])

  const scrollToTop = useCallback(() => {
    if (!answerSectionRef.current) return
    answerSectionRef.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  const scrollToBottom = useCallback(() => {
    if (!answerSectionRef.current) return
    answerSectionRef.current.scrollTo({
      top: answerSectionRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [])

  const scrollToQuestion = useCallback((index: number) => {
    const targetRef = questionRefs.current[index]
    if (!targetRef || !answerSectionRef.current) return

    const targetPosition = targetRef.offsetTop
    const offset = 20

    answerSectionRef.current.scrollTo({
      top: targetPosition - offset,
      behavior: 'smooth'
    })
  }, [])

  const scrollToLatestQuestion = useCallback(() => {
    if (currentQuestionIndex === results.length - 1) {
      scrollToBottom()
    } else if (currentQuestionIndex < results.length - 1) {
      scrollToQuestion(currentQuestionIndex + 1)
    }
  }, [currentQuestionIndex, results.length, scrollToBottom, scrollToQuestion])

  const scrollToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex === 0) {
      scrollToTop()
    } else {
      scrollToQuestion(currentQuestionIndex - 1)
    }
  }, [currentQuestionIndex, scrollToTop, scrollToQuestion])

  return useMemo(
    () => (
      <section
        ref={answerSectionRef}
        className={`w-full flex-1 z-50 overflow-y-auto relative ${
          isFirstSearch && 'hidden'
        }`}
      >
        <div className='mx-auto h-full w-full max-w-3xl'>
          <div ref={chatBoxesRef}>
            {results.map((result, idx) => (
              <div
                key={`question-${idx}`}
                ref={(el) => (questionRefs.current[idx] = el)}
                className={`w-full ${
                  idx === results.length - 1
                    ? 'h-[calc(100vh-var(--topbar-height)-8rem)]'
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
        <div className=''>
          <div className='fixed bottom-32 lg:right-40 md:right-20 right-10 flex flex-col gap-2 z-10'>
            <button
              onClick={scrollToPreviousQuestion}
              className='bg-white p-2 w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50'
            >
              <CustomIcons name='expandMore' className='rotate-180' />
            </button>
            <button
              onClick={scrollToLatestQuestion}
              className='bg-white p-2 w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50'
            >
              <CustomIcons name='expandMore' />
            </button>
          </div>
        </div>
      </section>
    ),
    [results, searchIsLoading, isFirstSearch]
  )
}
