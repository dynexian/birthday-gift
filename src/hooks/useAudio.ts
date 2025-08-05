import { useEffect, useRef, useState } from 'react';

interface AudioOptions {
  volume?: number;
  loop?: boolean;
  autoPlay?: boolean;
  fadeIn?: boolean;
  fadeOut?: boolean;
  fadeDuration?: number;
}

export const useAudio = (src: string, options: AudioOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    volume = 0.7,
    loop = false,
    autoPlay = false,
    fadeIn = false,
    fadeOut = false,
    fadeDuration = 1000
  } = options;

  useEffect(() => {
    if (!src) return;

    const audio = new Audio(src);
    audio.volume = fadeIn ? 0 : volume;
    audio.loop = loop;
    audioRef.current = audio;

    const handleLoadedData = () => setIsLoaded(true);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Auto play is handled by setting the autoplay attribute, not calling play() directly here
    
    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, autoPlay, isLoaded, fadeDuration]);

  const fadeVolume = (targetVolume: number, duration: number) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const startVolume = audio.volume;
    const volumeDiff = targetVolume - startVolume;
    const steps = 20;
    const stepDuration = duration / steps;
    const stepSize = volumeDiff / steps;
    let currentStep = 0;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        clearInterval(fadeIntervalRef.current!);
        return;
      }

      currentStep++;
      audioRef.current.volume = Math.max(0, Math.min(1, startVolume + (stepSize * currentStep)));

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current!);
        audioRef.current.volume = targetVolume;
        if (targetVolume === 0) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    }, stepDuration);
  };

  const play = () => {
    if (!audioRef.current || !isLoaded) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(console.error);

    if (fadeIn) {
      audioRef.current.volume = 0;
      fadeVolume(volume, fadeDuration);
    }
  };

  const stop = () => {
    if (!audioRef.current) return;

    if (fadeOut) {
      fadeVolume(0, fadeDuration);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  };

  const resume = () => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(console.error);
  };

  const setVolume = (newVolume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
  };

  return {
    isPlaying,
    isLoaded,
    play,
    stop,
    pause,
    resume,
    setVolume,
    audio: audioRef.current
  };
};

