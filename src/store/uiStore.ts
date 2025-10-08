import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
type Theme = 'light' | 'dark' | 'system';
interface UiState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}
export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      isSidebarOpen: false,
      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    }),
    {
      name: 'zenith-suite-ui-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);