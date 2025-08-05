// Utility functions for the Serene Countdown project

/**
 * Calculate the age in various units from a birth date
 */
export const calculateAge = (birthDate: Date) => {
  const now = new Date();
  const birth = new Date(birthDate);
  
  const totalMs = now.getTime() - birth.getTime();
  const totalSeconds = Math.floor(totalMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  
  const years = Math.floor(totalDays / 365.25);
  const months = Math.floor((totalDays % 365.25) / 30.44);
  const days = Math.floor((totalDays % 365.25) % 30.44);
  
  return {
    years,
    months,
    days,
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds
  };
};

/**
 * Calculate countdown to a target date
 */
export const calculateCountdown = (targetDate: Date) => {
  const now = new Date();
  const target = new Date(targetDate);
  const difference = target.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false
  };
};

/**
 * Format time unit with leading zero
 */
export const formatTimeUnit = (unit: number): string => {
  return unit.toString().padStart(2, '0');
};

/**
 * Generate random color for particles and effects
 */
export const generateRandomColor = (colors: string[]): string => {
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Clamp a number between min and max values
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Generate random number between min and max
 */
export const randomBetween = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Check if device supports audio
 */
export const canPlayAudio = (): boolean => {
  try {
    return !!(window.AudioContext || (window as any).webkitAudioContext);
  } catch {
    return false;
  }
};

/**
 * Convert hex color to rgba
 */
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(0, 0, 0, ${alpha})`;
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Smooth step function for animations
 */
export const smoothStep = (min: number, max: number, value: number): number => {
  const x = clamp((value - min) / (max - min), 0, 1);
  return x * x * (3 - 2 * x);
};
