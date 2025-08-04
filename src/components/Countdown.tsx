import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownProps {
  targetDate: Date;
  onComplete?: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, onComplete }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  React.useEffect(() => {
    if (isExpired && onComplete) {
      onComplete();
    }
  }, [isExpired, onComplete]);

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
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-nature-500 to-sky-500 bg-clip-text text-transparent mb-4">
          🎉 Time's Up! 🎉
        </h2>
        <p className="text-xl md:text-2xl text-nature-600 font-medium">
          The moment has arrived!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-8 px-4">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
          🎉 Happy Birthday! 🎉
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
          Get ready for something special...
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto"
      >
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl"
          >
            <div className="relative h-24 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={unit.value}
                  variants={digitVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="countdown-digit absolute"
                >
                  {unit.value.toString().padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="text-nature-600 font-semibold text-lg mt-2 tracking-wide"
            >
              {unit.label}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      {/* Animated progress bar */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '100%', opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-nature-400 to-sky-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(seconds % 60) * (100 / 60)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Countdown;
