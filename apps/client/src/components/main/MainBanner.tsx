import { useRecommend } from '@hooks'
import { useEffect, useRef, useState } from 'react'

import { MainBannerProps } from '@types'

import { Chip } from '@packages/components'

import { RecommendQuestions } from './search/RecomendQuestions'

export function MainBanner({ searchBarRef, ...props }: MainBannerProps) {
  const mainBannerRef = useRef<HTMLDivElement>(null)

  const { handleSearchSubmit, isFirstSearch, recommend } = props

  const [toggleContent, setToggleContent] = useState<number | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !searchBarRef.current?.contains(event.target as Node) &&
        !mainBannerRef.current?.contains(event.target as Node)
      ) {
        setToggleContent(null)
      }
    }
    if (toggleContent) {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setToggleContent(null)
        }
      })
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [toggleContent, searchBarRef])

  const handleToggleOpen = (content: number) => {
    if (toggleContent === content) {
      setToggleContent(null)
    } else {
      setToggleContent(content)
    }
  }
  const handleQuestionClick = (utterance: string) => {
    handleSearchSubmit({ utterance })
    setToggleContent(null)
  }

  const { recommendQuestions, handleGetRecommendQuestions } = useRecommend()
  useEffect(() => {
    handleGetRecommendQuestions()
  }, [])

  return isFirstSearch ? (
    <div className='relative mx-auto max-w-5xl w-full h-[calc(50vh-3rem)] px-4 flex flex-col'>
      <div className='space-y-2'>
        {!toggleContent ? (
          <>
            <div
              className='flex gap-x-2 max-md:flex-wrap justify-center mt-6'
              style={{ animation: 'slideUp 0.5s' }}
            >
              {recommendQuestions ? (
                recommendQuestions.map((v, i) => (
                  <Chip
                    onClick={() => handleToggleOpen(i + 1)}
                    key={i}
                    variant='outlined'
                    size='sm'
                    className='text-sm whitespace-nowrap bg-white text-[#767676] cursor-pointer rounded-full shadow-[0px_2px_7px_0px_rgba(118,118,118,0.12)]'
                  >
                    <img src={v.imgpath} alt={v.ctgrynm} className='w-4 h-4' />
                    {v.ctgrynm}
                  </Chip>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </>
        ) : (
          <div ref={mainBannerRef}>
            <div
              className='flex flex-col mt-4'
              style={{
                animationFillMode: 'both',
                willChange: 'transform, opacity'
              }}
            >
              {recommendQuestions[toggleContent - 1].recommendquest.map(
                (v, idx) => (
                  <div
                    style={{ animation: `slideUp ${0.2 * idx}s` }}
                    className={`py-3 border-b border-border px-6 text-base text-prinart cursor-pointer hover:bg-gray-50 transition-colors duration-200`}
                    onClick={() => handleQuestionClick(v)}
                    key={v}
                  >
                    {v}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <RecommendQuestions
      recommend={recommend}
      handleSearchSubmit={handleSearchSubmit}
    />
  )
}
