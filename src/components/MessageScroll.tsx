import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioManager } from '../hooks/useAudio';

interface MessageScrollProps {
  onComplete: () => void;
}

const MessageScroll: React.FC<MessageScrollProps> = ({ onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { playSound } = useAudioManager();

  const messages = [
    "On this special day, we celebrate not just your birth... 🌟",
    "But the incredible person you've become,",
    "The joy you bring to everyone around you, 😊",
    "Your kindness, your laughter, your beautiful spirit, ✨",
    "The way you light up every room you enter, 💫",
    "Your strength in facing challenges, 💪",
    "Your compassion for others, ❤️",
    "The memories we've shared together, 📸",
    "And all the amazing moments yet to come! 🌈",
    "Today, we honor you and all that you are. 🙏",
    "Happy Birthday! 🎉🎂✨"
  ];

  // Auto-advance messages every 3 seconds with pause control
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev >= messages.length - 1) {
          setIsComplete(true);
          return prev;
        }
        // Add sound effect for message transition
        playSound('page-transition', { volume: 0.2 });
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [messages.length, playSound, isPaused]);

  // Manual navigation functions
  const goToNext = () => {
    if (currentMessage < messages.length - 1) {
      setCurrentMessage(prev => prev + 1);
      playSound('button-click', { volume: 0.3 });
    } else {
      setIsComplete(true);
    }
  };

  const goToPrevious = () => {
    if (currentMessage > 0) {
      setCurrentMessage(prev => prev - 1);
      playSound('button-click', { volume: 0.3 });
    }
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
    playSound('button-click', { volume: 0.3 });
  };

  // Remove auto-complete - let user click the button to proceed

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-sm"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.1))'
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.7, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: [0.4, 0.0, 0.2, 1],
              type: "tween"
            }}
          />
        ))}
        
        {/* Magical sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'radial-gradient(circle, #a855f7, #8b5cf6)',
              boxShadow: '0 0 15px #a855f7, 0 0 30px #8b5cf6'
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [0, -100],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Instructions */}
      <motion.div
        className="fixed top-6 sm:top-8 left-1/2 transform -translate-x-1/2 z-20 text-center px-4 max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isComplete ? 0 : 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className={`backdrop-blur-sm rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-xl border transition-all duration-500 ${
            'bg-white/90 border-white/70'
          }`}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className={`text-base sm:text-lg md:text-xl font-semibold transition-colors duration-500 ${
            'text-slate-800'
          }`}
          style={{
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}>
            Reading your birthday messages ✨ {isPaused && '(Paused)'}
          </p>
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <div className="h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="text-center max-w-5xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              stiffness: 80,
              damping: 20
            }}
          >
            {/* Enhanced Message Container with Advanced Visual Effects */}
            <motion.div
              className={`relative backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 shadow-2xl border transition-all duration-700 mx-2 sm:mx-4 md:mx-6 ${
                'bg-gradient-to-br from-white/90 via-white/85 to-white/95 border-white/60'
              }`}
              animate={{ 
                boxShadow: [
                      "0 25px 80px rgba(139, 92, 246, 0.15), 0 0 60px rgba(236, 72, 153, 0.1)",
                      "0 35px 100px rgba(139, 92, 246, 0.25), 0 0 80px rgba(236, 72, 153, 0.15)",
                      "0 25px 80px rgba(139, 92, 246, 0.15), 0 0 60px rgba(236, 72, 153, 0.1)"
                    ],
                scale: [1, 1.005, 1],
                rotateX: [0, 0.5, 0],
              }}
              transition={{ 
                boxShadow: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Decorative Corner Elements */}
              <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-t-2 rounded-tl-lg transition-colors duration-500 ${
                'border-purple-300'
              }`}></div>
              <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-t-2 rounded-tr-lg transition-colors duration-500 ${
                'border-purple-300'
              }`}></div>
              <div className={`absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-b-2 rounded-bl-lg transition-colors duration-500 ${
                'border-purple-300'
              }`}></div>
              <div className={`absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-b-2 rounded-br-lg transition-colors duration-500 ${
                'border-purple-300'
              }`}></div>
              
              <div className="relative min-h-[180px] sm:min-h-[200px] md:min-h-[240px] lg:min-h-[280px] flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentMessage}
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed font-semibold break-words px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 lg:py-6 mb-6 sm:mb-8 md:mb-10 transition-colors duration-500 absolute w-full ${
                      'text-slate-800 drop-shadow-md'
                    }`}
                    style={{
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(139, 92, 246, 0.2)',
                      transformStyle: "preserve-3d"
                    }}
                    initial={{ 
                      opacity: 0, 
                      y: 80, 
                      scale: 0.8,
                      rotateX: 15,
                      filter: "blur(8px) brightness(0.7)"
                    }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: [0.8, 1.02, 1],
                      rotateX: 0,
                      filter: "blur(0px) brightness(1)"
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -80, 
                      scale: 0.8,
                      rotateX: -15,
                      filter: "blur(8px) brightness(0.7)"
                    }}
                    transition={{ 
                      duration: 1.0,
                      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
                      scale: { 
                        duration: 1.5, 
                        ease: [0.34, 1.56, 0.64, 1], // easeOutBack
                        times: [0, 0.6, 1]
                      },
                      filter: { 
                        duration: 0.8,
                        ease: "easeOut"
                      },
                      rotateX: {
                        duration: 1.0,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }}
                  >
                    {messages[currentMessage]}
                  </motion.p>
                </AnimatePresence>
              </div>
              
              
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Unified Control Panel - Progress Bar and Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isComplete ? 0 : 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            className={`backdrop-blur-md rounded-2xl p-6 shadow-2xl border transition-all duration-500 ${
              'bg-white/95 border-white/70'
            }`}
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* Progress Bar */}
              <div className="w-full max-w-md">
                <div className={`w-full h-3 rounded-full overflow-hidden transition-colors duration-500 ${
                  'bg-slate-200'
                }`}>
                  <motion.div 
                    className={`h-full rounded-full shadow-inner transition-all duration-500 ${
                      'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600'
                    }`}
                    style={{ width: `${((currentMessage + 1) / messages.length) * 100}%` }}
                    animate={{
                      boxShadow: [
                            "inset 0 2px 4px rgba(139, 92, 246, 0.5)",
                            "inset 0 4px 8px rgba(139, 92, 246, 0.7)",
                            "inset 0 2px 4px rgba(139, 92, 246, 0.5)"
                          ]
                    }}
                    transition={{ 
                      width: { duration: 0.8, ease: "easeOut" },
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                  />
                </div>
                
                {/* Message Counter */}
                <div className="mt-3 text-center">
                  <span className="text-sm text-purple-600 font-medium">
                    {currentMessage + 1} of {messages.length}
                  </span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center space-x-4">
                {/* Previous Button */}
                <motion.button
                  onClick={goToPrevious}
                  disabled={currentMessage === 0}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    currentMessage === 0 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md hover:shadow-lg border border-purple-200'
                  }`}
                  whileHover={currentMessage > 0 ? { scale: 1.1 } : {}}
                  whileTap={currentMessage > 0 ? { scale: 0.95 } : {}}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                {/* Pause/Play Button */}
                <motion.button
                  onClick={togglePause}
                  className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPaused ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                    </svg>
                  )}
                </motion.button>

                {/* Next Button */}
                <motion.button
                  onClick={goToNext}
                  disabled={currentMessage === messages.length - 1}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    currentMessage === messages.length - 1 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md hover:shadow-lg border border-purple-200'
                  }`}
                  whileHover={currentMessage < messages.length - 1 ? { scale: 1.1 } : {}}
                  whileTap={currentMessage < messages.length - 1 ? { scale: 0.95 } : {}}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Status Text */}
              <div className="text-center">
                <span className={`text-xs font-medium transition-colors duration-300 ${
                  isPaused ? 'text-orange-600' : 'text-purple-600'
                }`}>
                  {isPaused ? '⏸️ Paused' : '▶️ Auto-playing'}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Completion Section */}
      {isComplete && (
        <motion.div
          className={`fixed inset-0 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-12 z-40 px-6 transition-all duration-500 ${
            'bg-gradient-to-br from-white/95 via-purple-50/95 to-pink-50/95'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Celebration Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -200, -20],
                  x: [0, Math.random() * 100 - 50, 0],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 360, 720],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <motion.h2
            className={`text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-8 md:mb-10 lg:mb-12 relative z-10 transition-all duration-500 px-6 py-4 ${
              'from-purple-700 via-pink-700 to-indigo-800'
            }`}
            style={{
              WebkitTextStroke: '1px rgba(0, 0, 0, 0.1)',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
            }}
            initial={{ scale: 0.8, rotateY: -30 }}
            animate={{ 
              scale: 1, 
              rotateY: 0,
              textShadow: [
                "0 4px 20px rgba(139, 92, 246, 0.3)",
                "0 8px 40px rgba(139, 92, 246, 0.5)",
                "0 4px 20px rgba(139, 92, 246, 0.3)"
              ]
            }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              textShadow: { duration: 2, repeat: Infinity }
            }}
          >
            🎉 Amazing! 🎉
          </motion.h2>
          
          <motion.p
            className={`text-xl md:text-2xl lg:text-3xl max-w-4xl leading-relaxed mb-10 md:mb-12 lg:mb-16 relative z-10 transition-colors duration-500 px-6 md:px-8 py-4 font-medium rounded-2xl shadow-lg backdrop-blur-md ${
              'text-slate-800 bg-white/80'
            }`}
            style={{
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            You've read through all the birthday wishes! Ready for the next surprise?
          </motion.p>
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              playSound('button-click', { volume: 0.7 });
              onComplete();
            }}
            className={`relative px-12 py-6 text-xl md:text-2xl font-bold rounded-full shadow-2xl cursor-pointer overflow-hidden group z-10 transition-all duration-300 ${
              'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-2 border-white/30'
            }`}
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button Glow Effect */}
            <div className={`absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-300 ${
              'bg-gradient-to-r from-purple-500 to-pink-500'
            }`} />
            
            {/* Button Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
              animate={{ x: [-120, 320] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
            />
            
            <span className="relative z-10 drop-shadow-sm">Continue Your Journey ✨</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default MessageScroll;
