import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAudioManager } from '../hooks/useAudio';

interface WordCloudProps {
  onComplete: () => void;
}

const WordCloud: React.FC<WordCloudProps> = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const [interactedWords, setInteractedWords] = useState<Set<number>>(new Set());
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);
  const { playSound } = useAudioManager();

  const words = [
    { text: "Kind", color: "#FF6B6B", size: "text-3xl", weight: 1, depth: 0.8 },
    { text: "Brave", color: "#4ECDC4", size: "text-5xl", weight: 2, depth: 1.2 },
    { text: "Funny", color: "#45B7D1", size: "text-4xl", weight: 1.5, depth: 1.0 },
    { text: "Gentle", color: "#FFA07A", size: "text-3xl", weight: 1, depth: 0.7 },
    { text: "Magical", color: "#98D8C8", size: "text-6xl", weight: 3, depth: 1.5 },
    { text: "Caring", color: "#F7DC6F", size: "text-4xl", weight: 1.5, depth: 0.9 },
    { text: "Creative", color: "#BB8FCE", size: "text-5xl", weight: 2, depth: 1.3 },
    { text: "Loyal", color: "#85C1E9", size: "text-4xl", weight: 1.5, depth: 1.1 },
    { text: "Warm", color: "#F8C471", size: "text-3xl", weight: 1, depth: 0.8 },
    { text: "Beautiful", color: "#F1948A", size: "text-6xl", weight: 3, depth: 1.4 },
    { text: "Strong", color: "#82E0AA", size: "text-5xl", weight: 2, depth: 1.2 },
    { text: "Radiant", color: "#D7BDE2", size: "text-4xl", weight: 1.5, depth: 1.0 },
    { text: "Wise", color: "#AED6F1", size: "text-3xl", weight: 1, depth: 0.9 },
    { text: "Inspiring", color: "#F8D7DA", size: "text-5xl", weight: 2, depth: 1.3 },
    { text: "Joyful", color: "#D5F4E6", size: "text-4xl", weight: 1.5, depth: 1.1 },
  ];

  // Stable background particles
  const backgroundParticles = Array.from({ length: 20 }, (_, i) => {
    const seed = i * 142.857;
    return {
      size: 3 + (Math.sin(seed) * 4 + 4), // 3-7px
      top: Math.abs(Math.sin(seed * 2)) * 100,
      left: Math.abs(Math.sin(seed * 3)) * 100,
      duration: 15 + (Math.sin(seed * 4) * 10 + 10), // 15-25s
      delay: Math.abs(Math.sin(seed * 5)) * 8,
      opacity: 0.1 + Math.abs(Math.sin(seed * 6)) * 0.3, // 0.1-0.4
      color: words[i % words.length].color,
    };
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000); // Reduced from 8000ms to 5000ms
    return () => clearTimeout(timer);
  }, []);

  const getRandomPosition = (index: number) => {
    // Simpler, more reliable positioning
    const positions = [
      { left: '20%', top: '30%' },
      { left: '70%', top: '25%' },
      { left: '50%', top: '40%' },
      { left: '30%', top: '60%' },
      { left: '80%', top: '50%' },
      { left: '40%', top: '80%' },
      { left: '60%', top: '70%' },
      { left: '25%', top: '45%' },
      { left: '75%', top: '75%' },
      { left: '15%', top: '70%' },
      { left: '85%', top: '35%' },
      { left: '55%', top: '20%' },
      { left: '35%', top: '25%' },
      { left: '65%', top: '55%' },
      { left: '45%', top: '65%' },
    ];
    
    const position = positions[index % positions.length];
    return position;
  };

  const getFloatingAnimation = (weight: number, index: number) => {
    // Use deterministic values based on index for stable animations
    const seed = index * 67.829;
    const xMovement = Math.sin(seed) * 8; // -8 to 8
    const rotateAmount = Math.sin(seed * 2) * 4; // -4 to 4 degrees
    
    return {
      y: [0, -12 * weight, 3, 0],
      x: [0, xMovement, 0],
      rotate: [0, rotateAmount, 0],
    };
  };

  const getDepthStyles = (depth: number, isHovered: boolean, isInteracted: boolean) => {
    const baseScale = isHovered ? 1.8 : 1;
    const interactedScale = isInteracted ? 1.1 : 1;
    
    return {
      transform: `translateZ(${depth * 50}px) scale(${baseScale * interactedScale})`,
      filter: `blur(${Math.max(0, (1 - depth) * 2)}px) brightness(${0.7 + depth * 0.5})`,
      textShadow: `
        2px 2px 4px rgba(0,0,0,${0.3 + depth * 0.2}),
        0 0 ${depth * 20}px rgba(255,255,255,0.3),
        0 0 ${depth * 40}px currentColor
      `,
    };
  };

  const handleWordClick = (index: number) => {
    const newInteracted = new Set(interactedWords);
    newInteracted.add(index);
    setInteractedWords(newInteracted);
    
    // Play sparkle sound for word interaction
    playSound('sparkle', { volume: 0.8 });
    
    // Create ripple effect for clicked words
    const wordElement = document.getElementById(`word-${index}`);
    if (wordElement) {
      wordElement.style.animation = 'none';
      setTimeout(() => {
        wordElement.style.animation = 'pulse 0.6s ease-out';
      }, 10);
    }
  };

  const handleWordHover = (index: number, isHovering: boolean) => {
    setHoveredWord(isHovering ? index : null);
    
    // Play subtle hover sound
    if (isHovering) {
      playSound('word-hover', { volume: 0.5 });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100"
         style={{ perspective: '1000px' }}>
      
      {/* Stable Background Particles */}
      {backgroundParticles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            background: `radial-gradient(circle, ${particle.color}${Math.floor(particle.opacity * 255).toString(16)}, transparent)`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -50, 0],
            scale: [0.5, 1.2, 0.5],
            opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Depth-based word layers */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center pt-20 md:pt-24 pb-12 md:pb-16 px-6 relative z-20 leading-tight"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
          }}
        >
          These are words that describe you...
        </motion.h2>

        {words.map((word, index) => {
          const isHovered = hoveredWord === index;
          const isInteracted = interactedWords.has(index);
          const position = getRandomPosition(index);
          
          return (
            <motion.div
              key={word.text}
              id={`word-${index}`}
              className={`absolute font-bold cursor-pointer ${word.size} select-none`}
              style={{
                ...position,
                color: word.color,
                zIndex: Math.floor(word.depth * 10) + 10,
                ...getDepthStyles(word.depth, isHovered, isInteracted),
              }}
              initial={{ 
                opacity: 0, 
                scale: 0,
                rotateY: -180,
                z: word.depth * -100,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                z: 0,
                ...getFloatingAnimation(word.weight, index),
              }}
              transition={{
                duration: 1.8,
                delay: index * 0.15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                rotateY: { duration: 1.8, delay: index * 0.15, repeat: 0 }
              }}
              whileHover={{
                scale: 1.8,
                rotateZ: 8,
                transition: { 
                  duration: 0.4, 
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                },
              }}
              onHoverStart={() => handleWordHover(index, true)}
              onHoverEnd={() => handleWordHover(index, false)}
              onClick={() => handleWordClick(index)}
            >
              {word.text}
              
              {/* Enhanced hover effect with depth */}
              <motion.div
                className="absolute -inset-4 rounded-full pointer-events-none"
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ 
                  opacity: 1, 
                  scale: 1.2,
                  background: [
                    `radial-gradient(circle, ${word.color}10 0%, transparent 70%)`,
                    `radial-gradient(circle, ${word.color}30 0%, transparent 70%)`,
                    `radial-gradient(circle, ${word.color}10 0%, transparent 70%)`,
                  ]
                }}
                transition={{ 
                  duration: 0.6,
                  background: { duration: 2, repeat: Infinity }
                }}
              />
              
              {/* Interaction sparkle */}
              {isInteracted && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  ✨
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {showButton && (
        <motion.div
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 100, scale: 0.5, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{ 
            duration: 1.2,
            type: "spring",
            stiffness: 150,
            damping: 18,
            delay: 0.3
          }}
        >
          <motion.button
            onClick={() => {
              playSound('button-click', { volume: 0.7 });
              onComplete();
            }}
            className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl overflow-hidden group cursor-pointer"
            whileHover={{ 
              scale: 1.12, 
              y: -8,
              boxShadow: "0 25px 80px rgba(147, 51, 234, 0.5)",
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.95, y: 0 }}
            animate={{
              boxShadow: [
                "0 15px 40px rgba(147, 51, 234, 0.3)",
                "0 20px 60px rgba(147, 51, 234, 0.6)",
                "0 15px 40px rgba(147, 51, 234, 0.3)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {/* Glow effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-110" />
            
            {/* Primary button background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
              animate={{
                x: ["-120%", "120%"],
                skewX: [-20, 20, -20]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: "easeInOut"
              }}
            />
            
            {/* Floating particles around button */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${30 + (i % 2) * 40}%`,
                }}
                animate={{
                  y: [-10, -30, -10],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            <motion.span
              className="relative z-10 flex items-center gap-2"
              animate={{ 
                textShadow: [
                  "0 2px 10px rgba(255,255,255,0.5)",
                  "0 4px 20px rgba(255,255,255,0.8)",
                  "0 2px 10px rgba(255,255,255,0.5)",
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Let's continue
              <motion.span
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                ✨
              </motion.span>
            </motion.span>
          </motion.button>
        </motion.div>
      )}
      
      {/* Custom CSS for pulse animation */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default WordCloud;
