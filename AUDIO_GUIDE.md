# 🎵 Audio Files Guide for Birthday Website

This document outlines all the audio files needed for the birthday website, their purposes, recommended durations, and specifications.

## 📁 Folder Structure
```
public/audio/
├── music/           # Background music tracks (longer, looping)
│   ├── theme-birthday.mp3
│   ├── ambient-magical.mp3
│   ├── celebration.mp3
│   └── gentle-piano.mp3
└── sounds/          # Sound effects (short, one-time)
    ├── balloon-pop.mp3
    ├── button-click.mp3
    ├── word-hover.mp3
    ├── page-transition.mp3
    ├── cake-cut.mp3
    ├── happy-birthday.mp3
    ├── confetti.mp3
    ├── sparkle.mp3
    ├── countdown-tick.mp3
    └── countdown-complete.mp3
```

## 🎼 Background Music Files

### **theme-birthday.mp3**
- **Purpose**: Main theme for countdown and thank you stages
- **Duration**: 2-3 minutes (loops seamlessly)
- **Style**: Upbeat, celebratory birthday theme
- **Volume**: Plays at 30% volume
- **Mood**: Joyful, anticipatory, festive
- **Instruments**: Light piano, strings, maybe some bells
- **Used in**: Countdown stage, Final thank you stage

### **celebration.mp3**
- **Purpose**: High-energy celebration music
- **Duration**: 2-4 minutes (loops seamlessly)
- **Style**: Energetic party music
- **Volume**: Plays at 35-40% volume
- **Mood**: Exciting, party atmosphere
- **Instruments**: Full orchestration, brass, percussion
- **Used in**: Entry animation (birthday reveal), Balloon game

### **gentle-piano.mp3**
- **Purpose**: Soft, emotional background for intimate moments
- **Duration**: 3-5 minutes (loops seamlessly)
- **Style**: Soft piano melody, possibly with strings
- **Volume**: Plays at 20-25% volume
- **Mood**: Warm, emotional, heartfelt
- **Instruments**: Piano-focused, light strings
- **Used in**: Message scroll, Cake cutting (background)

### **ambient-magical.mp3**
- **Purpose**: Dreamy, magical atmosphere
- **Duration**: 3-4 minutes (loops seamlessly)
- **Style**: Ambient, ethereal, whimsical
- **Volume**: Plays at 25-30% volume
- **Mood**: Wonder, magic, contemplative
- **Instruments**: Synth pads, chimes, soft percussion
- **Used in**: Word cloud, Memory gallery

## 🔊 Sound Effect Files

### **balloon-pop.mp3**
- **Purpose**: Balloon popping sound
- **Duration**: 0.2-0.5 seconds
- **Style**: Sharp pop sound
- **Volume**: Plays at 40% volume
- **Trigger**: Each balloon click in balloon game
- **Variations**: Could have 3-4 slight variations to avoid repetition

### **cake-cut.mp3**
- **Purpose**: Knife cutting through cake
- **Duration**: 1-2 seconds
- **Style**: Realistic cake cutting sound
- **Volume**: Plays at 50% volume
- **Trigger**: When cake is clicked for cutting
- **Follow-up**: Followed by happy-birthday.mp3 after 800ms delay

### **happy-birthday.mp3**
- **Purpose**: Cheerful "Happy Birthday!" vocal or cheer
- **Duration**: 2-3 seconds
- **Style**: Joyful crowd cheer or sung phrase
- **Volume**: Plays at 70% volume
- **Trigger**: After cake cutting (800ms delay)
- **Content**: Could be "Happy Birthday!" sung or cheered

### **sparkle.mp3**
- **Purpose**: Magical sparkle for word interactions
- **Duration**: 0.5-1 second
- **Style**: Light, twinkling, magical
- **Volume**: Plays at 30% volume
- **Trigger**: When words in word cloud are clicked
- **Mood**: Whimsical, light, positive

