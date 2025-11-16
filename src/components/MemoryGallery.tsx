import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemoryGalleryProps {
  onComplete: () => void;
}

interface Media {
  id: number;
  src: string;
  caption: string;
  type: 'image' | 'video';
}

const MemoryGallery: React.FC<MemoryGalleryProps> = ({ onComplete }) => {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  // Simple media collection - 3 images and 1 video
  const memories: Media[] = [
    { id: 1, src: `${process.env.PUBLIC_URL}/images/img1.png`, caption: 'Happy birthday Avni 🎂', type: 'image' },
    { id: 2, src: `${process.env.PUBLIC_URL}/images/img2.png`, caption: 'Cuttack chalte hain 🚗', type: 'image' },
    { id: 3, src: `${process.env.PUBLIC_URL}/images/img3.png`, caption: 'Tumhare saath baate 💭', type: 'image' },
    { id: 4, src: `${process.env.PUBLIC_URL}/videos/bdvid.mp4`, caption: 'Beautiful moments together 🎥', type: 'video' },
  ];

  const closeModal = () => setSelectedMedia(null);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-6 md:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl w-full">
        {/* Beautiful Header Message */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
            animate={{
              textShadow: [
                "0 4px 20px rgba(219, 39, 119, 0.3)",
                "0 8px 40px rgba(219, 39, 119, 0.6)",
                "0 4px 20px rgba(219, 39, 119, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💕 Our Memories 💕
          </motion.h2>
          
          <motion.div
            className="max-w-3xl mx-auto space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-2xl md:text-3xl text-gray-700 font-medium leading-relaxed">
              Every moment spent with you is a bliss... ✨
            </p>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Your smile lights up my world 🌟
            </p>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Your laughter is music to my ears 🎵
            </p>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Every memory with you is a treasure I cherish forever 💎
            </p>
          </motion.div>
        </motion.div>

        {/* Media Grid - Centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-16">
          {memories.map((media, index) => (
            <motion.div
              key={media.id}
              className="relative cursor-pointer group"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.8 + index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedMedia(media)}
            >
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300">
                {/* Media Content */}
                <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[4/3]">
                  {media.type === 'image' ? (
                    <img
                      src={media.src}
                      alt={media.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <video
                      src={media.src}
                      controls
                      className="w-full h-full object-cover rounded-xl"
                    />
                  )}
                  
                  {/* Floating sparkles */}
                  <motion.div
                    className="absolute top-4 right-4 text-3xl"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    ✨
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-4 left-4 text-3xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      y: [0, -10, 0]
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
                
                {/* Caption */}
                <p className="text-center text-xl md:text-2xl font-semibold text-gray-800">
                  {media.caption}
                </p>
                
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.span
                    className="text-white text-lg font-semibold bg-black/50 px-6 py-3 rounded-full"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {media.type === 'video' ? '▶️ Play' : '🔍 View'}
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for enlarged media */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-auto relative"
                initial={{ scale: 0.5, opacity: 0, y: 100 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <motion.button
                  onClick={closeModal}
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl z-10"
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-3xl font-bold">×</span>
                </motion.button>
                
                {/* Media display */}
                <motion.div
                  className="w-full mb-6"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedMedia.type === 'image' ? (
                    <img
                      src={selectedMedia.src}
                      alt={selectedMedia.caption}
                      className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
                    />
                  ) : (
                    <video
                      src={selectedMedia.src}
                      controls
                      autoPlay
                      className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
                    />
                  )}
                </motion.div>
                
                {/* Caption */}
                <motion.div
                  className="text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-3xl font-bold text-gray-800 mb-4">
                    {selectedMedia.caption}
                  </p>
                  <div className="flex justify-center space-x-3">
                    {['💝', '✨', '🌟', '💖', '🎉'].map((emoji, index) => (
                      <motion.span
                        key={index}
                        className="text-2xl"
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, 15, -15, 0]
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button
            onClick={onComplete}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-16 py-5 rounded-full text-2xl font-bold shadow-2xl relative overflow-hidden"
            whileHover={{
              scale: 1.1,
              boxShadow: '0 25px 50px rgba(219, 39, 119, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 15px 40px rgba(219, 39, 119, 0.3)",
                "0 20px 60px rgba(219, 39, 119, 0.5)",
                "0 15px 40px rgba(219, 39, 119, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            {/* Animated sparkles */}
            <motion.span
              className="absolute top-2 left-6 text-yellow-300 text-xl"
              animate={{
                scale: [1, 1.5, 1],
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
              className="absolute bottom-2 right-6 text-pink-300 text-xl"
              animate={{
                scale: [1, 1.3, 1],
                y: [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5
              }}
            >
              💖
            </motion.span>
            
            Continue ✨
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MemoryGallery;
