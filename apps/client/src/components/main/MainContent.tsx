import { AnswerSection } from '@components/answers'

import { MainContentProps } from '@types'

import { SearchSection } from './search/SearchSection'

function MainContent({ ...props }: MainContentProps) {
  const {
    results,
    handleSearchSubmit,
    isFirstSearch,
    searchIsLoading,
    ...rest
  } = props

  return (
    <div
      className={`flex h-full w-full flex-col max-md:pl-20 justify-end relative z-0`}
    >
      <AnswerSection
        {...{
          isFirstSearch,
          handleSearchSubmit,
          searchIsLoading,
          results
        }}
      />
      <SearchSection
        {...{
          handleSearchSubmit,
          isFirstSearch,
          ...rest
        }}
      />
      {isFirstSearch && (
        <p className='text-sm text-gray-400 absolute left-1/2 -translate-x-1/2 bottom-10'>
          AIBRANCH는 답변을 생성하는 과정에서 실수할 수 있습니다.
        </p>
      )}
    </div>
  )
}

export { MainContent }
