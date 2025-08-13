import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];
      
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      particlesRef.current = particles;
    };

    const drawConnections = (particle: Particle, index: number) => {
      if (!ctx) return;
      particlesRef.current.forEach((otherParticle, otherIndex) => {
        if (index !== otherIndex) {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 100) * 0.1;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
    };

    const updateAndDrawParticle = (particle: Particle, index: number) => {
      if (!ctx) return;
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();

      drawConnections(particle, index);
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(updateAndDrawParticle);
      
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;
