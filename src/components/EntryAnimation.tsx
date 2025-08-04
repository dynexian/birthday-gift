import React from 'react';
import { motion } from 'framer-motion';

interface EntryAnimationProps {
  onComplete: () => void;
  onReset?: () => void;  // Add optional reset function
}

const EntryAnimation: React.FC<EntryAnimationProps> = ({ onComplete, onReset }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-8 px-4 relative z-50">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
          ✨ Today's a special day... ✨
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
          Are you ready for an amazing journey?
        </p>
      </motion.div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center relative z-50">
        {onReset && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Reset button clicked!');
              onReset();
            }}
            className="px-6 py-3 text-md font-medium text-nature-700 bg-white/50 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-nature-200 cursor-pointer relative z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
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
          className="glow-button px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-nature-500 to-sky-500 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer relative z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ pointerEvents: 'auto', cursor: 'pointer', position: 'relative', zIndex: 9999 }}
        >
          Let's Begin the Adventure! 🚀
        </motion.button>
      </div>
    </div>
  );
};

export default EntryAnimation;

