import React, { createContext, useContext, ReactNode } from 'react';
import { useDayNightTheme, Theme, ThemeMode } from '../hooks/useDayNightTheme';

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeData = useDayNightTheme();

  return (
    <ThemeContext.Provider value={themeData}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Provide fallback theme data to prevent crashes
    console.warn('useTheme must be used within a ThemeProvider');
    return {
      theme: {
        mode: 'day',
        colors: {
          primary: 'rgb(139, 92, 246)',
          secondary: 'rgb(236, 72, 153)',
          background: 'rgb(248, 250, 252)',
          text: 'rgb(71, 85, 105)',
          accent: 'rgb(59, 130, 246)',
          card: 'rgba(255, 255, 255, 0.8)',
          border: 'rgba(255, 255, 255, 0.5)',
          shadow: 'rgba(139, 92, 246, 0.15)',
          particles: 'rgba(139, 92, 246, 0.3)'
        },
        gradients: {
          background: 'from-sky-50 via-purple-50 to-pink-50',
          card: 'from-white/70 to-white/90',
          button: 'from-purple-500 to-pink-500',
          text: 'from-purple-600 via-pink-600 to-indigo-600'
        }
      },
      themeMode: 'day',
      setThemeMode: () => {},
      toggleTheme: () => {}
    };
  }
  return context;
};
