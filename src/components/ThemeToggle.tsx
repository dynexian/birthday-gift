import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, themeMode, toggleTheme } = useTheme();

  const getIcon = () => {
    switch (themeMode) {
      case 'day': return '☀️';
      case 'night': return '🌙';
      case 'auto': return '🌅';
      default: return '☀️';
    }
  };

  const getLabel = () => {
    switch (themeMode) {
      case 'day': return 'Day';
      case 'night': return 'Night';
      case 'auto': return 'Auto';
      default: return 'Day';
    }
  };

  const handleToggle = () => {
    console.log('ThemeToggle clicked! Current mode:', themeMode);
    toggleTheme();
    console.log('Toggle function called');
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md border transition-all duration-300 group ${
        theme.mode === 'day' 
          ? 'bg-white/90 border-purple-200 text-gray-700 hover:bg-white shadow-lg' 
          : 'bg-slate-800/90 border-slate-600 text-slate-200 hover:bg-slate-700 shadow-xl shadow-purple-500/20'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="flex items-center space-x-2">
        <motion.span 
          className="text-xl"
          key={themeMode} // Force re-render on mode change
          initial={{ rotate: 0 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {getIcon()}
        </motion.span>
        <span className="text-sm font-medium hidden sm:block">{getLabel()}</span>
      </div>
      
      {/* Mobile tooltip */}
      <div className={`absolute top-full right-0 mt-2 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:hidden pointer-events-none ${
        theme.mode === 'day'
          ? 'bg-gray-800 text-white'
          : 'bg-white text-gray-800'
      }`}>
        {getLabel()} Mode
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
