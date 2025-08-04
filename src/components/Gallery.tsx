import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Serene Mornings',
      description: 'Start your day with peaceful moments and gentle awakening.',
      image: '🌅',
      color: 'from-orange-200 to-yellow-200',
    },
    {
      id: 2,
      title: 'Forest Whispers',
      description: 'Listen to the calming sounds of nature and feel at peace.',
      image: '🌲',
      color: 'from-green-200 to-emerald-200',
    },
    {
      id: 3,
      title: 'Ocean Breeze',
      description: 'Feel the gentle waves and breathe in the salty air.',
      image: '🌊',
      color: 'from-blue-200 to-cyan-200',
    },
    {
      id: 4,
      title: 'Mountain Views',
      description: 'Reach new heights and discover breathtaking perspectives.',
      image: '🏔️',
      color: 'from-slate-200 to-gray-200',
    },
    {
      id: 5,
      title: 'Garden Bliss',
      description: 'Cultivate joy and watch beautiful things grow.',
      image: '🌺',
      color: 'from-pink-200 to-rose-200',
    },
    {
      id: 6,
      title: 'Starlit Nights',
      description: 'Dream under the cosmic canvas of infinite possibilities.',
      image: '✨',
      color: 'from-purple-200 to-indigo-200',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-nature-100/50 via-sky-100/50 to-cream-100/50"
        style={{
          x: useTransform(scrollXProgress, [0, 1], [0, -100]),
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-nature-600 to-sky-600 bg-clip-text text-transparent">
          Discover Serenity
        </h2>
        <p className="text-nature-600 text-center mt-2 text-lg font-medium">
          Scroll horizontally to explore our peaceful moments
        </p>
      </motion.div>

      {/* Scrollable Gallery */}
      <div
        ref={containerRef}
        className="flex items-center h-full overflow-x-auto scrollbar-hide pt-32 pb-16 px-8"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        <div className="flex space-x-8 min-w-max">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 100, rotateY: 45 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{
                scale: 1.05,
                rotateY: -5,
                z: 50,
              }}
              className="gallery-card group perspective-1000"
              style={{ minWidth: '350px', maxWidth: '400px' }}
            >
              {/* Card Content */}
              <div className="relative h-80 overflow-hidden rounded-xl">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`} />
                
                {/* Emoji/Icon */}
                <div className="absolute top-6 left-6 text-6xl filter drop-shadow-lg">
                  {item.image}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/90 to-transparent">
                  <motion.h3
                    className="text-2xl font-bold text-nature-800 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    className="text-nature-600 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {item.description}
                  </motion.p>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-nature-200/0 via-sky-200/0 to-cream-200/0 group-hover:from-nature-200/20 group-hover:via-sky-200/20 group-hover:to-cream-200/20 transition-all duration-300 rounded-xl" />
              </div>

              {/* Interactive Elements */}
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-nature-400 to-sky-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId={`indicator-${item.id}`}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-nature-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <span className="text-sm font-medium">Scroll to explore</span>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-lg"
        >
          →
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gallery;
