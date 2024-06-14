import { create } from 'zustand'

const useStore = create((set) => ({
    hasFixedBottom: false,
    setHasFixedBottom: (flag) => set({ hasFixedBottom: flag }),
    isDark: false,
    setIsDark: (flag) => set({ isDark: flag }),
    newsId: 0,
    setNewsId: (id) => set({ newsId: id }),
    isOpen: false,
    setIsOpen: (flag) => set({ isOpen: flag }),
}))

export default useStore 