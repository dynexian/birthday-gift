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

const MemoryGallery: React.FC<MemoryGalleryProps> = ({ onComplete }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Mock photo data - in a real app, you'd fetch from Google Drive API
  const photos: Photo[] = [
    { id: 1, src: '/images/memory1.jpg', caption: 'That amazing trip 😭', alt: 'Memory 1' },
    { id: 2, src: '/images/memory2.jpg', caption: 'Best day ever! 🌟', alt: 'Memory 2' },
    { id: 3, src: '/images/memory3.jpg', caption: 'Can\'t stop laughing 😂', alt: 'Memory 3' },
    { id: 4, src: '/images/memory4.jpg', caption: 'Perfect moment ✨', alt: 'Memory 4' },
    { id: 5, src: '/images/memory5.jpg', caption: 'Adventures together 🌈', alt: 'Memory 5' },
    { id: 6, src: '/images/memory6.jpg', caption: 'Unforgettable times 💫', alt: 'Memory 6' },
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
          className="text-4xl md:text-6xl font-bold text-center mb-12"
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

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="break-inside-avoid relative cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white p-4">
                {/* Placeholder for image - replace with actual image */}
                <div
                  className="w-full h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl flex items-center justify-center"
                  style={{ aspectRatio: `${Math.random() * 0.5 + 0.8}` }}
                >
                  <span className="text-4xl">📸</span>
                </div>
                
                <div className="mt-4">
                  <p className="text-gray-700 font-medium text-center">
                    {photo.caption}
                  </p>
                </div>

                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <span className="text-white text-lg font-semibold">Click to zoom</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for enlarged photo */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-white rounded-2xl p-6 max-w-4xl max-h-[90vh] overflow-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={closeModal}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                  
                  {/* Placeholder for enlarged image */}
                  <div className="w-full h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-6xl">📸</span>
                  </div>
                  
                  <p className="text-center text-xl font-medium text-gray-800">
                    {selectedPhoto.caption}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            onClick={onComplete}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-xl"
            whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)' }}
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
            Continue the Journey ✨
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MemoryGallery;
