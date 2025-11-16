import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAudioManager } from '../hooks/useAudio';

interface CakeCutProps {
  onComplete: () => void;
}

const CakeCut: React.FC<CakeCutProps> = ({ onComplete }) => {
  const [cakeCut, setCakeCut] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [showCandlePrompt, setShowCandlePrompt] = useState(true);
  const { playSound } = useAudioManager();
  
  // Candle blowing prompt timeout
  useEffect(() => {
    const timer = setTimeout(() => setShowCandlePrompt(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleBlowCandles = () => {
    if (candlesLit) {
      setCandlesLit(false);
      playSound('word-hover', { volume: 0.4 }); // whoosh sound
      
      // After candles are blown, show cake cutting prompt
      setTimeout(() => {
        playSound('happy-birthday', { volume: 0.6 });
      }, 1000);
    }
  };

  const handleCakeSlice = () => {
    if (!cakeCut && !candlesLit) {  
      // Play cake cutting sound
      playSound('cake-cut', { volume: 0.5 });
      
      // Play celebration cheer
      setTimeout(() => {
        playSound('confetti', { volume: 0.7 });
      }, 800);
      
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
      setCakeCut(true);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-200 to-purple-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center space-y-6 sm:space-y-8 max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
          🎂 Birthday Cake Ceremony
        </h2>
        
        {/* Candle Blowing Prompt */}
        <AnimatePresence>
          {showCandlePrompt && candlesLit && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-4 mb-4"
            >
              <p className="text-lg text-yellow-800 font-semibold">
                💨 Click the candles to blow them out!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Candles (before blowing) */}
        {candlesLit && (
          <motion.div 
            className="flex justify-center gap-4 mb-8 cursor-pointer"
            onClick={handleBlowCandles}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="text-5xl relative"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              >
                🕯️
                {/* Flickering flame */}
                <motion.div
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-2xl"
                  animate={{
                    scale: [1, 1.2, 0.9, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.3,
                    repeat: Infinity,
                  }}
                >
                  🔥
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Smoke after blowing */}
        {!candlesLit && !cakeCut && (
          <motion.div 
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="relative"
              >
                <span className="text-5xl">🕯️</span>
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl"
                  initial={{ y: 0, opacity: 1, scale: 0.5 }}
                  animate={{ 
                    y: -40, 
                    opacity: 0,
                    scale: 1.5
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                  }}
                >
                  💨
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Cake */}
        <motion.div
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl cursor-pointer select-none"
          whileHover={{ scale: candlesLit ? 1 : 1.1 }}
          whileTap={{ scale: candlesLit ? 1 : 0.95 }}
          onClick={handleCakeSlice}
          style={{ opacity: candlesLit ? 0.5 : 1 }}
          animate={cakeCut ? { 
            y: [0, -20, 10, 0], 
            rotate: [0, -10, 5, 0],
            scale: [1, 1.2, 0.9, 1],
            transition: { duration: 0.8 } 
          } : !candlesLit ? {
            y: [0, -5, 0],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          } : {}}
        >
          🎂
        </motion.div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-base sm:text-lg text-purple-600 mb-3 sm:mb-4">
            {cakeCut ? "✨ Delicious! Everyone's cheering! ✨" : candlesLit ? "First, make a wish and blow the candles! 🎂" : "Now click the cake to cut it! 🔪"}
          </p>
        </motion.div>
        {cakeCut && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg sm:text-xl">
              You make the world sweeter!
            </p>
            <motion.button
              className="mt-6 bg-green-500 text-white px-8 py-4 rounded-full text-xl"
              onClick={onComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Stage
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CakeCut;

