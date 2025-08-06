import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Countdown from './components/Countdown';
import EntryAnimation from './components/EntryAnimation';
import MessageScroll from './components/MessageScroll';
import WordCloud from './components/WordCloud';
import BalloonGame from './components/BalloonGame';
import CakeCut from './components/CakeCut';
import MemoryGallery from './components/MemoryGallery';
import FinalThankYou from './components/FinalThankYou';
import ParticleSystem from './components/ParticleSystem';
import FloatingElements from './components/FloatingElements';
import AudioPreloader from './components/AudioPreloader';
import { AudioActivator } from './components/AudioActivator';

import { useCustomCursor } from './hooks/useCustomCursor';
import { useAudioManager } from './hooks/useAudio';

type Stage = 'preloader' | 'countdown' | 'entry' | 'message' | 'wordcloud' | 'balloons' | 'cake' | 'gallery' | 'thankyou';

const AppContent: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<Stage>('preloader');
  const [key, setKey] = useState(0); // Add key to force re-render countdown
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  useCustomCursor();
  const { playSound, playBackgroundMusic, stopAllAudio } = useAudioManager();

  // Set target date for countdown (120 seconds from now for demo)
  const targetDate = new Date();
  targetDate.setSeconds(targetDate.getSeconds() + 5); // 120 seconds from now for demo

  // Set birth date for age calculation (you can customize this)
  const birthDate = new Date('1995-08-04'); // Example: August 4, 1995 - customize this date!

  // Background music management based on current stage
  useEffect(() => {
    // Don't play music during preloader or when audio isn't enabled
    if (currentStage === 'preloader' || !isAudioEnabled) return;
    
    switch (currentStage) {
      case 'countdown':
        // Countdown stage only has timer sound effects, no background music
        break;
      case 'entry':
        playBackgroundMusic('celebration', { volume: 0.4, loop: true });
        break;
      case 'message':
        playBackgroundMusic('gentle-piano', { volume: 0.25, loop: true });
        break;
      case 'wordcloud':
        playBackgroundMusic('ambient-magical', { volume: 0.3, loop: true });
        break;
      case 'balloons':
        playBackgroundMusic('celebration', { volume: 0.35, loop: true });
        break;
      case 'cake':
        // Special handling for cake cutting - will play happy birthday sound
        playBackgroundMusic('gentle-piano', { volume: 0.2, loop: true });
        break;
      case 'gallery':
        playBackgroundMusic('ambient-magical', { volume: 0.25, loop: true });
        break;
      case 'thankyou':
        playBackgroundMusic('theme-birthday', { volume: 0.3, loop: true });
        break;
    }
  }, [currentStage, playBackgroundMusic, isAudioEnabled]);

  // Enable audio context on first user interaction
  const enableAudioContext = React.useCallback(() => {
    // Create a silent audio to enable the context
    const silentAudio = new Audio();
    silentAudio.volume = 0;
    silentAudio.play().then(() => {
      console.log('Audio context enabled successfully');
      setIsAudioEnabled(true);
    }).catch((error) => {
      console.warn('Audio context enablement failed:', error);
      // Audio context still blocked, but we set it as enabled anyway
      setIsAudioEnabled(true);
    });
  }, []);

  // Add global click handler to enable audio on first interaction
  React.useEffect(() => {
    if (isAudioEnabled) return; // Don't add listeners if already enabled
    
    const handleFirstInteraction = () => {
      enableAudioContext();
      // Remove listener after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [enableAudioContext, isAudioEnabled]);

  const restartCountdown = React.useCallback(() => {
    console.log('Restarting countdown');
    stopAllAudio(); // Stop all audio when restarting
    setCurrentStage('countdown');
    setKey(prev => prev + 1); // Force re-render with new countdown time
  }, [stopAllAudio]);

  // Add keyboard listener to reset to countdown (press 'R' key)
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r') {
        restartCountdown();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [restartCountdown]);

  const stageVariants = {
    enter: { opacity: 0, scale: 0.8 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  };

  // Stage navigation functions
  const goToNextStage = () => {
    console.log('🚀 goToNextStage called! Current stage:', currentStage);
    const stages: Stage[] = ['preloader', 'countdown', 'entry', 'message', 'wordcloud', 'balloons', 'cake', 'gallery', 'thankyou'];
    const currentIndex = stages.indexOf(currentStage);
    console.log('📍 Current index:', currentIndex, 'Total stages:', stages.length);
    if (currentIndex < stages.length - 1) {
      const nextStage = stages[currentIndex + 1];
      console.log('➡️ Moving from', currentStage, 'to', nextStage);
      // Add page transition sound effect
      playSound('page-transition', { volume: 0.3 });
      setCurrentStage(nextStage);
      console.log('✅ Stage updated to:', nextStage);
    } else {
      console.log('⚠️ Already at last stage, cannot go further');
    }
  };

  const restartExperience = () => {
    console.log('Restarting experience');
    stopAllAudio(); // Stop all audio when restarting
    setCurrentStage('countdown');
    setKey(prev => prev + 1); // Force re-render with new countdown time
  };

  const handlePreloaderComplete = () => {
    setCurrentStage('countdown');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden transition-all duration-1000"
      style={{
        background: 'linear-gradient(135deg, rgb(240, 249, 255) 0%, rgb(243, 232, 255) 50%, rgb(252, 231, 243) 100%)'
      }}
    >
      {/* Background Elements */}
      <ParticleSystem />
      <FloatingElements />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {/* Stage 0: Audio Preloader */}
        {currentStage === 'preloader' && (
          <AudioPreloader onComplete={handlePreloaderComplete} />
        )}

        {/* Stage 1: Countdown */}
        {currentStage === 'countdown' && (
          <motion.div
            key="countdown"
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <Countdown key={key} targetDate={targetDate} onComplete={goToNextStage} />
          </motion.div>
        )}
        
        {/* Stage 2: Entry Animation */}
        {currentStage === 'entry' && (
          <motion.div
            key="entry"
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <EntryAnimation onComplete={goToNextStage} onReset={restartCountdown} birthDate={birthDate} />
          </motion.div>
        )}
        
        {/* Stage 3: Message Scroll */}
        {currentStage === 'message' && (
          <motion.div
            key="message"
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            {/* Temporary Debug Button */}
            <div className="fixed top-4 right-4 z-50">
              <button 
                onClick={() => {
                  console.log('🧪 DEBUG: Direct navigation test button clicked');
                  goToNextStage();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded text-sm"
              >
                DEBUG: Skip to Next Stage
              </button>
            </div>
            <MessageScroll onComplete={goToNextStage} />
          </motion.div>
        )}
        
        {/* Stage 4: Word Cloud */}
        {currentStage === 'wordcloud' && (
          <motion.div
            key="wordcloud"
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <WordCloud onComplete={goToNextStage} />
          </motion.div>
        )}
        
        {/* Stage 5: Balloon Game */}
        {currentStage === 'balloons' && (
          <motion.div
            key="balloons"
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <BalloonGame onComplete={goToNextStage} />
          </motion.div>
        )}
        
        {/* Stage 6: Cake Cut */}
        {currentStage === 'cake' && (
          <motion.div
            key="cake"
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <CakeCut onComplete={goToNextStage} />
          </motion.div>
        )}
        
        {/* Stage 7: Memory Gallery */}
        {currentStage === 'gallery' && (
          <motion.div
            key="gallery"
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <MemoryGallery onComplete={goToNextStage} />
          </motion.div>
        )}
        
        {/* Stage 8: Final Thank You */}
        {currentStage === 'thankyou' && (
          <motion.div
            key="thankyou"
            variants={stageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <FinalThankYou onRestart={restartExperience} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter Egg: Click anywhere to create sparkles - TEMPORARILY DISABLED */}
      
      {/* Global click handler for sparkles - DISABLED to prevent button interference */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ pointerEvents: 'none' }}
      ></div>

      {/* Audio Activator - Show when audio hasn't been enabled */}
      {!isAudioEnabled && currentStage !== 'preloader' && (
        <AudioActivator onActivate={() => setIsAudioEnabled(true)} />
      )}
    </div>
  );
};

// Main App component
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
