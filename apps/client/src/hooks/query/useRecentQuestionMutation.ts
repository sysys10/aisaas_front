import { recentQuestionStore, useUserStore } from '@stores'

import {
  BodyStringResponse,
  RecentQuestionProps,
  RecentQuestionsRequest,
  RequestRemoveUtterance,
  postRecentQuestionsResponse
} from '@types'

import { postRecentQuestions, postRemoveRecentQuestion } from '@packages/apis'

import { createMutation } from './mutationUtils'

function useRecentQuestionMutation() {
  const setRecentQuestions = recentQuestionStore((s) => s.setRecentQuestions)
  return createMutation<postRecentQuestionsResponse, void>({
    mutationFn: postRecentQuestions,
    onSuccess: (data, _, __) => {
      if (data.success) {
        setRecentQuestions(data.body)
      }
    }
  })
}

function useRemoveRecentQuestionMutation() {
  const setRecentQuestions = recentQuestionStore((s) => s.setRecentQuestions)

  return createMutation<BodyStringResponse, RequestRemoveUtterance>({
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

export { useRecentQuestionMutation, useRemoveRecentQuestionMutation }
