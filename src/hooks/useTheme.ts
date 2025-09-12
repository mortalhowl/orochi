// src/hooks/useTheme.ts
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

export const useTheme = () => {
  // Lấy theme từ localStorage hoặc mặc định là 'system'
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('vite-ui-theme') as Theme) || 'system'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem('vite-ui-theme', newTheme);
    setTheme(newTheme);
  };

  return { theme, setTheme: handleSetTheme };
};