import { useState } from 'react'

import { RecommendProps } from '@types'

import { useRecommendMutation } from './query'

export function useRecommend() {
  const [recommendQuestions, setRecommendQuestions] = useState<
    RecommendProps[]
  >([])

  const { mutate: getRecommendQuestions } = useRecommendMutation({
    setRecommendQuestions
  })
  const handleGetRecommendQuestions = () => {
    getRecommendQuestions()
  }

  return {
    recommendQuestions,
    handleGetRecommendQuestions
  }
}
