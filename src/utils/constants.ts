// Constants for the Serene Countdown project

export const AUDIO_FILES = {
  MUSIC: {
    THEME_BIRTHDAY: 'theme-birthday',
    CELEBRATION: 'celebration',
    GENTLE_PIANO: 'gentle-piano',
    AMBIENT_MAGICAL: 'ambient-magical'
  },
  SOUNDS: {
    BALLOON_POP: 'balloon-pop',
    BUTTON_CLICK: 'button-click',
    CAKE_CUT: 'cake-cut',
    HAPPY_BIRTHDAY: 'happy-birthday',
    SPARKLE: 'sparkle',
    WORD_HOVER: 'word-hover',
    CONFETTI: 'confetti',
    COUNTDOWN_TICK: 'countdown-tick',
    COUNTDOWN_COMPLETE: 'countdown-complete',
    PAGE_TRANSITION: 'page-transition'
  }
} as const;

export const STAGE_ORDER = [
  'preloader',
  'countdown', 
  'entry',
  'message',
  'wordcloud',
  'balloons',
  'cake',
  'gallery',
  'thankyou'
] as const;

export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.2,
  STAGE_TRANSITION: 1.0
} as const;

export const PARTICLE_COLORS = [
  '#22c55e', // Green
  '#38bdf8', // Sky Blue  
  '#f2c464', // Cream
  '#86efac', // Light Green
  '#7dd3fc', // Light Blue
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#f59e0b'  // Amber
] as const;

export const WORD_CLOUD_WORDS = [
  'Amazing', 'Beautiful', 'Wonderful', 'Fantastic', 'Incredible',
  'Joyful', 'Radiant', 'Brilliant', 'Magical', 'Spectacular',
  'Charming', 'Delightful', 'Inspiring', 'Luminous', 'Magnificent',
  'Peaceful', 'Vibrant', 'Graceful', 'Enchanting', 'Blissful'
] as const;

export const BIRTHDAY_MESSAGES = [
  "On this special day, we celebrate not just your birth... 🌟",
  "But the incredible person you've become,",
  "The joy you bring to everyone around you, 😊", 
  "Your kindness, your laughter, your beautiful spirit, ✨",
  "The way you light up every room you enter, 💫",
  "Your strength in facing challenges, 💪",
  "Your compassion for others, ❤️",
  "The memories we've shared together, 📸",
  "And all the amazing moments yet to come! 🌈",
  "Today, we honor you and all that you are. 🙏",
  "Happy Birthday! 🎉🎂✨"
] as const;

export const MEMORY_SECTIONS = [
  {
    id: 'childhood',
    title: 'Adventures of a Toddler',
    subtitle: 'The cutest and most innocent moments',
    emoji: '👶',
    gradient: 'from-yellow-200 via-orange-200 to-red-200'
  },
  {
    id: 'school',
    title: 'School Days Chronicles', 
    subtitle: 'Learning, growing, and making friends',
    emoji: '🎒',
    gradient: 'from-green-200 via-blue-200 to-purple-200'
  },
  {
    id: 'teenage',
    title: 'Teenage Adventures',
    subtitle: 'Wild times and unforgettable memories', 
    emoji: '🌟',
    gradient: 'from-purple-200 via-pink-200 to-red-200'
  },
  {
    id: 'recent',
    title: 'Recent Treasures',
    subtitle: 'Making new memories every day',
    emoji: '💝', 
    gradient: 'from-blue-200 via-indigo-200 to-purple-200'
  }
] as const;

export const CURSOR_SETTINGS = {
  TRAIL_LENGTH: 15,
  PARTICLE_COUNT: 8,
  CURSOR_SIZE: 20,
  TRAIL_SIZE: 12,
  CLICK_PARTICLES: 12
} as const;

export const PERFORMANCE_SETTINGS = {
  MAX_PARTICLES: 100,
  ANIMATION_FPS: 60,
  AUDIO_FADE_DURATION: 1000,
  PRELOAD_TIMEOUT: 5000
} as const;
