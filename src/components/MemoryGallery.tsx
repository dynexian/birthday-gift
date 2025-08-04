import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemoryGalleryProps {
  onComplete: () => void;
}

interface Photo {
  id: number;
  src: string;
  caption: string;
  alt: string;
}

interface MemorySection {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  photos: Photo[];
}

const MemoryGallery: React.FC<MemoryGalleryProps> = ({ onComplete }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activeSection, setActiveSection] = useState<string>('childhood');

  // Organized memory sections
  const memorySections: MemorySection[] = [
    {
      id: 'childhood',
      title: 'Adventures of a Toddler',
      subtitle: 'The cutest and most innocent moments',
      emoji: '👶',
      gradient: 'from-yellow-200 via-orange-200 to-red-200',
      photos: [
        { id: 1, src: '/images/childhood1.jpg', caption: 'First steps! 👶👣', alt: 'First steps' },
        { id: 2, src: '/images/childhood2.jpg', caption: 'Playing in the sand 🏖️', alt: 'Beach play' },
        { id: 3, src: '/images/childhood3.jpg', caption: 'Birthday cake mess 🎂', alt: 'Birthday celebration' },
        { id: 4, src: '/images/childhood4.jpg', caption: 'Nap time cuteness 😴', alt: 'Sleeping peacefully' },
      ]
    },
    {
      id: 'school',
      title: 'School Days Chronicles',
      subtitle: 'Learning, growing, and making friends',
      emoji: '🎒',
      gradient: 'from-green-200 via-blue-200 to-purple-200',
      photos: [
        { id: 5, src: '/images/school1.jpg', caption: 'First day of school! 📚', alt: 'School entrance' },
        { id: 6, src: '/images/school2.jpg', caption: 'Science fair winner 🏆', alt: 'Science project' },
        { id: 7, src: '/images/school3.jpg', caption: 'Best friends forever 👫', alt: 'School friends' },
        { id: 8, src: '/images/school4.jpg', caption: 'Graduation day pride 🎓', alt: 'Graduation ceremony' },
      ]
    },
    {
      id: 'teenage',
      title: 'Teenage Adventures',
      subtitle: 'Wild times and unforgettable memories',
      emoji: '🌟',
      gradient: 'from-purple-200 via-pink-200 to-red-200',
      photos: [
        { id: 9, src: '/images/teen1.jpg', caption: 'Road trip madness �', alt: 'Road trip with friends' },
        { id: 10, src: '/images/teen2.jpg', caption: 'Prom night magic ✨', alt: 'Prom night' },
        { id: 11, src: '/images/teen3.jpg', caption: 'Concert memories 🎵', alt: 'At a concert' },
        { id: 12, src: '/images/teen4.jpg', caption: 'Late night adventures 🌙', alt: 'Night out with friends' },
      ]
    },
    {
      id: 'recent',
      title: 'Recent Treasures',
      subtitle: 'Making new memories every day',
      emoji: '💝',
      gradient: 'from-blue-200 via-indigo-200 to-purple-200',
      photos: [
        { id: 13, src: '/images/recent1.jpg', caption: 'That amazing trip 😭', alt: 'Recent travel' },
        { id: 14, src: '/images/recent2.jpg', caption: 'Best day ever! �', alt: 'Perfect day' },
        { id: 15, src: '/images/recent3.jpg', caption: 'Can\'t stop laughing 😂', alt: 'Funny moment' },
        { id: 16, src: '/images/recent4.jpg', caption: 'Perfect moment ✨', alt: 'Beautiful memory' },
      ]
    }
  ];

  const closeModal = () => setSelectedPhoto(null);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-12 px-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          💝 Memory Gallery 💝
        </motion.h2>

        {/* Navigation Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {memorySections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-white shadow-xl scale-110 text-purple-600'
                  : 'bg-white/60 hover:bg-white/80 text-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{section.emoji}</span>
              {section.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Active Section Display */}
        <AnimatePresence mode="wait">
          {memorySections.map((section) => (
            activeSection === section.id && (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6 }}
              >
                {/* Section Header */}
                <motion.div
                  className={`relative mb-12 p-8 rounded-3xl bg-gradient-to-r ${section.gradient} backdrop-blur-sm`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-6xl mb-4"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      {section.emoji}
                    </motion.div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 font-medium">
                      {section.subtitle}
                    </p>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-3 h-3 bg-white/50 rounded-full"></div>
                  <div className="absolute top-8 right-6 w-2 h-2 bg-white/40 rounded-full"></div>
                  <div className="absolute bottom-6 left-8 w-4 h-4 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-white/50 rounded-full"></div>
                </motion.div>

                {/* Photos Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                  {section.photos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      className="break-inside-avoid relative cursor-pointer group"
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100 
                      }}
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white p-4 hover:shadow-2xl transition-shadow duration-300">
                        {/* Placeholder for image - replace with actual image */}
                        <div
                          className={`w-full h-64 bg-gradient-to-br ${section.gradient} rounded-xl flex items-center justify-center relative overflow-hidden`}
                          style={{ aspectRatio: `${Math.random() * 0.5 + 0.8}` }}
                        >
                          <motion.span 
                            className="text-4xl z-10"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            📸
                          </motion.span>
                          
                          {/* Floating sparkles */}
                          <motion.div
                            className="absolute top-2 right-2 text-yellow-400"
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, 180, 360] 
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              delay: index * 0.2
                            }}
                          >
                            ✨
                          </motion.div>
                          
                          <motion.div
                            className="absolute bottom-2 left-2 text-pink-400"
                            animate={{ 
                              scale: [1, 1.3, 1],
                              y: [0, -5, 0] 
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: index * 0.3
                            }}
                          >
                            💖
                          </motion.div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-gray-700 font-medium text-center text-sm">
                            {photo.caption}
                          </p>
                        </div>

                        {/* Hover overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <motion.span 
                            className="text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-full"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            ✨ Click to zoom ✨
                          </motion.span>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Enhanced Modal for enlarged photo */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-4xl max-h-[90vh] overflow-auto relative"
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Close button with better styling */}
                  <motion.button
                    onClick={closeModal}
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-10"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-xl font-bold">×</span>
                  </motion.button>
                  
                  {/* Enhanced image placeholder */}
                  <motion.div 
                    className="w-full h-96 bg-gradient-to-br from-purple-300 via-pink-300 to-indigo-300 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.span 
                      className="text-8xl z-10"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      📸
                    </motion.span>
                    
                    {/* Animated background elements */}
                    <motion.div
                      className="absolute top-4 left-4 w-6 h-6 bg-white/30 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute top-8 right-8 w-4 h-4 bg-yellow-300/50 rounded-full"
                      animate={{ scale: [1, 1.5, 1], y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute bottom-6 left-12 w-5 h-5 bg-pink-300/40 rounded-full"
                      animate={{ scale: [1, 1.3, 1], x: [0, 10, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                    />
                  </motion.div>
                  
                  {/* Enhanced caption */}
                  <motion.div
                    className="text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedPhoto.caption}
                    </p>
                    <div className="flex justify-center space-x-2">
                      {['💝', '✨', '🌟', '💖', '🎉'].map((emoji, index) => (
                        <motion.span
                          key={index}
                          className="text-lg"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0] 
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: index * 0.2
                          }}
                        >
                          {emoji}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button with section indicator */}
        <motion.div
          className="flex flex-col items-center mt-16 space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* Section Progress Indicator */}
          <motion.div
            className="flex space-x-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            {memorySections.map((section) => (
              <motion.div
                key={section.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === section.id 
                    ? 'bg-purple-500 scale-125' 
                    : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </motion.div>
          
          <motion.p
            className="text-gray-600 text-center max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            💫 Exploring {memorySections.find(s => s.id === activeSection)?.title} 💫
            <br />
            <span className="text-sm">Click the sections above to explore different memories</span>
          </motion.p>
          
          <motion.button
            onClick={onComplete}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-xl relative overflow-hidden"
            whileHover={{ 
              scale: 1.1, 
              boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 10px 30px rgba(147, 51, 234, 0.3)",
                "0 15px 40px rgba(147, 51, 234, 0.5)",
                "0 10px 30px rgba(147, 51, 234, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {/* Animated sparkles inside button */}
            <motion.span
              className="absolute top-1 left-4 text-yellow-300"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity 
              }}
            >
              ✨
            </motion.span>
            <motion.span
              className="absolute bottom-1 right-4 text-pink-300"
              animate={{ 
                scale: [1, 1.2, 1],
                y: [0, -3, 0] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: 0.5
              }}
            >
              💖
            </motion.span>
            
            Continue the Journey ✨
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MemoryGallery;
