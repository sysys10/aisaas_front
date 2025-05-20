import { useEffect, useMemo, useState } from 'react'

import { AICFOResultType } from '@packages/apis/types'

const useSearchResult = () => {
  const [results, setResults] = useState<AICFOResultType[]>([])
  const [isFirstSearch, setIsFirstSearch] = useState(true)

  useEffect(() => {
    if (results.length > 0 && isFirstSearch) {
      setIsFirstSearch(false)
    }
  }, [results, isFirstSearch])

  const handleResetResults = () => {
    setResults([])
    setIsFirstSearch(true)
  }

  const returnValue = useMemo(
    () => ({
      results,
      setResults,
      isFirstSearch,
      handleResetResults
    }),
    [results, setResults, isFirstSearch]
  )
  return returnValue
}

export { useSearchResult }
