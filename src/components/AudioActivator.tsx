import React from 'react';
import { motion } from 'framer-motion';
import { useAudioManager } from '../hooks/useAudio';

interface AudioActivatorProps {
  onActivate: () => void;
}

export const AudioActivator: React.FC<AudioActivatorProps> = ({ onActivate }) => {
  const { playSound } = useAudioManager();
  
  const handleClick = () => {
    // Enable audio context
    const audio = new Audio();
    audio.volume = 0;
    audio.play().then(() => {
      // Audio context successfully activated
      // Play a confirmation sound
      setTimeout(() => {
        playSound('button-click', { volume: 0.7 });
      }, 100);
    }).catch(() => {
      // Audio activation failed, but continue anyway
    });
    
    onActivate();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={handleClick}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 rounded-2xl text-center cursor-pointer hover:scale-105 transition-transform duration-300 border border-purple-500/30"
      >
        <motion.div
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(147, 51, 234, 0.5)',
              '0 0 40px rgba(147, 51, 234, 0.8)',
              '0 0 20px rgba(147, 51, 234, 0.5)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <div className="text-6xl mb-4">🎵</div>
        </motion.div>
        
        <h2 className="text-2xl font-bold text-white mb-4">Enable Audio Experience</h2>
        <p className="text-purple-200 mb-6 max-w-md">
          Click anywhere to activate sound effects and background music for the full birthday experience!
        </p>
        
        <motion.div
          animate={{ 
            backgroundColor: [
              'rgba(147, 51, 234, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(147, 51, 234, 0.8)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="px-6 py-3 rounded-lg text-white font-semibold"
        >
          Click to Start 🎶
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
