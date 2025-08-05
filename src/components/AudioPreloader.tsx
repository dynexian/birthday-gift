import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AudioPreloaderProps {
  onComplete: () => void;
}

interface AudioFile {
  key: string;
  path: string;
  type: 'music' | 'sound';
}

const AudioPreloader: React.FC<AudioPreloaderProps> = ({ onComplete }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [currentlyLoading, setCurrentlyLoading] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasError, setHasError] = useState(false);

  const audioFiles: AudioFile[] = [
    // Background Music
    { key: 'theme-birthday', path: '/audio/music/theme-birthday.mp3', type: 'music' },
    { key: 'celebration', path: '/audio/music/celebration.mp3', type: 'music' },
    { key: 'gentle-piano', path: '/audio/music/gentle-piano.mp3', type: 'music' },
    { key: 'ambient-magical', path: '/audio/music/ambient-magical.mp3', type: 'music' },
    
    // Sound Effects
    { key: 'balloon-pop', path: '/audio/sounds/balloon-pop.mp3', type: 'sound' },
    { key: 'button-click', path: '/audio/sounds/button-click.mp3', type: 'sound' },
    { key: 'cake-cut', path: '/audio/sounds/cake-cut.mp3', type: 'sound' },
    { key: 'happy-birthday', path: '/audio/sounds/happy-birthday.mp3', type: 'sound' },
    { key: 'sparkle', path: '/audio/sounds/sparkle.mp3', type: 'sound' },
    { key: 'word-hover', path: '/audio/sounds/word-hover.mp3', type: 'sound' },
    { key: 'confetti', path: '/audio/sounds/confetti.mp3', type: 'sound' },
    { key: 'countdown-tick', path: '/audio/sounds/countdown-tick.mp3', type: 'sound' },
    { key: 'countdown-complete', path: '/audio/sounds/countdown-complete.mp3', type: 'sound' },
    { key: 'page-transition', path: '/audio/sounds/page-transition.mp3', type: 'sound' },
  ];

  useEffect(() => {
    setTotalCount(audioFiles.length);
    preloadAudio();
  }, []);

  const preloadAudio = async () => {
    let loadedFiles = 0;
    const loadPromises: Promise<void>[] = [];

    for (const audioFile of audioFiles) {
      const loadPromise = new Promise<void>((resolve) => {
        setCurrentlyLoading(audioFile.key);
        
        const audio = new Audio();
        audio.preload = 'auto';
        
        const onLoad = () => {
          loadedFiles++;
          setLoadedCount(loadedFiles);
          setCurrentlyLoading('');
          
          // Store preloaded audio globally for later use
          if (!window.preloadedAudio) {
            window.preloadedAudio = {};
          }
          window.preloadedAudio[audioFile.key] = audio;
          
          resolve();
        };

        const onError = () => {
          console.warn(`Failed to load audio: ${audioFile.path}`);
          loadedFiles++;
          setLoadedCount(loadedFiles);
          setCurrentlyLoading('');
          resolve(); // Don't fail the entire process for one file
        };

        const onTimeout = () => {
          console.warn(`Timeout loading audio: ${audioFile.path}`);
          loadedFiles++;
          setLoadedCount(loadedFiles);
          setCurrentlyLoading('');
          resolve();
        };

        // Set a timeout for each file (5 seconds max)
        const timeoutId = setTimeout(onTimeout, 5000);

        const handleLoad = () => {
          clearTimeout(timeoutId);
          onLoad();
        };

        const handleError = () => {
          clearTimeout(timeoutId);
          onError();
        };

        audio.addEventListener('canplaythrough', handleLoad, { once: true });
        audio.addEventListener('error', handleError, { once: true });
        
        // Start loading
        audio.src = audioFile.path;
        audio.load();
      });

      loadPromises.push(loadPromise);
    }

    try {
      await Promise.all(loadPromises);
      
      // Show completion state briefly before calling onComplete
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
      
    } catch (error) {
      console.error('Error preloading audio:', error);
      setHasError(true);
      // Still allow the app to continue after a delay
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const skipPreloader = () => {
    setIsComplete(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const progressPercentage = totalCount > 0 ? (loadedCount / totalCount) * 100 : 0;

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 max-w-md mx-auto px-6 relative z-10">
        {/* Loading Icon */}
        <motion.div
          className="mx-auto w-20 h-20 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-purple-300 rounded-full border-t-white"></div>
          <motion.div
            className="absolute inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎵
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🎉 Getting Ready 🎉
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl text-purple-200 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Loading magical sounds for your special day...
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          className="w-full bg-purple-800 rounded-full h-4 overflow-hidden shadow-inner"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 rounded-full relative overflow-hidden"
            style={{ width: `${progressPercentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.3 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>

        {/* Progress Text */}
        <motion.div
          className="text-purple-200 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg font-medium">
            {loadedCount} of {totalCount} files loaded
          </p>
          
          {currentlyLoading && (
            <motion.p
              className="text-sm text-purple-300"
              key={currentlyLoading}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Loading: {currentlyLoading}
            </motion.p>
          )}

          {isComplete && (
            <motion.p
              className="text-lg text-green-300 font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              ✨ Ready to celebrate! ✨
            </motion.p>
          )}

          {hasError && (
            <motion.p
              className="text-lg text-yellow-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Some files couldn't load, but let's party anyway! 🎉
            </motion.p>
          )}
        </motion.div>

        {/* Skip Button */}
        <motion.button
          onClick={skipPreloader}
          className="mt-8 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-semibold transition-colors duration-200 border-2 border-purple-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Skip Loading
        </motion.button>

        {/* Loading Tips */}
        <motion.div
          className="mt-6 text-sm text-purple-300 max-w-xs mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p>💡 Tip: Allow audio permissions for the best experience!</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Global type declaration for preloaded audio
declare global {
  interface Window {
    preloadedAudio?: Record<string, HTMLAudioElement>;
  }
}

export default AudioPreloader;
