'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      id="theme-toggle"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Alternar tema claro/escuro"
      className="p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
    >
      <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true"></i>
    </button>
  );
}
