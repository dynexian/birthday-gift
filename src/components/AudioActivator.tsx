import React from 'react';
import { motion } from 'framer-motion';
import { useAudioManager } from '../hooks/useAudio';

interface AudioActivatorProps {
  onActivate: () => void;
}

export const AudioActivator: React.FC<AudioActivatorProps> = ({ onActivate }) => {
  const { playSound } = useAudioManager();
  
  const handleClick = async () => {
    console.log('🎵 AudioActivator clicked - enabling audio');
    
    try {
      // Test 1: Check AudioContext state and resume if needed
      if (window.AudioContext || (window as any).webkitAudioContext) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContextClass();
        console.log('🔊 AudioContext state:', audioContext.state);
        
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
          console.log('✅ AudioContext resumed');
        }
      }
      
      // Test 2: Basic audio context activation with user gesture
      const testAudio = new Audio();
      testAudio.volume = 0.0; // Very quiet test
      testAudio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+Djr2geBT2N0+/Yfi4FLnHA6tyWTQsQUr7l5Z1SFApEo9vmr2UbBzyQ1+7Sghwe';
      
      await testAudio.play();
      console.log('✅ Basic audio play successful');
      testAudio.pause();
      
      // Test 3: Try to play actual audio file directly
      const directAudio = new Audio(`${process.env.PUBLIC_URL}/audio/sounds/button-click.mp3`);
      directAudio.volume = 0.0;
      const playPromise = directAudio.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        console.log('✅ Direct audio file play successful');
      }
      
      // Test 4: Check preloaded audio
      console.log('📂 Checking window.preloadedAudio:', window.preloadedAudio);
      if (window.preloadedAudio) {
        console.log('📂 Keys in preloadedAudio:', Object.keys(window.preloadedAudio));
      }
      
      // Test 5: Try useAudioManager after a short delay
      setTimeout(() => {
        console.log('🎮 Testing playSound from useAudioManager');
        playSound('button-click', { volume: 0.0 });
      }, 200);
      
    } catch (error) {
      console.error('❌ Audio activation error:', error);
      
      // Fallback: Try direct audio anyway
      setTimeout(() => {
        console.log('🔄 Fallback: Trying playSound anyway');
        playSound('button-click', { volume: 0.0 });
      }, 100);
    }
    
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
