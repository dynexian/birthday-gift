import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveStageProps {
  onNext: () => void;
  onBack: () => void;
}

interface Stat {
  id: string;
  name: string;
  value: number;
  maxValue: number;
  color: string;
  icon: string;
}

interface Choice {
  id: string;
  text: string;
  emotion: string;
  stats: { [key: string]: number };
  response: string;
}

const InteractiveStage: React.FC<InteractiveStageProps> = ({ onNext, onBack }) => {
  const [stats, setStats] = useState<Stat[]>([
    { id: 'serenity', name: 'Serenity', value: 75, maxValue: 100, color: 'from-green-400 to-emerald-500', icon: '🧘' },
    { id: 'wisdom', name: 'Wisdom', value: 60, maxValue: 100, color: 'from-purple-400 to-violet-500', icon: '🦉' },
    { id: 'love', name: 'Love', value: 85, maxValue: 100, color: 'from-pink-400 to-rose-500', icon: '💖' },
    { id: 'courage', name: 'Courage', value: 70, maxValue: 100, color: 'from-orange-400 to-red-500', icon: '🦁' },
    { id: 'creativity', name: 'Creativity', value: 80, maxValue: 100, color: 'from-blue-400 to-indigo-500', icon: '🎨' },
    { id: 'peace', name: 'Inner Peace', value: 65, maxValue: 100, color: 'from-cyan-400 to-teal-500', icon: '☮️' }
  ]);

  const [currentChoice, setCurrentChoice] = useState<Choice | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const choices: Choice[] = [
    {
      id: '1',
      text: 'Embrace the challenge with confidence',
      emotion: 'Courage',
      stats: { courage: 10, serenity: 5 },
      response: 'Your courage grows stronger! You feel ready to face any challenge with grace and determination.'
    },
    {
      id: '2',
      text: 'Seek wisdom through contemplation',
      emotion: 'Wisdom',
      stats: { wisdom: 12, peace: 8 },
      response: 'Deep insights flow through you. The answers you seek are already within, waiting to be discovered.'
    },
    {
      id: '3',
      text: 'Share love and kindness with others',
      emotion: 'Love',
      stats: { love: 15, serenity: 7 },
      response: 'Your heart expands with warmth. Love multiplies when shared, creating ripples of joy everywhere.'
    },
    {
      id: '4',
      text: 'Create something beautiful from nothing',
      emotion: 'Creativity',
      stats: { creativity: 14, wisdom: 6 },
      response: 'Your creative spirit soars! Art and beauty flow through you, transforming the ordinary into magic.'
    },
    {
      id: '5',
      text: 'Find stillness in the present moment',
      emotion: 'Peace',
      stats: { peace: 18, serenity: 10 },
      response: 'Profound tranquility washes over you. In this stillness, you find the strength of mountains and the flow of rivers.'
    },
    {
      id: '6',
      text: 'Practice mindful awareness',
      emotion: 'Serenity',
      stats: { serenity: 16, wisdom: 9 },
      response: 'Your awareness expands like gentle waves. Every breath becomes a meditation, every moment a gift.'
    }
  ];

  const handleChoice = (choice: Choice) => {
    setCurrentChoice(choice);
    setHasInteracted(true);
    
    // Update stats
    setStats(prevStats => 
      prevStats.map(stat => ({
        ...stat,
        value: Math.min(stat.maxValue, stat.value + (choice.stats[stat.id] || 0))
      }))
    );

    // Show response for a moment, then hide it
    setTimeout(() => {
      setCurrentChoice(null);
    }, 3000);
  };

  const resetStats = () => {
    setStats(prevStats => 
      prevStats.map(stat => ({
        ...stat,
        value: Math.max(50, Math.min(75, 50 + Math.random() * 25))
      }))
    );
    setHasInteracted(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Soul Stats
          </h2>
          <p className="text-purple-200 text-xl font-medium">
            Your inner RPG character sheet ✨
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Stats Panel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-purple-500/20 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-purple-200">Character Stats</h3>
                <motion.button
                  onClick={resetStats}
                  className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-full text-purple-300 text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎲 Reroll
                </motion.button>
              </div>

              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{stat.icon}</span>
                        <span className="text-white font-semibold text-lg">{stat.name}</span>
                      </div>
                      <span className="text-purple-300 font-bold">
                        {stat.value}/{stat.maxValue}
                      </span>
                    </div>
                    
                    <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${stat.color} rounded-full shadow-lg`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.value / stat.maxValue) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                      
                      {/* Glow effect */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-full opacity-30 blur-sm`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.value / stat.maxValue) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {hasInteracted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-4 bg-green-500/20 rounded-xl border border-green-400/30"
                >
                  <p className="text-green-300 text-center font-medium">
                    ✨ Your soul grows stronger with each choice! ✨
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Choices Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-purple-500/20 shadow-2xl"
            >
              <h3 className="text-3xl font-bold text-purple-200 mb-2 text-center">
                Choose Your Path
              </h3>
              <p className="text-purple-300 text-center mb-8">
                How do you want to grow today?
              </p>

              <div className="grid gap-4">
                {choices.map((choice, index) => (
                  <motion.button
                    key={choice.id}
                    onClick={() => handleChoice(choice)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="group relative p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 rounded-xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 text-left"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:shadow-lg group-hover:shadow-purple-400/50" />
                      <div>
                        <p className="text-white font-medium">{choice.text}</p>
                        <p className="text-purple-300 text-sm mt-1">+{choice.emotion}</p>
                      </div>
                    </div>
                    
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/10 group-hover:to-pink-400/10 rounded-xl transition-all duration-300" />
                  </motion.button>
                ))}
              </div>

              {hasInteracted && (
                <motion.button
                  onClick={onNext}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="w-full mt-8 glow-button text-lg py-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue Your Journey →
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>

        {/* Choice Response Modal */}
        <AnimatePresence>
          {currentChoice && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-md rounded-3xl p-8 max-w-md mx-auto border border-purple-400/30 shadow-2xl"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.6 }}
                    className="text-6xl mb-4"
                  >
                    ✨
                  </motion.div>
                  <h4 className="text-2xl font-bold text-purple-200 mb-4">
                    {currentChoice.emotion} Enhanced!
                  </h4>
                  <p className="text-purple-100 leading-relaxed">
                    {currentChoice.response}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-8 left-8 z-20 bg-black/20 backdrop-blur-md border border-purple-400/30 rounded-full px-6 py-3 text-purple-200 font-medium hover:bg-black/30 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center space-x-2">
          <span>←</span>
          <span>Back</span>
        </span>
      </motion.button>
    </div>
  );
};

export default InteractiveStage;
