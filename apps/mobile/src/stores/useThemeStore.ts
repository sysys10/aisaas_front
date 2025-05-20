import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'system', // 기본값을 system으로 설정
      setTheme: (theme: Theme) => set({ theme }),
      toggleTheme: () =>
        set((state: { theme: Theme }) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        }))
    }),
    {
      name: 'theme'
    }
  )
)
export default useThemeStore
