import { MAIN_SEARCHBAR_CONSTANTS } from '@constants'
import { cn } from 'node_modules/@packages/components/src/lib/utils'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import CustomIcons from '@components/common/CustomIcons'

import { SearchBarProps } from '@types'

import useClipboardEvent from './hooks/useClipboard'

export function SearchBar({ searchBarRef, ...props }: SearchBarProps) {
  const { search, handleSearch, handleSearchSubmit, isFirstSearch } = props
  const inputRef = useClipboardEvent(handleSearch)

  const [isAnimating, setIsAnimating] = useState(true)
  const [currentPlaceholder, setCurrentPlaceholder] = useState(
    MAIN_SEARCHBAR_CONSTANTS[0]
  )
  const [animationKey, setAnimationKey] = useState(0)
  const placeholderContainerRef = useRef<HTMLDivElement>(null)

  // isFirstSearch가 true일 때만 애니메이션 실행
  useEffect(() => {
    if (!isAnimating || !isFirstSearch) return

    const interval = setInterval(() => {
      const nextIndex =
        (MAIN_SEARCHBAR_CONSTANTS.indexOf(currentPlaceholder) + 1) %
        MAIN_SEARCHBAR_CONSTANTS.length
      setCurrentPlaceholder(MAIN_SEARCHBAR_CONSTANTS[nextIndex])
      setAnimationKey((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAnimating, currentPlaceholder, isFirstSearch])

  const handleFocus = useCallback(() => {
    setIsAnimating(false)
  }, [])

  const handleBlur = useCallback(() => {
    if (search.trim() === '' && isFirstSearch) {
      setIsAnimating(true)
    }
  }, [search, isFirstSearch])

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (search.trim() === '') return
      handleSearchSubmit({
        utterance: search
      })
      handleSearch('')
    },
    [search, handleSearch, handleSearchSubmit]
  )

  const handleClearSearch = useCallback(() => {
    handleSearch('')
    inputRef.current?.focus()
  }, [handleSearch])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isFirstSearch) return

      if (e.key === 'Enter' && !search) {
        e.preventDefault()
        handleSearchSubmit({ utterance: currentPlaceholder })
        handleSearch('')
      }
      if (e.key === 'Tab' && !search) {
        e.preventDefault()
        handleSearch(currentPlaceholder)
      }
    },
    [
      search,
      currentPlaceholder,
      handleSearch,
      isFirstSearch,
      handleSearchSubmit
    ]
  )

  const showPlaceholder = search.length === 0 && isFirstSearch

  return useMemo(
    () => (
      <div className='relative w-full'>
        <div className='mx-auto flex w-full h-full max-w-3xl px-2 md:px-4 items-center'>
          <div
            ref={searchBarRef}
            className={cn(
              'flex w-full group flex-col justify-start h-full items-start rounded-xl border border-background-secondary transition-colors focus-within:border-aicfo focus-within:bg-background-primary group/search',
              search.length > 0
                ? 'border-aicfo bg-background-primary'
                : 'bg-background-secondary'
            )}
          >
            <form
              onSubmit={handleSubmit}
              className='flex w-full searchform group flex-1 px-4 items-center'
            >
              <div className='relative w-full'>
                <input
                  ref={inputRef}
                  onChange={(e) => handleSearch(e.target.value)}
                  value={search}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className='w-full group rounded-lg bg-transparent h-searchbar-height pl-2 text-base outline-none md:pl-4'
                  type='text'
                  placeholder={
                    !isFirstSearch ? '어떤 업무를 도와드릴까요?' : ''
                  }
                />
                {showPlaceholder && (
                  <div
                    ref={placeholderContainerRef}
                    className='absolute left-2 md:left-4 top-0 bottom-0 flex items-center pointer-events-none text-secondary'
                  >
                    <div key={animationKey} className='placeholder-animation'>
                      {currentPlaceholder}
                    </div>
                  </div>
                )}
              </div>
              {search.length > 0 && (
                <button
                  type='button'
                  className='pr-1.5 outline-none'
                  onClick={handleClearSearch}
                >
                  <CustomIcons
                    name='close'
                    className='bg-[#D9D9D9] p-0.5 h-5 w-5 rounded-full'
                    iconClassName='text-white'
                  />
                </button>
              )}
              <button
                type='submit'
                className='h-8 w-8 flex-shrink-0 items-center justify-center rounded-full outline-none'
              >
                <CustomIcons name='search' iconClassName='text-aicfo w-6 h-6' />
              </button>
            </form>
          </div>
        </div>

        <style>{`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translate3d(0, -20px, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          .placeholder-animation {
            animation: fadeInDown 0.5s;
            display: inline-block;
          }
        `}</style>
      </div>
    ),
    [
      search,
      handleSearch,
      searchBarRef,
      handleSubmit,
      handleClearSearch,
      handleSearchSubmit,
      currentPlaceholder,
      handleFocus,
      handleBlur,
      handleKeyDown,
      showPlaceholder,
      isFirstSearch,
      animationKey
    ]
  )
}
