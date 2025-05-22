import { recentQuestionStore } from '@stores'

import {
  BodyStringResponse,
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
        setRecentQuestions(data.body.rec)
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
          setRecentQuestions(response.body.rec)
        }
      }
    }
  })
}

export { useRecentQuestionMutation, useRemoveRecentQuestionMutation }
