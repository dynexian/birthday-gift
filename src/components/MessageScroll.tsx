import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MessageScrollProps {
  onComplete: () => void;
}

const MessageScroll: React.FC<MessageScrollProps> = ({ onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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

  // Auto-complete after viewing all messages
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => onComplete(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onComplete]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50">
      {/* Instructions */}
      <motion.div
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isComplete ? 0 : 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-lg text-gray-600 font-medium">Reading your birthday messages ✨</p>
      </motion.div>

      {/* Debug Panel */}
      <div className="fixed top-4 right-4 z-30 bg-black/50 text-white p-2 rounded text-xs font-mono">
        <div>Message: {currentMessage + 1}/{messages.length}</div>
        <div>Auto-advancing every 3s</div>
        <button 
          onClick={() => setCurrentMessage(prev => (prev + 1) % messages.length)}
          className="mt-1 px-2 py-1 bg-purple-500 text-white rounded text-xs"
        >
          Next Message
        </button>
        <button 
          onClick={() => setIsComplete(true)}
          className="mt-1 px-2 py-1 bg-green-500 text-white rounded text-xs"
        >
          Complete
        </button>
      </div>

      {/* Main Content Area */}
      <div className="h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-4xl">
          <motion.div
            key={currentMessage} // Force re-render on message change
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-3xl md:text-5xl lg:text-6xl leading-relaxed font-medium text-purple-600"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {messages[currentMessage]}
            </motion.p>
            
            <div className="mt-8 text-lg text-purple-500 font-semibold">
              {currentMessage + 1} of {messages.length}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Completion Section */}
      {isComplete && (
        <motion.div
          className="fixed inset-0 bg-white/90 flex flex-col items-center justify-center text-center space-y-8 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🎉 Amazing! 🎉
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-700 max-w-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            You've read through all the birthday wishes! Ready for the next surprise?
          </motion.p>
          
          <motion.button
            onClick={onComplete}
            className="glow-button px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue Your Journey ✨
          </motion.button>
        </motion.div>
      )}

      {/* Progress Indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div 
          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000"
          style={{ width: `${((currentMessage + 1) / messages.length) * 100}%` }}
        />
      </motion.div>
    </div>
  );
};

export default MessageScroll;