import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ClosingStageProps {
  onBack: () => void;
  onRestart: () => void;
}

const ClosingStage: React.FC<ClosingStageProps> = ({ onBack, onRestart }) => {
  const [showModal, setShowModal] = useState(false);

  const closingText = [
    "You've reached the end.",
    "Or perhaps, a new beginning.",
    "Every moment is a gift.",
    "Every breath, a possibility.",
    "Take this peace with you.",
    "Carry this serenity forward.",
    "The journey continues..."
  ];

  const actionCards = [
    {
      id: 1,
      title: "Begin Again",
      subtitle: "Return to the start",
      action: onRestart,
      icon: "🔄",
      color: "from-green-400 to-emerald-500"
    },
    {
      id: 2,
      title: "Download Memories",
      subtitle: "Save this experience",
      action: () => setShowModal(true),
      icon: "💾",
      color: "from-blue-400 to-cyan-500"
    },
    {
      id: 3,
      title: "Share the Journey",
      subtitle: "Inspire others",
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'Serene Countdown Experience',
            text: 'I just completed this beautiful, peaceful journey. You should try it too!',
            url: window.location.href
          });
        } else {
          navigator.clipboard.writeText(window.location.href);
          alert('Link copied to clipboard!');
        }
      },
      icon: "🌟",
      color: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      {/* Floating particles background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
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

      {/* Main content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-8">
        {/* Animated closing text */}
        <div className="mb-20 space-y-8 md:space-y-10">
          {closingText.map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.8 }}
              className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white/90 leading-relaxed md:leading-relaxed px-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Action cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: closingText.length * 0.8 + 0.5 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {actionCards.map((card, index) => (
            <motion.button
              key={card.id}
              onClick={card.action}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: closingText.length * 0.8 + 0.8 + index * 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-10 md:p-12 border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${card.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl mb-6">{card.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-white/70 text-base md:text-lg">{card.subtitle}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Gratitude message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: closingText.length * 0.8 + 2 }}
          className="bg-white/5 backdrop-blur-md rounded-3xl p-10 md:p-12 border border-white/10 max-w-3xl mx-auto"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.02, 1],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl md:text-7xl mb-6"
          >
            🙏
          </motion.div>
          <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
            Thank you for taking this journey with us. May you carry this serenity in your heart wherever you go.
          </p>
        </motion.div>
      </div>

      {/* Download modal */}
      <AnimatePresence>
        {showModal && (
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
              className="bg-white rounded-3xl p-8 max-w-md mx-auto shadow-2xl"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Save Your Experience
                </h3>
                <p className="text-gray-600 mb-6">
                  Take a screenshot to capture this moment, or bookmark this page to return anytime.
                </p>
                <div className="space-y-3">
                  <motion.button
                    onClick={() => window.print()}
                    className="w-full glow-button py-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Print This Page
                  </motion.button>
                  <motion.button
                    onClick={() => setShowModal(false)}
                    className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white font-medium hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center space-x-2">
          <span>←</span>
          <span>Back</span>
        </span>
      </motion.button>

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(${i * 50 + 100}, ${i * 30 + 150}, 255, 0.1) 0%, transparent 70%)`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ClosingStage;
