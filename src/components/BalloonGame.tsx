import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAudioManager } from '../hooks/useAudio';

interface BalloonGameProps {
  onComplete: () => void;
}

const BalloonGame: React.FC<BalloonGameProps> = ({ onComplete }) => {
  const [poppedBalloons, setPoppedBalloons] = useState<Set<number>>(new Set());
  const [showCompletion, setShowCompletion] = useState(false);
  const targetPopCount = 8;
  const { playSound } = useAudioManager();

  const balloonColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
  ];

  // Stable cloud properties - calculated once
  const cloudProperties = Array.from({ length: 8 }, (_, i) => {
    const seed = i * 123.456; // Deterministic seed
    return {
      width: 80 + (Math.sin(seed) * 50 + 50), // 80-130px
      height: 40 + (Math.sin(seed * 2) * 30 + 30), // 40-70px
      top: 10 + (Math.sin(seed * 3) * 25 + 25), // 10-35%
      initialLeft: -10 + (Math.sin(seed * 4) * 20), // Start position
      duration: 20 + (Math.sin(seed * 5) * 15 + 15), // 20-35 seconds
      delay: Math.abs(Math.sin(seed * 6)) * 15, // 0-15 seconds
      opacity: 0.4 + (Math.sin(seed * 7) * 0.3 + 0.3), // 0.4-0.7
    };
  });

  // Stable floating particle properties
  const floatingParticles = Array.from({ length: 12 }, (_, i) => {
    const seed = i * 87.654;
    return {
      size: 4 + (Math.sin(seed) * 6 + 6), // 4-10px
      top: Math.abs(Math.sin(seed * 2)) * 80 + 10, // 10-90%
      left: Math.abs(Math.sin(seed * 3)) * 90 + 5, // 5-95%
      duration: 8 + (Math.sin(seed * 4) * 4 + 4), // 8-12 seconds
      delay: Math.abs(Math.sin(seed * 5)) * 5, // 0-5 seconds
      color: balloonColors[i % balloonColors.length],
    };
  });

  const handlePop = (balloonId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    
    if (poppedBalloons.has(balloonId)) {
      return;
    }
    
    // Play balloon pop sound
    playSound('balloon-pop', { volume: 0.4 });
    
    // Create confetti effect at the balloon's position
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x, y },
      colors: [balloonColors[balloonId % balloonColors.length]],
      gravity: 0.8,
      scalar: 0.8,
    });
    
    // Add a small celebration burst
    setTimeout(() => {
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { x, y },
        colors: ['#FFD700', '#FFA500', '#FF69B4'],
        gravity: 1.2,
        scalar: 0.6,
      });
    }, 100);
    
    const newPoppedBalloons = new Set(poppedBalloons);
    newPoppedBalloons.add(balloonId);
    setPoppedBalloons(newPoppedBalloons);
    
    if (newPoppedBalloons.size >= targetPopCount) {
      // Play completion sound
      setTimeout(() => {
        playSound('confetti', { volume: 0.6 });
      }, 300);
      
      // Celebration confetti for completing the game
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: balloonColors
        });
      }, 500);
      setTimeout(() => setShowCompletion(true), 1000);
    }
  };

  const balloons = Array.from({ length: 12 }).map((_, idx) => {
    const isPopped = poppedBalloons.has(idx);
    const balloonColor = balloonColors[idx % balloonColors.length];
    
    // Create a unique seed for consistent positioning
    const positionSeed = idx * 123.456; // Deterministic random
    const leftPosition = (idx * 7 + 10 + (Math.sin(positionSeed) * 5 + 5));
    const animationDuration = 5 + (Math.sin(positionSeed * 2) * 1.5 + 1.5); // 3.5-6.5 seconds
    const animationDelay = (Math.sin(positionSeed * 3) * 1 + 1); // 0-2 seconds
    
    return (
      <motion.div
        key={`balloon-${idx}`} // Stable key
        className="absolute cursor-pointer"
        style={{
          left: `${leftPosition}%`,
          bottom: '-100px',
          zIndex: 20,
          pointerEvents: isPopped ? 'none' : 'auto',
        }}
        initial={{ opacity: 1 }}
        animate={{
          y: [0, -window.innerHeight - 200],
          opacity: isPopped ? 0 : 1,
          scale: isPopped ? 0 : 1,
        }}
        exit={{ 
          scale: 0, 
          opacity: 0,
          transition: { duration: 0.3 }
        }}
        transition={{
          y: {
            duration: animationDuration,
            ease: 'linear',
            repeat: isPopped ? 0 : Infinity,
            delay: animationDelay,
          },
          opacity: {
            duration: isPopped ? 0.3 : 0,
          },
          scale: {
            duration: isPopped ? 0.3 : 0,
          },
        }}
        whileHover={!isPopped ? { scale: 1.1 } : {}}
        whileTap={!isPopped ? { scale: 0.9 } : {}}
        onClick={!isPopped ? (event) => handlePop(idx, event) : undefined}
      >
        {/* Balloon */}
        <motion.div
          className="w-16 h-20 rounded-full shadow-lg relative pointer-events-auto"
          style={{ 
            backgroundColor: balloonColor,
            padding: '4px',
            margin: '-4px',
          }}
          animate={!isPopped ? {
            rotate: [0, 5, -5, 0],
          } : {}}
          transition={{
            duration: 2,
            repeat: isPopped ? 0 : Infinity,
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
  });

  if (showCompletion) {
    return (
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 relative px-4 sm:px-6"
        style={{ zIndex: 100 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 text-center leading-tight max-w-4xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          🎉 Amazing! All balloons popped! 🎉
        </motion.h2>
        
        <motion.div
          className="text-xl sm:text-2xl text-white mb-6 sm:mb-8 text-center max-w-2xl"
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
          className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-semibold shadow-xl hover:shadow-2xl relative z-50 pointer-events-auto"
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
      {/* Stable Background Clouds */}
      {cloudProperties.map((cloud, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute rounded-full opacity-60 pointer-events-none"
          style={{
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            top: `${cloud.top}%`,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
            boxShadow: '0 4px 20px rgba(255,255,255,0.3)',
            zIndex: 1,
            opacity: cloud.opacity,
          }}
          animate={{
            x: [cloud.initialLeft, window.innerWidth + 100],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "linear",
            delay: cloud.delay,
          }}
        />
      ))}

      {/* Floating Sparkle Particles */}
      {floatingParticles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            background: `radial-gradient(circle, ${particle.color}60, transparent)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`,
            zIndex: 2,
          }}
          animate={{
            y: [0, -30, 0],
            scale: [0.5, 1.2, 0.5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Gentle Floating Bubbles */}
      {[...Array(6)].map((_, i) => {
        const bubbleSeed = i * 234.567;
        const size = 20 + (Math.sin(bubbleSeed) * 20 + 20); // 20-40px
        const startLeft = Math.abs(Math.sin(bubbleSeed * 2)) * 100;
        const duration = 15 + (Math.sin(bubbleSeed * 3) * 10 + 10); // 15-25 seconds
        
        return (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              bottom: '-50px',
              left: `${startLeft}%`,
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(173,216,230,0.3))',
              border: '1px solid rgba(255,255,255,0.4)',
              backdropFilter: 'blur(2px)',
              zIndex: 3,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, Math.sin(bubbleSeed * 4) * 100],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear",
              delay: Math.abs(Math.sin(bubbleSeed * 5)) * 8,
            }}
          />
        );
      })}

      {/* Subtle Rainbow Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(255,182,193,0.1) 25%, rgba(173,216,230,0.1) 50%, rgba(221,160,221,0.1) 75%, transparent 100%)',
          zIndex: 4,
        }}
      />
      
      {/* Instructions and Progress Bar Container */}
      <div className="absolute top-12 sm:top-16 md:top-20 lg:top-24 left-0 right-0 flex justify-center pointer-events-none" style={{ zIndex: 30 }}>
        <motion.div
          className="flex flex-col items-center text-center px-4 sm:px-6 md:px-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
        {/* Instructions */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold text-purple-800 mb-2 sm:mb-3 md:mb-4 drop-shadow-lg leading-tight text-center">
          🎈Pop the Balloons!🎈
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-purple-600 drop-shadow-md font-medium text-center">
            Click balloons as they float! ({poppedBalloons.size}/{targetPopCount})
          </p>
        </div>
        
        {/* Progress bar */}
        <motion.div
          className="w-48 sm:w-56 md:w-64 lg:w-72 h-3 sm:h-4 bg-white/30 rounded-full overflow-hidden shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full shadow-inner"
            initial={{ width: 0 }}
            animate={{ width: `${(poppedBalloons.size / targetPopCount) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        </motion.div>
      </div>
      
      {/* Balloons */}
      {balloons}
    </div>
  );
};

export default BalloonGame;

