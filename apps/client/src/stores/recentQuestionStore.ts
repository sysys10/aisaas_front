import { create } from 'zustand'

import { RecentQuestionProps } from '@types'

interface RecentQuestionStore {
  recentQuestions: RecentQuestionProps[]
  setRecentQuestions: (questions: RecentQuestionProps[]) => void
}

export const recentQuestionStore = create<RecentQuestionStore>((set) => ({
  recentQuestions: [],
  setRecentQuestions: (questions) => set({ recentQuestions: questions })
}))
