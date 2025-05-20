import { recommendQuestionApi } from '@apis'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RecommendProps } from '@types'
import { RecommendQuestionResponse } from '@types'

export function useRecommendMutation({
  setRecommendQuestions
}: {
  setRecommendQuestions: (questions: RecommendProps[]) => void
}) {
  const queryClient = useQueryClient()

  return useMutation<RecommendQuestionResponse, void>({
    mutationFn: recommendQuestionApi,
    mutationKey: ['recommendQuestions'],
    onSuccess: (data) => {
      if (data.success) {
        setRecommendQuestions(data.body.body)
        queryClient.setQueryData(['recommendQuestions'], data)
      }
    }
  })
}
