import { deviceType } from '@/types'

import handleMobileActions from '@utils/nativeActionHandler'

import { searchAnswerApi } from '@packages/apis'
import {
  AICFOResultType,
  SearchAnswerResponse,
  SearchRequest
} from '@packages/apis/types'

import { createMutation } from './mutationUtils'

interface UseSearchQueryProps {
  results: AICFOResultType[]
  setResults: React.Dispatch<React.SetStateAction<AICFOResultType[]>>
  device: deviceType
}

export function useSearchQuery({
  results,
  setResults,
  device
}: UseSearchQueryProps) {
  return createMutation<SearchAnswerResponse, SearchRequest>({
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
          analyzed_question: '',
          data: [],
          session_id: '',
          chain_id: '',
          is_api: false,
          is_muryo: false,
          date_info: []
        }
      ])
      return searchAnswerApi({ utterance, session_id })
    },
    onSuccess: (data, request) => {
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
          session_id: data.success
            ? data.body.session_id
            : (request.session_id ?? ''),
          chain_id: data.success ? data.body.chain_id : '',
          is_api: data.success ? data.body.is_api : false,
          is_muryo: data.success ? data.body.is_muryo : false,
          date_info: data.success ? data.body.date_info : []
        }
        return newResults
      })

      if (data.success) {
        handleMobileActions(
          device,
          'addrecommend',
          data.body.recommend?.map((item) => item).join('|') ?? ''
        )
        handleMobileActions(device, 'gotts', data.body.answer)
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
            session_id: request.session_id ?? '',
            chain_id: '',
            is_api: false,
            is_muryo: false
          }
        }
        return newResults
      })
    }
  })
}
