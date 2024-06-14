import { create } from 'zustand'

const useStore = create((set) => ({
    hasFixedBottom: false,
    setHasFixedBottom: (flag) => set({ hasFixedBottom: flag }),
    isDark: false,
    setIsDark: (flag) => set({ isDark: flag }),
}))

export default useStore 