### **word-hover.mp3**
- **Purpose**: Subtle hover feedback for words
- **Duration**: 0.1-0.3 seconds
- **Style**: Very soft, gentle chime or whoosh
- **Volume**: Plays at 20% volume
- **Trigger**: When hovering over words in word cloud
- **Note**: Should be very subtle to avoid overwhelming

### **confetti.mp3**
- **Purpose**: Confetti/celebration burst sound
- **Duration**: 1-2 seconds
- **Style**: Party horn or confetti burst
- **Volume**: Plays at 60% volume
- **Trigger**: When balloon game is completed
- **Mood**: Celebratory, triumphant

### **countdown-tick.mp3**
- **Purpose**: Clock tick for final countdown seconds
- **Duration**: 0.1-0.2 seconds
- **Style**: Clean, digital or mechanical tick
- **Volume**: Plays at 40% volume
- **Trigger**: Each second change when ≤ 10 seconds remaining
- **Tone**: Building tension, anticipation

### **countdown-complete.mp3**
- **Purpose**: Countdown completion notification
- **Duration**: 1-2 seconds
- **Style**: Triumphant bell or chime
- **Volume**: Plays at 60% volume
- **Trigger**: When countdown reaches zero
- **Mood**: Achievement, transition, excitement

### **button-click.mp3** *(Future use)*
- **Purpose**: General button click feedback
- **Duration**: 0.1-0.2 seconds
- **Style**: Clean, satisfying click
- **Volume**: Plays at 30% volume
- **Note**: Reserved for future button interactions

### **page-transition.mp3** *(Future use)*
- **Purpose**: Smooth page/stage transitions
- **Duration**: 0.5-1 second
- **Style**: Whoosh or magical transition
- **Volume**: Plays at 35% volume
- **Note**: Reserved for future transition effects

## 🎚️ Audio Implementation Details

### **Audio Preloader**
- **Purpose**: Loads all audio files before the birthday experience begins
- **Features**: 
  - Beautiful loading screen with progress bar
  - Individual file loading status
  - Skip option for users who want to proceed without audio
  - Timeout protection (5 seconds per file)
  - Graceful fallback if files are missing
- **User Experience**: Shows loading progress and allows skipping after 2 seconds
- **Technical**: Stores preloaded audio in `window.preloadedAudio` for instant playback

### **Volume Levels**
- **Background Music**: 20-40% volume (varies by track and context)
- **Sound Effects**: 20-70% volume (based on importance and context)
- **Auto-fade**: Background music fades when stage changes
- **User Control**: Users can adjust volume (future feature)

### **Playback Behavior**
- **Background Music**: Loops continuously, fades between stage changes
- **Sound Effects**: One-time playback, no overlap restrictions
- **Error Handling**: Graceful fallback if audio files aren't found
- **Performance**: Audio preloading for smooth playback

### **File Specifications**
- **Format**: MP3 (best browser compatibility)
- **Bitrate**: 128-192 kbps (good quality, reasonable file size)
- **Sample Rate**: 44.1 kHz
- **Channels**: Stereo for music, mono acceptable for short sound effects
- **Compression**: Normalize volume levels across all files

### **Technical Notes**
- All files are loaded from `/public/audio/` directory
- Audio manager handles playback, volume, and transitions
- Background music automatically changes based on current stage
- Sound effects are triggered by user interactions
- Fallback handling for browsers that block autoplay

## 🎹 Music Style Recommendations

### **Overall Tone**
- **Warm and personal**: Not overly commercial or generic
- **Age-appropriate**: Suitable for any age birthday celebration
- **High quality**: Professional production, clear audio
- **Emotionally resonant**: Should enhance the magical birthday experience

### **Instrumentation Suggestions**
- **Piano**: Featured in gentle moments
- **Strings**: Add warmth and emotion
- **Light percussion**: Keep energy appropriate
- **Bells/chimes**: Magical, celebratory elements
- **Brass**: For triumphant, celebratory moments
- **Avoid**: Heavy rock, electronic dance, overly complex arrangements

This audio system will create an immersive, emotionally engaging birthday experience that responds dynamically to user interactions! 🎉
