import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { UserInfo } from '@packages/apis/types'

interface UserStore {
  user: UserInfo | null
  setUser: (user: UserInfo) => void
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserInfo) => set({ user })
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useUserStore
