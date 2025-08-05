import { useEffect, useRef } from 'react';

interface ParticleTrail {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
  hue: number;
}

export const useCustomCursor = () => {
  const trailParticles = useRef<ParticleTrail[]>([]);
  const animationFrame = useRef<number>();
  const lastClickTime = useRef<number>(0);
  const clickParticles = useRef<ParticleTrail[]>([]);

  useEffect(() => {
    // Create cursor elements
    const createCursorElements = () => {
      // Remove existing cursor elements
      const existingCursor = document.getElementById('magic-cursor');
      const existingTrail = document.getElementById('magic-trail');
      if (existingCursor) existingCursor.remove();
      if (existingTrail) existingTrail.remove();

      // Create main cursor
      const cursor = document.createElement('div');
      cursor.id = 'magic-cursor';
      cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255, 20, 147, 0.9) 0%, rgba(138, 43, 226, 0.6) 50%, transparent 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: normal;
        transition: transform 0.1s ease-out;
        box-shadow: 
          0 0 20px rgba(255, 20, 147, 0.8),
          0 0 40px rgba(138, 43, 226, 0.6),
          inset 0 0 10px rgba(255, 255, 255, 0.4),
          0 0 60px rgba(255, 20, 147, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.3);
      `;

      // Create trail canvas
      const trailCanvas = document.createElement('canvas');
      trailCanvas.id = 'magic-trail';
      trailCanvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 9998;
        mix-blend-mode: normal;
      `;
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;

      document.body.appendChild(cursor);
      document.body.appendChild(trailCanvas);

      return { cursor, trailCanvas };
    };

    const { cursor, trailCanvas } = createCursorElements();
    const ctx = trailCanvas.getContext('2d');
    if (!ctx) return;

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = `${mouseX - 10}px`;
      cursor.style.top = `${mouseY - 10}px`;

      // Add trail particles
      if (trailParticles.current.length < 15) {
        trailParticles.current.push({
          x: mouseX,
          y: mouseY,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          size: 2 + Math.random() * 4,
          opacity: 0.8,
          hue: 320 + Math.random() * 40, // Pink to deep pink range for better visibility
        });
      }
    };

    // Click handler for magical explosion
    const handleClick = (e: MouseEvent) => {
      const now = Date.now();
      lastClickTime.current = now;

      // Create click explosion particles
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const velocity = 2 + Math.random() * 3;
        clickParticles.current.push({
          x: mouseX + Math.cos(angle) * 5,
          y: mouseY + Math.sin(angle) * 5,
          life: 0,
          maxLife: 40 + Math.random() * 20,
          size: 3 + Math.random() * 5,
          opacity: 1,
          hue: 300 + Math.random() * 60, // Bright pink to magenta range
        });
      }

      // Pulse cursor
      cursor.style.transform = 'scale(1.5)';
      cursor.style.boxShadow = `
        0 0 40px rgba(255, 20, 147, 1),
        0 0 80px rgba(255, 105, 180, 0.8),
        0 0 120px rgba(138, 43, 226, 0.6)
      `;
      
      setTimeout(() => {
        cursor.style.transform = isHovering ? 'scale(1.2)' : 'scale(1)';
        cursor.style.boxShadow = isHovering ? `
          0 0 30px rgba(255, 105, 180, 0.9),
          0 0 60px rgba(255, 20, 147, 0.7),
          inset 0 0 15px rgba(255, 255, 255, 0.5),
          0 0 80px rgba(255, 105, 180, 0.5)
        ` : `
          0 0 20px rgba(255, 20, 147, 0.8),
          0 0 40px rgba(138, 43, 226, 0.6),
          inset 0 0 10px rgba(255, 255, 255, 0.4),
          0 0 60px rgba(255, 20, 147, 0.4)
        `;
      }, 200);
    };

    // Hover handlers
    const handleMouseEnter = () => {
      isHovering = true;
      cursor.style.transform = 'scale(1.2)';
      cursor.style.background = 'radial-gradient(circle, rgba(255, 105, 180, 0.95) 0%, rgba(255, 20, 147, 0.7) 50%, transparent 100%)';
      cursor.style.boxShadow = `
        0 0 30px rgba(255, 105, 180, 0.9),
        0 0 60px rgba(255, 20, 147, 0.7),
        inset 0 0 15px rgba(255, 255, 255, 0.5),
        0 0 80px rgba(255, 105, 180, 0.5)
      `;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      cursor.style.transform = 'scale(1)';
      cursor.style.background = 'radial-gradient(circle, rgba(255, 20, 147, 0.9) 0%, rgba(138, 43, 226, 0.6) 50%, transparent 100%)';
      cursor.style.boxShadow = `
        0 0 20px rgba(255, 20, 147, 0.8),
        0 0 40px rgba(138, 43, 226, 0.6),
        inset 0 0 10px rgba(255, 255, 255, 0.4),
        0 0 60px rgba(255, 20, 147, 0.4)
      `;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

      // Animate trail particles
      trailParticles.current = trailParticles.current.filter(particle => {
        particle.life++;
        const progress = particle.life / particle.maxLife;
        particle.opacity = 1 - progress;
        
        if (particle.life >= particle.maxLife) return false;

        // Draw particle with glow
        const alpha = particle.opacity;
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 70%, ${alpha * 0.1})`;
        ctx.fill();
        
        // Inner glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 90%, 80%, ${alpha * 0.3})`;
        ctx.fill();
        
        // Core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 90%, ${alpha})`;
        ctx.fill();
        
        ctx.restore();
        return true;
      });

      // Animate click particles
      clickParticles.current = clickParticles.current.filter(particle => {
        particle.life++;
        const progress = particle.life / particle.maxLife;
        particle.opacity = 1 - progress;
        
        // Move particles outward
        const angle = Math.atan2(particle.y - mouseY, particle.x - mouseX);
        particle.x += Math.cos(angle) * 2;
        particle.y += Math.sin(angle) * 2;
        
        if (particle.life >= particle.maxLife) return false;

        // Draw with sparkle effect
        const alpha = particle.opacity;
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Star-like sparkle
        ctx.strokeStyle = `hsla(${particle.hue}, 100%, 90%, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particle.x - particle.size, particle.y);
        ctx.lineTo(particle.x + particle.size, particle.y);
        ctx.moveTo(particle.x, particle.y - particle.size);
        ctx.lineTo(particle.x, particle.y + particle.size);
        ctx.stroke();
        
        // Center glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 95%, ${alpha})`;
        ctx.fill();
        
        ctx.restore();
        return true;
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    // Resize handler
    const handleResize = () => {
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    // Add hover effects to interactive elements
    const addHoverEffects = () => {
      const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, select');
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });
      return interactiveElements;
    };

    const interactiveElements = addHoverEffects();
    animate();

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      document.body.style.cursor = 'auto';
      
      const cursor = document.getElementById('magic-cursor');
      const trail = document.getElementById('magic-trail');
      if (cursor) cursor.remove();
      if (trail) trail.remove();
    };
  }, []);
};
