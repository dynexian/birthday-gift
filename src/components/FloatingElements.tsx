import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingElement {
  id: number;
  type: 'leaf' | 'petal' | 'sparkle';
  x: number;
  y: number;
  delay: number;
  size: number;
  color: string;
}

const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const createElements = () => {
      const newElements: FloatingElement[] = [];
      const types: ('leaf' | 'petal' | 'sparkle')[] = ['leaf', 'petal', 'sparkle'];
      const colors = ['#22c55e', '#38bdf8', '#f2c464', '#86efac', '#7dd3fc'];

      for (let i = 0; i < 20; i++) {
        newElements.push({
          id: i,
          type: types[Math.floor(Math.random() * types.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 10,
          size: Math.random() * 20 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      setElements(newElements);
    };

    createElements();
  }, []);

  const getElementShape = (type: string, size: number, color: string) => {
    switch (type) {
      case 'leaf':
        return (
          <div
            className="leaf-fall"
            style={{
              width: `${size}px`,
              height: `${size * 1.5}px`,
              background: `linear-gradient(45deg, ${color}, ${color}88)`,
              borderRadius: '0 100% 0 100%',
              transform: 'rotate(45deg)',
            }}
          />
        );
      case 'petal':
        return (
          <div
            className="petal-drift"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, ${color}, ${color}44)`,
              borderRadius: '50% 0 50% 0',
            }}
          />
        );
      case 'sparkle':
        return (
          <div
            className="sparkle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: `${color}`,
              borderRadius: '50%',
              boxShadow: `0 0 ${size}px ${color}44`,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0.7, 0],
            scale: [0, 1, 1, 0],
            x: [0, Math.sin(element.id) * 100],
            y: [0, -50],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: element.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {getElementShape(element.type, element.size, element.color)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
