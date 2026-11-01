import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'portfolio-theme-mode';

const readStoredTheme = () => {
  if (typeof window === 'undefined') {
    return true;
  }

  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (value === 'light') {
      return false;
    }
    if (value === 'dark') {
      return true;
    }
  } catch {
    // Storage can be blocked; fall through to the system preference.
  }
  return !window.matchMedia('(prefers-color-scheme: light)').matches;
};

export const useThemeMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(readStoredTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch {
      // Ignore storage failures; the theme still applies for this visit.
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((current) => !current);

  return { isDarkMode, toggleDarkMode };
};
