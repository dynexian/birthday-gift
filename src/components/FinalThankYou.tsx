import React from 'react';
import { motion } from 'framer-motion';

interface FinalThankYouProps {
  onRestart: () => void;
}

const FinalThankYou: React.FC<FinalThankYouProps> = ({ onRestart }) => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Animated stars background */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Floating hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-4xl opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            rotate: [0, 360, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 3,
          }}
        >
          💗
        </motion.div>
      ))}

      <div className="text-center z-10 max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white"
            animate={{
              textShadow: [
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.8)",
                "0 0 10px rgba(255,255,255,0.5)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            With Love
          </motion.h1>
        </motion.div>

        <motion.div
          className="space-y-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.p
            className="text-2xl md:text-4xl text-pink-200 leading-relaxed"
            whileHover={{ scale: 1.05 }}
          >
            Thank you for being a part of my world.
          </motion.p>
          
          <motion.p
            className="text-xl md:text-3xl text-purple-200 leading-relaxed"
            whileHover={{ scale: 1.05 }}
          >
            This was made just for you. 💗
          </motion.p>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.p
            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            — from me ✨
          </motion.p>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.button
            onClick={onRestart}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-2xl border-2 border-white/20"
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 25px 50px rgba(236, 72, 153, 0.5)",
              rotate: [0, -2, 2, 0],
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 10px 30px rgba(236, 72, 153, 0.3)",
                "0 20px 50px rgba(236, 72, 153, 0.6)",
                "0 10px 30px rgba(236, 72, 153, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            🔄 Experience Again
          </motion.button>

          <motion.p
            className="text-sm text-purple-300 opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: 3 }}
          >
            Click anywhere to create sparkles ✨
          </motion.p>
        </motion.div>
      </div>

      {/* Click sparkle effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        onClick={(e) => {
          // Create sparkle effect at click position
          const sparkle = document.createElement('div');
          sparkle.className = 'absolute w-4 h-4 bg-white rounded-full animate-ping pointer-events-none';
          sparkle.style.left = `${e.clientX - 8}px`;
          sparkle.style.top = `${e.clientY - 8}px`;
          document.body.appendChild(sparkle);
          
          setTimeout(() => {
            if (document.body.contains(sparkle)) {
              document.body.removeChild(sparkle);
            }
          }, 1000);
        }}
      />
    </motion.div>
  );
};

export default FinalThankYou;
