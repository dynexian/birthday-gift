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
      title: 'Some Moments from Childhood',
      subtitle: 'The innocence and silence of childhood',
      emoji: '👦',
      gradient: 'from-yellow-200 via-orange-200 to-red-200',
      photos: [
        { id: 1, src: `${process.env.PUBLIC_URL}/images/childhood/a (1).jpg`, caption: 'Sweet childhood memories! 👶✨', alt: 'Childhood memory' },
        { id: 2, src: `${process.env.PUBLIC_URL}/images/childhood/a (2).jpg`, caption: 'First steps into the world! 🌍', alt: 'First steps' },
        { id: 3, src: `${process.env.PUBLIC_URL}/images/childhood/a (3).jpg`, caption: 'Playtime adventures! 🧸', alt: 'Playtime' },
        { id: 4, src: `${process.env.PUBLIC_URL}/images/childhood/a (4).jpg`, caption: 'Family love captured! ❤️', alt: 'Family moment' },
        { id: 5, src: `${process.env.PUBLIC_URL}/images/childhood/a (5).jpg`, caption: 'Sweet childhood memories! 👶✨', alt: 'Childhood memory' },
        { id: 7, src: `${process.env.PUBLIC_URL}/images/childhood/a (7).jpg`, caption: 'Playtime adventures! 🧸', alt: 'Playtime' },
        { id: 8, src: `${process.env.PUBLIC_URL}/images/childhood/a (8).jpg`, caption: 'Family love captured! ❤️', alt: 'Family moment' },  
        { id: 9, src: `${process.env.PUBLIC_URL}/images/childhood/a (9).jpg`, caption: 'Sweet childhood memories! 👶✨', alt: 'Childhood memory' },
        { id: 10, src: `${process.env.PUBLIC_URL}/images/childhood/a (10).jpg`, caption: 'First steps into the world! 🌍', alt: 'First steps' },
        { id: 11, src: `${process.env.PUBLIC_URL}/images/childhood/a (11).jpg`, caption: 'Playtime adventures! 🧸', alt: 'Playtime' },
        { id: 12, src: `${process.env.PUBLIC_URL}/images/childhood/a (12).jpg`, caption: 'Family love captured! ❤️', alt: 'Family moment' },
        { id: 13, src: `${process.env.PUBLIC_URL}/images/childhood/a (13).jpg`, caption: 'Sweet childhood memories! 👶✨', alt: 'Childhood memory' }
      ]
    },
    {
      id: 'school',
      title: 'School Days',
      subtitle: 'Learning, growing, and making friends',
      emoji: '🎒',
      gradient: 'from-green-200 via-blue-200 to-purple-200',
      photos: [
        { id: 14, src: `${process.env.PUBLIC_URL}/images/school/b (1).jpg`, caption: 'Days of school! 📚', alt: 'School entrance' },
        { id: 15, src: `${process.env.PUBLIC_URL}/images/school/b (2).jpg`, caption: 'Science fair winner 🏆', alt: 'Science project' },
        { id: 16, src: `${process.env.PUBLIC_URL}/images/school/b (3).jpg`, caption: 'Best friends forever 👫', alt: 'School friends' },
        { id: 17, src: `${process.env.PUBLIC_URL}/images/school/b (4).jpg`, caption: 'Graduation day pride 🎓', alt: 'Graduation ceremony' },
        { id: 18, src: `${process.env.PUBLIC_URL}/images/school/b (5).jpg`, caption: 'Days of school! 📚', alt: 'School entrance' },
        { id: 19, src: `${process.env.PUBLIC_URL}/images/school/b (6).jpg`, caption: 'Science fair winner 🏆', alt: 'Science project' },
        { id: 20, src: `${process.env.PUBLIC_URL}/images/school/b (7).jpg`, caption: 'Best friends forever 👫', alt: 'School friends' },
        { id: 21, src: `${process.env.PUBLIC_URL}/images/school/b (8).jpg`, caption: 'Graduation day pride 🎓', alt: 'Graduation ceremony' },
        { id: 22, src: `${process.env.PUBLIC_URL}/images/school/b (9).jpg`, caption: 'Days of school! 📚', alt: 'School entrance' },
        { id: 23, src: `${process.env.PUBLIC_URL}/images/school/b (10).jpg`, caption: 'Science fair winner 🏆', alt: 'Science project' },
        { id: 24, src: `${process.env.PUBLIC_URL}/images/school/b (11).jpg`, caption: 'Best friends forever 👫', alt: 'School friends' },
        { id: 25, src: `${process.env.PUBLIC_URL}/images/school/b (12).jpg`, caption: 'Graduation day pride 🎓', alt: 'Graduation ceremony' },
        { id: 26, src: `${process.env.PUBLIC_URL}/images/school/b (13).jpg`, caption: 'Days of school! 📚', alt: 'School entrance' },
        { id: 27, src: `${process.env.PUBLIC_URL}/images/school/b (14).jpg`, caption: 'Science fair winner 🏆', alt: 'Science project' },
        { id: 28, src: `${process.env.PUBLIC_URL}/images/school/b (15).jpg`, caption: 'Best friends forever 👫', alt: 'School friends' },
        { id: 29, src: `${process.env.PUBLIC_URL}/images/school/b (16).jpg`, caption: 'Graduation day pride 🎓', alt: 'Graduation ceremony' },
        { id: 30, src: `${process.env.PUBLIC_URL}/images/school/b (17).jpg`, caption: 'Days of school! 📚', alt: 'School entrance' },
        { id: 31, src: `${process.env.PUBLIC_URL}/images/school/b (18).jpg`, caption: 'Science fair winner 🏆', alt: 'Science project' },
        { id: 32, src: `${process.env.PUBLIC_URL}/images/school/b (19).jpg`, caption: 'Best friends forever 👫', alt: 'School friends' },
        { id: 33, src: `${process.env.PUBLIC_URL}/images/school/b (20).jpg`, caption: 'Graduation day pride 🎓', alt: 'Graduation ceremony' },
        { id: 34, src: `${process.env.PUBLIC_URL}/images/school/b (21).jpg`, caption: 'Days of school! 📚', alt: 'School entrance' },
        { id: 35, src: `${process.env.PUBLIC_URL}/images/school/b (22).png`, caption: 'Science fair winner 🏆', alt: 'Science project' },
        { id: 36, src: `${process.env.PUBLIC_URL}/images/school/b (23).png`, caption: 'Best friends forever 👫', alt: 'School friends' },
        { id: 37, src: `${process.env.PUBLIC_URL}/images/school/b (24).jpg`, caption: 'Graduation day pride 🎓', alt: 'Graduation ceremony' },

      ]
    },
    {
      id: 'teenage',
      title: 'Teenage Adventures',
      subtitle: 'Wild times and unforgettable memories',
      emoji: '🌟',
      gradient: 'from-purple-200 via-pink-200 to-red-200',
      photos: [
        { id: 38, src: `${process.env.PUBLIC_URL}/images/teenage/cde (1).jpg`, caption: 'New Memories', alt: 'Image description' },
        { id: 39, src: `${process.env.PUBLIC_URL}/images/teenage/cde (2).jpg`, caption: 'Unforgettable Moments', alt: 'Image description' },
        { id: 40, src: `${process.env.PUBLIC_URL}/images/teenage/cde (3).jpg`, caption: 'Teenage Dreams', alt: 'Image description' },
        { id: 41, src: `${process.env.PUBLIC_URL}/images/teenage/cde (4).jpg`, caption: 'Growing Up', alt: 'Image description' },
        { id: 42, src: `${process.env.PUBLIC_URL}/images/teenage/cde (5).jpg`, caption: 'New Memories', alt: 'Image description' },
        { id: 43, src: `${process.env.PUBLIC_URL}/images/teenage/cde (6).jpg`, caption: 'Unforgettable Moments', alt: 'Image description' },
        { id: 44, src: `${process.env.PUBLIC_URL}/images/teenage/cde (7).png`, caption: 'Teenage Dreams', alt: 'Image description' },
        { id: 45, src: `${process.env.PUBLIC_URL}/images/teenage/cde (8).jpg`, caption: 'Growing Up', alt: 'Image description' },
        { id: 46, src: `${process.env.PUBLIC_URL}/images/teenage/cde (9).jpg`, caption: 'New Memories', alt: 'Image description' },
        { id: 47, src: `${process.env.PUBLIC_URL}/images/teenage/cde (10).jpg`, caption: 'Unforgettable Moments', alt: 'Image description' },
        { id: 48, src: `${process.env.PUBLIC_URL}/images/teenage/cde (11).jpg`, caption: 'Teenage Dreams', alt: 'Image description' },
        { id: 49, src: `${process.env.PUBLIC_URL}/images/teenage/cde (12).jpg`, caption: 'Growing Up', alt: 'Image description' },
        { id: 50, src: `${process.env.PUBLIC_URL}/images/teenage/cde (13).jpg`, caption: 'New Memories', alt: 'Image description' },
        { id: 51, src: `${process.env.PUBLIC_URL}/images/teenage/cde (14).jpg`, caption: 'Unforgettable Moments', alt: 'Image description' },
        { id: 52, src: `${process.env.PUBLIC_URL}/images/teenage/cde (15).jpg`, caption: 'Teenage Dreams', alt: 'Image description' },
        { id: 53, src: `${process.env.PUBLIC_URL}/images/teenage/cde (16).jpg`, caption: 'Growing Up', alt: 'Image description' },
        { id: 54, src: `${process.env.PUBLIC_URL}/images/teenage/cde (17).jpg`, caption: 'New Memories', alt: 'Image description' },
        { id: 55, src: `${process.env.PUBLIC_URL}/images/teenage/cde (18).jpg`, caption: 'Unforgettable Moments', alt: 'Image description' },
        { id: 56, src: `${process.env.PUBLIC_URL}/images/teenage/cde (19).jpg`, caption: 'Teenage Dreams', alt: 'Image description' },
        { id: 57, src: `${process.env.PUBLIC_URL}/images/teenage/cde (20).jpg`, caption: 'Growing Up', alt: 'Image description' },
        { id: 58, src: `${process.env.PUBLIC_URL}/images/teenage/cde (21).jpg`, caption: 'New Memories', alt: 'Image description' },
        { id: 59, src: `${process.env.PUBLIC_URL}/images/teenage/cde (22).jpg`, caption: 'Unforgettable Moments', alt: 'Image description' },
        { id: 60, src: `${process.env.PUBLIC_URL}/images/teenage/cde (23).jpg`, caption: 'Teenage Dreams', alt: 'Image description' },
        { id: 61, src: `${process.env.PUBLIC_URL}/images/teenage/cde (24).jpg`, caption: 'Growing Up', alt: 'Image description' },
        { id: 62, src: `${process.env.PUBLIC_URL}/images/teenage/cde (25).jpg`, caption: 'New Memories', alt: 'Image description' },
        { id: 63, src: `${process.env.PUBLIC_URL}/images/teenage/cde (26).jpg`, caption: 'Unforgettable Moments', alt: 'Image description' },
        { id: 64, src: `${process.env.PUBLIC_URL}/images/teenage/cde (27).jpg`, caption: 'Teenage Dreams', alt: 'Image description' },
        { id: 65, src: `${process.env.PUBLIC_URL}/images/teenage/cde (28).jpg`, caption: 'Growing Up', alt: 'Image description' },
        { id: 66, src: `${process.env.PUBLIC_URL}/images/teenage/cde (29).jpg`, caption: 'New Memories', alt: 'Image description' },
        { id: 67, src: `${process.env.PUBLIC_URL}/images/teenage/cde (30).jpg`, caption: 'Unforgettable Moments', alt: 'Image description' },
        { id: 68, src: `${process.env.PUBLIC_URL}/images/teenage/cde (31).jpg`, caption: 'Teenage Dreams', alt: 'Image description' },
        { id: 69, src: `${process.env.PUBLIC_URL}/images/teenage/cde (32).jpg`, caption: 'Growing Up', alt: 'Image description' },
        { id: 70, src: `${process.env.PUBLIC_URL}/images/teenage/cde (33).jpg`, caption: 'New Memories', alt: 'Image description' },
        { id: 71, src: `${process.env.PUBLIC_URL}/images/teenage/cde (34).jpg`, caption: 'Unforgettable Moments', alt: 'Image description' },
        { id: 72, src: `${process.env.PUBLIC_URL}/images/teenage/cde (35).jpg`, caption: 'Teenage Dreams', alt: 'Image description' },
        { id: 73, src: `${process.env.PUBLIC_URL}/images/teenage/cde (36).jpg`, caption: 'Growing Up', alt: 'Image description' },
      ]
    },
    {
      id: 'recent',
      title: 'Recent Treasures',
      subtitle: 'Making new memories every day',
      emoji: '💝',
      gradient: 'from-blue-200 via-indigo-200 to-purple-200',
      photos: [
        { id: 74, src: `${process.env.PUBLIC_URL}/images/recent/r (1).jpg`, caption: 'Memories!', alt: 'Recent travel' },
        { id: 75, src: `${process.env.PUBLIC_URL}/images/recent/r (2).jpg`, caption: 'Celebrating life!', alt: 'Celebration moment' },
        { id: 76, src: `${process.env.PUBLIC_URL}/images/recent/r (3).jpg`, caption: 'Family time!', alt: 'Family gathering' },
        { id: 77, src: `${process.env.PUBLIC_URL}/images/recent/r (4).png`, caption: 'Nature walks!', alt: 'Nature exploration' },
        { id: 78, src: `${process.env.PUBLIC_URL}/images/recent/r (5).jpeg`, caption: 'Memories!', alt: 'Recent travel' },
        { id: 79, src: `${process.env.PUBLIC_URL}/images/recent/r (6).jpg`, caption: 'Celebrating life!', alt: 'Celebration moment' },
        { id: 80, src: `${process.env.PUBLIC_URL}/images/recent/r (7).jpg`, caption: 'Family time!', alt: 'Family gathering' },
        { id: 81, src: `${process.env.PUBLIC_URL}/images/recent/r (8).png`, caption: 'Nature walks!', alt: 'Nature exploration' },
        { id: 82, src: `${process.env.PUBLIC_URL}/images/recent/r (9).jpg`, caption: 'Memories!', alt: 'Recent travel' },
        { id: 83, src: `${process.env.PUBLIC_URL}/images/recent/r (10).jpg`, caption: 'Celebrating life!', alt: 'Celebration moment' },
        { id: 84, src: `${process.env.PUBLIC_URL}/images/recent/r (11).jpg`, caption: 'Family time!', alt: 'Family gathering' },
        { id: 85, src: `${process.env.PUBLIC_URL}/images/recent/r (12).jpg`, caption: 'Nature walks!', alt: 'Nature exploration' },
        { id: 86, src: `${process.env.PUBLIC_URL}/images/recent/r (13).jpg`, caption: 'Memories!', alt: 'Recent travel' },
        { id: 87, src: `${process.env.PUBLIC_URL}/images/recent/r (14).jpg`, caption: 'Celebrating life!', alt: 'Celebration moment' },
        { id: 88, src: `${process.env.PUBLIC_URL}/images/recent/r (15).jpg`, caption: 'Family time!', alt: 'Family gathering' },
        { id: 89, src: `${process.env.PUBLIC_URL}/images/recent/r (16).jpg`, caption: 'Nature walks!', alt: 'Nature exploration' },
        { id: 90, src: `${process.env.PUBLIC_URL}/images/recent/r (17).png`, caption: 'Memories!', alt: 'Recent travel' },
        { id: 91, src: `${process.env.PUBLIC_URL}/images/recent/r (18).png`, caption: 'Celebrating life!', alt: 'Celebration moment' },
        { id: 92, src: `${process.env.PUBLIC_URL}/images/recent/r (19).png`, caption: 'Family time!', alt: 'Family gathering' },
        { id: 93, src: `${process.env.PUBLIC_URL}/images/recent/r (20).jpg`, caption: 'Nature walks!', alt: 'Nature exploration' },
        { id: 94, src: `${process.env.PUBLIC_URL}/images/recent/r (21).png`, caption: 'Memories!', alt: 'Recent travel' },
        { id: 95, src: `${process.env.PUBLIC_URL}/images/recent/r (22).png`, caption: 'Celebrating life!', alt: 'Celebration moment' },
        { id: 96, src: `${process.env.PUBLIC_URL}/images/recent/r (23).png`, caption: 'Family time!', alt: 'Family gathering' },
        { id: 97, src: `${process.env.PUBLIC_URL}/images/recent/r (24).jpg`, caption: 'Nature walks!', alt: 'Nature exploration' },
        

        

            ]
    }
  ];

  const closeModal = () => setSelectedPhoto(null);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 sm:p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-8 sm:mb-10 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-6 sm:pb-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 drop-shadow-lg transition-colors duration-500 ${
            'text-slate-800'
          }`}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1.2'
          }}
        >
          💝 Memory Gallery 💝
        </motion.h2>

        {/* Navigation Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4"
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
                        {/* Actual Image or Placeholder */}
                        <div className="relative rounded-xl overflow-hidden">
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                            onLoad={() => console.log('Gallery image loaded successfully:', photo.src)}
                            onError={(e) => {
                              console.error('Gallery image failed to load:', photo.src);
                              console.error('Full error:', e);
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) {
                                fallback.style.display = 'flex';
                              }
                            }}
                          />
                          <div
                            className={`w-full h-64 bg-gradient-to-br ${section.gradient} rounded-xl flex items-center justify-center relative overflow-hidden`}
                            style={{ display: 'none' }}
                          >
                            <motion.span 
                              className="text-4xl z-10"
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              📸
                            </motion.span>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <p className="text-gray-600 text-sm font-medium">Image not found</p>
                            </div>
                          </div>
                          
                          {/* Floating sparkles overlay */}
                          <motion.div
                            className="absolute top-2 right-2 text-yellow-400 z-20"
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
                            className="absolute bottom-2 left-2 text-pink-400 z-20"
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
                  
                  {/* Enhanced image display */}
                  <motion.div 
                    className="w-full mb-6 relative overflow-hidden rounded-2xl"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <img
                      src={selectedPhoto.src}
                      alt={selectedPhoto.alt}
                      className="w-full max-h-96 object-contain rounded-2xl shadow-lg"
                      onLoad={() => console.log('Modal image loaded successfully:', selectedPhoto.src)}
                      onError={(e) => {
                        console.error('Modal image failed to load:', selectedPhoto.src);
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                    <div
                      className="w-full h-96 bg-gradient-to-br from-purple-300 via-pink-300 to-indigo-300 rounded-2xl flex items-center justify-center relative overflow-hidden"
                      style={{ display: 'none' }}
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
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-gray-600 text-lg font-medium">Image not found</p>
                      </div>
                    </div>
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
