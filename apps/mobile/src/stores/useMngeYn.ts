import { create } from 'zustand'

interface MngeYnState {
  mngeYn: 'Y' | 'N'
  setMngeYn: (mngeYn: 'Y' | 'N') => void
}

export const useMngeYnStore = create<MngeYnState>((set) => ({
  mngeYn: 'N',
  setMngeYn: (mngeYn) => set({ mngeYn })
}))
