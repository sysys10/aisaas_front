import { useUserStore } from '@stores'

import {  RequestRemoveUtterance } from '@types'

import {
  useRecentQuestionMutation,
  useRemoveRecentQuestionMutation
} from './query'

type RemoveRecentQuestionParams = Omit<RequestRemoveUtterance, 'userId'>

function useRecentQuestions() {
  const user = useUserStore((s) => s.user)

  const { mutate: getRecentQuestion } = useRecentQuestionMutation()
  const { mutate: removeRecentQuestion } = useRemoveRecentQuestionMutation()

  const handleGetRecentQuestion = () => {
    getRecentQuestion()
  }

  const handleRemoveRecentQuestion = ({
    utterance,
    intentCd,
    utteranceDate,
    type
  }: RemoveRecentQuestionParams) => {
    const userId = user?.userId
    if (!userId) return

    removeRecentQuestion({
      utterance,
      intentCd,
      utteranceDate,
      type,
      userId
    })
  }

  return {
    handleRemoveRecentQuestion,
    handleGetRecentQuestion
  }
}

export { useRecentQuestions }
