import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { RightSidebar } from './RightSidebar';
import { useUiStore } from '@/store/uiStore';
import { Toaster } from '@/components/ui/sonner';
export function AppLayout() {
  const theme = useUiStore((state) => state.theme);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <div className="relative flex min-h-screen flex-col">
        <TopNav />
        <div className="flex-1 flex">
          <main className="flex-1 p-6 md:p-8">
            <Outlet />
          </main>
          <RightSidebar />
        </div>
      </div>
      <Toaster />
    </div>
  );
}