import { create } from 'zustand'

interface SidebarStore {
  sidebarContent: 'brf' | 'setting' | 'recentQuestion'
  isSidebarOpen: boolean
  setSidebarContent: (content: 'brf' | 'setting' | 'recentQuestion') => void
  setIsSidebarOpen: (isOpen: boolean) => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  sidebarContent: 'recentQuestion',
  isSidebarOpen: false,
  setSidebarContent: (content) => set({ sidebarContent: content }),
  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen })
}))
