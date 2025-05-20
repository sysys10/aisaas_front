import { SearchRequest } from '@/types'
import { useCallback, useMemo, useState } from 'react'

import { useSearchQuery } from './query'
import { useSearchInput } from './useSearchInput'
import { useSearchResult } from './useSearchResult'

const useSearchHook = ({
  handleGetRecentQuestion
}: {
  handleGetRecentQuestion: () => void
}) => {
  const { search, handleSearch } = useSearchInput()
  const [recommend, setRecommend] = useState<string[]>([])
  const { results, setResults, isFirstSearch, handleResetResults } =
    useSearchResult()

  const {
    mutate: searchMutation,
    isPending: searchIsLoading,
    isSuccess: searchIsSuccess
  } = useSearchQuery({
    results,
    setResults,
    setRecommend,
    handleGetRecentQuestion
  })

  const handleSearchSubmit = useCallback(
    ({ utterance, session_id }: SearchRequest) => {
      const currentSessionId = session_id
        ? session_id
        : results.length > 0
          ? results[results.length - 1].session_id
          : ''
      searchMutation({
        utterance,
        session_id: currentSessionId
      })
      if (searchIsSuccess) {
        handleSearch('')
      }
    },
    [searchMutation, results, searchIsSuccess, handleSearch]
  )

  const returnValue = useMemo(
    () => ({
      search,
      handleSearch,
      recommend,
      handleSearchSubmit,
      results,
      isFirstSearch,
      handleResetResults,
      searchIsLoading,
      searchIsSuccess
    }),
    [
      search,
      handleSearch,
      recommend,
      handleSearchSubmit,
      results,
      isFirstSearch,
      handleResetResults,
      searchIsLoading,
      searchIsSuccess
    ]
  )
  return returnValue
}
export { useSearchHook }
