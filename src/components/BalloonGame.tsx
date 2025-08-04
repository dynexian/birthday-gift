import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface BalloonGameProps {
  onComplete: () => void;
}

const BalloonGame: React.FC<BalloonGameProps> = ({ onComplete }) => {
  const [poppedBalloons, setPoppedBalloons] = useState<Set<number>>(new Set());
  const [showCompletion, setShowCompletion] = useState(false);
  const targetPopCount = 8;

  const balloonColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
  ];

  const handlePop = (balloonId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    
    if (poppedBalloons.has(balloonId)) {
      return;
    }
    
    // Create confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [balloonColors[balloonId % balloonColors.length]]
    });
    
    const newPoppedBalloons = new Set(poppedBalloons);
    newPoppedBalloons.add(balloonId);
    setPoppedBalloons(newPoppedBalloons);
    
    if (newPoppedBalloons.size >= targetPopCount) {
      setTimeout(() => setShowCompletion(true), 1000);
    }
  };

  const balloons = Array.from({ length: 12 }).map((_, idx) => {
    const isPopped = poppedBalloons.has(idx);
    const balloonColor = balloonColors[idx % balloonColors.length];
    
    if (isPopped) return null;
    
    return (
      <motion.div
        key={idx}
        className="absolute cursor-pointer"
        style={{
          left: `${(idx * 7 + 10 + Math.random() * 10)}%`,
          bottom: '-100px',
          zIndex: 20, // Ensure balloons are above background elements
        }}
        animate={{
          y: [0, -window.innerHeight - 200],
        }}
        transition={{
          duration: Math.random() * 3 + 4,
          ease: 'linear',
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(event) => handlePop(idx, event)}
      >
        {/* Balloon */}
        <motion.div
          className="w-16 h-20 rounded-full shadow-lg relative pointer-events-auto"
          style={{ 
            backgroundColor: balloonColor,
            // Ensure the balloon has a generous click area
            padding: '4px',
            margin: '-4px',
          }}
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Balloon shine */}
          <div 
            className="absolute top-2 left-3 w-4 h-6 bg-white opacity-30 rounded-full pointer-events-none"
            style={{ transform: 'rotate(-30deg)' }}
          />
        </motion.div>
        
        {/* Balloon string */}
        <div 
          className="w-0.5 bg-gray-600 pointer-events-none"
          style={{ height: '40px', marginLeft: '31px' }}
        />
      </motion.div>
    );
  }).filter(Boolean);

  if (showCompletion) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 relative"
        style={{ zIndex: 100 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-8 text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          🎉 Amazing! All balloons popped! 🎉
        </motion.h2>
        
        <motion.div
          className="text-2xl text-white mb-8 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Time to cut the cake! 🎂
        </motion.div>
        
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onComplete();
          }}
          className="bg-white text-purple-600 px-8 py-4 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl relative z-50 pointer-events-auto"
          style={{ 
            zIndex: 100, 
            cursor: 'pointer' // Override global cursor: none
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          Continue to Cake 🍰
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-200 via-blue-100 to-purple-200">
      {/* Background clouds */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute bg-white rounded-full opacity-60 pointer-events-none"
          style={{
            width: `${Math.random() * 100 + 80}px`,
            height: `${Math.random() * 50 + 40}px`,
            top: `${Math.random() * 30 + 10}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 1, // Keep clouds in background
          }}
          animate={{
            x: [-50, window.innerWidth + 50],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
      
      {/* Instructions */}
      <motion.div
        className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
        style={{ zIndex: 30 }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-purple-800 mb-4">
          Pop the Balloons! 🎈
        </h2>
        <p className="text-lg text-purple-600">
          Click the balloons as they float by! ({poppedBalloons.size}/{targetPopCount})
        </p>
      </motion.div>
      
      {/* Progress bar */}
      <motion.div
        className="absolute top-32 left-1/2 transform -translate-x-1/2 w-64 h-4 bg-white rounded-full overflow-hidden shadow-lg pointer-events-none"
        style={{ zIndex: 30 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(poppedBalloons.size / targetPopCount) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
      
      {/* Balloons */}
      {balloons}
    </div>
  );
};

export default BalloonGame;

