import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusicServiceDetection } from '../hooks/useMusicServiceDetection';
import styles from '../styles/AudioVisualizer.module.css';

interface AudioVisualizerProps {
  src?: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ src }) => {
  const [showVisualizer, setShowVisualizer] = useState(true);
  const [isWindowVisible, setIsWindowVisible] = useState(false);
  const [keepMusicPlaying, setKeepMusicPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  
  const { musicData } = useMusicServiceDetection();
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  // Particle system state
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
    angle: number;
    radius: number;
    audioIndex: number;
  }>>([]);

  const themes = {
    spotify: ['#1DB954', '#1ed760', '#191414', '#ffffff'],
    youtube: ['#FF0000', '#FF4500', '#000000', '#ffffff'],
    apple: ['#FA233B', '#FF6B9D', '#000000', '#ffffff'],
    generic: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
    default: ['#667eea', '#764ba2', '#f093fb', '#f5576c']
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'spotify': return 'bg-green-500';
      case 'youtube': return 'bg-red-500';
      case 'apple': return 'bg-pink-500';
      default: return 'bg-blue-500';
    }
  };

  // Initialize particle system
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles: typeof particlesRef.current = [];
    const numParticles = 200;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < numParticles; i++) {
      const angle = (i / numParticles) * Math.PI * 2;
      const radius = 50 + Math.random() * 100;
      
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: themes[musicData?.service || 'default'][Math.floor(Math.random() * 4)],
        angle: angle,
        radius: radius,
        audioIndex: Math.floor((i / numParticles) * 256)
      });
    }

    particlesRef.current = particles;
  }, [musicData?.service]);

  // Audio visualization animation
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !isWindowVisible) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get audio data if available
    let audioData: Uint8Array | null = null;
    if (analyserRef.current && dataArrayRef.current) {
      try {
        const currentData = dataArrayRef.current;
        // @ts-ignore - Web Audio API type issue
        analyserRef.current.getByteFrequencyData(currentData);
        audioData = currentData;
      } catch (error) {
        console.warn('Audio analysis error:', error);
      }
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.001;

    particlesRef.current.forEach((particle, index) => {
      // Audio-reactive scaling
      let scale = 1;
      if (audioData && particle.audioIndex < audioData.length) {
        scale = 1 + (audioData[particle.audioIndex] / 256) * 2;
      }

      // Update particle position with audio influence
      const audioRadius = particle.radius + (scale - 1) * 20;
      const targetX = centerX + Math.cos(particle.angle + time * 0.5) * audioRadius;
      const targetY = centerY + Math.sin(particle.angle + time * 0.5) * audioRadius;

      particle.x += (targetX - particle.x) * 0.1;
      particle.y += (targetY - particle.y) * 0.1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * scale, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();

      // Draw connections between nearby particles
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
            ctx.globalAlpha = (1 - distance / 100) * 0.3;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
    });

    ctx.globalAlpha = 1;
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isWindowVisible]);

  const setupAudioContext = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audio);
      
      source.connect(analyser);
      source.connect(audioContext.destination);
      
      analyser.fftSize = 512;
      const bufferLength = analyser.frequencyBinCount;
      const buffer = new ArrayBuffer(bufferLength);
      const dataArray = new Uint8Array(buffer);
      
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
    } catch (error) {
      console.warn('Audio context setup failed:', error);
    }
  }, []);

  const handlePlay = useCallback(() => {
    if (showVisualizer) {
      setIsWindowVisible(true);
      setupAudioContext();
      initParticles();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animate();
    }
  }, [showVisualizer, setupAudioContext, initParticles, animate]);

  const handleSwipeStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStartY(clientY);
  }, []);

  const handleSwipeMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - dragStartY;
    
    if (deltaY > 50) { // Swipe down threshold
      setIsWindowVisible(false);
      setIsDragging(false);
    }
  }, [isDragging, dragStartY]);

  const handleSwipeEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const toggleVisualizer = () => {
    setShowVisualizer(!showVisualizer);
    if (!showVisualizer) {
      setIsWindowVisible(false);
    }
  };

  // Show visualizer when music is detected
  useEffect(() => {
    if (musicData?.isPlaying && showVisualizer) {
      setIsWindowVisible(true);
      initParticles();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animate();
    } else if (!musicData?.isPlaying && !keepMusicPlaying) {
      setIsWindowVisible(false);
    }
  }, [musicData, showVisualizer, keepMusicPlaying, initParticles, animate]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('play', handlePlay);
      return () => {
        audio.removeEventListener('play', handlePlay);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [handlePlay]);

  // Resize canvas when window becomes visible
  useEffect(() => {
    if (isWindowVisible && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = 200;
      initParticles();
    }
  }, [isWindowVisible, initParticles]);

  return (
    <div className={styles.audioPlayerContainer}>
      {src && (
        <audio ref={audioRef} src={src} controls>
          <track kind="captions" label="No captions available" />
        </audio>
      )}
      
      <button onClick={toggleVisualizer} className={styles.audioPlayerToggle}>
        {showVisualizer ? 'Hide Visualizer' : 'Show Visualizer'}
      </button>

      <AnimatePresence>
        {showVisualizer && isWindowVisible && (
          <motion.div
            className={`${styles.audioVisualizerWindow} ${styles.visible}`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Swipe Handle */}
            <button
              className={styles.swipeHandle}
              onMouseDown={handleSwipeStart}
              onMouseMove={handleSwipeMove}
              onMouseUp={handleSwipeEnd}
              onTouchStart={handleSwipeStart}
              onTouchMove={handleSwipeMove}
              onTouchEnd={handleSwipeEnd}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              aria-label="Swipe handle to minimize visualizer"
              type="button"
            />

            {/* Music Service Info */}
            {musicData && (
              <motion.div
                className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-2 h-2 rounded-full ${
                    getServiceColor(musicData.service)
                  }`} />
                  <span className="text-xs uppercase tracking-wide opacity-80">
                    {musicData.service}
                  </span>
                </div>
                {musicData.track && (
                  <div className="text-sm font-medium">{musicData.track}</div>
                )}
                {musicData.artist && (
                  <div className="text-xs opacity-70">{musicData.artist}</div>
                )}
              </motion.div>
            )}

            {/* Keep Music Playing Option */}
            <motion.div
              className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <label className="flex items-center gap-2 text-white text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={keepMusicPlaying}
                  onChange={(e) => setKeepMusicPlaying(e.target.checked)}
                  className="rounded"
                />
                Keep music playing
              </label>
            </motion.div>

            {/* Particle Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ background: 'rgba(0, 0, 0, 0.3)' }}
            />

            {/* Swipe Away Hint */}
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Swipe down to minimize
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudioVisualizer;
