import { AICFOResultType, SearchAnswerResponse, SearchRequest } from '@types'

import { searchAnswerApi } from '@packages/apis'

import { createMutation } from './mutationUtils'
import { useCompanyStore, useUserStore } from '@stores/userStore'

interface UseSearchQueryProps {
  results: AICFOResultType[]
  setRecommend: (recommend: string[]) => void
  setResults: React.Dispatch<React.SetStateAction<AICFOResultType[]>>
  handleGetRecentQuestion: () => void
}

export function useSearchQuery({
  results,
  setResults,
  setRecommend,
  handleGetRecentQuestion
}: UseSearchQueryProps) {
  const user = useUserStore((state) => state.user)
  return createMutation<any, SearchRequest>({
    mutationFn: ({ utterance, session_id }) => {
      let isSearching = false
      isSearching = results.some((result) => result.answer === null)

      if (isSearching) {
        return new Promise<SearchAnswerResponse>(() => {})
      }
      setResults((prev) => [
        ...prev,
        {
          utterance,
          answer: null,
          sql_query: '',
          analyzed_question: '',
          data: [],
          session_id: '',
          chain_id: '',
          is_api: false,
          is_muryo: false,
          date_info: []
        }
      ])

      return searchAnswerApi({ utterance, session_id, custCd: user?.companyId })
    },
    onSuccess: (data, request) => {
      console.log('======data======', data)
      setResults((prev) => {
        const newResults = [...prev]
        const lastIndex = newResults.length - 1

        if (lastIndex < 0) return newResults

        newResults[lastIndex] = {
          utterance: request.utterance,
          answer: data.success
            ? data.body.answer
            : `에러가 발생했습니다.${data.message}`,
          table_data: data.success ? data.body.raw_data : [],
          sql_query: data.success ? data.body.sql_query : '',
          session_id: data.success
            ? data.body.session_id
            : (request.session_id ?? ''),
          chain_id: data.success ? data.body.chain_id : '',
          is_api: data.success ? data.body.is_api : false,
          is_muryo: data.success ? data.body.is_muryo : false,
          date_info: data.success ? data.body.date_info : []
        }
        console.log('======newResults======', newResults)
        return newResults
      })

      if (data.success && typeof handleGetRecentQuestion === 'function') {
        setRecommend(data.body.recommend ?? [])
        handleGetRecentQuestion()
      }
    },
    onError: (data, request) => {
      setResults((prev) => {
        const newResults = [...prev]
        const lastIndex = newResults.length - 1

        if (lastIndex >= 0) {
          newResults[lastIndex] = {
            utterance: request.utterance,
            answer: '에러가 발생했습니다.' + data.message,
            table_data: [],
            sql_query: '',
            session_id: request.session_id ?? '',
            chain_id: '',
            is_api: false,
            is_muryo: false,
            date_info: []
          }
        }
        return newResults
      })
    }
  })
}
