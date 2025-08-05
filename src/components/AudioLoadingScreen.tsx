import React from 'react';
import { motion } from 'framer-motion';

interface AudioLoadingScreenProps {
  progress: {
    loaded: number;
    total: number;
    currentFile: string;
    isComplete: boolean;
    hasError: boolean;
  };
  onComplete: () => void;
}

const AudioLoadingScreen: React.FC<AudioLoadingScreenProps> = ({ progress, onComplete }) => {
  const percentage = progress.total > 0 ? (progress.loaded / progress.total) * 100 : 0;
  const [audioEnabled, setAudioEnabled] = React.useState(false);

  React.useEffect(() => {
    if (progress.isComplete && audioEnabled) {
      // Small delay to show completion before transitioning
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [progress.isComplete, onComplete, audioEnabled]);

  const enableAudioAndStart = async () => {
    try {
      // Create a silent audio element and play it to enable audio context
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYedSkF');
      audio.volume = 0;
      await audio.play();
      console.log('🔊 Audio context enabled');
      
      // Test sound to verify audio is working
      console.log('🔊 Testing audio system...');
      
      setAudioEnabled(true);
    } catch (error) {
      console.warn('Audio enable failed, proceeding anyway:', error);
      setAudioEnabled(true);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 px-8 max-w-md w-full relative z-10">
        {/* Loading Icon */}
        <motion.div
          className="w-24 h-24 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full border-4 border-purple-300 border-t-white"></div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          🎵 Preparing Your Birthday Experience
        </motion.h1>

        {/* Loading Message */}
        <motion.p
          className="text-xl text-purple-200 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Loading magical sounds and music...
        </motion.p>

        {/* Progress Bar */}
        <div className="w-full bg-purple-800 rounded-full h-4 mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress Text */}
        <div className="space-y-2">
          <motion.p
            className="text-lg text-white font-semibold"
            key={percentage}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {progress.isComplete ? (progress.loaded > 0 ? '🎉 Ready to celebrate!' : '⚠️ Audio loading failed') : `${Math.round(percentage)}%`}
          </motion.p>
          
          <motion.p
            className="text-sm text-purple-300"
            key={progress.currentFile}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {progress.isComplete 
              ? (progress.loaded > 0 ? 'Audio files loaded successfully!' : 'Unable to load audio files - proceeding without sound')
              : `Loading: ${progress.currentFile.replace('-', ' ')}...`
            }
          </motion.p>

          <p className="text-xs text-purple-400">
            {progress.loaded} / {progress.total} files loaded
          </p>

          {progress.hasError && (
            <motion.p
              className="text-yellow-300 text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {progress.loaded === 0 
                ? '⚠️ No audio files could be loaded - check your internet connection and try refreshing!'
                : `⚠️ Some audio files couldn't be loaded (${progress.loaded}/${progress.total} loaded), but the experience will continue!`
              }
            </motion.p>
          )}
        </div>

        {/* Fun Loading Messages */}
        <motion.div
          className="text-purple-300 text-sm space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {percentage < 30 && <p>🎈 Inflating birthday balloons...</p>}
          {percentage >= 30 && percentage < 60 && <p>🎂 Preparing the birthday cake...</p>}
          {percentage >= 60 && percentage < 90 && <p>✨ Adding magical sparkles...</p>}
          {percentage >= 90 && !progress.isComplete && <p>🎊 Final preparations...</p>}
        </motion.div>

        {/* Enable Audio Button */}
        {progress.isComplete && !audioEnabled && (
          <motion.button
            onClick={enableAudioAndStart}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all text-lg font-semibold shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔊 Enable Audio & Start Celebration!
          </motion.button>
        )}

        {/* Skip Button (in case of slow loading) */}
        {percentage > 0 && !progress.isComplete && (
          <motion.button
            onClick={() => {
              setAudioEnabled(true);
              onComplete();
            }}
            className="mt-8 px-6 py-2 text-purple-300 border border-purple-500 rounded-full hover:bg-purple-800 transition-colors text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }} // Show after 3 seconds
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue without audio →
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default AudioLoadingScreen;
