import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { postRecentQuestions, postRemoveRecentQuestion } from '@packages/apis'
import {
  BodyStringResponse,
  RecentQuestionProps,
  RecentQuestionsRequest,
  RequestRemoveUtterance,
  postRecentQuestionsResponse
} from '@packages/apis/types'

interface RecentQuestionMutationProps {
  setRecentQuestions: (data: RecentQuestionProps[]) => void
}

interface RecentQuestionHookResult {
  recentQuestions: RecentQuestionProps[]
  getRecentQuestion: (request: RecentQuestionsRequest) => void
  removeRecentQuestion: (request: RequestRemoveUtterance) => void
}

function useRecentQuestionMutation({
  setRecentQuestions
}: RecentQuestionMutationProps) {
  return useMutation<
    postRecentQuestionsResponse,
    Error,
    RecentQuestionsRequest
  >({
    mutationFn: postRecentQuestions,
    onSuccess: (data, _, __) => {
      if (data.success) {
        setRecentQuestions(data.body)
      }
    }
  })
}

function useRemoveRecentQuestionMutation({
  setRecentQuestions
}: RecentQuestionMutationProps) {
  return useMutation<BodyStringResponse, Error, RequestRemoveUtterance>({
    mutationFn: postRemoveRecentQuestion,
    onSuccess: async (data, _, __) => {
      if (data.success) {
        const response = await postRecentQuestions()
        if (response.success) {
          setRecentQuestions(response.body)
        }
      }
    }
  })
}

function useRecentQuestionQuery(): RecentQuestionHookResult {
  const [recentQuestions, setRecentQuestions] = useState<RecentQuestionProps[]>(
    []
  )

  const getRecentQuestion = useRecentQuestionMutation({
    setRecentQuestions
  })

  const removeRecentQuestion = useRemoveRecentQuestionMutation({
    setRecentQuestions
  })

  return {
    recentQuestions,
    getRecentQuestion: getRecentQuestion.mutate,
    removeRecentQuestion: removeRecentQuestion.mutate
  }
}

export default useRecentQuestionQuery
