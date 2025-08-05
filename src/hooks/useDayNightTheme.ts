import { useState, useEffect } from 'react';

export type ThemeMode = 'day' | 'night' | 'auto';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  card: string;
  border: string;
  shadow: string;
  particles: string;
}

export interface Theme {
  mode: 'day' | 'night';
  colors: ThemeColors;
  gradients: {
    background: string;
    card: string;
    button: string;
    text: string;
  };
}

const dayTheme: Theme = {
  mode: 'day',
  colors: {
    primary: 'rgb(139, 92, 246)', // purple-500
    secondary: 'rgb(236, 72, 153)', // pink-500
    background: 'rgb(248, 250, 252)', // slate-50
    text: 'rgb(71, 85, 105)', // slate-600
    accent: 'rgb(59, 130, 246)', // blue-500
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
};

const nightTheme: Theme = {
  mode: 'night',
  colors: {
    primary: 'rgb(168, 85, 247)', // purple-400
    secondary: 'rgb(244, 114, 182)', // pink-400
    background: 'rgb(15, 23, 42)', // slate-900
    text: 'rgb(203, 213, 225)', // slate-300
    accent: 'rgb(96, 165, 250)', // blue-400
    card: 'rgba(30, 41, 59, 0.8)', // slate-800 with opacity
    border: 'rgba(148, 163, 184, 0.3)', // slate-400 with opacity
    shadow: 'rgba(168, 85, 247, 0.25)',
    particles: 'rgba(168, 85, 247, 0.4)'
  },
  gradients: {
    background: 'from-slate-900 via-purple-900 to-indigo-900',
    card: 'from-slate-800/70 to-slate-700/90',
    button: 'from-purple-400 to-pink-400',
    text: 'from-purple-400 via-pink-400 to-blue-400'
  }
};

export const useDayNightTheme = () => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('night'); // Start with 'night' as default
  const [currentTheme, setCurrentTheme] = useState<Theme>(nightTheme);

  // Auto theme based on time of day
  const getAutoTheme = (): 'day' | 'night' => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? 'day' : 'night';
  };

  // Update theme when mode changes
  useEffect(() => {
    const determineTheme = () => {
      if (themeMode === 'auto') {
        return getAutoTheme() === 'day' ? dayTheme : nightTheme;
      }
      return themeMode === 'day' ? dayTheme : nightTheme;
    };

    setCurrentTheme(determineTheme());
  }, [themeMode]);

  // Auto update theme every minute when in auto mode
  useEffect(() => {
    if (themeMode !== 'auto') return;

    const interval = setInterval(() => {
      const autoTheme = getAutoTheme();
      setCurrentTheme(autoTheme === 'day' ? dayTheme : nightTheme);
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [themeMode]);

  const toggleTheme = () => {
    console.log('Toggle theme called, current mode:', themeMode);
    setThemeMode(prev => {
      const newMode = prev === 'day' ? 'night' : prev === 'night' ? 'auto' : 'day';
      console.log('New theme mode:', newMode);
      return newMode;
    });
  };

  return {
    theme: currentTheme,
    themeMode,
    setThemeMode,
    toggleTheme
  };
};
