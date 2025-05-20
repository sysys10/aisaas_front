import { create } from 'zustand'

interface AdminStoreProps {
  adminUrl: string
  setAdminUrl: (adminUrl: string) => void
}

export const useAdminStore = create<AdminStoreProps>((set) => ({
  adminUrl: '',
  setAdminUrl: (adminUrl: string) => set({ adminUrl })
}))
