import { useEffect } from 'react';

export const useCustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const cursorTrail = document.getElementById('cursor-trail');

    if (!cursor || !cursorTrail) return;

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    const updateCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = `${mouseX - 10}px`;
      cursor.style.top = `${mouseY - 10}px`;
    };

    const updateTrail = () => {
      const dx = mouseX - trailX;
      const dy = mouseY - trailY;
      
      trailX += dx * 0.1;
      trailY += dy * 0.1;
      
      cursorTrail.style.left = `${trailX - 4}px`;
      cursorTrail.style.top = `${trailY - 4}px`;
      
      requestAnimationFrame(updateTrail);
    };

    const handleMouseEnter = () => {
      cursor.style.transform = 'scale(1.5)';
      cursor.style.background = 'radial-gradient(circle, rgba(56, 189, 248, 0.8) 0%, rgba(56, 189, 248, 0.3) 50%, transparent 100%)';
    };

    const handleMouseLeave = () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.background = 'radial-gradient(circle, rgba(34, 197, 94, 0.8) 0%, rgba(34, 197, 94, 0.3) 50%, transparent 100%)';
    };

    // Add event listeners
    document.addEventListener('mousemove', updateCursor);
    requestAnimationFrame(updateTrail);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);
};
