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
    if (years >= 21) return "Two decades of Living life to the fullest! 🌟";
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
    <div className="relative z-50">
      {/* Hero Birthday Greeting - Full Viewport */}
      <motion.div
        className="relative text-center min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4 md:mb-6"
        >
          <span className={`text-sm md:text-lg font-semibold tracking-widest uppercase px-6 py-2 rounded-full border-2 ${
            'text-purple-600 border-purple-300 bg-purple-50/80'
          }`}>
            ✨ Special Day Alert ✨
          </span>
        </motion.div>

        {/* Main Hero Title */}
        <motion.h1 
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black mb-6 sm:mb-8 md:mb-10 px-4 sm:px-8 bg-gradient-to-r leading-tight ${
            'from-purple-600 via-pink-600 to-indigo-600'
          } bg-clip-text text-transparent relative z-10`}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 100 }}
          whileHover={{ 
            scale: 1.05,
            textShadow: "0 0 50px rgba(147, 51, 234, 0.5)"
          }}
          style={{
            WebkitTextStroke: 'none',
            filter: 'none',
            textShadow: '0 4px 30px rgba(147, 51, 234, 0.3)'
          }}
        >
          <motion.span
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            🎉
          </motion.span>
          Happy Birthday
          <motion.span
            animate={{ 
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="inline-block"
          >
            🎉
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent"
          >
            Dear Dhananjay!
          </motion.span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="max-w-4xl mx-auto mb-8 md:mb-12"
        >
          <p className={`text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed px-6 md:px-12 py-4 md:py-6 rounded-3xl shadow-xl backdrop-blur-md border-2 ${
            'text-gray-700 bg-white/80 border-white/50'
          }`} style={{
            textShadow: 'none'
          }}>
            Wishing you the best on your special day!<br />
            <span className="text-lg md:text-xl font-normal opacity-90">
              May your journey ahead be as stellar, grounded and inspiring as you've always been to us✨
            </span>
          </p>
        </motion.div>

        {/* Call to Action Hint */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="flex items-center gap-3"
        >
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
          }`}>
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              👇
            </motion.span>
            <span className="text-sm font-medium">Scroll down to see something special. Maybe...hehe</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Age Greeting Message - Separate Section */}
      <div className="min-h-screen flex flex-col justify-center items-center space-y-8 sm:space-y-10 md:space-y-12 px-4 sm:px-6 md:px-8 lg:px-12 py-12 md:py-16 max-w-7xl mx-auto">
        {ageData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="text-center mb-12 md:mb-16 max-w-6xl mx-auto px-4 md:px-6"
          >
          <motion.div
            className={`rounded-3xl p-8 md:p-10 lg:p-12 border shadow-xl backdrop-blur-sm mx-4 md:mx-6 ${
              'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-white/30'
            }`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="text-4xl md:text-5xl mb-6"
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
          ♡(◍•ᴗ•◍)♡
            </motion.div>
            
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 bg-gradient-to-r ${
              'from-indigo-600 to-purple-600'
            } bg-clip-text text-transparent leading-tight`} style={{
              WebkitTextStroke: 'none',
              filter: 'none'
            }}>
              While we are celebrating your 22nd birthday, let's take a moment to know that you have been amazing for...
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
              <motion.div 
                className={`rounded-xl p-4 backdrop-blur-sm min-h-[90px] flex flex-col justify-center shadow-lg ${
                  'bg-white/60'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-xl md:text-2xl lg:text-3xl font-bold leading-tight ${
                  'text-purple-600'
                }`} style={{
                  textShadow: 'none'
                }}>
                  {ageData.years.toLocaleString()}
                </div>
                <div className={`text-xs md:text-sm font-medium mt-1 ${
                  'text-gray-600'
                }`}>Years</div>
              </motion.div>
              
              <motion.div 
                className={`rounded-xl p-4 backdrop-blur-sm min-h-[90px] flex flex-col justify-center shadow-lg ${
                  'bg-white/60'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`text-xl md:text-2xl lg:text-3xl font-bold leading-tight ${
                  'text-blue-600'
                }`} style={{
                  textShadow: 'none'
                }}>
                  {ageData.totalDays.toLocaleString()}
                </div>
                <div className={`text-xs md:text-sm font-medium mt-1 ${
                  'text-gray-600'
                }`}>Days</div>
              </motion.div>
              
              <motion.div 
                className={`rounded-xl p-2 md:p-3 backdrop-blur-sm min-h-[120px] flex flex-col justify-center shadow-lg ${
                  'bg-white/60'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative min-h-[60px] flex items-center justify-center overflow-hidden px-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={ageData.totalHours}
                      className={`font-bold absolute leading-tight text-center w-full whitespace-nowrap ${
                        'text-pink-600'
                      } text-sm md:text-base lg:text-lg`}
                      variants={digitVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      style={{ 
                        fontSize: ageData.totalHours.toString().length > 6 ? 'clamp(0.7rem, 2vw, 1rem)' : undefined,
                        transform: ageData.totalHours.toString().length > 6 ? 'scale(0.85)' : undefined,
                        textShadow: 'none'
                      }}
                    >
                      {ageData.totalHours.toLocaleString()}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className={`text-xs md:text-sm font-medium mt-1 text-center ${
                  'text-gray-600'
                }`}>Hours</div>
              </motion.div>
              
              <motion.div 
                className={`rounded-xl p-2 md:p-3 backdrop-blur-sm min-h-[120px] flex flex-col justify-center shadow-lg ${
                  'bg-white/60'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative min-h-[60px] flex items-center justify-center overflow-hidden px-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={ageData.totalMinutes}
                      className={`font-bold absolute leading-tight text-center w-full whitespace-nowrap ${
                        'text-green-600'
                      } text-sm md:text-base lg:text-lg`}
                      variants={digitVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      style={{ 
                        fontSize: ageData.totalMinutes.toString().length > 8 ? 'clamp(0.7rem, 2vw, 1rem)' : undefined,
                        transform: ageData.totalMinutes.toString().length > 8 ? 'scale(0.85)' : undefined,
                        textShadow: 'none'
                      }}
                    >
                      {ageData.totalMinutes.toLocaleString()}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className={`text-xs md:text-sm font-medium mt-1 text-center ${
                  'text-gray-600'
                }`}>Minutes</div>
              </motion.div>
            </div>
            
            <motion.p 
              className={`text-lg md:text-xl font-medium leading-relaxed ${
                'text-gray-700'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              That's{' '}
              <span className="inline-block relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ageData.totalSeconds}
                    className={`font-bold ${
                      'text-purple-600'
                    }`}
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
              className={`text-base md:text-lg font-semibold mt-3 italic ${
                'text-indigo-600'
              }`}
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
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-center relative z-50 px-4 md:px-6 mt-8 md:mt-12">
          {onReset && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                console.log('Reset button clicked!');
                onReset();
              }}
              className={`group relative px-8 py-4 text-lg font-medium backdrop-blur-md rounded-full shadow-lg hover:shadow-xl border cursor-pointer overflow-hidden ${
                'text-gray-700 bg-white/70 border-gray-200/50'
              }`}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 2, type: "spring", stiffness: 150 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{ pointerEvents: 'auto', cursor: 'pointer', position: 'relative', zIndex: 9999 }}
            >
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${
                'bg-gradient-to-r from-gray-200 to-gray-300'
              }`} />
              
              <span className="relative z-10 flex items-center gap-2 font-semibold">
                <motion.span
                  animate={{ x: [-2, 0, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ←
                </motion.span>
                Back to Countdown
              </span>
            </motion.button>
          )}
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Complete button clicked!');
              onComplete();
            }}
              className={`group relative px-12 py-6 text-2xl font-extrabold text-white rounded-full shadow-2xl cursor-pointer overflow-hidden ring-4 ring-purple-400/30 ring-offset-2 ring-offset-slate-900 transition-all duration-300 ${
                'bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500'
              }`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.2, type: "spring", stiffness: 150 }}
            whileHover={{ 
              scale: 1.08, 
              y: -4,
              boxShadow: "0 25px 80px rgba(147, 51, 234, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            style={{ pointerEvents: 'auto', cursor: 'pointer', position: 'relative', zIndex: 9999 }}
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 ${
              'bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400'
            }`} />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-3 tracking-tight drop-shadow-xl">
              <span className="hidden md:inline">Let's begin the celebration!</span>
              <motion.span
                animate={{ 
                  rotate: [0, 20, -20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                🎉
              </motion.span>
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default EntryAnimation;
