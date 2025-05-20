import { useRef } from 'react'

import { SearchSubmitType } from '@types'

import { MainBanner } from '../MainBanner'
import { SearchBar } from './SearchBar'

interface SearchSectionProps {
  isFirstSearch: boolean
  handleSearch: (value: string) => void
  search: string
  handleSearchSubmit: SearchSubmitType
  recommend: string[]
}

function SearchSection({ isFirstSearch, ...props }: SearchSectionProps) {
  const searchBarRef = useRef<HTMLDivElement>(null)
  return (
    <div
      className={`flex relative w-full shrink-0 flex-col sm:px-2 justify-center`}
    >
      {isFirstSearch && (
        <h1 className='text-2xl mb-6 font-bold text-center leading-8 tracking-tighter'>
          어떤 업무를 도와드릴까요?
        </h1>
      )}
      <div
        className={`flex ${isFirstSearch ? 'flex-col' : 'flex-col-reverse gap-y-2 pb-4'}`}
      >
        <SearchBar
          searchBarRef={searchBarRef}
          {...{ isFirstSearch, ...props }}
        />
        <MainBanner
          searchBarRef={searchBarRef}
          {...{ isFirstSearch, ...props }}
        />
      </div>
    </div>
  )
}

export { SearchSection }
