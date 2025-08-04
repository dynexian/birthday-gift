# 🌿✨ Serene Countdown Landing Page

A beautiful, nature-themed countdown landing page with smooth animations, floating particles, and interactive elements designed to create a tranquil user experience.

## 🎨 Features

### ✨ Visual Design
- **Serene Color Palette**: Soft greens, sky blues, and cream tones
- **Nature Theme**: Floating leaves, petals, and sparkles
- **Gradient Backgrounds**: Dawn sky and misty forest gradients
- **Glass Morphism**: Backdrop blur effects throughout

### 🎭 Animations & Interactions
- **Custom Cursor**: Glowing circle that follows mouse with trailing effect
- **Floating Elements**: Animated leaves, petals, and sparkles drift across screen
- **Particle System**: Interactive tsParticles background
- **Smooth Transitions**: Framer Motion powered stage transitions
- **Hover Effects**: Elements glow and scale on interaction

### 📱 Responsive Stages

#### Stage 1 - Welcome & Countdown
- Centered welcome title with elegant typography
- Live countdown timer with beautiful digit animations  
- Dynamic time units (days, hours, minutes, seconds)
- Pulsing "Click to Begin" button
- Progress bar showing seconds progression

#### Stage 2 - Horizontal Gallery
- Smooth horizontal scrolling gallery
- Beautiful cards with nature-themed content
- Parallax background effects
- Mouse wheel converts to horizontal scroll
- Cards fade in as they come into view

### 🎮 Interactive Features
- **Custom Cursor**: Changes on hover over interactive elements
- **Easter Eggs**: Click anywhere to create sparkle effects
- **Smooth Navigation**: Seamless transitions between stages
- **Responsive Design**: Works beautifully on desktop and mobile

## 🛠️ Technologies Used

- **React 18** with TypeScript
- **Framer Motion** for animations
- **TailwindCSS** for styling
- **tsParticles** for particle effects
- **Custom Hooks** for cursor and countdown logic

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Build for Production
```bash
npm run build
```

## 🎨 Customization

### Change Target Date
Edit the target date in `src/App.tsx`:
```typescript
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 30); // 30 days from now
```

### Modify Colors
Update the color palette in `tailwind.config.js`:
```javascript
colors: {
  'nature': { /* your green shades */ },
  'sky': { /* your blue shades */ },
  'cream': { /* your cream shades */ }
}
```

### Add Gallery Items
Extend the gallery items in `src/components/Gallery.tsx`:
```typescript
const galleryItems: GalleryItem[] = [
  // Add your own items here
];
```

## 🌟 Key Components

- **`App.tsx`** - Main component with stage management
- **`Countdown.tsx`** - Animated countdown timer
- **`Gallery.tsx`** - Horizontal scrolling gallery
- **`ParticleSystem.tsx`** - Background particle effects
- **`FloatingElements.tsx`** - Animated nature elements
- **`useCountdown.ts`** - Custom countdown hook
- **`useCustomCursor.ts`** - Custom cursor effects

## 🎭 Animation Details

- **Entrance Animations**: Staggered delays for elegant reveals
- **Digital Flip Effect**: Numbers animate when changing
- **Floating Motion**: Sinusoidal movement for natural feel
- **Particle Interaction**: Mouse repulsion and click effects
- **Stage Transitions**: Smooth fade-slide between sections

## 🎨 Design Philosophy

This project embodies **calm minimalism** with:
- Spacious layouts that breathe
- Subtle animations that don't overwhelm
- Nature-inspired color harmony
- Smooth, fluid interactions
- Accessibility-friendly design

## 📱 Responsive Breakpoints

- **Mobile**: Optimized for touch interactions
- **Tablet**: Balanced layout and sizing  
- **Desktop**: Full feature experience
- **Large Screens**: Enhanced visual effects

## 🔧 Development Notes

- Uses modern React patterns and hooks
- TypeScript for type safety
- Tailwind for utility-first CSS
- Performance optimized animations
- Accessible interaction patterns

## 🎉 Easter Eggs

- Click anywhere on the page to create sparkle effects
- Hover over buttons to see the custom cursor glow
- Particles respond to mouse movement
- Subtle breathing animations throughout

---

**Built with ❤️ and lots of ☕ for a peaceful web experience**
