import { deviceType } from '@/types/device'
import { create } from 'zustand'

interface DeviceStore {
  device: deviceType
  setDevice: (device: deviceType) => void
}
const useDeviceStore = create<DeviceStore>((set) => ({
  device: 'ios',
  setDevice: (device: deviceType) => set({ device })
}))

export default useDeviceStore
