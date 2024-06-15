import { create } from 'zustand'

const useStore = create((set) => ({
    hasFixedBottom: false,
    setHasFixedBottom: (flag) => set({ hasFixedBottom: flag }),
    isDark: false,
    setIsDark: (flag) => set({ isDark: flag }),
    newsId: 0,
    setNewsId: (id) => set({ newsId: id }),
    isOpen: 0,
    setIsOpen: (flag) => set({ isOpen: flag }), // 0:close, 1:open, 2: Force open only once & change 1 
    closeSlide: () => set({ newsId: 0, isOpen: 0 }),
}))

export default useStore