import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface JournalStageProps {
  onNext: () => void;
  onBack: () => void;
}

const JournalStage: React.FC<JournalStageProps> = ({ onNext, onBack }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const journalText = `Take a deep breath. You're here. In this moment, there is peace. 
  
  Sometimes we get so caught up in the rush of life that we forget to pause. 
  
  This is your invitation to slow down. To notice the gentle rhythm of your breathing. 
  
  To feel the ground beneath your feet. To remember that you are exactly where you need to be.
  
  Every breath is a gift. Every heartbeat, a promise. You carry within you everything you need for this journey.
  
  Let this moment be your sanctuary. Let this pause be your power.`;

  const words = journalText.split(' ').filter(word => word.trim() !== '');

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
      }, 150); // Adjust speed here

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentWordIndex, words.length]);

  const handleSkip = () => {
    setCurrentWordIndex(words.length);
    setIsComplete(true);
  };

  const handleRestart = () => {
    setCurrentWordIndex(0);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with subtle animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-nature-50/80 via-sky-50/80 to-cream-50/80"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(14, 165, 233, 0.1), rgba(251, 191, 36, 0.1))",
            "linear-gradient(60deg, rgba(14, 165, 233, 0.1), rgba(251, 191, 36, 0.1), rgba(34, 197, 94, 0.1))",
            "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(14, 165, 233, 0.1), rgba(251, 191, 36, 0.1))"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-light text-nature-700 mb-4">
            Inner Reflection
          </h2>
          <p className="text-nature-600 text-lg font-medium">
            A moment for your soul
          </p>
        </motion.div>

        {/* Journal Text */}
        <div className="bg-white/40 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20 min-h-[400px] flex items-center justify-center">
          <div className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-nature-800 font-light max-w-3xl">
            <AnimatePresence>
              {words.slice(0, currentWordIndex).map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeOut",
                    filter: { duration: 0.3 }
                  }}
                  className="inline-block mr-2 hover:text-nature-600 cursor-default transition-colors duration-300"
                  whileHover={{ 
                    scale: 1.05, 
                    textShadow: "0 0 20px rgba(34, 197, 94, 0.3)",
                    filter: "brightness(1.1)"
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </AnimatePresence>
            
            {/* Cursor */}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-1 h-8 bg-nature-500 ml-1"
              />
            )}
          </div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {!isComplete && (
            <motion.button
              onClick={handleSkip}
              className="px-6 py-3 bg-nature-200/50 hover:bg-nature-300/50 rounded-full text-nature-700 font-medium transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Skip to End
            </motion.button>
          )}

          {isComplete && (
            <>
              <motion.button
                onClick={handleRestart}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-6 py-3 bg-sky-200/50 hover:bg-sky-300/50 rounded-full text-sky-700 font-medium transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Again
              </motion.button>

              <motion.button
                onClick={onNext}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="glow-button px-8 py-3 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Journey →
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6"
        >
          <div className="w-full max-w-md mx-auto h-1 bg-nature-200/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-nature-400 to-sky-400"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentWordIndex / words.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-nature-500 text-sm mt-2">
            {Math.round((currentWordIndex / words.length) * 100)}% complete
          </p>
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-8 left-8 z-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 text-nature-600 font-medium hover:bg-white/30 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center space-x-2">
          <span>←</span>
          <span>Back</span>
        </span>
      </motion.button>
    </div>
  );
};

export default JournalStage;
