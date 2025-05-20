import { create } from "zustand";

interface AdminTokenStore {   
    adminToken: string;
    setAdminToken: (adminToken: string) => void;
}

export const useAdminTokenStore = create<AdminTokenStore>((set) => ({
    adminToken: '',
    setAdminToken: (adminToken) => set({ adminToken }),
}))