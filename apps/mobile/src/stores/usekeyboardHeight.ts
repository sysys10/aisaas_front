import { create } from 'zustand'

interface ModalStore {
  keyboardHeight: number
  setKeyboardHeight: (keyboardHeight: number) => void
}

const useKeyboardHeight = create<ModalStore>((set) => ({
  keyboardHeight: 0,
  setKeyboardHeight: (keyboardHeight: number) => set({ keyboardHeight })
}))

export default useKeyboardHeight
