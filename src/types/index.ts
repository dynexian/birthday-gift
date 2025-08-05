// Global TypeScript type definitions for the Serene Countdown project

export interface AudioFile {
  key: string;
  path: string;
  type: 'music' | 'sound';
}

export interface ParticleTrail {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  color: string;
}

export interface FloatingElement {
  id: number;
  type: 'leaf' | 'petal' | 'sparkle';
  x: number;
  y: number;
  delay: number;
  size: number;
  color: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  delay: number;
}

export interface Photo {
  id: number;
  src: string;
  caption: string;
  alt: string;
}

export interface MemorySection {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  photos: Photo[];
}

export type Stage = 'preloader' | 'countdown' | 'entry' | 'message' | 'wordcloud' | 'balloons' | 'cake' | 'gallery' | 'thankyou';

export interface ComponentProps {
  onComplete?: () => void;
  onBack?: () => void;
  onNext?: () => void;
  onReset?: () => void;
  onRestart?: () => void;
}

export interface AudioManagerHook {
  playSound: (key: string, options?: { volume?: number; loop?: boolean }) => void;
  playMusic: (key: string, options?: { volume?: number; loop?: boolean }) => void;
  stopMusic: () => void;
  stopAllSounds: () => void;
  setGlobalVolume: (volume: number) => void;
}

export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface AgeData {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
