import React, { useEffect, useRef } from 'react';
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

  // Play tick sound on second change (only when < 10 seconds)
  useEffect(() => {
    if (seconds !== lastSecondRef.current && seconds <= 10 && seconds > 0) {
      playSound('countdown-tick', { volume: 0.4 });
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
    enter: { scale: 0.8, opacity: 0, y: 20 },
    center: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 1.2, opacity: 0, y: -20 },
  };

  if (isExpired) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center space-y-12 px-4 relative overflow-hidden">
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
          className="text-center relative z-10"
        >
          <motion.h2 
            className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent mb-6"
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
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 font-medium"
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
      {/* Background floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-purple-200/30 to-pink-200/30"
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
        className="text-center mb-8 relative z-10"
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent"
          animate={{ 
            textShadow: [
              "0 4px 20px rgba(139, 92, 246, 0.3)",
              "0 8px 40px rgba(139, 92, 246, 0.6)",
              "0 4px 20px rgba(139, 92, 246, 0.3)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🕐 Countdown to Your Special Moment 🕐
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          The celebration begins in...
        </motion.p>
      </motion.div>
      
      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: 'easeOut', type: "spring", stiffness: 120 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 max-w-5xl mx-auto relative z-10"
      >
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 80, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1 + index * 0.15,
              type: "spring",
              stiffness: 150
            }}
            className="group relative bg-white/20 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/30 shadow-2xl min-w-[120px] md:min-w-[140px] hover:scale-105 transition-transform duration-300"
            whileHover={{ 
              y: -8,
              boxShadow: "0 25px 60px rgba(139, 92, 246, 0.3)"
            }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative h-20 md:h-24 lg:h-28 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={unit.value}
                  variants={digitVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, type: "spring" }}
                  className="countdown-digit absolute font-bold text-3xl md:text-4xl lg:text-5xl text-purple-600"
                  style={{
                    color: '#8b5cf6',
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
              className="text-gray-600 font-bold text-sm md:text-lg mt-3 tracking-wider text-center uppercase"
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
        <div className="h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm shadow-inner border border-white/30">
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
          className="text-center mt-3 text-sm font-medium text-gray-600"
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
