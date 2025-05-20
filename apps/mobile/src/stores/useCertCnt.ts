import { create } from 'zustand'

interface CertCntState {
  certCnt: string
  setCertCnt: (certCnt: string) => void
}

export const useCertCntStore = create<CertCntState>((set) => ({
  certCnt: '0',
  setCertCnt: (certCnt) => set({ certCnt })
}))
