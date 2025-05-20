import { create } from 'zustand'

interface SidebarStore {
  sidebarContent: 'brf' | 'setting'
  isSidebarOpen: boolean
  setSidebarContent: (content: 'brf' | 'setting') => void
  setIsSidebarOpen: (isOpen: boolean) => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  sidebarContent: 'brf',
  isSidebarOpen: false,
  setSidebarContent: (content) => set({ sidebarContent: content }),
  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen })
}))
