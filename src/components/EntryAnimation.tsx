import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryAnimationProps {
  onComplete: () => void;
  onReset?: () => void;
  birthDate?: Date; // Add optional birth date for age calculation
}

const EntryAnimation: React.FC<EntryAnimationProps> = ({ onComplete, onReset, birthDate }) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  // Update current time every second for live age calculation
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate current age if birthDate is provided
  const calculateAge = () => {
    if (!birthDate) return null;
    
    const birth = new Date(birthDate);
    
    // Calculate total milliseconds lived
    const totalMs = currentTime.getTime() - birth.getTime();
    
    // Convert to different time units
    const totalSeconds = Math.floor(totalMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const years = Math.floor(totalDays / 365.25); // Account for leap years
    
    return {
      years,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
    };
  };

  const ageData = calculateAge();

  // Generate personalized milestone message
  const getMilestoneMessage = () => {
    if (!ageData) return "";
    
    const { years, totalDays, totalHours } = ageData;
    
    if (years >= 30) return "Three decades of awesomeness! 🌟";
    if (years >= 25) return "A quarter-century of amazing moments! ✨";
    if (years >= 21) return "Living life to the fullest! 🎉";
    if (years >= 18) return "Adult adventures in full swing! 🌈";
    if (totalDays >= 10000) return "Over 10,000 days of incredible memories! 💫";
    if (totalHours >= 100000) return "100,000+ hours of pure awesomeness! ⭐";
    return "Every moment has been precious! 💖";
  };

  const digitVariants = {
    enter: { scale: 0.8, opacity: 0, y: 20 },
    center: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 1.2, opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-8 px-4 relative z-50">
      {/* Birthday Greeting */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
          🎉 Happy Birthday! 🎉
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
          Today is your special day! Let's celebrate! ✨
        </p>
      </motion.div>

      {/* Age Greeting Message */}
      {ageData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="text-center mb-8 max-w-4xl mx-auto"
        >
          <motion.div
            className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-white/30 shadow-xl backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="text-3xl mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              🎂
            </motion.div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              You've Been Amazing for...
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              <motion.div 
                className="bg-white/60 rounded-xl p-4 backdrop-blur-sm min-h-[90px] flex flex-col justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-600 leading-tight">
                  {ageData.years.toLocaleString()}
                </div>
                <div className="text-xs md:text-sm font-medium text-gray-600 mt-1">Years</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/60 rounded-xl p-4 backdrop-blur-sm min-h-[90px] flex flex-col justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600 leading-tight">
                  {ageData.totalDays.toLocaleString()}
                </div>
                <div className="text-xs md:text-sm font-medium text-gray-600 mt-1">Days</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/60 rounded-xl p-4 backdrop-blur-sm min-h-[90px] flex flex-col justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-lg md:text-xl lg:text-2xl font-bold text-pink-600 leading-tight break-all">
                  {ageData.totalHours.toLocaleString()}
                </div>
                <div className="text-xs md:text-sm font-medium text-gray-600 mt-1">Hours</div>
              </motion.div>
              
              <motion.div 
                className="bg-white/60 rounded-xl p-3 md:p-4 backdrop-blur-sm min-h-[110px] flex flex-col justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative min-h-[48px] flex items-center justify-center overflow-hidden px-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={ageData.totalMinutes}
                      className="text-base md:text-lg lg:text-xl font-bold text-green-600 absolute leading-tight break-all text-center w-full"
                      variants={digitVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      style={{ wordBreak: 'break-all', hyphens: 'auto' }}
                    >
                      {ageData.totalMinutes.toLocaleString()}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="text-xs md:text-sm font-medium text-gray-600 mt-1 text-center">Minutes</div>
              </motion.div>
            </div>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              That's{' '}
              <span className="inline-block relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ageData.totalSeconds}
                    className="font-bold text-purple-600"
                    variants={digitVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    {ageData.totalSeconds.toLocaleString()}
                  </motion.span>
                </AnimatePresence>
              </span>{' '}
              incredible seconds of your life! ✨
            </motion.p>
            
            <motion.p
              className="text-base md:text-lg text-indigo-600 font-semibold mt-3 italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              {getMilestoneMessage()}
            </motion.p>
            
            <motion.div
              className="flex justify-center space-x-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {['🌟', '💫', '✨', '🎊', '🎈'].map((emoji, index) => (
                <motion.span
                  key={index}
                  className="text-2xl"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center relative z-50">
        {onReset && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Reset button clicked!');
              onReset();
            }}
            className="px-6 py-3 text-md font-medium text-gray-700 bg-white/50 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 cursor-pointer relative z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ pointerEvents: 'auto', cursor: 'pointer', position: 'relative', zIndex: 9999 }}
          >
            ← Back to Countdown
          </motion.button>
        )}
        
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            console.log('Complete button clicked!');
            onComplete();
          }}
          className="glow-button px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer relative z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ pointerEvents: 'auto', cursor: 'pointer', position: 'relative', zIndex: 9999 }}
        >
          Let's Begin the Celebration! 🎉
        </motion.button>
      </div>
    </div>
  );
};

export default EntryAnimation;