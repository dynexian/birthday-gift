import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioManager } from '../hooks/useAudio';

interface WordCloudProps {
  onComplete: () => void;
}

interface Word {
  text: string;
  color: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  category: 'trait' | 'emotion' | 'strength';
}

const WordCloud: React.FC<WordCloudProps> = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const [interactedWords, setInteractedWords] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { playSound } = useAudioManager();

  const words: Word[] = [
    // Personality Traits
    { text: "Kind", color: "#ff6b6b", size: "lg", category: "trait" },
    { text: "Creative", color: "#4ecdc4", size: "xl", category: "trait" },
    { text: "Wise", color: "#45b7d1", size: "md", category: "trait" },
    { text: "Gentle", color: "#ffa726", size: "md", category: "trait" },
    { text: "Loyal", color: "#ab47bc", size: "lg", category: "trait" },
    
    // Emotions & Feelings
    { text: "Joyful", color: "#66bb6a", size: "xl", category: "emotion" },
    { text: "Peaceful", color: "#42a5f5", size: "lg", category: "emotion" },
    { text: "Radiant", color: "#ef5350", size: "md", category: "emotion" },
    { text: "Cheerful", color: "#ffca28", size: "lg", category: "emotion" },
    { text: "Warm", color: "#ff7043", size: "md", category: "emotion" },
    
    // Strengths & Qualities
    { text: "Strong", color: "#26a69a", size: "xl", category: "strength" },
    { text: "Brave", color: "#5c6bc0", size: "lg", category: "strength" },
    { text: "Amazing", color: "#ec407a", size: "xl", category: "strength" },
    { text: "Magical", color: "#9c27b0", size: "lg", category: "strength" },
    { text: "Beautiful", color: "#f06292", size: "lg", category: "strength" },
  ];

  const categories = [
    { id: 'trait', label: 'Traits', icon: '🌟', color: 'from-blue-500 to-purple-500' },
    { id: 'emotion', label: 'Feelings', icon: '💖', color: 'from-pink-500 to-red-500' },
    { id: 'strength', label: 'Strengths', icon: '⚡', color: 'from-green-500 to-teal-500' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleWordClick = (index: number) => {
    playSound('button-click', { volume: 0.5 });
    setInteractedWords(prev => new Set(Array.from(prev).concat(index)));
  };

  const getSizeClasses = () => {
    // Use uniform sizing for all words to prevent overflow
    return 'text-lg sm:text-xl md:text-2xl lg:text-3xl';
  };

  const filteredWords = selectedCategory 
    ? words.filter(word => word.category === selectedCategory)
    : words;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [0.5, 1, 0.5],
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

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
            animate={{
              textShadow: [
                "0 4px 20px rgba(139, 92, 246, 0.3)",
                "0 8px 40px rgba(139, 92, 246, 0.6)",
                "0 4px 20px rgba(139, 92, 246, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨ Words That Describe You ✨
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Discover the beautiful qualities that make you unique
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                : 'bg-white/80 text-slate-700 hover:bg-white/90 shadow-md hover:shadow-lg'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌈 All Words
          </motion.button>
          
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                  : 'bg-white/80 text-slate-700 hover:bg-white/90 shadow-md hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon} {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Words Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto mb-12 sm:mb-16"
          layout
        >
          <AnimatePresence>
            {filteredWords.map((word, index) => {
              const isInteracted = interactedWords.has(index);
              const sizeClasses = getSizeClasses();
              
              return (
                <motion.div
                  key={word.text}
                  layout
                  initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="group relative"
                >
                  <motion.button
                    onClick={() => handleWordClick(index)}
                    className={`w-full p-3 sm:p-4 md:p-6 rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:border-white/70 ${
                      isInteracted ? 'ring-4 ring-purple-200 bg-gradient-to-br from-purple-50 to-pink-50' : ''
                    }`}
                    style={{
                      minHeight: '120px',
                      maxHeight: '120px'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -8,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Word Display */}
                    <motion.div
                      className="flex flex-col items-center justify-center h-full px-1 sm:px-2"
                      animate={isInteracted ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.span
                        className={`font-bold ${sizeClasses} text-center leading-tight mb-1 sm:mb-2 whitespace-nowrap overflow-hidden text-ellipsis`}
                        style={{ 
                          color: word.color,
                          maxWidth: '100%',
                          display: 'block'
                        }}
                        animate={{
                          textShadow: [
                            `0 2px 10px ${word.color}40`,
                            `0 4px 20px ${word.color}60`,
                            `0 2px 10px ${word.color}40`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {word.text}
                      </motion.span>
                      
                      {/* Category Badge */}
                      <motion.span
                        className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 font-medium mt-auto truncate max-w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.5 }}
                        style={{ fontSize: '0.65rem', lineHeight: '1' }}
                      >
                        {categories.find(cat => cat.id === word.category)?.icon} {word.category}
                      </motion.span>
                    </motion.div>

                    {/* Interaction Effect */}
                    {isInteracted && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                            style={{
                              top: `${20 + (i * 15)}%`,
                              left: `${10 + (i * 15)}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                              y: [0, -20, -40],
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.1,
                              repeat: Infinity,
                              repeatDelay: 2
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
              <span>Words Discovered</span>
              <span>{interactedWords.size} / {filteredWords.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${(interactedWords.size / filteredWords.length) * 100}%` 
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <motion.button
                onClick={() => {
                  playSound('button-click', { volume: 0.7 });
                  onComplete();
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full text-lg sm:text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(147, 51, 234, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 10px 30px rgba(147, 51, 234, 0.2)",
                    "0 20px 40px rgba(147, 51, 234, 0.4)",
                    "0 10px 30px rgba(147, 51, 234, 0.2)"
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              >
                <span className="flex items-center gap-3">
                  Continue Your Journey
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WordCloud;
