import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CakeCutProps {
  onComplete: () => void;
}

const CakeCut: React.FC<CakeCutProps> = ({ onComplete }) => {
  const [cakeCut, setCakeCut] = useState(false);

  const handleCakeSlice = () => {
    if (!cakeCut) {  
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
      setCakeCut(true);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-200 to-purple-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center space-y-8">
        <h2 className="text-5xl md:text-7xl font-bold">
          🍰 Birthday Cake
        </h2>
        <motion.div
          className="text-9xl cursor-pointer select-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCakeSlice}
          animate={cakeCut ? { 
            y: [0, -20, 10, 0], 
            rotate: [0, -10, 5, 0],
            scale: [1, 1.2, 0.9, 1],
            transition: { duration: 0.8 } 
          } : {
            y: [0, -5, 0],
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          🎂
        </motion.div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg text-purple-600 mb-4">
            {cakeCut ? "🎉 Delicious! 🎉" : "Click the cake to cut it!"}
          </p>
        </motion.div>
        {cakeCut && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xl">
              You make the world sweeter!
            </p>
            <motion.button
              className="mt-6 bg-green-500 text-white px-8 py-4 rounded-full text-xl"
              onClick={onComplete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Stage
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CakeCut;

