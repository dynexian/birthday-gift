# 🎉 Birthday Celebration - Development Version

This is the development workspace for the birthday celebration project. This copy allows us to make changes, experiment with features, and test modifications without affecting the original project.

## 🔄 Changes from Original

- Project name: `birthday-celebration-dev`
- Homepage URL updated to placeholder
- Development-specific documentation added

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```
   Opens [http://localhost:3000](http://localhost:3000) in your browser.

3. **Run tests:**
   ```bash
   npm test
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🎯 Current Development Focus

- Personalizing content and messages
- Testing and refining user experience
- Preparing for final deployment
- Adding/updating memory gallery content

## 📁 Project Structure

```
src/
├── components/     # 12 core journey components
├── hooks/          # Custom hooks (audio, countdown, cursor)
├── types/          # TypeScript definitions
├── utils/          # Constants and helper functions
└── App.tsx         # Main application orchestrator
```

## 🎭 Experience Journey

1. **Preloader** → Audio initialization
2. **Countdown** → Dynamic timer (5 seconds demo)
3. **Entry Animation** → Welcome celebration
4. **Message Scroll** → Personal messages
5. **Word Cloud** → Interactive positive words
6. **Balloon Game** → Click-to-pop mini-game
7. **Cake Cutting** → Virtual ceremony
8. **Memory Gallery** → Photo retrospective
9. **Final Thank You** → Celebration finale

## 🛠️ Development Notes

- Debug button currently visible in message stage
- Countdown set to 5 seconds for testing
- Memory gallery needs actual photos
- All audio files are preloaded for smooth experience

## 🔧 Customization Points

- **Birth Date**: `src/App.tsx` line 33
- **Countdown Duration**: `src/App.tsx` line 30
- **Messages**: `src/utils/constants.ts` - `BIRTHDAY_MESSAGES`
- **Word Cloud**: `src/utils/constants.ts` - `WORD_CLOUD_WORDS`
- **Memory Sections**: `src/utils/constants.ts` - `MEMORY_SECTIONS`

---

**Original Project**: Located at `../birthday-gift/`
**This Dev Version**: Safe space for experimentation and development
