import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'portfolio-theme-mode';

const readStoredTheme = () => {
  if (typeof window === 'undefined') {
    return true;
  }

  const value = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (value === 'light') {
    return false;
  }
  if (value === 'dark') {
    return true;
  }
  return true;
};

export const useThemeMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(readStoredTheme);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((current) => !current);

  return { isDarkMode, toggleDarkMode };
};
