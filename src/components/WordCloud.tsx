import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WordCloudProps {
  onComplete: () => void;
}

const WordCloud: React.FC<WordCloudProps> = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const [interactedWords, setInteractedWords] = useState<Set<number>>(new Set());

  const words = [
    { text: "Kind", color: "#FF6B6B", size: "text-3xl", weight: 1 },
    { text: "Brave", color: "#4ECDC4", size: "text-5xl", weight: 2 },
    { text: "Funny", color: "#45B7D1", size: "text-4xl", weight: 1.5 },
    { text: "Gentle", color: "#FFA07A", size: "text-3xl", weight: 1 },
    { text: "Magical", color: "#98D8C8", size: "text-6xl", weight: 3 },
    { text: "Caring", color: "#F7DC6F", size: "text-4xl", weight: 1.5 },
    { text: "Creative", color: "#BB8FCE", size: "text-5xl", weight: 2 },
    { text: "Loyal", color: "#85C1E9", size: "text-4xl", weight: 1.5 },
    { text: "Warm", color: "#F8C471", size: "text-3xl", weight: 1 },
    { text: "Beautiful", color: "#F1948A", size: "text-6xl", weight: 3 },
    { text: "Strong", color: "#82E0AA", size: "text-5xl", weight: 2 },
    { text: "Radiant", color: "#D7BDE2", size: "text-4xl", weight: 1.5 },
    { text: "Wise", color: "#AED6F1", size: "text-3xl", weight: 1 },
    { text: "Inspiring", color: "#F8D7DA", size: "text-5xl", weight: 2 },
    { text: "Joyful", color: "#D5F4E6", size: "text-4xl", weight: 1.5 },
  ];

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

  const getFloatingAnimation = (weight: number) => ({
    y: [0, -15 * weight, 5, 0],
    x: [0, Math.random() * 8 - 4, 0],
    rotate: [0, Math.random() * 6 - 3, 0],
  });

  const handleWordClick = (index: number) => {
    const newInteracted = new Set(interactedWords);
    newInteracted.add(index);
    setInteractedWords(newInteracted);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      
      <div className="absolute inset-0">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-center pt-20 pb-10"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          These are words that describe you...
        </motion.h2>

        {words.map((word, index) => (
          <motion.div
            key={word.text}
            className={`absolute font-bold cursor-pointer ${word.size}`}
            style={{
              ...getRandomPosition(index),
              color: word.color,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              zIndex: 10,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              ...getFloatingAnimation(word.weight),
            }}
            transition={{
              duration: 1.5,
              delay: index * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.5,
              rotate: 360,
              transition: { duration: 0.5 },
            }}
            onClick={() => handleWordClick(index)}
          >
            {word.text}
            <motion.div
              className="absolute -inset-2"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              style={{
                background: `radial-gradient(circle, ${word.color}20 0%, transparent 70%)`,
                borderRadius: '50%',
              }}
            />
          </motion.div>
        ))}

        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full opacity-30"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              background: `radial-gradient(circle, ${words[i % words.length].color}40, transparent)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {showButton && (
        <motion.div
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            onClick={onComplete}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(147, 51, 234, 0.5)",
                "0 0 40px rgba(147, 51, 234, 0.8)",
                "0 0 20px rgba(147, 51, 234, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Let's continue ✨
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default WordCloud;
