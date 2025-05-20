import { create } from 'zustand'

import { RecommendProps } from '@types'

interface RecommendQuestionStore {
  recommendQuestions: RecommendProps[]
  setRecommendQuestions: (questions: RecommendProps[]) => void
}

export const recommendQuestionStore = create<RecommendQuestionStore>((set) => ({
  recommendQuestions: [],
  setRecommendQuestions: (questions) => set({ recommendQuestions: questions })
}))
