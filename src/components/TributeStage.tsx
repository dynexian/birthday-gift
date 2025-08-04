import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TributeMessage {
  id: string;
  author: string;
  content: string;
  date: string;
  emoji?: string;
}

interface TributeStageProps {
  onNext: () => void;
  onBack: () => void;
}

const TributeStage: React.FC<TributeStageProps> = ({ onNext, onBack }) => {
  const [messages, setMessages] = useState<TributeMessage[]>([
    { id: '1', author: 'Alice', content: 'Grateful for this moment and the peace it brings.', date: '2025-08-01' },
    { id: '2', author: 'Bob', content: 'Finding joy in the little things every day.', date: '2025-08-02' },
    { id: '3', author: 'Charlie', content: 'Thankful for friends and family who bring light into my life.', date: '2025-08-03' },
    { id: '4', author: 'Dana', content: 'Embracing new beginnings with courage and love.', date: '2025-08-04' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const handleAddMessage = () => {
    if (!newMessage || !newAuthor) return;
    const date = new Date().toISOString().split('T')[0];
    const newEntry: TributeMessage = {
      id: (messages.length + 1).toString(),
      author: newAuthor,
      content: newMessage,
      date
    };
    setMessages([...messages, newEntry]);
    resetModal();
  };

  const resetModal = () => {
    setNewMessage('');
    setNewAuthor('');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-nature-100 to-nature-300 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-nature-800 mb-4">Tribute Wall</h2>
        <p className="text-nature-700 text-xl font-medium">
          Messages of love and gratitude
        </p>
      </motion.div>

      {/* Tribute Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: parseInt(message.id) * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-nature-200/50 via-sky-200/50 to-cream-200/50 opacity-0 hover:opacity-100 transition-all duration-300" />

            <p className="text-xl text-nature-700 mb-2">{message.content}</p>
            <span className="block text-nature-600 text-sm italic">- {message.author}, {message.date}</span>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <motion.button
          onClick={() => setShowModal(true)}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glow-button text-lg px-8 py-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Write Your Own Tribute ✍️
        </motion.button>
        
        <motion.button
          onClick={onNext}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-nature-200/50 hover:bg-nature-300/50 text-nature-700 font-medium px-8 py-4 rounded-full transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue Journey →
        </motion.button>
      </div>

      {/* Add Message Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-20"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-xl p-8 max-w-sm mx-auto"
            >
              <h3 className="text-2xl font-bold text-nature-800 mb-4">Add Your Tribute</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="w-full px-4 py-2 border border-nature-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-nature-500"
              />
              <textarea
                placeholder="Your Message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full px-4 py-2 border border-nature-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-nature-500"
              />
              <div className="flex justify-between">
                <motion.button
                  onClick={resetModal}
                  className="px-6 py-3 rounded-full text-nature-700 font-medium hover:bg-nature-200/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleAddMessage}
                  className="px-6 py-3 glow-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add Tribute
                </motion.button>
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
        className="fixed top-8 left-8 z-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-6 py-3 text-nature-600 font-medium hover:bg-white/30 transition-all duration-300"
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

export default TributeStage;

