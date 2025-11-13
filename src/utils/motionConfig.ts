// Accessibility utility for reduced motion support
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get transition config based on reduced motion preference
export const getTransitionConfig = (config: any) => {
  if (shouldReduceMotion()) {
    return {
      duration: 0.01,
      ease: 'linear'
    };
  }
  return config;
};

// Get animation variants that respect reduced motion
export const getMotionVariants = (variants: any) => {
  if (shouldReduceMotion()) {
    // Simplify animations to just opacity changes
    return {
      enter: { opacity: 0 },
      center: { opacity: 1 },
      exit: { opacity: 0 }
    };
  }
  return variants;
};
