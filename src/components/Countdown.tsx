import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { useAudioManager } from '../hooks/useAudio';

interface CountdownProps {
  targetDate: Date;
  onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, onComplete }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);
  const { playSound } = useAudioManager();
  const lastSecondRef = useRef<number>(seconds);
  const [showPartyPrep, setShowPartyPrep] = useState(false);
  
  // Show party preparation elements after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPartyPrep(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Play tick sound on second change (only when < 10 seconds)
  useEffect(() => {
    if (seconds !== lastSecondRef.current && seconds <= 10 && seconds > 0) {
      playSound('countdown-tick', { volume: 0.1 });
    }
    lastSecondRef.current = seconds;
  }, [seconds, playSound]);

  React.useEffect(() => {
    if (isExpired && onComplete) {
      // Play completion sound
      playSound('countdown-complete', { volume: 0.6 });
      onComplete();
    }
  }, [isExpired, onComplete, playSound]);

  const timeUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  const digitVariants = {
    enter: { 
      scale: 0.7, 
      opacity: 0, 
      y: 60,
      rotateX: 90,
      filter: "blur(8px)"
    },
    center: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      filter: "blur(0px)"
    },
    exit: { 
      scale: 1.3, 
      opacity: 0, 
      y: -60,
      rotateX: -90,
      filter: "blur(8px)"
    },
  };

  if (isExpired) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center space-y-8 px-4 sm:px-6 md:px-8 relative overflow-hidden">
        {/* Celebration particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-50, -300, -50],
                x: [0, Math.random() * 200 - 100, 0],
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360, 720],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotateY: -180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 150 }}
          className="text-center relative z-10 max-w-4xl mx-auto"
        >
          <motion.h2 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r ${
              'from-purple-500 via-pink-500 to-indigo-500'
            } bg-clip-text text-transparent leading-tight`}
            animate={{ 
              scale: [1, 1.05, 1],
              textShadow: [
                "0 0 30px rgba(147, 51, 234, 0.5)",
                "0 0 60px rgba(147, 51, 234, 0.8)",
                "0 0 30px rgba(147, 51, 234, 0.5)"
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎉 Time's Up! 🎉
          </motion.h2>
          <motion.p 
            className={`text-xl md:text-2xl lg:text-3xl font-medium ${
              'text-slate-600'
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            The moment has arrived! Let's celebrate! 🎂
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-12 px-4 relative overflow-hidden">
      {/* Party preparation background - balloons inflating, decorations appearing */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating balloons rising up */}
        {showPartyPrep && [...Array(8)].map((_, i) => (
          <motion.div
            key={`balloon-${i}`}
            className="absolute text-5xl md:text-6xl"
            style={{
              left: `${10 + i * 12}%`,
              bottom: '-10%',
            }}
            initial={{ y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
            animate={{ 
              y: -800, 
              opacity: [0, 1, 1, 0.5, 0],
              scale: [0.3, 1, 1.1, 1, 0.8],
              rotate: [0, 5, -5, 3, 0],
              x: [0, Math.random() * 40 - 20, 0]
            }}
            transition={{
              duration: 12 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
          >
            {['🎈', '🎉', '🎊', '🎁'][i % 4]}
          </motion.div>
        ))}
        
        {/* Sparkles and confetti preparing */}
        {showPartyPrep && [...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className={`absolute w-3 h-3 rounded-full ${
              'bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Floating decorations */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`deco-${i}`}
            className={`absolute w-4 h-4 rounded-full ${
              'bg-gradient-to-r from-purple-200/30 to-pink-200/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Countdown Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', type: "spring" }}
        className="text-center mb-8 md:mb-12 relative z-10 px-4 sm:px-6"
      >
        <motion.h1 
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r ${
            'from-purple-600 via-pink-600 to-indigo-600'
          } bg-clip-text text-transparent leading-tight tracking-tight`}
          animate={{ 
            textShadow: [
              "0 4px 20px rgba(139, 92, 246, 0.3)",
              "0 8px 40px rgba(139, 92, 246, 0.6)",
              "0 4px 20px rgba(139, 92, 246, 0.3)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ✨ The Party Starts In... ✨
        </motion.h1>
        <motion.p 
          className={`text-xl md:text-2xl lg:text-3xl font-medium max-w-3xl mx-auto leading-relaxed ${
            'text-slate-700'
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {showPartyPrep ? "🎈 Decorations are ready... Guests arriving... 🎉" : "Getting everything ready for you..."}
        </motion.p>
        
        {/* Party prep status indicator */}
        {showPartyPrep && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex items-center gap-3 justify-center"
          >
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-teal-100 border border-green-200"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(16, 185, 129, 0.3)",
                  "0 0 20px rgba(16, 185, 129, 0.6)",
                  "0 0 10px rgba(16, 185, 129, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-xl"
              >
                ✨
              </motion.span>
              <span className="text-sm font-semibold text-green-700">Party preparations in progress...</span>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, y: 120, scale: 0.7, rotateX: 20 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ 
          duration: 1.4, 
          delay: 0.8, 
          ease: [0.16, 1, 0.3, 1], // easeOutExpo
          type: "spring", 
          stiffness: 80,
          damping: 20
        }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto relative z-10"
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 100, rotateX: 90, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 1 + index * 0.15,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className={`group relative backdrop-blur-md rounded-3xl p-6 md:p-8 border shadow-2xl min-w-[120px] md:min-w-[140px] transition-all duration-500 ${
              'bg-white/20 border-white/30'
            }`}
            whileHover={{ 
              y: -12,
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 30px 80px rgba(139, 92, 246, 0.4), 0 0 40px rgba(236, 72, 153, 0.2)",
              transition: { 
                duration: 0.4,
                ease: [0.34, 1.56, 0.64, 1] // easeOutBack
              }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            style={{
              transformStyle: "preserve-3d"
            }}
          >
            {/* Glow effect on hover */}
            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              'bg-gradient-to-r from-purple-400/20 to-pink-400/20'
            }`} />
            
            <div className="relative h-20 md:h-24 lg:h-28 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={unit.value}
                  variants={digitVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ 
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    filter: { duration: 0.2 },
                    rotateX: { 
                      duration: 0.4, 
                      ease: [0.16, 1, 0.3, 1] 
                    }
                  }}
                  className={`countdown-digit absolute font-bold text-3xl md:text-4xl lg:text-5xl ${
                    'text-purple-600'
                  }`}
                  style={{
                    color: '#8b5cf6',
                    transformStyle: "preserve-3d",
                    textShadow: '0 4px 20px rgba(139, 92, 246, 0.5)',
                    fontWeight: 'bold'
                  }}
                >
                  {unit.value.toString().padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              className={`font-bold text-sm md:text-lg mt-3 tracking-wider text-center uppercase ${
                'text-slate-600'
              }`}
            >
              {unit.label}
            </motion.p>
            
            {/* Decorative elements */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-purple-300/50 rounded-full"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-pink-300/50 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 bg-indigo-300/50 rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-blue-300/50 rounded-full"></div>
          </motion.div>
        ))}
      </motion.div>

      {/* Animated progress bar */}
      <motion.div
        initial={{ width: 0, opacity: 0, scale: 0.8 }}
        animate={{ width: '100%', opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2, type: "spring" }}
        className="max-w-lg mx-auto relative z-10"
      >
        <div className={`h-4 rounded-full overflow-hidden backdrop-blur-sm shadow-inner border ${
          'bg-white/20 border-white/30'
        }`}>
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full shadow-lg"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${(seconds % 60) * (100 / 60)}%`,
              boxShadow: [
                "0 0 10px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.8)",
                "0 0 10px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{ 
              width: { duration: 0.8 },
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          />
        </div>
        <motion.p
          className={`text-center mt-3 text-sm font-medium ${
            'text-slate-600'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          Progress through current minute
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Countdown;