// Hook for managing multiple audio tracks
export const useAudioManager = () => {
  const [currentBackgroundMusic, setCurrentBackgroundMusic] = useState<string | null>(null);
  const audioInstances = useRef<Map<string, HTMLAudioElement>>(new Map());
  const lastPlayedRef = useRef<Record<string, number>>({});

  const getPreloadedAudio = (soundKey: string): HTMLAudioElement | null => {
    // Try to get preloaded audio first
    console.log(`🔍 getPreloadedAudio: Looking for ${soundKey}`);
    console.log(`🔍 window.preloadedAudio exists:`, !!window.preloadedAudio);
    
    if (window.preloadedAudio) {
      console.log(`🔍 Available keys in preloadedAudio:`, Object.keys(window.preloadedAudio));
      if (window.preloadedAudio[soundKey]) {
        console.log(`✅ Found preloaded audio for: ${soundKey}`);
        return window.preloadedAudio[soundKey];
      } else {
        console.log(`❌ No preloaded audio found for: ${soundKey}`);
      }
    } else {
      console.log(`❌ window.preloadedAudio does not exist`);
    }
    
    return null;
  };

  const playSound = (soundKey: string, options?: AudioOptions) => {
    console.log(`🔊 playSound called with: ${soundKey}`, options);
    
    // Smart throttling - different intervals for different sound types
    const now = Date.now();
    const lastPlayed = lastPlayedRef.current[soundKey] || 0;
    
    // Define minimum intervals based on sound type
    const intervalMap: Record<string, number> = {
      'countdown-tick': 900,        // 900ms for countdown (allows 1 per second)
      'countdown-complete': 50,     // Short for completion sounds
      'word-hover': 150,           // Prevent hover spam
      'button-click': 100,         // Standard button throttle
      'sparkle': 80,              // Short for sparkle effects
      'page-transition': 200,      // Longer for page transitions
      'balloon-pop': 100,         // Standard for balloon pops
      'confetti': 150,            // Medium for confetti
      'cake-cut': 50,             // Short for cut sounds
      'happy-birthday': 1000,      // Longer for birthday song
    };
    
    const minInterval = intervalMap[soundKey] || 100; // Default 100ms
    
    if (now - lastPlayed < minInterval) {
      console.log(`⏱️ Throttling ${soundKey} - too soon (${now - lastPlayed}ms < ${minInterval}ms)`);
      return;
    }
    
    lastPlayedRef.current[soundKey] = now;
    
    // Sound paths mapping
    const soundMap: Record<string, string> = {
      'balloon-pop': `${process.env.PUBLIC_URL}/audio/sounds/balloon-pop.mp3`,
      'button-click': `${process.env.PUBLIC_URL}/audio/sounds/button-click.mp3`,
      'word-hover': `${process.env.PUBLIC_URL}/audio/sounds/word-hover.mp3`,
      'page-transition': `${process.env.PUBLIC_URL}/audio/sounds/page-transition.mp3`,
      'cake-cut': `${process.env.PUBLIC_URL}/audio/sounds/cake-cut.mp3`,
      'happy-birthday': `${process.env.PUBLIC_URL}/audio/sounds/happy-birthday.mp3`,
      'confetti': `${process.env.PUBLIC_URL}/audio/sounds/confetti.mp3`,
      'sparkle': `${process.env.PUBLIC_URL}/audio/sounds/sparkle.mp3`,
      'countdown-tick': `${process.env.PUBLIC_URL}/audio/sounds/countdown-tick.mp3`,
      'countdown-complete': `${process.env.PUBLIC_URL}/audio/sounds/countdown-complete.mp3`,
    };

    // Helper function to create new audio (defined inside playSound for access to soundMap)
    const createNewAudio = () => {
      const soundPath = soundMap[soundKey];
      if (!soundPath) {
        console.warn(`❌ Sound key "${soundKey}" not found in soundMap`);
        return;
      }

      // Volume map for different sound types
      const volumeMap: Record<string, number> = {
        'word-hover': 0.6,
        'sparkle': 0.9,
        'button-click': 0.7,
        'countdown-tick': 0.5,
        'balloon-pop': 0.6,
        'confetti': 0.8,
        'page-transition': 0.5,
        'cake-cut': 0.7,
        'happy-birthday': 0.8,
        'countdown-complete': 0.8
      };

      const newAudio = new Audio(soundPath);
      const finalVolume = options?.volume ?? volumeMap[soundKey] ?? 0.8;
      newAudio.volume = finalVolume;
      
      console.log(`🎵 Playing new audio ${soundKey} from ${soundPath} at volume ${finalVolume}`);
      const playPromise = newAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log(`✅ Successfully playing new sound: ${soundKey}`);
        }).catch((error) => {
          console.error(`❌ Failed to play new sound: ${soundKey}`, error);
        });
      }
    };

    // Try to use preloaded audio first
    let audio = getPreloadedAudio(soundKey);
    console.log(`🔍 Preloaded audio for ${soundKey}:`, audio ? 'FOUND' : 'NOT FOUND');
    
    if (audio) {
      console.log(`📂 Using preloaded audio for ${soundKey}`);
      try {
        // Clone the preloaded audio for one-time use
        const audioClone = audio.cloneNode() as HTMLAudioElement;
        
        // Ensure the clone has the same source
        if (!audioClone.src && audio.src) {
          audioClone.src = audio.src;
        }
        
        // Set specific volumes for different sound types
        const volumeMap: Record<string, number> = {
          'word-hover': 0.6,
          'sparkle': 0.9,
          'button-click': 0.7,
          'countdown-tick': 0.5,
          'balloon-pop': 0.6,
          'confetti': 0.8,
          'page-transition': 0.5,
          'cake-cut': 0.7,
          'happy-birthday': 0.8,
          'countdown-complete': 0.8
        };
        
        const finalVolume = options?.volume ?? volumeMap[soundKey] ?? 0.8;
        audioClone.volume = finalVolume;
        audioClone.currentTime = 0;
        
        console.log(`🎵 Playing preloaded ${soundKey} at volume ${finalVolume}`);
        
        // Add more robust play handling
        const playPromise = audioClone.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            console.log(`✅ Successfully playing preloaded sound: ${soundKey}`);
          }).catch((error) => {
            console.error(`❌ Failed to play preloaded sound: ${soundKey}`, error);
            // Fallback to new audio if preloaded fails
            console.log(`🔄 Trying fallback for ${soundKey}`);
            createNewAudio();
          });
        }
      } catch (cloneError) {
        console.error(`❌ Error cloning audio for ${soundKey}:`, cloneError);
        console.log(`🔄 Trying fallback for ${soundKey}`);
        createNewAudio();
      }
    } else {
      console.log(`🆕 Creating new audio element for ${soundKey}`);
      createNewAudio();
    }
  };

  const playBackgroundMusic = (musicKey: string, options?: AudioOptions) => {
    const musicMap: Record<string, string> = {
      'theme-birthday': `${process.env.PUBLIC_URL}/audio/music/theme-birthday.mp3`,
      'ambient-magical': `${process.env.PUBLIC_URL}/audio/music/ambient-magical.mp3`,
      'celebration': `${process.env.PUBLIC_URL}/audio/music/celebration.mp3`,
      'gentle-piano': `${process.env.PUBLIC_URL}/audio/music/gentle-piano.mp3`,
    };

    // Stop current background music if playing
    if (currentBackgroundMusic) {
      stopBackgroundMusic();
    }

    let audio = getPreloadedAudio(musicKey);
    
    if (!audio) {
      // Fallback to creating new audio element
      const musicPath = musicMap[musicKey];
      if (!musicPath) {
        console.warn(`Music key "${musicKey}" not found`);
        return;
      }
      audio = new Audio(musicPath);
    }

    // Configure audio
    audio.volume = options?.volume ?? 0.4;
    audio.loop = options?.loop ?? true;
    audio.currentTime = 0;
    
    // Play audio
    audio.play().catch((error: any) => {
      console.error(`Failed to play background music: ${musicKey}`, error);
    });

    setCurrentBackgroundMusic(musicKey);
    audioInstances.current.set(musicKey, audio);
  };

  const stopBackgroundMusic = () => {
    if (currentBackgroundMusic) {
      const instance = audioInstances.current.get(currentBackgroundMusic);
      if (instance) {
        instance.pause();
        instance.currentTime = 0;
        audioInstances.current.delete(currentBackgroundMusic);
      }
      setCurrentBackgroundMusic(null);
    }
  };

  const stopAllAudio = () => {
    // Stop background music
    stopBackgroundMusic();
    
    // Stop any preloaded audio that might be playing
    if (window.preloadedAudio) {
      Object.values(window.preloadedAudio).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  };

  return {
    playSound,
    playBackgroundMusic,
    stopBackgroundMusic,
    stopAllAudio,
    currentBackgroundMusic,
    isAudioPreloaded: !!window.preloadedAudio
  };
};
