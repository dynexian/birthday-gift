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

    if (autoPlay && isLoaded) {
      play();
    }

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
  }, [src, autoPlay, isLoaded]);

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

  const getPreloadedAudio = (soundKey: string): HTMLAudioElement | null => {
    // Try to get preloaded audio first
    if (window.preloadedAudio && window.preloadedAudio[soundKey]) {
      return window.preloadedAudio[soundKey];
    }
    return null;
  };

  const playSound = (soundKey: string, options?: AudioOptions) => {
    // This will be populated when we create the audio files
    const soundMap: Record<string, string> = {
      'balloon-pop': '/audio/sounds/balloon-pop.mp3',
      'button-click': '/audio/sounds/button-click.mp3',
      'word-hover': '/audio/sounds/word-hover.mp3',
      'page-transition': '/audio/sounds/page-transition.mp3',
      'cake-cut': '/audio/sounds/cake-cut.mp3',
      'happy-birthday': '/audio/sounds/happy-birthday.mp3',
      'confetti': '/audio/sounds/confetti.mp3',
      'sparkle': '/audio/sounds/sparkle.mp3',
      'countdown-tick': '/audio/sounds/countdown-tick.mp3',
      'countdown-complete': '/audio/sounds/countdown-complete.mp3',
    };

    // Try to use preloaded audio first
    let audio = getPreloadedAudio(soundKey);
    
    if (audio) {
      // Clone the preloaded audio for one-time use
      const audioClone = audio.cloneNode() as HTMLAudioElement;
      
      // Set specific volumes for different sound types
      let defaultVolume = 0.8; // Increased default volume
      
      // Specific volume adjustments for quieter sounds
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
      
      audioClone.volume = options?.volume ?? volumeMap[soundKey] ?? defaultVolume;
      audioClone.currentTime = 0;
      audioClone.play().catch((error) => {
        console.error(`Failed to play preloaded sound: ${soundKey}`, error);
      });
    } else {
      // Fallback to creating new audio element
      const soundPath = soundMap[soundKey];
      if (!soundPath) {
        console.warn(`Sound key "${soundKey}" not found`);
        return;
      }

      // Use same volume logic as above
      let defaultVolume = 0.8;
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
      newAudio.volume = options?.volume ?? volumeMap[soundKey] ?? defaultVolume;
      newAudio.play().catch((error) => {
        console.error(`Failed to play new sound: ${soundKey}`, error);
      });
    }
  };

  const playBackgroundMusic = (musicKey: string, options?: AudioOptions) => {
    const musicMap: Record<string, string> = {
      'theme-birthday': '/audio/music/theme-birthday.mp3',
      'ambient-magical': '/audio/music/ambient-magical.mp3',
      'celebration': '/audio/music/celebration.mp3',
      'gentle-piano': '/audio/music/gentle-piano.mp3',
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
    audio.play().catch((error) => {
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
