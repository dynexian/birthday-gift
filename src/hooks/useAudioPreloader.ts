import { useState, useCallback, useMemo } from 'react';

interface AudioFile {
  key: string;
  src: string;
  type: 'music' | 'sound';
}

interface PreloadProgress {
  loaded: number;
  total: number;
  currentFile: string;
  isComplete: boolean;
  hasError: boolean;
}

export const useAudioPreloader = () => {
  const [progress, setProgress] = useState<PreloadProgress>({
    loaded: 0,
    total: 0,
    currentFile: '',
    isComplete: false,
    hasError: false
  });

  const [preloadedAudio, setPreloadedAudio] = useState<Map<string, HTMLAudioElement>>(new Map());

  // Use useMemo to prevent audioFiles from changing on every render
  const audioFiles = useMemo<AudioFile[]>(() => [
    // Background Music
    { key: 'theme-birthday', src: '/audio/music/theme-birthday.mp3', type: 'music' },
    { key: 'celebration', src: '/audio/music/celebration.mp3', type: 'music' },
    { key: 'gentle-piano', src: '/audio/music/gentle-piano.mp3', type: 'music' },
    { key: 'ambient-magical', src: '/audio/music/ambient-magical.mp3', type: 'music' },
    
    // Sound Effects
    { key: 'balloon-pop', src: '/audio/sounds/balloon-pop.mp3', type: 'sound' },
    { key: 'word-hover', src: '/audio/sounds/word-hover.mp3', type: 'sound' },
    { key: 'sparkle', src: '/audio/sounds/sparkle.mp3', type: 'sound' },
    { key: 'cake-cut', src: '/audio/sounds/cake-cut.mp3', type: 'sound' },
    { key: 'happy-birthday', src: '/audio/sounds/happy-birthday.mp3', type: 'sound' },
    { key: 'confetti', src: '/audio/sounds/confetti.mp3', type: 'sound' },
    { key: 'countdown-tick', src: '/audio/sounds/countdown-tick.mp3', type: 'sound' },
    { key: 'countdown-complete', src: '/audio/sounds/countdown-complete.mp3', type: 'sound' },
    { key: 'button-click', src: '/audio/sounds/button-click.mp3', type: 'sound' },
    { key: 'page-transition', src: '/audio/sounds/page-transition.mp3', type: 'sound' },
  ], []);

  const preloadAudio = useCallback(async () => {
    setProgress(prev => ({ ...prev, total: audioFiles.length, loaded: 0, hasError: false }));
    
    console.log(`🎵 Starting audio preloading for ${audioFiles.length} files...`);
    console.log('🎵 Audio files to load:', audioFiles.map(f => f.src));
    
    const loadedAudioMap = new Map<string, HTMLAudioElement>();
    
    const loadPromises = audioFiles.map((audioFile, index) => {
      return new Promise<void>((resolve, reject) => {
        const audio = new HTMLAudioElement();
        let hasResolved = false; // Prevent double resolution
        
        const handleSuccess = () => {
          if (hasResolved) return;
          hasResolved = true;
          
          console.log(`✅ Loaded successfully: ${audioFile.key} from ${audioFile.src}`);
          console.log(`✅ Audio duration: ${audio.duration}s, ready state: ${audio.readyState}`);
          loadedAudioMap.set(audioFile.key, audio);
          
          setProgress(prev => ({
            ...prev,
            loaded: prev.loaded + 1,
            currentFile: audioFile.key
          }));
          
          resolve();
        };

        const handleError = (error: Event) => {
          if (hasResolved) return;
          hasResolved = true;
          
          const audioError = (error.target as HTMLAudioElement)?.error;
          console.error(`❌ Failed to load: ${audioFile.key} from ${audioFile.src}`);
          console.error(`❌ Error code: ${audioError?.code}, message: ${audioError?.message}`);
          console.error(`❌ Full error:`, error);
          
          // Test if the file exists by trying to fetch it
          fetch(audioFile.src)
            .then(response => {
              console.log(`🔍 Fetch test for ${audioFile.src}:`, response.status, response.statusText);
              if (!response.ok) {
                console.error(`🔍 File not accessible: ${response.status} ${response.statusText}`);
              } else {
                console.log(`🔍 File exists but audio loading failed - possibly format/codec issue`);
              }
            })
            .catch(fetchError => {
              console.error(`🔍 Fetch failed for ${audioFile.src}:`, fetchError);
            });
          
          // Don't increment loaded count for failed files
          setProgress(prev => ({
            ...prev,
            currentFile: `Failed: ${audioFile.key}`,
            hasError: true
          }));
          resolve(); // Don't reject, continue with other files
        };

        const handleLoadStart = () => {
          console.log(`🔄 Started loading: ${audioFile.key} from ${audioFile.src}`);
        };

        // Use only canplaythrough event for better reliability
        audio.addEventListener('canplaythrough', handleSuccess, { once: true });
        audio.addEventListener('error', handleError, { once: true });
        audio.addEventListener('loadstart', handleLoadStart, { once: true });
        
        // Set up audio element
        audio.preload = 'metadata';
        audio.volume = 0.5;
        
        // Start loading
        console.log(`🎵 Loading audio: ${audioFile.key} from ${audioFile.src}`);
        try {
          audio.src = audioFile.src;
          audio.load();
        } catch (err) {
          console.error(`❌ Error setting src for ${audioFile.key}:`, err);
          handleError(new Event('error'));
        }
        
        // Add timeout to prevent hanging
        setTimeout(() => {
          if (!hasResolved) {
            console.warn(`⏰ Timeout loading: ${audioFile.key} after 15 seconds`);
            handleError(new Event('timeout'));
          }
        }, 15000);
      });
    });

    try {
      await Promise.all(loadPromises);
      setPreloadedAudio(loadedAudioMap);
      
      // Only mark as complete if we actually loaded some files successfully
      const successfullyLoaded = loadedAudioMap.size;
      const hasErrors = successfullyLoaded < audioFiles.length;
      
      setProgress(prev => ({ 
        ...prev, 
        isComplete: true, 
        currentFile: successfullyLoaded > 0 ? 'Complete!' : 'Failed to load any audio files',
        hasError: hasErrors
      }));
      
      console.log(`🎵 Audio preloading complete! Loaded ${successfullyLoaded}/${audioFiles.length} files`);
      console.log(`🎵 Successfully loaded audio keys:`, Array.from(loadedAudioMap.keys()));
      
      if (successfullyLoaded === 0) {
        console.error(`🎵 No audio files could be loaded! Check file paths and network.`);
      }
    } catch (error) {
      console.error('Audio preloading failed:', error);
      setProgress(prev => ({ ...prev, hasError: true, isComplete: true }));
    }
  }, [audioFiles]);

  const getPreloadedAudio = useCallback((key: string): HTMLAudioElement | null => {
    const audio = preloadedAudio.get(key);
    if (!audio) {
      console.warn(`Audio not found in preloaded cache: ${key}`);
      return null;
    }
    return audio;
  }, [preloadedAudio]);

  const playPreloadedSound = useCallback((key: string, volume: number = 0.6) => {
    console.log(`🔊 playPreloadedSound called with: ${key}, volume: ${volume}`);
    const audio = getPreloadedAudio(key);
    if (audio) {
      console.log(`🔊 Found audio for sound: ${key}`, audio);
      
      // Create a clone so multiple sounds can play simultaneously
      const audioClone = audio.cloneNode() as HTMLAudioElement;
      audioClone.volume = volume;
      audioClone.currentTime = 0;
      
      audioClone.play().then(() => {
        console.log(`🔊 Successfully played sound: ${key}`);
      }).catch(error => {
        console.warn(`🔊 Failed to play preloaded sound: ${key}`, error);
      });
      
      return audioClone;
    } else {
      console.warn(`🔊 Preloaded audio not found: ${key}`);
      return null;
    }
  }, [getPreloadedAudio]);

  const playPreloadedMusic = useCallback((key: string, volume: number = 0.4, loop: boolean = true) => {
    console.log(`🎵 playPreloadedMusic called with: ${key}, volume: ${volume}, loop: ${loop}`);
    const audio = getPreloadedAudio(key);
    if (audio) {
      console.log(`🎵 Found audio for music: ${key}`, audio);
      
      // Create a clone to avoid conflicts with other instances
      const musicAudio = audio.cloneNode() as HTMLAudioElement;
      musicAudio.volume = volume;
      musicAudio.loop = loop;
      musicAudio.currentTime = 0;
      
      musicAudio.play().then(() => {
        console.log(`🎵 Successfully started background music: ${key}`);
      }).catch(error => {
        console.warn(`🎵 Failed to play preloaded music: ${key}`, error);
      });
      
      return musicAudio;
    } else {
      console.warn(`🎵 Preloaded music not found: ${key}`);
      return null;
    }
  }, [getPreloadedAudio]);

  const stopPreloadedMusic = useCallback((key: string) => {
    const audio = getPreloadedAudio(key);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [getPreloadedAudio]);

  return {
    progress,
    preloadAudio,
    getPreloadedAudio,
    playPreloadedSound,
    playPreloadedMusic,
    stopPreloadedMusic,
    isReady: progress.isComplete && !progress.hasError
  };
};
