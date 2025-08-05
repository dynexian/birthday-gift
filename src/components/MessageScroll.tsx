import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAudioManager } from '../hooks/useAudio';

interface MessageScrollProps {
  onComplete: () => void;
}

const MessageScroll: React.FC<MessageScrollProps> = ({ onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
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

  // Auto-advance messages every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev >= messages.length - 1) {
          setIsComplete(true);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [messages.length]);

  // Remove auto-complete - let user click the button to proceed

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-200/30 to-pink-200/30"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Instructions */}
      <motion.div
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isComplete ? 0 : 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/50"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="text-lg text-gray-700 font-medium">Reading your birthday messages ✨</p>
        </motion.div>
      </motion.div>



      {/* Main Content Area */}
      <div className="h-screen flex items-center justify-center px-4 md:px-8 relative z-10">
        <div className="text-center max-w-5xl w-full">
          <motion.div
            key={currentMessage} // Force re-render on message change
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: -50, scale: 0.9, rotateX: -10 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            {/* Message Container with Enhanced Visual Effects */}
            <motion.div
              className="relative bg-white/70 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50"
              animate={{ 
                boxShadow: [
                  "0 20px 60px rgba(139, 92, 246, 0.15)",
                  "0 25px 70px rgba(139, 92, 246, 0.25)",
                  "0 20px 60px rgba(139, 92, 246, 0.15)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* Decorative Corner Elements */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-purple-300 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-purple-300 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-purple-300 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-purple-300 rounded-br-lg"></div>
              
              <motion.p
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-relaxed md:leading-relaxed lg:leading-relaxed font-medium text-purple-600 break-words px-4 mb-6"
                animate={{ 
                  scale: [1, 1.02, 1],
                  textShadow: [
                    "0 2px 10px rgba(139, 92, 246, 0.2)",
                    "0 4px 20px rgba(139, 92, 246, 0.4)", 
                    "0 2px 10px rgba(139, 92, 246, 0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {messages[currentMessage]}
              </motion.p>
              
              <div className="mt-8 md:mt-10 text-base md:text-lg text-purple-500 font-semibold">
                {currentMessage + 1} of {messages.length}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Completion Section */}
      {isComplete && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-white/95 via-purple-50/95 to-pink-50/95 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-12 z-40 px-6"
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-6 relative z-10"
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
            className="text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed mb-8 relative z-10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            You've read through all the birthday wishes! Ready for the next surprise?
          </motion.p>
          
          <motion.button
            onClick={() => {
              playSound('button-click', { volume: 0.7 });
              onComplete();
            }}
            className="relative px-10 py-5 text-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl cursor-pointer overflow-hidden group z-10"
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            
            <span className="relative z-10">Continue Your Journey ✨</span>
          </motion.button>
        </motion.div>
      )}

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isComplete ? 0 : 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-lg border border-white/50"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-64 h-3 bg-purple-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 rounded-full shadow-inner"
                  style={{ width: `${((currentMessage + 1) / messages.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  animate={{
                    boxShadow: [
                      "inset 0 2px 4px rgba(139, 92, 246, 0.3)",
                      "inset 0 4px 8px rgba(139, 92, 246, 0.5)",
                      "inset 0 2px 4px rgba(139, 92, 246, 0.3)"
                    ]
                  }}
                />
              </div>
              
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MessageScroll;