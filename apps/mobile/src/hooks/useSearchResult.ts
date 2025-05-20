import { useState } from 'react'

import useDeviceStore from '@stores/useDevice'

import { AICFOResultType } from '@packages/apis/types'

import { useSearchQuery } from './query/useSearch'

const useSearchResult = () => {
  const [results, setResults] = useState<AICFOResultType[]>([])
  const device = useDeviceStore((state) => state.device)
  const {
    mutate: searchMutation,
    isPending: searchIsLoading,
    isSuccess: searchIsSuccess
  } = useSearchQuery({
    results,
    setResults,
    device
  })

  const handleSearchSubmit = (utterance: string) => {
    const latestSessionId =
      results.length > 0 ? results[results.length - 1]?.session_id : ''
    searchMutation({ utterance, session_id: latestSessionId })
    return searchIsSuccess
  }

  return {
    results,
    setResults,
    handleSearchSubmit,
    searchIsLoading
  }
}

export default useSearchResult
